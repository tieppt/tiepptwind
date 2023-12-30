---
id: 293
title: 'Thử Nghiệm Với Angular Phần 10: Sử Dụng Angular CLI Trong Project Thật Cool'
publishDate: 2017-02-19T10:36:03+00:00
author: Tiep Phan
guid: https://www.tiepphan.com/?p=293
permalink: /thu-nghiem-voi-angular-su-dung-angular-cli-trong-project-cool/
description: 'Trong bài này, chúng ta sẽ tìm hiểu cách sử dụng CLI để phát triển một ứng dụng bằng Angular và build một ứng dụng Angular với Angular CLI.'
image: '@public/assets/uploads/2017/02/angular2-10.jpg'
categories:
  - Lập Trình
  - Lập Trình Angular
  - Programming
  - Web Development
tags:
  - Angular
  - Angular 2
  - Angular CLI
  - Lập Trình Angular 2
---

# Sử Dụng Angular CLI Trong Project Thật Cool
{:.no_toc}

Trong <a href="/thu-nghiem-voi-angular-2-component-va-data-binding/" target="_blank">bài học đầu tiên</a> của series Thử Nghiệm Với Angular, chúng ta đã tạo project để thực hành với sự trợ giúp của Angular CLI. Trong bài này, chúng ta sẽ tìm hiểu cách sử dụng CLI để phát triển một ứng dụng bằng Angular và build một ứng dụng Angular với Angular CLI.

* ToC
{:toc}
{:.tp__toc}

## Các phần mềm cần thiết

Để bắt đầu cài đặt được Angular CLI – gọi tắt là CLI – gồm có

  * <a href="https://nodejs.org/en/" target="_blank">Nodejs</a>
  * <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>
  * <a href="https://yarnpkg.com/en/docs/install" target="_blank">Yarn Package Manager</a>

## Cài đặt CLI

```sh
npm install -g @angular/cli
# or
npm i -g @angular/cli
# or sudo if need
sudo npm install -g @angular/cli
# or
sudo npm i -g @angular/cli
```

## Sử dụng CLI

– List các options của CLI:

```sh
ng help
```

– Tạo mới project với CLI:

```sh
ng new <app-name>
# example
ng new contact-app
# use preprocessor instead of css: scss, sass, stylus, less
ng new contact-app --style=scss
```
Các options khác:

```sh
--routing: tạo route
--skip-git: không init và commit git
--skip-install: không install package
--skip-commit: init git nhưng không commit
--source-dir: thư mục của source code, mặc định là src
--prefix: prefix khi generate component, directive, mặc đinh là app
--inline-style: sử dụng inline style thay vì external style file
--inline-template: sử dụng inline template thay vì external template file
-is: alias của --inline-style
-it: alias của --inline-template
-si: alias của --skip-install
-sg: alias của --skip-git
```

– Generate các thành phần:

