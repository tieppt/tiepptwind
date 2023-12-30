---
id: 253
title: 'Thử Nghiệm Với Angular 2 Phần 7: Truyền Dữ Liệu Cho Component Với @Input'
publishDate: 2017-01-05T11:32:34+00:00
author: Tiep Phan
guid: https://www.tiepphan.com/?p=253
permalink: /thu-nghiem-voi-angular-2-truyen-du-lieu-cho-component-voi-input/
description: 'Trong bài học này chúng ta sẽ tìm hiểu việc truyền dữ liệu cho Component trong Angular với @Input decorator.'
image: '@public/assets/uploads/2017/01/angular2-PHAN7.jpg'
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
  - Angular @Input
  - Angular Component
  - Component Property Binding
  - Lập Trình Angular 2
  - Web Dev
---

# Truyền Dữ Liệu Cho Component Với @Input
{:.no_toc}

Trong những bài học trước của series **Thử Nghiệm Với Angular 2**, chúng ta đã tạo ra các Component, hầu hết các Component này chứa dữ liệu của chính nó mà không có sự tương tác với các Component khác. Trong bài học này chúng ta sẽ tìm hiểu việc truyền dữ liệu cho Component với `@Input` decorator, từ cú pháp, đến các chú ý khi thực hiện truyền dữ liệu cho một Component.

* ToC
{:toc}
{:.tp__toc}

## `@Input` sử dụng như thế nào?

Đầu tiên, để có thể nhận được dữ liệu từ bên ngoài truyền vào cho một Component chúng ta cần thực hiện khai báo tên của property và gán nó với `@Input` decorator như sau:

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tp-contact-image-detail',
  templateUrl: './contact-image-detail.component.html',
  styleUrls: ['./contact-image-detail.component.scss']
})
export class ContactImageDetailComponent {
  @Input() round: Boolean = false;
  @Input() avatarUrl: string = '';

  constructor() {}
}
```

Sau đó khi sử dụng ở trong một template của một Component khác chúng ta có thể truyền dữ liệu như sau:

```html
<tp-contact-image-detail
  [avatarUrl]="contact.avatar?.url"
  [round]="contact.avatar?.round"
>
</tp-contact-image-detail>
```

Hoặc sử dụng get/set để thực thi một số hành động như chuẩn hóa dữ liệu đầu vào cho property của Component.

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tp-contact-image-detail',
  templateUrl: './contact-image-detail.component.html',
  styleUrls: ['./contact-image-detail.component.scss']
})
export class ContactImageDetailComponent {
  @Input() round: Boolean = false;
  _avatarUrl: string = '';

  constructor() {}

  get avatarUrl() {
    return this._avatarUrl;
  }
  
  @Input()
  set avatarUrl(value: string) {
    this._avatarUrl = value.trim();
  }
}
```

Cách sử dụng tương tự như ở ví dụ phía trên.

## Yêu cầu một property nào đó là required cho một Component.

Bạn có thể kiểm tra property trong life-cycle là OnInit hoặc OnChange.

```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tp-contact-image-detail',
  templateUrl: './contact-image-detail.component.html',
  styleUrls: ['./contact-image-detail.component.scss']
})
export class ContactImageDetailComponent implements OnInit {
  @Input() round: boolean = false;
  _avatarUrl: string = '';

  constructor() {}

  get avatarUrl() {
    return this._avatarUrl;
  }
  
  @Input()
  set avatarUrl(value: string) {
    this._avatarUrl = value.trim();
  }

  ngOnInit() {
    if (!this.avatarUrl) {
      throw new Error('avatarUrl is required!');
    }
  }
}
```

## Đặt một alias cho property

Bạn có thể tạo ra một alias cho một property với cú pháp như sau:

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tp-contact-image-detail',
  templateUrl: './contact-image-detail.component.html',
  styleUrls: ['./contact-image-detail.component.scss']
})
export class ContactImageDetailComponent {
  @Input() round: Boolean = false;
  @Input('avatar-url') avatarUrl: string = '';

  constructor() {}
}
```

Hoặc:

```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tp-contact-image-detail',
  templateUrl: './contact-image-detail.component.html',
  styleUrls: ['./contact-image-detail.component.scss']
})
export class ContactImageDetailComponent implements OnInit {
  @Input() round: Boolean = false;
  _avatarUrl: string = '';

  constructor() {}

  get avatarUrl() {
    return this._avatarUrl;
  }
  
  @Input('avatar-url')
  set avatarUrl(value: string) {
    this._avatarUrl = value.trim();
  }

  ngOnInit() {
    if (!this.avatarUrl) {
      throw new Error('avatarUrl is required!');
    }
  }
}
```

Khi sử dụng binding data, bạn sẽ bind cho alias:

```html
<tp-contact-image-detail
  [avatar-url]="contact.avatar?.url"
  [round]="contact.avatar?.round"
>
</tp-contact-image-detail>
```

## Phương pháp thay thế decorator

Sử dụng `inputs` array trong `@Component()` để thay thế cho việc dùng `@Input` decorator.

> Lưu ý: cách này thường không được khuyến cáo sử dụng như @Input.

```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tp-contact-image-detail',
  templateUrl: './contact-image-detail.component.html',
  styleUrls: ['./contact-image-detail.component.scss'],
  inputs: ['avatarUrl']
})
export class ContactImageDetailComponent implements OnInit {
  @Input() round: Boolean = false;
  _avatarUrl: string = '';

  constructor() {

  }

  get avatarUrl() {
    return this._avatarUrl;
  }

  set avatarUrl(value: string) {
    this._avatarUrl = value.trim();
  }

  ngOnInit() {
    if (!this.avatarUrl) {
      throw new Error('avatarUrl is required!');
    }
  }
}
```

Khai báo trong inputs array có sử dụng alias:

```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tp-contact-image-detail',
  templateUrl: './contact-image-detail.component.html',
  styleUrls: ['./contact-image-detail.component.scss'],
  inputs: ['avatarUrl:avatar-url']
})
export class ContactImageDetailComponent implements OnInit {
  @Input() round: Boolean = false;
  _avatarUrl: string = '';

  constructor() {

  }

  get avatarUrl() {
    return this._avatarUrl;
  }

  set avatarUrl(value: string) {
    this._avatarUrl = value.trim();
  }

  ngOnInit() {
    if (!this.avatarUrl) {
      throw new Error('avatarUrl is required!');
    }
  }
}
```

> Lưu ý: alias sẽ có thứ tự `internalProp:externalProp` ví dụ như `avatarUrl:avatar-url`.

## Video bài học

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/9DBOFhUis80" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## Tham khảo

Documentation: <a href="https://angular.io/docs/ts/latest/cookbook/component-communication.html" target="_blank">https://angular.io/docs/ts/latest/cookbook/component-communication.html</a>
