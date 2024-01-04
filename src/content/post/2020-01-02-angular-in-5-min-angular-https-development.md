---
id: 2020
title: 'Angular Trong 5 Phút: Angular HTTPS Development Environment'
publishDate: 2020-01-02T00:00:00+00:00
author: Tiep Phan
guid: https://www.tiepphan.com/?p=2020
permalink: /angular-trong-5-phut-angular-https-development/
description: 'Hướng dẫn sử dụng Angular CLI và config HTTPS thông qua thư viện mkcert để cài đặt HTTPS khi lập trình ứng dụng Angular'
image: '@public/assets/uploads/2020/01/angular-5-mins-angular-https-development.jpg'
categories:
  - JavaScript
  - Lập Trình Angular
  - Programming
  - Web Development

tags:
  - Angular
  - Angular HTTPS
  - Angular Trong 5 Phút

---

# Angular Trong 5 Phút: Angular HTTPS Development Environment
{:.no_toc}

Trong khi lập trình ứng dụng với Angular, chúng ta có thể cần phải sử dụng HTTPS để có thể làm cho application work. Ví dụ như WebRTC chẳng hạn.
Lúc này, setup HTTPS như thế nào để bạn có thể làm việc được.
Trong bài này, chúng ta sẽ sử dụng Angular CLI và config HTTPS thông qua thư viện **mkcert**. 

* ToC
{:toc}
{:.tp__toc}

## 1. Chuẩn bị một Angular Application

Để bắt đầu chúng ta sẽ tạo một project mới bằng Angular CLI, hoặc sử dụng trên chính project của các bạn (được tạo từ Angular CLI). Các bạn có thể để chọn default bằng cách nhấn enter vài lần.

```bash
$ ng new secure-app
```

Sau đó mở project bằng editor tùy thích, rồi khởi chạy project bằng câu lệnh `ng serve` và mở app ở <a href="http://localhost:4200" target="_blank">http://localhost:4200</a> để xem.

## 2. Install mkcert
{:#install-mkcert}

Hướng dẫn cài đặt ở trang repo của **mkcert**

<a href="https://github.com/FiloSottile/mkcert#installation" target="_blank">Hướng dẫn cài đặt mkcert</a>

Trên Windows các bạn có thể <a href="https://github.com/FiloSottile/mkcert/releases" target="_blank">tải về bộ cài mkcert</a> hoặc sử dụng <a href="https://chocolatey.org/" target="_blank">Chocolatey</a>.

## 3. Install cert
{:#install-cert}

Để bắt đầu install cert cho máy của bạn, chúng ta sẽ chạy lệnh sau đây.

> Lưu ý: đối với Windows, bạn cần chạy PowerShell với quyền administrator.

```bash
mkcert -install

```

Kết quả có được như sau:

<img class="img-responsive" src="/assets/uploads/2020/01/mkcert-install-cert.jpg" alt="mkcert-install-cert"/>

## 4. Generate cert và config Angular CLI
{:#generate-cert}

Chúng ta cần di chuyển vào project directory, sau đó chạy lệnh sau để generate cert. Bạn có thể điền cả test domain của bạn để generate.

```bash
mkcert dev-domain.test localhost 127.0.0.1 ::1

```

Kết quả sẽ có được như hình:

<img class="img-responsive" src="/assets/uploads/2020/01/mkcert-install-cert-project.jpg" alt="mkcert-install-cert-project"/>


Tiếp theo bạn mở `angular.json` file, và update mục `serve` như hình dưới.

Sau cùng là chạy `ng serve` và vào link sau để thấy được kết quả <a href="https://localhost:4200" target="_blank">https://localhost:4200</a>.

> Lưu ý: tên file sẽ là tên được generate ở bước trên.

<img class="img-responsive" src="/assets/uploads/2020/01/config-angular-cli.jpg" alt="config-angular-cli"/>


## 5. Lời kết
{:#generate-cert-summary}

Với vài bước đơn giản, bạn đã có thể có một ứng dụng Angular chạy trên HTTPS. Các bước thực hiện khá giống nhau khi ở các môi trường Windows, MacOS, Linux.

Tuy nhiên, hiện tại **mkcert** chưa hỗ trợ Firefox ở trên Windows. Nên có thể bạn phải sử dụng Chrome để thay thế hoặc sử dụng một giải pháp khác.
