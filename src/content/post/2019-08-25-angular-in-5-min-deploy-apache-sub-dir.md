---
id: 1011
title: 'Angular Trong 5 Phút: Deploy Angular Application Trên Apache HTTPD Sub-Directory'
publishDate: 2019-08-25T10:00:00+00:00
author: Tiep Phan
guid: https://www.tiepphan.com/?p=1011
permalink: /angular-trong-5-phut-deploy-angular-application-apache-sub-directory/
description: 'Hướng Dẫn Deploy Angular Application Trên Apache HTTPD Sub-Directory'
image: '@public/assets/uploads/2019/08/angular-5-mins-apache-httpd-sub-dir.jpg'
categories:
  - Javascript
  - Lập Trình Angular
  - Programming
  - Web Development

tags:
  - Angular
  - Deploy Angular Application
  - Angular Trong 5 Phút

---

# Angular Trong 5 Phút: Deploy Angular Application Trên Apache HTTPD Sub-Directory
{:.no_toc}

Trong bài này chúng ta sẽ tìm hiểu cách để deploy ứng dụng Angular trên Apache HTTPD server có sử dụng Sub-Directory.

* ToC
{:toc}
{:.tp__toc}

## 1. Build Angular Application
{:#build-app}

Các bạn chạy lệnh build sau để build ứng dụng đã viết:

```bash
$ ng build --base-href=./ --prod
```

Do ứng dụng sẽ được deploy lên sub-dir, nên chúng ta cần thay đổi `base-href` về `./`.

## 2. Deploy Angular Application
{:#deploy-app}

Để deploy chúng ta chỉ cần copy phần code đã được generated ở director `dist/<app-name>` vào thư mục deploy của Apache HTTPD server kèm theo config để rewrite `.htaccess` như sau:

```apache
RewriteEngine On
# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /<app-name>/index.html
```

Các bạn nhớ thay đổi `app-name` theo tên app của bạn.

## 3. Video
{:#5min-video}

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/r1IuIOYK_lA" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## 4. Link Tham Khảo
{:#doc-references}

<a href="https://angular.io/guide/deployment" target="_blank">Hướng dẫn deploy từ Angular.io</a>