Scaffold  | Usage
---       | ---
[Component](https://github.com/angular/angular-cli/wiki/generate-component) | `ng g component my-new-component`
[Directive](https://github.com/angular/angular-cli/wiki/generate-directive) | `ng g directive my-new-directive`
[Pipe](https://github.com/angular/angular-cli/wiki/generate-pipe)           | `ng g pipe my-new-pipe`
[Service](https://github.com/angular/angular-cli/wiki/generate-service)     | `ng g service my-new-service`
[Class](https://github.com/angular/angular-cli/wiki/generate-class)         | `ng g class my-new-class`
[Guard](https://github.com/angular/angular-cli/wiki/generate-guard)         | `ng g guard my-new-guard`
[Interface](https://github.com/angular/angular-cli/wiki/generate-interface) | `ng g interface my-new-interface`
[Enum](https://github.com/angular/angular-cli/wiki/generate-enum)           | `ng g enum my-new-enum`
[Module](https://github.com/angular/angular-cli/wiki/generate-module)       | `ng g module my-module`
{:class="table table-striped table-hover"}

– Serve ứng dụng:

```sh
ng serve <options...>
  Builds and serves your app, rebuilding on file changes.
  aliases: server, s
  --target (String) (Default: development)
    aliases: -t <value>, -dev (--target=development), -prod (--target=production), --target <value>, --target <value>, --target <value>, --target <value>
  --environment (String)
    aliases: -e <value>, --environment <value>, --environment <value>, --environment <value>, --environment <value>
  --output-path (Path)
    aliases: -op <value>, --outputPath <value>, --outputPath <value>, --outputPath <value>, --outputPath <value>
  --aot (Boolean)
    aliases: -aot, -aot, -aot, -aot
  --sourcemap (Boolean)
    aliases: -sm, --sourcemaps, --sourcemap, --sourcemap, --sourcemap, --sourcemap
  --vendor-chunk (Boolean) (Default: true)
    aliases: -vc, --vendorChunk, --vendorChunk, --vendorChunk, --vendorChunk
  --base-href (String)
    aliases: -bh <value>, --baseHref <value>, --baseHref <value>, --baseHref <value>, --baseHref <value>
  --deploy-url (String)
    aliases: -d <value>, --deployUrl <value>, --deployUrl <value>, --deployUrl <value>, --deployUrl <value>
  --verbose (Boolean) (Default: false)
    aliases: -v, --verbose, --verbose, --verbose, --verbose
  --progress (Boolean) (Default: true)
    aliases: -pr, --progress, --progress, --progress, --progress
  --i18n-file (String)
    aliases: --i18nFile <value>, --i18nFile <value>, --i18nFile <value>, --i18nFile <value>
  --i18n-format (String)
    aliases: --i18nFormat <value>, --i18nFormat <value>, --i18nFormat <value>, --i18nFormat <value>
  --locale (String)
    aliases: --locale <value>, --locale <value>, --locale <value>, --locale <value>
  --extract-css (Boolean)
    aliases: -ec, --extractCss, --extractCss, --extractCss, --extractCss
  --watch (Boolean)
    aliases: -w, --watch, --watch, --watch, --watch
  --output-hashing=none|all|media|bundles (String) define the output filename cache-busting hashing mode
    aliases: -oh <value>, --outputHashing <value>, --outputHashing <value>, --outputHashing <value>, --outputHashing <value>
  --poll (Number) enable and define the file watching poll time period (milliseconds)
    aliases: -poll <value>, -poll <value>, -poll <value>, -poll <value>
  --port (Number) (Default: 4200)
    aliases: -p <value>, -port <value>, -port <value>
  --host (String) (Default: localhost) Listens only on localhost by default
    aliases: -H <value>, -host <value>, -host <value>
  --proxy-config (Path)
    aliases: -pc <value>, --proxyConfig <value>, --proxyConfig <value>
  --ssl (Boolean) (Default: false)
    aliases: -ssl, -ssl
  --ssl-key (String) (Default: ssl/server.key)
    aliases: --sslKey <value>, --sslKey <value>
  --ssl-cert (String) (Default: ssl/server.crt)
    aliases: --sslCert <value>, --sslCert <value>
  --open (Boolean) (Default: false) Opens the url in default browser
    aliases: -o, -open, -open
  --live-reload (Boolean) (Default: true)
    aliases: -lr, --liveReload
  --live-reload-host (String) Defaults to host
    aliases: -lrh <value>, --liveReloadHost <value>
  --live-reload-base-url (String) Defaults to baseURL
    aliases: -lrbu <value>, --liveReloadBaseUrl <value>
  --live-reload-port (Number) (Defaults to port number within [49152...65535])
    aliases: -lrp <value>, --liveReloadPort <value>
  --live-reload-live-css (Boolean) (Default: true) Whether to live reload CSS (default true)
    aliases: --liveReloadLiveCss
  --hmr (Boolean) (Default: false) Enable hot module replacement
    aliases: -hmr
```

– Build ứng dụng:

```sh
ng build <options...>
```
options có thể có hoặc không.

```sh
--aot=true: build với AOT
--aot=false: không build với AOT.

# build production
--target=production --environment=prod
--prod --env=prod
--prod
# build dev: default
--target=development --environment=dev
--dev --e=dev
--dev
```

Complete options available
Builds your app and places it into the output path (dist/ by default).
```sh
  aliases: b
  --target (String) (Default: development)
    aliases: -t <value>, -dev (--target=development), -prod (--target=production), --target <value>
  --environment (String)
    aliases: -e <value>, --environment <value>
  --output-path (Path)
    aliases: -op <value>, --outputPath <value>
  --aot (Boolean)
    aliases: -aot
  --sourcemap (Boolean)
    aliases: -sm, --sourcemaps, --sourcemap
  --vendor-chunk (Boolean) (Default: true)
    aliases: -vc, --vendorChunk
  --base-href (String)
    aliases: -bh <value>, --baseHref <value>
  --deploy-url (String)
    aliases: -d <value>, --deployUrl <value>
  --verbose (Boolean) (Default: false)
    aliases: -v, --verbose
  --progress (Boolean) (Default: true)
    aliases: -pr, --progress
  --i18n-file (String)
    aliases: --i18nFile <value>
  --i18n-format (String)
    aliases: --i18nFormat <value>
  --locale (String)
    aliases: --locale <value>
  --extract-css (Boolean)
    aliases: -ec, --extractCss
  --watch (Boolean)
    aliases: -w, --watch
  --output-hashing=none|all|media|bundles (String) define the output filename cache-busting hashing mode
    aliases: -oh <value>, --outputHashing <value>
  --poll (Number) enable and define the file watching poll time period (milliseconds)
    aliases: -poll <value>
  --stats-json (Boolean) (Default: false)
    aliases: --statsJson
```

## Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/SXW-Nz-lp70" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Tham khảo
Ahead-of-time compilation: <a href="https://angular.io/docs/ts/latest/cookbook/aot-compiler.html" target="_blank">https://angular.io/docs/ts/latest/cookbook/aot-compiler.html</a>
