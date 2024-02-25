import { getImage } from 'astro:assets';
import type { GetImageResult, ImageMetadata } from 'astro';
import type { OpenGraph } from '@astrolib/seo';

const load = async function () {
  let images: Record<string, () => Promise<unknown>> | undefined = undefined;
  try {
    images = import.meta.glob([
      '~/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}',
      '@public/assets/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}',
    ]);
  } catch (e) {
    // continue regardless of error
  }

  return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined = undefined;

/** */
export const fetchLocalImages = async () => {
  _images = _images || (await load());
  return _images;
};

/** */
export const findImage = async (
  imagePath?: string | ImageMetadata | null,
): Promise<string | ImageMetadata | undefined | null> => {
  // Not string
  if (typeof imagePath !== 'string') {
    return imagePath;
  }

  // Absolute paths
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('/')
  ) {
    return imagePath;
  }
  const isStartsWithAssets = imagePath.startsWith('~/assets/images');
  const isStartsWithPublicAssets = imagePath.startsWith('@public/assets');
  if (!(isStartsWithAssets || isStartsWithPublicAssets)) {
    return imagePath;
  }

  const images = await fetchLocalImages();
  const key = imagePath.replace('~/', '/src/').replace('@public/', '/public/');

  return images && typeof images[key] === 'function'
    ? ((await images[key]()) as { default: ImageMetadata })['default']
    : null;
};

/** */
export const adaptOpenGraphImages = async (
  openGraph: OpenGraph = {},
  astroSite: URL | undefined = new URL(''),
): Promise<OpenGraph> => {
  if (!openGraph?.images?.length) {
    return openGraph;
  }

  const images = openGraph.images;
  const defaultWidth = 1200;
  const defaultHeight = 626;

  const adaptedImages = await Promise.all(
    images.map(async (image) => {
      if (image?.url) {
        const resolvedImage = (await findImage(image.url)) as
          | ImageMetadata
          | undefined;
        if (!resolvedImage) {
          return {
            url: '',
          };
        }

        const _image = (await getImage({
          src: resolvedImage,
          alt: 'Placeholder alt',
          width: image?.width || defaultWidth,
          height: image?.height || defaultHeight,
        })) as GetImageResult & { width?: number; height?: number };

        if (typeof _image === 'object') {
          return {
            url:
              'src' in _image && typeof _image.src === 'string'
                ? String(new URL(_image.src, astroSite))
                : 'pepe',
            width:
              'width' in _image && typeof _image.width === 'number'
                ? _image.width
                : undefined,
            height:
              'height' in _image && typeof _image.height === 'number'
                ? _image.height
                : undefined,
          };
        }
        return {
          url: '',
        };
      }

      return {
        url: '',
      };
    }),
  );

  return { ...openGraph, ...(adaptedImages ? { images: adaptedImages } : {}) };
};

export function parseImageSize(
  value: string | number | null | undefined,
): string | number | null | undefined {
  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return parseInt(value, 10);
  }
  return value;
}
