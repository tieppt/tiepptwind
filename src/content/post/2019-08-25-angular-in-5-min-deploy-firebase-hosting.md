---
id: 1012
title: 'Angular Trong 5 Phút: Deploy Angular Application Lên Firebase Hosting'
publishDate: 2019-08-25T15:00:00+00:00
author: Tiep Phan
guid: https://www.tiepphan.com/?p=1012
permalink: /angular-trong-5-phut-deploy-angular-application-firebase-hosting/
description: 'Hướng Dẫn Deploy Angular Application Lên Firebase Hosting'
image: '@public/assets/uploads/2019/08/angular-5-mins-deploy-firebase-hosting.jpg'
categories:
  - JavaScript
  - Lập Trình Angular
  - Programming
  - Web Development

tags:
  - Angular
  - Deploy Angular Application
  - Angular Trong 5 Phút
  - Firebase Hosting

---

# Angular Trong 5 Phút: Deploy Angular Application Lên Firebase Hosting
{:.no_toc}

Trong bài này chúng ta sẽ tìm hiểu cách để deploy ứng dụng Angular lên Firebase Hosting.

* ToC
{:toc}
{:.tp__toc}

## 1. Build Angular Application
{:#build-app}

Các bạn chạy lệnh build sau để build ứng dụng đã viết:

```bash
$ ng build --prod
```

## 2. Install Firebase Tools
{:#install-firebase-tools}

Firebase cung cấp 1 CLI cho phép chúng ta thao tác từ command line. Để sử dụng CLI này, chúng ta chỉ cần install package sau:

```bash
$ npm i -g firebase-tools
```

## 3. Login Vào Firebase
{:#login-firebase}

Các bạn chạy lệnh sau và Login vào tài khoản tương ứng.

```bash
$ firebase login
```

Nếu muốn Login vào 1 tài khoản khác, thì chỉ cần Logout bằng lệnh:

```bash
$ firebase logout
```

## 4. Init Firebase
{:#init-firebase}

Các bạn chạy lệnh sau và chọn `Hosting` khi được hỏi như hình.

```bash
$ firebase init
```

![Firebase CLI](/assets/uploads/2019/08/firebase-cli-1.png)


Lựa chọn tạo mới hoặc sử dụng project có sẵn:

![Firebase CLI](/assets/uploads/2019/08/firebase-cli-2.png)


Chọn project để deploy:

![Firebase CLI](/assets/uploads/2019/08/firebase-cli-3.png)


Trả lời lần lượt 3 câu hỏi:

Câu 1: directory mà bạn muốn deploy.

Câu 2: bạn có sử dụng rewrite khi dùng Single Page App hay ko (thường là có).

Câu 3: bạn có muốn override file index.html không (thường là không).

![Firebase CLI](/assets/uploads/2019/08/firebase-cli-4.png)



## 5. Deploy Angular Application
{:#deploy-app}

Để deploy chúng ta chỉ cần chạy lệnh sau:

```bash
$ firebase deploy --only hosting
```

## 6. Video
{:#5min-video}

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/mU6nT7SDiOM" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

## 7. Link Tham Khảo
{:#doc-references}

<a href="https://angular.io/guide/deployment" target="_blank" rel="noopener noreferrer">Hướng dẫn deploy từ Angular.io</a>

