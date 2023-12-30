---
id: 245
title: 'Thử Nghiệm Với Angular 2 Phần 6: Quản Lý Event Trong Angular 2'
publishDate: 2017-01-03T17:08:05+00:00
author: Tiep Phan
guid: https://www.tiepphan.com/?p=245
permalink: /thu-nghiem-voi-angular-2-quan-ly-event-trong-angular-2/
description: 'Bài học này sẽ củng cố một số kiến thức về Event trong Angular 2 như $event object hay key event filtering.'
image: '@public/assets/uploads/2017/01/angular2-PHAN6.jpg'
categories:
  - Javascript
  - Lập Trình
  - Lập Trình Angular
  - Programming
  - Web Development
tags:
  - Angular
  - Angular 2
  - Angular 2 Directives
  - Angular 2 Event
  - Angular Component
  - Javascript
  - Lập Trình Angular 2
  - Web Dev
---

# Quản Lý Event Trong Angular 2
{:.no_toc}

Trong <a href="/thu-nghiem-voi-angular-2-component-va-data-binding/" target="_blank">bài học đầu tiên</a> của series **Thử Nghiệm Với Angular 2** chúng ta đã làm quen với **Event Binding** trong Angular 2. Bài học này sẽ củng cố một số kiến thức về Event trong Angular 2 như `$event` object hay **key event filtering**.

* ToC
{:toc}
{:.tp__toc}

## Giới thiệu
Angular 2 cung cấp event binding cho bất kỳ event nào của DOM tương ứng như `click`, `keyup`, `keydown`, `mouseover`, &#8230;

Để binding event cho một phần tử nào bạn chỉ cần bao đóng nó trong cặp dấu `( <event> )` và bên trong là tên của event, vế tiếp theo của binding là một template statement: có thể là một hàm, hay một câu lệnh thực thi một hành động nào đó.

Ví dụ:

```html
<button (click)="onClickMe()">Click me!</button>
```

## Thao tác với `$event` object

Angular 2 cung cấp một object tên là $event, khi nó được truyền vào là tham số của hàm handle event thì bạn có thể truy cập vào các thuộc tính mà nó chứa trong đó, chẳng hạn event cho keyboard, mouse.

Ví dụ:

```html
<input (keyup)="onKey($event)">
```

```ts
export class LoggerKeyUpComponent {

  onKey(event: any) { // without type info
    // do something with event param
    console.log(event);
  }
}
```

Hoặc có thể có type của event:

```html
<input (keyup)="onKey($event)">
```
```ts
export class LoggerKeyUpTypeComponent {

  onKey(event: KeyboardEvent) { // with type info
    // do something with event param
    console.log((<HTMLInputElement>event.target).value);
  }
}
```

## Key event filtering

Khi thao tác với keyboard event, có thể chúng ta chỉ muốn lắng nghe trên một key xác định nào đó, lúc đó chúng ta có thể dùng key event filtering.

Ví dụ:

```html
<input (keyup.enter)="onEnter($event)">
```

```ts
export class KeyUpFilteringComponent {
  value = '';
  onEnter(event) { 
    // do something
    this.value = event.target.value;
  }
}
```

## Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/epA82AYZPck" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Tham khảo

Documentation: <a href="https://angular.io/docs/ts/latest/guide/user-input.html" target="_blank">https://angular.io/docs/ts/latest/guide/user-input.html</a>
