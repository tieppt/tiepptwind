---
title: 'Thử Nghiệm Với Angular 2 Phần 2: Built-in Directives NgIf, NgFor, NgSwitchCase'
publishDate: 2016-12-25T16:38:39+00:00
author: Tiep Phan
permalink: /thu-nghiem-voi-angular-2-built-in-directives-ngif-ngfor-ngswitchcase/
description: 'Thử Nghiệm Với Angular 2 Phần 2: Built-in Directives NgIf, NgFor, NgSwitchCase'
image: '@public/assets/uploads/2016/12/angular2-PHAN2.jpg'
categories:
  - JavaScript
  - Lập Trình
  - Lập Trình Angular
  - Programming
  - Web Development
tags:
  - Angular
  - Angular 2
  - Angular 2 Directives
  - Angular Component
  - Lập Trình Angular 2
  - NgFor
  - NgIf
  - NgSwitchCase
  - Web Dev
---


Xin chào các bạn, đây là bài học thứ hai trong series **Thử Nghiệm Với Angular 2**, trong bài trước mình đã giới thiệu về Angular 2 Component và Data Binding. Bài học này chúng ta sẽ tìm hiểu về built-in directives NgIf, NgFor, NgSwitchCase trong Angular.

<blockquote>
  <p>
    <a href="/thu-nghiem-voi-angular-2-component-va-data-binding/">Thử Nghiệm Với Angular 2 Phần 1: Component và Data Binding</a>
  </p>
</blockquote>



Trong bài này chúng ta sẽ đi tìm hiểu các Directives được cung cấp bởi Angular 2 là **_NgIf_**, **_NgFor_**, **_NgSwitchCase_** qua các ví dụ tiếp nối từ bài học trước.

> Lưu ý: để sử dụng các directives này, bạn cần import <a href="https://angular.io/docs/ts/latest/api/platform-browser/index/BrowserModule-class.html" target="_blank">BrowserModule</a> hoặc <a href="https://angular.io/docs/ts/latest/api/common/index/CommonModule-class.html" target="_blank">CommonModule</a>

## NgIf

Sử dụng khi muốn thêm hoặc xóa bỏ một phần tử khi render. Ví dụ: hiển thị thông báo lỗi khi người dùng nhập form chưa đúng.

Cú pháp:

{% raw %}
```html
<h2 *ngIf="printable">{{ message }}</h2>
```
{% endraw %}

> Lưu ý: đừng quên dấu `*` phía trước `ngIf` directive

## NgFor

Sử dụng khi muốn render một list các phần tử. Ví dụ: render list các bài học trong một series chẳng hạn.

Cú pháp:

{% raw %}
```html
<div *ngFor="let contact of contacts">
  <h3>{{ contact.name }}</h3>
  <div>
    <img *ngIf="contact.avatar?.url" [src]="contact.avatar?.url" alt="Avatar of {{ contact.name }}">
  </div>
</div>
```
{% endraw %}

> Lưu ý: đừng quên dấu `*` phía trước `ngFor` directive và sử dụng cấu trúc `let &#8230; of &#8230;`

### NgSwitchCase

Sử dụng thay thế việc if nhiều lần, tương tự như switch-case trong Javascript.

Cú pháp:

```html
<div [ngSwitch]="conditionExpression">
  <template [ngSwitchCase]="case1Exp">...</template>
  <template ngSwitchCase="case2LiteralString">...</template>
  <template ngSwitchDefault>...</template>
</div>
```

Hoặc:

```html
<div [ngSwitch]="tabIndex">
  <div *ngSwitchCase="1">
    <div>
      Tab content 1
    </div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, rerum.
    </p>
  </div>
  <div *ngSwitchCase="2">
    <div>
      Tab content 2
    </div>
    <p>
      Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.
    </p>
  </div>
  <div *ngSwitchCase="3">
    <div>
      Tab content 3
    </div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus a sequi cupiditate accusantium vitae impedit eum illo voluptatem neque, nisi.
    </p>
  </div>
</div>
```

> Lưu ý: không có dấu `*`ở phía trước `ngSwitch` directive. Thay vào đó, sử dụng property binding.
> 
> Đặt dấu `*` ở phía trước `ngSwitchCase`và `ngSwitchDefault`. Trường hợp sử dụng với thẻ `template` như ở ví dụ đầu tiên của `ngSwitch` thì không.

## Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/KxvyaY2OY6s" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Tham khảo

`*ngIf`: <a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#ngIf" target="_blank">https://angular.io/docs/ts/latest/guide/template-syntax.html#ngIf</a>

`*ngFor`: <a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#ngFor" target="_blank">https://angular.io/docs/ts/latest/guide/template-syntax.html#ngFor</a>

`ngSwitch`: <a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#ngSwitch" target="_blank">https://angular.io/docs/ts/latest/guide/template-syntax.html#ngSwitch</a>
