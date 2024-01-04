---
id: 362
title: Angular 4.0.0 Có Gì Mới?
publishDate: 2017-04-01T14:10:17+00:00
author: Tiep Phan
guid: https://www.tiepphan.com/?p=362
permalink: /angular-4-0-0-co-gi-moi/
description: 'Tháng 3-2017, Angular team đã phát hành Angular 4, vậy Angular 4 có gì mới, có những gì thay đổi mà chúng ta cần lưu ý. Bài này sẽ giới thiệu cho các bạn những điểm mới trong Angular 4.'
image: '@public/assets/uploads/2017/03/angular-v4.jpg'
categories:
  - JavaScript
  - Lập Trình
  - Lập Trình Angular
  - Programming
  - Web Development
tags:
  - Angular
  - Angular 2
  - Angular 4
  - Angular Component
  - NgFor
  - NgIf
  - Web Dev
---

# Angular 4.0.0 Có Gì Mới?
{:.no_toc}

Tháng 3-2017, Angular team đã phát hành Angular 4, vậy Angular 4 có gì mới, có những gì thay đổi mà chúng ta cần lưu ý. Bài này sẽ giới thiệu cho các bạn những điểm mới trong Angular 4.

* ToC
{:toc}
{:.tp__toc}

## 1. Tổng quan

  * New features: Những tính năng mới có trong phiên bản mới.
  * Breaking changes: Những thay đổi ở phiên bản mới có thể làm hệ thống hiện tại bị lỗi khi nâng cấp.
  * Deprecated: Những thay đổi không được sử dụng trong phiên bản mới, và ở phiên bản tiếp theo sẽ bị loại bỏ đi.

## 2. New features

  * Smaller & Faster: new View Engine giúp giảm kích thước code gen ra khoảng 60% so với trước đây.
  * Tương thích với TypeScript 2.1, 2.2, Angular Universal, Source Maps for Templates.

![Angular 4](/assets/uploads/2017/04/angular-4-1.png){:class="img-responsive"}
{:class="text-center"}

  * Cải tiến ngIf, ngFor: tạo ra các local variable, if/else:
![Angular 4 cải tiến ngIf, ngFor](/assets/uploads/2017/04/angular-4-2.png){:class="img-responsive"}
{:class="text-center"}

  * Giới thiệu NgComponentOutlet và NgTemplateOutlet tương thích với * syntax.

Cú pháp của NgComponentOutlet và NgTemplateOutlet:

![Angular 4 NgComponentOutlet và NgTemplateOutlet](/assets/uploads/2017/04/angular-4-3.png){:class="img-responsive"}
{:class="text-center"}

Tạo dynamic component trong Angular:

![Angular 4 Tạo dynamic component](/assets/uploads/2017/04/angular-4-4.png){:class="img-responsive"}
{:class="text-center"}

![Angular 4 Tạo dynamic component](/assets/uploads/2017/04/angular-4-5.png){:class="img-responsive"}
{:class="text-center"}

## 3. Breaking changes

  * Lifecyle events: thay thế toàn bộ là interface nên phải thay thế hết kế thừa các event này thành “implements”, không được sử dụng &#8220;extends&#8221; như ở phiên bản 2.
  * Không cho phép deep imports và tất cả các export được đặt ký tự ɵ ở đầu thì không được phép sử dụng trong ứng dụng của bạn.

![Angular 4](/assets/uploads/2017/04/angular-4-6.png){:class="img-responsive"}
{:class="text-center"}

Các imports không hợp lệ trong Angular 4:

![Angular 4](/assets/uploads/2017/04/angular-4-7.png){:class="img-responsive"}
{:class="text-center"}

  * Animation đã tách riêng khỏi @angular/core, thay vào đó là import BrowserAnimationsModule từ @angular/platform-browser/animations và các thành phần như trigger từ @angular/animations.

![Angular 4](/assets/uploads/2017/04/angular-4-8.png){:class="img-responsive"}
{:class="text-center"}

## 4. Deprecated

  * OpaqueToken thay thế bằng InjectionToken<?>

![Angular 4](/assets/uploads/2017/04/angular-4-9.png){:class="img-responsive"}
{:class="text-center"}

  * Renderer thay thế bằng Renderer2
  * `<template>` thay thế bằng `<ng-template>`

![Angular 4](/assets/uploads/2017/04/angular-4-10.png){:class="img-responsive"}
{:class="text-center"}

## 5. Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/2SY_uLf8gsA" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## 6. Tham khảo

<a href="http://angularjs.blogspot.com/2017/03/angular-400-now-available.html" target="_blank">http://angularjs.blogspot.com/2017/03/angular-400-now-available.html</a>

<a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html" target="_blank">TypeScript strictNullChecks</a>

<a href="https://github.com/angular/angular/blob/master/docs/RELEASE_SCHEDULE.md" target="_blank">Lịch trình phát hành phiên bản và tính tương thích giữa các phiên bản Angular</a>

Ngoài ra, còn khá nhiều các API bị đánh dấu là deprecated, bạn có thể vào trang documentation của Angular để tìm hiểu thêm tại địa chỉ: <a href="https://angular.io/search/#stq=deprecated&stp=1" target="_blank">https://angular.io/search/#stq=deprecated&stp=1</a>
