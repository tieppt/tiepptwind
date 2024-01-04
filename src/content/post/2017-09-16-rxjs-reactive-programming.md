---
id: 1002
title: 'Rxjs Và Reactive Programming'
publishDate: 2017-09-16T10:00:00+00:00
author: Tiep Phan
guid: https://www.tiepphan.com/?p=1002
permalink: /rxjs-reactive-programming/
description: 'Giới thiệu Rxjs và Reactive Programming và ứng dụng trong Angular'
image: '@public/assets/uploads/2017/09/rxjs-reactive-programming.jpg'
categories:
  - JavaScript
  - Lập Trình Angular
  - Programming
  - Web Development
  - Rxjs
tags:
  - Angular
  - Angular Component
  - Lập Trình Angular 2+
  - Rxjs Angular
  - Observable
  - Reactive Programming
---

# Rxjs Và Reactive Programming
{:.no_toc}

Hẳn các bạn vẫn còn nhớ trong một số bài trước chúng ta có nói về **Observable** trong ứng dụng Angular, vậy **Observable** là gì, nó có quan hệ gì với Angular, làm thế nào để sử dụng **Observable** hiệu quả trong ứng dụng của bạn. Trong bài này chúng ta sẽ cùng tìm hiểu về **Observable**, về **Rxjs**, **Reactive Programming**.

* ToC
{:toc}
{:.tp__toc}

## 1. Giới thiệu
{:#post-intro}

Angular đi kèm với một dependency là Rxjs giúp cho nó trở nên **reactive**, một ứng dụng Angular là một **reactive system**.
Dễ thấy nhất ở đây chính là EventEmitter, hay Reactive Forms mà chúng ta đã tìm hiểu trong các bài học trước.

Vậy **Reactive Programming** (RP) là gì? Điều gì khiến nó trở thành một chủ đề hot như vậy...

Hiện tại, có cả tá định nghĩa về RP, nhưng mình thấy định nghĩa sau đây là bao quát tốt vấn đề:

**Reactive programming is programming with asynchronous data streams**

Vâng đúng vậy, đây là phương pháp lập trình xoay quanh **data streams** và nó deal với các vấn đề của **asynchronous**. Nhưng bạn đừng hiểu lầm, nó có thể deal với cả **synchronous** nữa.

Bạn có thể tưởng tượng data streams như hình sau, với `data` được gửi đến trong suốt dòng thời gian của một stream (over time), giống như một array có các phần tử được gửi đến lần lượt theo thời gian.

![data streams](/assets/uploads/2017/09/packages.gif)


Và chúng ta có thể coi mọi thứ là stream: single value, array, event, etc.

![everything-is-a-stream](/assets/uploads/2017/09/everything-is-a-stream.jpg)


Không những thế, khi thao tác với stream, chúng ta có thể có `value`, `error`, hay `complete` signals. Đây là điều mà các API trước đây của các hệ thống event trong JavaScript còn thiếu, chúng có qua nhiều interface khác nhau cho các loại event khác nhau, Observable sinh ra để tổng quát hóa các interface đó lại. 

![figure-stream](/assets/uploads/2017/09/figure-stream.png)


Và Rxjs giúp chúng ta có được **reactive** trong lập trình ứng dụng JavaScript:

> Rxjs is a library for composing asynchronous and event-based programs by using observable sequences.
> 
> Think of Rxjs as Lodash (ultility for array/object) for events/streams.
> 
> ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.
> 

**Các Concepts nền tảng của Rxjs bao gồm:**

> An Observable is a collection that arrives over time

* **Observable**: đại diện cho khái niệm về một tập hợp các giá trị hoặc các sự kiện trong tương lai. Khi các giá trị hoặc sự kiện phát sinh trong tương lai, Observable sẽ điều phối nó đến Observer.
* **Observer**: là một tập hợp các callbacks tương ứng cho việc lắng nghe các giá trị (`next`, `error`, hay `complete`) được gửi đến bởi Observable.
* **Subscription**: là kết quả có được sau khi thực hiện một Observable, nó thường dùng cho việc hủy việc tiếp tục xử lý.
* **Operators**: là các pure functions cho phép lập trình functional với Observable.
* **Subject**: để thực hiện việc gửi dữ liệu đến nhiều Observers (multicasting).
* **Schedulers**: một scheduler sẽ điều khiển khi nào một subscription bắt đầu thực thi, và khi nào sẽ gửi tín hiệu đi. (Trong bài này chúng ta sẽ không nói về phần này).
{:.tpc__list}

## 2. Array Trong JavaScript
{:#array}

Trước khi bắt đầu với Observable, chúng ta sẽ ôn lại một số kiến thức về Array sẽ giúp ích trong việc tiếp cận Observable.

### 2.1 Array forEach
{:#array-foreach}

Array `forEach` là một trong các cách để ta có thể lặp qua lần lượt từng phần tử trong mảng.

```ts
const arr = [1, 2, 3, 4, 5];

arr.forEach((item, index) => {
  console.log(index + ' => ' + item);
});

```

Kết quả nhận được của chúng ta như sau:

```ts
"0 => 1"
"1 => 2"
"2 => 3"
"3 => 4"
"4 => 5"
```

Ngoại trừ một điểm chúng ta cần lưu ý khi các phần tử là kiểu reference thay vì kiểu primitive, thì `forEach` có thể khiến các phần tử của array ban đầu thay đổi giá trị.

```ts
const ref = [
  {
    value: 1
  }, {
    value: 2
  }, {
    value: 3
  }, {
    value: 4
  }, {
    value: 5
  }
];

ref.forEach((item, index) => {
  item.value++;
});

ref.forEach((item, index) => {
  console.log(index + ' => ' + item.value);
});
```

### 2.2 Array map
{:#array-map}

Array `map` cho phép chúng ta lặp qua tất cả các phần tử trong mảng, áp dụng một function nào đó lên các phần tử để biến đổi, sau đó trả về một mảng các giá trị sau khi thực hiện function.

```ts
const arr = [1, 2, 3, 4, 5];

const amp = arr.map((item, index) => {
  return item + 5 + index;
});

console.log(arr, amp);

// result

[1, 2, 3, 4, 5]
[6, 8, 10, 12, 14]
```

### 2.3 Array filter
{:#array-filter}

Array `filter` cho phép chúng ta lặp qua tất cả các phần tử trong mảng, áp dụng một function nào đó lên các phần tử để kiểm tra, sau đó trả về một mảng các giá trị sau khi thực hiện hàm kiểm tra mà thỏa mãn điều kiện (`return true`) và giữ nguyên mảng cũ không bị ảnh hưởng.

```ts
const arr = [1, 2, 3, 4, 5];

const amp = arr.filter((item, index) => {
  return (item + index) % 3 == 0;
});

console.log(arr, amp);

// result

[1, 2, 3, 4, 5]
[2, 5]
```

### 2.4 Array reduce
{:#array-reduce}

Method `reduce` cho phép chúng ta lặp qua tất cả các phần tử và áp dụng một function nào đó vào mỗi phần tử, function này có các tham số:

* `accumulator`: giá trị trả về từ các lần call callback trước.
* `currentValue`: giá trị của phần tử hiện tại trong array.
* `currentIndex`: index của phần tử hiện tại.
* `array`: chính là mảng hiện tại.
{:.tpc__list}

Ngoài ra, chúng ta còn có thể cung cấp giá trị ban đầu `initialValue` sau tham số function đầu tiên.

```ts
const arr = [1, 2, 3, 4, 5];

const val = arr.reduce((acc, current) => acc * current, 1);

console.log(val);

// result
120

```

### 2.5 Flatten Array
{:#flatten-array}

Trong nhiều tình huống, chúng ta có các array, bên trong mỗi phần tử có thể là các array khác, lúc này chúng ta có nhiệm vụ làm giảm số chiều (flatten) đi chẳng hạn, chúng ta có thể có đoạn code xử lý sau trong JavaScript.

```ts
Array.prototype.concatAll = function() {
  return [].concat.apply([], this);
};

const arr = [1, [2, 3], [4, 8, 0], [5]];

const flatten = arr.concatAll();

console.log(arr, flatten);

// result
[1, [2, 3], [4, 8, 0], [5]]
[1, 2, 3, 4, 8, 0, 5]

```

Như ở ví dụ trên, chúng ta flat mảng con 2 chiều thành 1 chiều, và chúng ta có thể flat nhiều lần để mỗi lần sẽ giảm đi 1 chiều.

Điều này các bạn sẽ hay gặp khi làm việc với Observable trả về Observable trong các phần tiếp theo.

## 3. Producer vs Consumer, Push vs Pull
{:#producer-consumer-push-pull}

> Pull and Push are two different protocols how a data Producer can communicate with a data Consumer.
> 

OK, chúng ta lại có một số khái niệm mới:

**Producer**: là nguồn sản sinh ra data.

**Consumer**: là nơi `chế biến` data sản sinh từ Producer.

**Pull systems**: Consumer sẽ quyết định khi nào lấy data từ Producer. Producer không quan tâm khi nào data sẽ được gửi đến cho Consumer.

Các `function` trong JavaScript là một Pull system. Khi nào lời gọi hàm thì khi đó mới xử lý. Gọi `n` lần thì xử lý `n` lần.

Lưu ý: function chỉ trả về 1 giá trị sau khi lời gọi hàm được thực hiện. (một mảng cũng chỉ coi là 1 giá trị, vì nó được trả về 1 lần).

**Push systems**: Producer sẽ quyết định khi nào gửi dữ liệu cho Consumer. Consumer không quan tâm khi nào nhận được data.

Promise, DOM events là các Push systems. Chúng ta register các callbacks và khi event phát sinh, các callbacks sẽ được gọi với dữ liệu từ Producer truyền vào.

Chúng ta có một bảng so sánh như sau:

&nbsp; | **Producer** | **Consumer**
---    | ---      | ---
**Pull** | **Passive**: produces data when requested. | **Active**: decides when data is requested.
**Push** | **Active**: produces data at its own pace. | **Passive**: reacts to received data.
{:class="table table-striped table-hover"}

Ví dụ:

**Pull**

```ts
const arr = [1, 2, 3, 4];
const iter = arr[Symbol.iterator]();

iter.next();

> {value: 1, done: false}

iter.next();

> {value: 2, done: false}

iter.next();

> {value: 3, done: false}

iter.next();

> {value: 4, done: false}

iter.next();

> {value: undefined, done: true}

```

**Push**

```ts
const button = document.querySelector('button');
button.addEventListener('click', () => console.log('Clicked!'));

```

## 4. Observable
{:#observable}

**Lưu ý, để code theo các ví dụ trong bài học này, bạn có thể clone bin sau**:

<a href="https://jsbin.com/zazacew/1/edit?js,console" target="_blank">Rxjs starter - jsbin</a>

Vậy Observable là gì?

**Observable** chỉ là một function (class) mà nó có một số yêu cầu đặc biệt. Nó nhận đầu vào là một Function, mà Function này nhận đầu vào là một Observer và trả về một function để có thể thực hiện việc cancel quá trình xử lý. Thông thường (Rxjs 5) chúng ta đặt tên function đó là `unsubscribe`.

**Observer**: một object có chứa các phương thức `next`, `error` và `complete` để xử lý dữ liệu tương ứng với các `signals` được gửi từ Observable.

> Observables are functions that tie an observer to a producer. That’s it. They don’t necessarily set up the producer, they just set up an observer to listen to the producer, and generally return a teardown mechanism to remove that listener. The act of subscription is the act of “calling” the observable like a function, and passing it an observer.
> 

Nói theo cách lý thuyết hơn:

> Observables are lazy Push collections of multiple values.

Như vậy, chúng ta có thể thấy Observable là lazy computation, giống như function, nếu chúng ta tạo chúng ra mà không gọi, thì không có gì thực thi cả.

Tạm thời bỏ qua các chi tiết về hàm `create` dưới đây, chúng ta sẽ gặp lại nó khi tìm hiểu về **Operator**:

```ts
function getDetail() {
  console.log('tiepphan.com');
  return 100;
}

const observable = Rx.Observable.create(function (observer) {
  console.log('Rxjs và Reactive Programming');
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

```


Đến đây, nếu chúng ta không gọi hàm `getDetail`, hoặc không `invoke` đến `observable` thì chẳng có gì xảy ra cả.

Để thực thi, chúng ta sẽ làm như sau:

```ts

const ret = getDetail();
console.log(ret);

// and

console.log('before subscribe');
observable.subscribe({
  next: val => console.log('next: ' + val),
  error: err => console.error('error: ' + err),
  complete: () => console.log('done'),
});
console.log('after subscribe');

```

Và sau đây là kết quả chúng ta nhận được:

```ts
"tiepphan.com"
100
"before subscribe"
"Rxjs và Reactive Programming"
"next: 1"
"next: 2"
"next: 3"
"after subscribe"
"next: 4"
"done"

```

Observable có thể deal với cả sync và async.

> Observables are able to deliver values either synchronously or asynchronously.
> 

## 5. Làm Quen Với Observable
{:#anatomy-observable}

Với Observable chúng ta sẽ quan tâm đến các thao tác như sau:

* **Creating** Observables
* **Subscribing** to Observables
* **Executing** the Observable
* **Disposing** Observables
{:.tpc__list}


### 5.1 Creating Observables
{:#creating-observables}

`Rx.Observable.create` là một operator, nó chỉ là một alias cho `Observable` constructor, chúng ta hoàn toàn có thể thay thế tương ứng bằng cách gọi constructor cũng cho kết quả tương tự.

Đầu vào của `constructor` yêu cầu một hàm gọi là `subscribe` mà hàm này có đầu vào là một `observer` object.

```ts
const observable = new Rx.Observable(function subscribe(observer) {
  const id = setInterval(() => {
    observer.next('Hello Rxjs');
  }, 1000);
});

// same

/*
const observable = Rx.Observable.create(function subscribe(observer) {
  const id = setInterval(() => {
    observer.next('Hello Rxjs');
  }, 1000);
});

*/

```

Bạn hoàn toàn có thể sử dụng `new` hoặc `Rx.Observable.create`.

Ngoài operator như `create`, Rxjs mang đến cho bạn nhiều lựa chọn khác nhau để tạo mới một Observable như các operators: `of`, `from`, `interval`, etc. Chúng được đặt trong nhóm **creation operators**.

Ví dụ, bạn muốn tạo Observable cho một mảng các giá trị, lúc này bạn không cần dùng `Rx.Observable.create` rồi lặp qua các phần tử, xong gọi `next` nữa. Rxjs có cách dùng khác, vì đây là một usecase rất hay dùng và `create` là một low-level API.

```ts
const arr = [1, 2, 3, 4];

const fromArrayObservable = Rx.Observable.from(arr);

```

### 5.2 Subscribing to Observables
{:#subscribing-observables}

Sau khi đã tạo xong một Observable, chúng ta cần `invoke` bằng cách `subscribe` vào như sau:

```ts
observable.subscribe(val => console.log(val));

```

> Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to.
> 

Vậy nên chúng ta call một function `n` lần, chúng ta sẽ có `n` lần thực thi. Tương tự như thế, khi chúng ta `subscribe` vào một Observable `m` lần, thì có `m` lần thực thi, một lời gọi `subscribe` giống như một cách để Observable bắt đầu thực thi.

### 5.3 Executing Observables
{:#executing-observables}

Phần code khi chúng ta khởi tạo Observable `Rx.Observable.create(function subscribe(observer) {...})` chính là "Observable execution". Giống như khai báo một function, phần code này để thực hiện một số hành động, xử lý nào đó; chúng là `lazy computation` - chỉ thực thi khi Observer thực hiện subscribe.

Có ba kiểu giá trị mà một Observable Execution có thể gửi đi:

* "Next" notification: gửi đi một giá trị, có thể là bất kỳ kiểu dữ liệu nào như Number, a String, an Object, etc.
* "Error" notification: gửi đi một JavaScript Error hoặc exception.
* "Complete" notification: không gửi đi một giá trị nào, nhưng nó gửi đi một tín hiệu để báo rằng stream này đã completed, mục đích để Observer có thể thực hiện một hành động nào đó khi stream completed.
{:.tpc__list}

Next notifications thường được sử dụng rộng rãi, nó cực kỳ quan trọng, vì nó gửi đi dữ liệu cần thiết cho một Observer.

Error và Complete notifications có thể chỉ xảy ra duy nhất một lần trong một **Observable Execution**.
Lưu ý rằng, chỉ có 1 trong 2 loại tín hiệu trên được gửi đi, nếu đã complete thì không có error, nếu có error thì không có complete. (Chúng không thuộc về nhau :D). Và nếu đã gửi đi complete, hoặc error signal, thì sau đó không có dữ liệu nào được gửi đi nữa. Tức là stream đã close.

> In an Observable Execution, zero to infinite Next notifications may be delivered. If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards.
> 

Ví dụ:

```ts
const observable = Rx.Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
  observer.next(4); // Is not delivered because it would violate the contract
});

```
Khi Subscribe vào observable được tạo ở trên, bạn có thể thấy được kết quả như sau:

```ts
observable.subscribe(
  val => console.log(val),
  err => console.log(err),
  () => console.log('done')
);

// result
1
2
3
"done"

```

Lưu ý rằng trong ví dụ trên, tôi đã `invoke` Observable bằng cách `subscribe` với 3 callbacks riêng biệt cho 3 loại signals tương ứng, về mặt xử lý phía sâu bên trong sẽ convert về Observer object có dạng.

```ts

const observer = {
  next: val => console.log(val),
  error: err => console.log(err),
  complete: () => console.log('done')
}

// sử dụng để subscribe

observable.subscribe(observer);

```

### 5.4 Disposing Observable Executions
{:#disposing-observables}

Bởi vì quá trình thực thi Observable có thể lặp vô hạn, hoặc trong trường hợp nào đó bạn muốn thực hiện hủy việc thực thi vì việc này không còn cần thiết nữa - dữ liệu đã lỗi thời, có dữ liệu khác thay thế. Các bạn có thể liên tưởng tới việc close websocket stream, removeEvenListener cho một element nào đó đã bị loại bỏ khỏi DOM chẳng hạn.

Observable có cơ chế tương ứng, cho phép chúng ta hủy việc thực thi. Đó là khi `subscribe` được gọi, một Observer sẽ bị gắn với một Observable execution mới được tạo, sau đó nó sẽ trả về một object thuộc type Subscription. Kiểu dữ liệu này có một method `unsubscribe` khi chúng ta gọi đến, nó sẽ thực hiện cơ chế để hủy việc thực thi.

Lưu ý: nếu bạn tạo Observable bằng `create` hoặc `new` thì bạn phải tự thiết lập cơ chế để hủy.

> When you subscribe, you get back a Subscription, which represents the ongoing execution. Just call unsubscribe() to cancel the execution.

Ví dụ:

```ts
const observable = Rx.Observable.create(function subscribe(observer) {
  
  let value = 0;
  // Keep track of the interval resource
  const intervalID = setInterval(() => {
    observer.next(value++);
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalID);
  };
});

const subscription = observable.subscribe(x => console.log(x));

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
```

## 6. Observer
{:#rxjs-observer}

Observer là một Consumer những dữ liệu được gửi bởi Observable. Observer là một object chứa một tập 3 callbacks tương ứng cho mỗi loại notification được gửi từ Observable: `next`, `error`, `complete`.

Một Observer có dạng như sau:

```ts
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

```

Observer được cung cấp là tham số đầu vào của `subscribe` để kích hoạt Observable execution.

```ts
observable.subscribe(observer);

```

> Observers are just objects with three callbacks, one for each type of notification that an Observable may deliver.

Observe có thể chỉ có một số callbacks trong bộ 3 callbacks kể trên (có thể là một object không có callback nào trong bộ kể trên, trường hợp này ít dùng đến).

Như tôi đã đề cập từ trước, `observable.subscribe` sẽ chuẩn hóa các callbacks thành Observer object tương ứng, **bạn có thể truyền vào các hàm rời rạc nhau, nhưng cần lưu ý truyền đúng thứ tự callback**.

```ts
observable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);

// tương đương với

const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

observable.subscribe(observer);

```

Lưu ý: Nếu bạn không muốn truyền error handler function vào, hãy truyền `null`/`undefined`:

```ts
observable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  null,
  () => console.log('Observer got a complete notification')
);

```

## 7. Subscription
{:#rxjs-subscription}

Subscription là một object đại diện cho một nguồn tài nguyên có khả năng hủy được, thông thường trong Rxjs là hủy Observable execution. Subscription có chứa một method quan trọng `unsubscribe` (từ Rxjs 5), khi method này được gọi, execution sẽ bị hủy.

Ví dụ: chúng ta có một đồng hồ đếm thời gian, mỗi giây sẽ gửi đi một giá trị, giả sử sau khi chạy 5s chúng ta cần hủy phần thực thi này.

```ts
const observable = Rx.Observable.interval(1000);
const subscription = observable.subscribe(x => console.log(x));

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

```

> A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions.

Một Subscription có thể chứa trong nó nhiều Subscriptions con, khi Subscription `unsubscribe`, các Subscriptions con cũng sẽ `unsubscribe`.

Ở Subscription cha, chúng ta có thể gọi method `add` để thêm các Subscriptions con mà phụ thuộc Subscription cha này.

```ts
const foo = Rx.Observable.interval(500);
const bar = Rx.Observable.interval(700);

const subscription = foo.subscribe(x => console.log('first: ' + x));
const childSub = bar.subscribe(x => console.log('second: ' + x));

subscription.add(childSub);

setTimeout(() => {
  // Unsubscribes BOTH subscription and childSub
  subscription.unsubscribe();
}, 2000);


```

## 8. Cold Observables vs Hot Observables
{:#rxjs-cold-hot-observables}

> Cold Observables: Producers created **inside**

Một observable là “cold” nếu Producer được tạo ra và quản lý bên trong nó.

Ví dụ:

```ts

const observable = Rx.Observable.create(observer => {
  let x = 5;
  observer.next(x);
  x += 10;
  setTimeout(() => {
	observer.next(x);
	observer.complete();
  }, 1000);
});

const observer = {
  next: value => console.log(value),
  complete: () => console.log('done')
};

observable.subscribe(observer);

setTimeout(() => {
  observable.subscribe(observer);
}, 1000);

```

Kết quả là sau 1s thì lần `subscribe` đầu tiên có in ra 15, và lần `subscribe` thứ 2 in ra 5. Chúng không có cùng giá trị của `x`.

Giờ thay đổi chút bằng việc move khai báo biến `x` ra ngoài `create`:

```ts

let x = 5;

const observable = Rx.Observable.create(observer => {
  observer.next(x);
  x += 10;
  setTimeout(() => {
	observer.next(x);
	observer.complete();
  }, 1000);
});

const observer = {
  next: value => console.log(value),
  complete: () => console.log('done')
};

observable.subscribe(observer);

setTimeout(() => {
  observable.subscribe(observer);
}, 1000);

```

Lần này, sau 1s thì cả 2 execution đều in ra giá trị là 15.

Đây chính là ví dụ về Hot Observables.

> Hot Observables: Producers created **outside**
> 


## 9. Subject
{:#rxjs-subject}

Giả sử chúng ta có đoạn code sau đây:

Ở đây mình mong muốn sau khi `observerBaz` chạy 1.5s thì `observerBar` sẽ nhận được giá trị hiện tại mà `observerBaz` đang nhận.

```ts
const foo = Rx.Observable.interval(500).take(5);

const observerBaz = {
  next: x => console.log('first next: ' + x),
  error: err => console.log('first error: ' + err),
  complete: _ => console.log('first done')
};

const observerBar = {
  next: x => console.log('second next: ' + x),
  error: err => console.log('second error: ' + err),
  complete: _ => console.log('second done')
};

foo.subscribe(observerBaz);

setTimeout(() => {
  foo.subscribe(observerBar);
}, 1500);

```

Kết quả khi chạy chương trình:

```ts
"first next: 0"
"first next: 1"
"first next: 2"
"second next: 0"
"first next: 3"
"second next: 1"
"first next: 4"
"first done"
"second next: 2"
"second next: 3"
"second next: 4"
"second done"

```

Oh well, `observerBaz` và `observerBar` tạo ra các execution khác nhau của riêng chúng, chúng ta không kết nối chúng đến với nhau theo cách trên được.

Có cách nào để share execution giữa nhiều Observers không?

Lúc này, chúng ta cần đến một object làm cầu nối ở giữa để làm nhiệm vụ tạo ra Observable execution và share dữ liệu ra cho những Observers khác.

OK, tiến hành thêm một số code nữa.


```ts
const foo = Rx.Observable.interval(500).take(5);

const observerB = {
  observers: [],
  addObserver: function(observer) {
    this.observers.push(observer);
  },
  
  // this part is an Observer
  next: function(x) {
    this.observers.forEach(observer => observer.next(x));
  },
  error: function(err) {
    this.observers.forEach(observer => observer.error(err));
  },
  complete: function() {
    this.observers.forEach(observer => observer.complete());
  }
};

const observerBaz = {
  next: x => console.log('first next: ' + x),
  error: err => console.log('first error: ' + err),
  complete: _ => console.log('first done')
};

const observerBar = {
  next: x => console.log('second next: ' + x),
  error: err => console.log('second error: ' + err),
  complete: _ => console.log('second done')
};

observerB.addObserver(observerBaz);

// only subscribe bridge observer
foo.subscribe(observerB);

setTimeout(() => {
  observerB.addObserver(observerBar);
}, 1500);

```

Object `observerB` có chưa method `addObserver` đây chính là khuôn mẫu của "Observer-Pattern".

Giờ đây chúng ta có thể có được kết quả như mong muốn.

```ts
"first next: 0"
"first next: 1"
"first next: 2"
"second next: 2"
"first next: 3"
"second next: 3"
"first next: 4"
"second next: 4"
"first done"
"second done"

```

Bây giờ, nếu chúng ta thay đổi một chút:

```ts
const foo = Rx.Observable.interval(500).take(5);

const observerB = {
  observers: [],
  subscribe: function(observer) {
    this.observers.push(observer);
  },
  
  // this part is an Observer
  next: function(x) {
    this.observers.forEach(observer => observer.next(x));
  },
  error: function(err) {
    this.observers.forEach(observer => observer.error(err));
  },
  complete: function() {
    this.observers.forEach(observer => observer.complete());
  }
};

const observerBaz = {
  next: x => console.log('first next: ' + x),
  error: err => console.log('first error: ' + err),
  complete: _ => console.log('first done')
};

const observerBar = {
  next: x => console.log('second next: ' + x),
  error: err => console.log('second error: ' + err),
  complete: _ => console.log('second done')
};

observerB.subscribe(observerBaz);

// only subscribe bridge observer
foo.subscribe(observerB);

setTimeout(() => {
  observerB.subscribe(observerBar);
}, 1500);

```

Giờ bạn có thể thấy, `observerB` trông giống như một Observable, nó lại còn giống như Observer, hơn nữa nó có thể gửi signals cho nhiều Observers mà nó đang quản lý. Đây chính là cấu trúc hybrid của Subject.

> A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.
> 

**Mỗi Subject là một Observable**: bạn có thể `subscribe` vào nó, cung cấp cho nó một Observer và bạn có thể nhận data tương ứng.

**Mỗi Subject là một Observer**: bên trong Subject có chứa các method `next`, `error`, `complete` tương ứng để bạn có thể `subscribe` vào Observable chẳng hạn.
Khi cần gửi dữ liệu cho các Observers mà Subject đang quản lý, bạn chỉ cần gọi hàm tương ứng.

Ví dụ:

```ts
const subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next('Hello');
subject.next('Subject');

// result
"observerA: Hello"
"observerB: Hello"
"observerA: Subject"
"observerB: Subject"

```

Hoặc truyền vào một Observable:

```ts
const subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// subject.next('Hello');
// subject.next('Subject');

const observable = Rx.Observable.interval(500).take(3);

observable.subscribe(subject);

// result
"observerA: 0"
"observerB: 0"
"observerA: 1"
"observerB: 1"
"observerA: 2"
"observerB: 2"

```

Với phương pháp kể trên, chúng ta đã cơ bản chuyển đổi từ một unicast Observable execution sang multicast, bằng cách sử dụng Subject.

**unicast**: giống như bạn vào Youtube, mở video nào đó đã được thu sẵn và xem, nó play từ đầu đến cuối video. Một người khác vào xem, Youtube cũng sẽ phát từ đầu đến cuối như thế, hai người không có liên quan gì về thời gian hiện tại của video mà mình đang xem.

**multicast**: cũng là hai người (có thể nhiều hơn) vào xem video ở Youtube, nhưng video đó đang phát Live (theo dõi một show truyền hình, hay một trận bóng đá Live chẳng hạn). Lúc này Youtube sẽ phát video Live, và những người vào xem video đó sẽ có cùng một thời điểm của video đó (cùng thời điểm của trận đấu đang diễn ra chẳng hạn).

### 9.1 BehaviorSubject
{:#rxjs-BehaviorSubject}

Một trong các biến thể của Subject đó là BehaviorSubject, nó là biến thế có khái niệm về "the current value". BehaviorSubject lưu trữ lại giá trị mới emit gần nhất để khi một Observer mới subscribe vào, nó sẽ emit giá trị đó ngay lập tức cho Observer vừa rồi.

> BehaviorSubjects are useful for representing "values over time". For instance, an event stream of birthdays is a Subject, but the stream of a person's age would be a BehaviorSubject.

Hay như sử dụng BehaviorSubject để chia sẻ thông tin user hiện tại đang đăng nhập hệ thống cho các component khác nhau trong Angular chẳng hạn.

Lưu ý: BehaviorSubject yêu cầu phải có giá trị khởi tạo khi tạo ra subject.


```ts

const subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);

//result
observerA: 0
observerA: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3

```

### 9.2 ReplaySubject
{:#rxjs-ReplaySubject}

Một ReplaySubject tương tự như một BehaviorSubject khi nó có thể gửi những dữ liệu trước đó cho Observer mới subscribe, nhưng nó có thể lưu giữ nhiều giá trị (có thể là toàn bộ giá trị của stream từ thời điểm ban đầu).

Tham số đầu vào của ReplaySubject có thể là:

buffer: là số lượng phần tử tối đa có thể lưu trữ.

windowTime: (ms) thời gian tối đa tính đến thời điểm gần nhất emit value.


```ts
const subject = new Rx.ReplaySubject(3); // buffer 3 values for new subscribers

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);

// result
"observerA: 1"
"observerA: 2"
"observerA: 3"
"observerA: 4"
"observerB: 2"
"observerB: 3"
"observerB: 4"
"observerA: 5"
"observerB: 5"

```

Hoặc kết hợp buffer với windowTime:

```ts
const subject = new Rx.ReplaySubject(100, 500 /* windowTime */);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

let i = 1;
const id = setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 1000);

setTimeout(() => {
  subject.complete();
  clearInterval(id);
}, 2000);

// result
"observerA: 1"
"observerA: 2"
"observerA: 3"
"observerA: 4"
"observerA: 5"
"observerB: 3"
"observerB: 4"
"observerB: 5"
"observerA: 6"
"observerB: 6"
...

```

Trong ví dụ trên sau 1s chỉ có giá trị 3, 4 và 5 là được emit trong 500ms gần nhất và nằm trong buffer nên được replay lại cho `observerB`.

### 9.3 AsyncSubject
{:#rxjs-AsyncSubject}

Đây là biến thể mà chỉ emit giá trị cuối cùng của Observable execution cho các observers, và chỉ khi execution complete.

Lưu ý:

Nếu stream không complete thì không có gì được emit cả.


```ts
const subject = new Rx.AsyncSubject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);
subject.complete();

// result
"observerA: 5"
"observerB: 5"

```

### 9.4 Subject Complete
{:#rxjs-SubjectComplete}

Khi BehaviorSubject complete, thì các Observers subscribe vào sau đó sẽ chỉ nhận được `complete` signal.

Khi ReplaySubject complete, thì các Observers subscribe vào sau đó sẽ được emit tất cả các giá trị lưu trữ trong buffer, sau đó mới thực thi `complete` của Observer.

Kể cả khi AsyncSubject complete rồi, Observer vẫn có thể subscribe vào được và vẫn nhận giá trị cuối cùng.

```ts
const subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v),
  complete: () => console.log('observerA: done')
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v),
  complete: () => console.log('observerB: done')
});

subject.next(3);

subject.complete();

subject.subscribe({
  next: (v) => console.log('observerC: ' + v),
  complete: () => console.log('observerC: done')
});

// result
"observerA: 0"
"observerA: 1"
"observerA: 2"
"observerB: 2"
"observerA: 3"
"observerB: 3"
"observerA: done"
"observerB: done"
"observerC: done"
// ===========================================

const subject = new Rx.ReplaySubject(3);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v),
  complete: () => console.log('observerA: done')
});

let i = 1;
const id = setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.complete();
  clearInterval(id);
  subject.subscribe({
    next: (v) => console.log('observerB: ' + v),
    complete: () => console.log('observerB: done')
  });
}, 1000);

// result
"observerA: 1"
"observerA: 2"
"observerA: 3"
"observerA: 4"
"observerA: 5"
"observerA: done"
"observerB: 3"
"observerB: 4"
"observerB: 5"
"observerB: done"

// ===========================================

const subject = new Rx.AsyncSubject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v),
  complete: () => console.log('observerA: done')
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);
subject.next(5);

subject.complete();

subject.subscribe({
  next: (v) => console.log('observerB: ' + v),
  complete: () => console.log('observerB: done')
});

// result
"observerA: 5"
"observerA: done"
"observerB: 5"
"observerB: done"

```

## 10. Operators
{:#rxjs-Operators}

Trong Rxjs chúng ta thấy có vô số các method/static method được cung cấp, khiến nó trở nên vô cùng mạnh mẽ và hữu dụng.

Vậy Operator là gì?

> An Operator is a function which creates a new Observable based on the current Observable. This is a pure operation: the previous Observable stays unmodified.

Operator là một pure function. Với cùng một giá trị đầu vào, chúng ta sẽ luôn có cùng một giá trị ở đầu ra.

Ví dụ:

```ts
// pure function
function add(a, b) {
  return a + b;
}

add(5, 6); // 11
add(5, 6); // 11

// impure function

let x = 0;
function addImpure(a, b) {
  x++;
  return a + b + x;
}

addImpure(5, 6); // 12
addImpure(5, 6); // 13

```

Operator nhận đầu vào là một Observable, sau đó xử lý và tạo mới mội Observable để trả về, và giữ Observable đầu vào không bị thay đổi gì.

Ví dụ, chúng ta tạo một Operator nhận đầu vào là một function, giống như Array `map` chẳng hạn.

```ts
function map(observable, fn) {
  const output = Rx.Observable.create(observer => {
    observable.subscribe({
      next: x => observer.next(fn(x)),
      error: err => observer.error(err),
      complete: () => observer.complete()
    });
  });
  
  return output;
}
```

Bây giờ chúng ta có thể tạo một Observable như sau:

```ts
const foo = Rx.Observable.interval(500).take(5);

const amap = map(foo, val => val * 5);

const observerM = {
  next: x => console.log('next: ' + x),
  error: err => console.log('error: ' + err),
  complete: _ => console.log('done')
};

amap.subscribe(observerM);

// result
"next: 0"
"next: 5"
"next: 10"
"next: 15"
"next: 20"
"done"

```

### 10.1 Instance operators vs static operators
{:#InstancevsStaticOperators}

Thông thường **static operators** là các operators được gắn với `class` Observable, chúng được dùng phổ biến để tạo mới Observable.

Ví dụ như các operator `of`, `from`, `interval`, `fromPromise`, `empty`, etc.

**Instance operators**: các operators này gắn với một instance của `class` Observable.

Giả sử chúng ta tạo operator `mmap` như sau, thì kết quả cũng được tương tự như trên:

```ts
Rx.Observable.prototype.mmap = function map(fn) {
  const observable = this;
  const output = Rx.Observable.create(observer => {
    observable.subscribe({
      next: x => observer.next(fn(x)),
      error: err => observer.error(err),
      complete: () => observer.complete()
    });
  });
  
  return output;
}

// invoke

const amap = foo.mmap(val => val * 5);

const observerM = {
  next: x => console.log('next: ' + x),
  error: err => console.log('error: ' + err),
  complete: _ => console.log('done')
};

amap.subscribe(observerM);

```

> Instance operators are functions that use the this keyword to infer what is the input Observable.
> 
> Static operators are pure functions attached to the Observable class, and usually are used to create Observables from scratch.

Operators được chia vào nhiều nhóm khác nhau, mỗi nhóm có một mục đích sử dụng:

* Creation Operators.
* Transformation Operators.
* Filtering Operators.
* Combination Operators.
* Error Handling Operators.
* Utility Operators.
* Multicasting Operators.
* Conditional and Boolean Operators.
* Mathematical and Aggregate Operators
{:.tpc__list}

Sau đây chúng ta sẽ tìm hiểu một số operators chính hay dùng đến.

### 10.2 Creation Operators
{:#rxjs-CreationOperators}

Từ đầu đến giờ chúng ta đã quen với sử dụng `create` operator để tạo ra Observable, ngoài ra chúng ta còn có một số operators khác để tạo Observable từ những common usecase.

Ví dụ để tạo Observable từ một số static values, chúng ta có thể dùng `of`:

```ts
const foo = Rx.Observable.of(100);

foo.subscribe(x => console.log(x)); // 100

```

Hoặc có thể dùng `of` với nhiều tham số đầu vào:

```ts
const foo = Rx.Observable.of(100, 200, 400);

```

Lưu ý: với các static values như ví dụ trên, chúng được gửi đi sync. (mặc đinh nếu không có tác động của Scheduler).

Sau khi gửi đi hết dữ liệu, nó sẽ gửi `complete` signal.

Một số operators tương tự:

* interval: thay vì tự tạo interval với setInterval, chúng ta dùng operator này cho mục đích tương tự.
* timer: giống như setTimeout, sau một khoảng thời gian nào đó thì emit value.
* throw: để bắn ra error.
* empty: không gửi gì khác ngoài `complete` signal.
* never: không gửi bất kỳ loại signals nào.
{:.tpc__list}

**Tổng quát cho các loại event** thì chúng ta có `fromEventPattern`:

> Converts any addHandler/removeHandler API to an Observable.

Ví dụ:

```ts

function addClickHandler(handler) {
  document.addEventListener('click', handler);
}

function removeClickHandler(handler) {
  document.removeEventListener('click', handler);
}

var clicks = Rx.Observable.fromEventPattern(
  addClickHandler,
  removeClickHandler
);
clicks.subscribe(x => console.log(x));

```

**Để làm việc với DOM event** chúng ta có `fromEvent` operator, nó là bản chi tiết của `fromEventPattern`:

```ts
const source = Rx.Observable.fromEvent(document, 'click');

const foo = source.map(event => event.clientX)

const subscribe = foo.subscribe(val => console.log(val));

```

Khi click vào trang web, chúng ta có thể thấy console hiển thị tọa độ X ra.

**Để convert từ Promise sang Observable** chúng ta có `fromPromise` operator:

```ts

function getInfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        site: 'tiepphan.com',
        post: 'Rxjs và Reactive Programming'
      });
    }, 300);
  });
}

const source = Rx.Observable.fromPromise(getInfo());

const subscribe = source.subscribe(val => console.log(val));

// result after 300ms
[object Object] {
  post: "Rxjs và Reactive Programming",
  site: "tiepphan.com"
}

```

**Tạo mới một Observable từ Array, array-like object, Promise, iterable object, hoặc Observable-like object** chúng ta dùng `from` operator:

```ts
const array = [5, 10, 15];
const source = Rx.Observable.from(array);
source.subscribe(x => console.log(x));

// result
5
10
15

```

**repeat**: `repeat(count: number): Observable`
Repeat khi nào Observable complete, có thể giới hạn số lần repeat.

```ts
const array = [5, 10, 15];
const source = Rx.Observable.from(array).repeat(2);
source.subscribe(x => console.log(x));

// result
5
10
15
5
10
15

```

Còn nhiều các operators khác nữa như `repeatWhen`, các bạn vào trang chủ của ReactiveX để xem thêm.

### 10.3 Transformation Operators
{:#rxjs-TransformationOperators}

Transformation Operators dùng để chuyển đổi giá trị của Observable từ dạng này sang sang dạng khác.

Hay gặp nhất có lẽ là `map`, nó tương tự như `mmap` operator mà chúng ta đã tạo ở trên (tạo để tìm hiểu cơ chế hoạt động).

```ts
//emit (1,2,3,4,5)
const source = Rx.Observable.from([1,2,3,4,5]);
//add 10 to each value
const example = source.map(val => val + 10);
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));

```

Các bạn có thể dùng `map` để chuyển đổi theo bất kỳ yêu cầu nào của các bạn. Ví dụ khi làm việc với Response object của HTTP, lúc này các bạn có thể convert từ JSON thành object như sau:

```ts
this.http.get(API_ENDPOINT) // return Observable
  .map(res => res.json());

```

Khi bạn muốn luôn luôn trả về 1 giá trị cho các giá trị được emit, lúc này bạn có thể dùng `mapTo` operator.

```ts
//emit every click on document
const source = Rx.Observable.fromEvent(document, 'click');
//map all emissions to one value
const example = source.mapTo(10);
//output: (click) 10...10...
const subscribe = example.subscribe(val => console.log(val));

```

**scan**: `scan(accumulator: function, seed: any): Observable`

Giống như Array `reduce`.

```ts
//emit array as a sequence of values
const arraySource = Rx.Observable.from([1,2,3,4,5]);

const source = arraySource.scan( (acc, current) => acc + current, 0);

const subscribe = source.subscribe(val => console.log(val));

// result
1
3
6
10
15

```

**buffer**: `buffer(closingNotifier: Observable): Observable`

Lưu trữ giá trị được emit ra và đợi đến khi `closingNotifier` emit thì emit những giá trị đó thành 1 array.

```ts
const interval$ = Rx.Observable.interval(1000);

const click$ = Rx.Observable.fromEvent(document, 'click');

const buffer$ = interval$.buffer(click$);


const subscribe = buffer$.subscribe(
  val => console.log('Buffered Values: ', val)
);

// output có dạng
"Buffered Values: "
[0, 1]
"Buffered Values: "
[2, 3, 4, 5, 6]

```

**bufferTime**: `bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, scheduler: Scheduler): Observable`

Tương tự như `buffer`, nhưng emit values mỗi khoảng thời gian `bufferTimeSpan` ms.

```ts
const source = Rx.Observable.interval(500);

const bufferTime = source.bufferTime(2000);

const bufferTimeSub = bufferTime.subscribe(
  val => console.log('Buffered with Time:', val)
);
// output
"Buffered with Time:"
[0, 1]
"Buffered with Time:"
[2, 3]
"Buffered with Time:"
[4, 5]
...

```

Ngoài ra còn rất nhiều operators khác như `buffer`, và một số Operators chúng ta sẽ tìm hiểu ở phần sau "Higher Order Observables".

### 10.4 Filtering Operators
{:#rxjs-FilteringOperators}

Filtering Operators mục đích để filter các giá trị được emit thỏa mãn điều kiện nào đó.

**filter**: `filter(select: Function, thisArg: any): Observable`

Giống như Array filter, operator này chỉ emit các value thỏa mãn `select` function. Nếu không có phần tử nào thỏa mãn thì không emit giá trị `next` nào cả.


```ts
const source = Rx.Observable.from([12, -22, -3, 45, 52]);

const filter$ = source.filter(num => num > 0);

const subscribe = filter$.subscribe(
  val => console.log(`Positive number: ${val}`)
);
// output
"Positive number: 12"
"Positive number: 45"
"Positive number: 52"

```

**take**: `take(count: number): Observable`

Emit tối đa `count` giá trị, rồi complete.

```ts
const source = Rx.Observable.of(1,2,3,4,5);

const take$ = source.take(3);

const subscribe = take$.subscribe(val => console.log(val));

// output
1
2
3

```

**takeUntil**: `takeUntil(notifier: Observable): Observable`

Emit value cho đến khi `notifier` emit thì dừng.

Rất hữu ích khi làm việc với Angular, các bạn có thể sử dụng để tạo ra trình auto-unsubscribe cho Observable. Vì khi complete thì nó tự `unsubscribe`.

```ts
//emit value every 1s
const source = Rx.Observable.interval(1000);
//after 5 seconds, emit value
const timer = Rx.Observable.timer(5000);
//when timer emits after 5s, complete source
const takeUntil$ = source.takeUntil(timer);

const subscribe = takeUntil$.subscribe(
  val => console.log(val)
);

// output
0
1
2
3

```

**takeWhile**: `takeWhile(predicate: function(value, index): boolean): Observable`

Còn emit value khi mà `predicate` còn trả về `false`. Một khi `predicate` trả về `true` thì dừng lại, complete.

```ts
//emit value start from 0 each 500ms
const source = Rx.Observable.interval(500);
//allow values until value from source is greater than 4, then complete
const takeWhile$ = source.takeWhile(val => val <= 4);

const subscribe = takeWhile$.subscribe(
  val => console.log(val)
);

// output
0
1
2
3
4

```

**skip**: `skip(num: Number): Observable`

Skip số lượng phần tử từ đầu stream đến `num`, các giá trị emit sau đó mới được emit.

```ts
//emit every 500ms
const source = Rx.Observable.interval(500);
//skip the first 5 emitted values, then take 4 values
const skip$ = source.skip(5)
  .take(4);

const subscribe = skip$.subscribe(val => console.log(val));

//output:
5
6
7
8

```

Tương tự như `takeUntil`, `takeWhile`, nhưng hành động skip thay vì take, chúng ta cũng có `skipUntil`, `skipWhile`

`take(1)` chúng ta có một cách viết khác `first`:

`first(predicate: function, select: function)`

Nếu không truyền vào `predicate` thì nó sẽ lấy phần tử đầu tiên, ngược lại sẽ lấy phần tử đầu tiên thỏa mãn `predicate`.

```ts
const source = Rx.Observable.from([1,2,3,4,5]);
// no arguments, emit first value
const first$ = source.first();

const subscribe = first$.subscribe(
  val => console.log(`First value: ${val}`)
);

// output
"First value: 1"

```

Ngược lại với `first` chúng ta sẽ có `last`: `last(predicate: function): Observable`.

```ts
const source = Rx.Observable.from([1,2,3,4,5]);
// no arguments, emit last value
const last$ = source.last();

const subscribe = last$.subscribe(
  val => console.log(`Last value: ${val}`)
);
// output
"Last value: 5"

```


**throttleTime**: `throttleTime(duration: number, scheduler: Scheduler): Observable`

Emit giá trị mới nhất khi một khoảng thời gian `duration` trôi qua.

```ts
// emit value every 1 second
const source = Rx.Observable.interval(1000);
/*
  throttle for five seconds
  last value emitted before throttle ends will be emitted from source
*/
const example = source
  .throttleTime(5000);

const subscribe = example.subscribe(val => console.log(val));

// output
0
6
12
...

```

Rất hữu ích khi làm việc với các event fire liên tục như `click`, hay `mousemove` chẳng hạn.

```ts
const mousemove$ = Rx.Observable.fromEvent(document, 'mousemove');

const sub = mousemove$
  .map(e => e.clientX)
  .subscribe(x => console.log(x));

```

Sử dụng với `throttleTime` để hạn chế event fire quá nhiều. Cứ sau 300ms thì emit giá trị mới nhất có được.

```ts
const sub = mousemove$
  .throttleTime(300)
  .map(e => e.clientX)
  .subscribe(x => console.log(x));

```

**debounceTime**: `debounceTime(dueTime: number, scheduler: Scheduler): Observable`

> Discard emitted values that take less than the specified time between output
> 

Hay dùng khi bạn muốn đảm bảo người dùng thôi thao tác sau một khoảng thời gian `dueTime` thì emit giá trị. Giống như đảm bảo người dùng ngừng di chuyển chuột, hay ngừng gõ vào input chẳng hạn, để tránh phát sinh nhiều hành động không cần thiết.

```ts
const mousemove$ = Rx.Observable.fromEvent(document, 'mousemove');

const sub = mousemove$
  .debounceTime(300)
  .map(e => e.clientX)
  .subscribe(x => console.log(x));
```

**distinctUntilChanged**: `distinctUntilChanged(compare: function): Observable`

Chỉ emit value khi giá trị hiện tại khác với giá trị đã emit trước đó. Hay dùng để đảm bảo dữ liệu phải khác nhau thì mới thực thi hành động. Kết hợp cùng `debounceTime` hoặc `throttleTime` để làm việc khi người dùng nhập vào input, sau đó xử lý giá trị, và chỉ xử lý khi dữ liệu hiện tại khác với dữ liệu đã xử lý trước đó.

```ts
const mousemove$ = Rx.Observable.fromEvent(document, 'click');

const sub = mousemove$
  .debounceTime(300)
  .map(e => e.clientX)
  .distinctUntilChanged()
  .subscribe(x => console.log(x));

```

Khi bạn không di chuyển chuột mà click liên tục thì không có gì được emit cả.

Trên đây chỉ là một số Filter Operators hay dùng, các bạn có thể vào trang chủ của ReactiveX để tìm hiểu thêm những operators như `debounce`, `throttle`, etc.

### 10.5 Combination Operators
{:#rxjs-CombinationOperators}

Combination Operators: sử dụng để kết hợp các Observables lại với nhau.

**merge**: có thể sử dụng cả instance và static operator. Dùng để merge nhiều Observables thành một Observable.

`Rx.Observable.merge(observables: ...ObservableInput, concurrent: number): Observable`

`merge(input: Observable, concurrent: number): Observable`

`concurrent`: số lượng stream được phép chạy đồng thời.

![rxjs merge](/assets/uploads/2017/09/rxjs-merge.png)


```ts
const s1 = Rx.Observable.interval(300).take(5)
  .map(x => `s1: ${x}`);

const s2 = Rx.Observable.interval(500).take(3)
  .map(x => `s2: ${x}`);

const s3 = Rx.Observable.interval(700).take(2)
  .map(x => `s3: ${x}`);

const source = Rx.Observable.merge(
  s1,
  s2,
  s3
);

const sub = source
  .subscribe(x => console.log(x));

// output
"s1: 0"
"s2: 0"
"s1: 1"
"s3: 0"
"s1: 2"
"s2: 1"
"s1: 3"
"s3: 1"
"s1: 4"
"s2: 2"

```

Lúc này cả 3 cùng chạy đồng thời, nếu bạn muốn dùng instance operator thì thay như sau:

```ts
const source = s1.merge(s2, s3);

const sub = source
  .subscribe(x => console.log(x));

```

Giả sử bạn muốn chỉ 2 stream được chạy đồng thời:

```ts
const s1 = Rx.Observable.interval(300).take(5)
  .map(x => `s1: ${x}`);

const s2 = Rx.Observable.interval(500).take(3)
  .map(x => `s2: ${x}`);

const s3 = Rx.Observable.interval(700).take(2)
  .map(x => `s3: ${x}`);

const source = Rx.Observable.merge(
  s1,
  s2,
  s3,
  2
);

// const source = s1.merge(s2, s3, 2);

const sub = source
  .subscribe(x => console.log(x));
// output
"s1: 0"
"s2: 0"
"s1: 1"
"s1: 2"
"s2: 1"
"s1: 3"
"s1: 4"
"s2: 2"
"s3: 0"
"s3: 1"

```

`s3` sẽ đợi cho `s1`, `s2` complete rồi mới bắt đầu chạy.

**concat**: trong trường hợp bạn chỉ muốn 1 stream được chạy, các stream khác phải đợi stream trước complete.

Tương đương với `merge(...observables, 1)`. Giống như Array `concat` vậy.

```ts
const source = Rx.Observable.merge(
  s1,
  s2,
  s3,
  1
);

const csource = Rx.Observable.concat(
  s1,
  s2,
  s3
);

// output
"s1: 0"
"s1: 1"
"s1: 2"
"s1: 3"
"s1: 4"
"s2: 0"
"s2: 1"
"s2: 2"
"s3: 0"
"s3: 1"

```

Trong nhiều trường hợp bạn muốn tạo ra 1 Observable cho 1 giá trị, rồi dùng nó `concat` với một số Observables khác, lúc này chúng ta có một cách viết gọn hơn sử dụng `startWith` với cú pháp `startWith(an: Values): Observable`.

```ts

//emit (1,2,3)
const source = Rx.Observable.of(1, 2, 3);
//start with 0
const stream =  source.startWith(0);

const subscribe = stream.subscribe(val => console.log(val));

//output: 0,1,2,3

```

**combineLatest**: `combineLatest(observables: ...Observable, project: function): Observable`

combineLatest Operator có thể dùng cả static và instance.

Mỗi khi một Observable emit value, emit giá trị mới nhất từ tất cả `observables`, nhưng phải thỏa mãn các Observable khác cũng đã emit value.

Như trong ví dụ sau, khi `source` emit value, nó emit giá trị của `s1` lúc này là `2`, nhưng `s3` lúc này mới emit value đầu tiên.

```ts
const s1 = Rx.Observable.interval(300).take(5)
  .map(x => `s1: ${x}`);

const s2 = Rx.Observable.interval(500).take(3)
  .map(x => `s2: ${x}`);

const s3 = Rx.Observable.interval(1000).take(2)
  .map(x => `s3: ${x}`);


const source = Rx.Observable.combineLatest(
  s1,
  s2,
  s3
);

const sub = source
  .subscribe(x => console.log(x));

// output
["s1: 2", "s2: 1", "s3: 0"]
["s1: 3", "s2: 1", "s3: 0"]
["s1: 4", "s2: 1", "s3: 0"]
["s1: 4", "s2: 2", "s3: 0"]
["s1: 4", "s2: 2", "s3: 1"]

```

Hoặc trường hợp bạn muốn xử lý giá trị trước bằng `project` function:

```ts
const source = Rx.Observable.combineLatest(
  s1,
  s2,
  s3,
  (a, b, c) => (a + '|' + b + '|' + c)
);

const sub = source
  .subscribe(x => console.log(x));

// output
"s1: 2|s2: 1|s3: 0"
"s1: 3|s2: 1|s3: 0"
"s1: 4|s2: 1|s3: 0"
"s1: 4|s2: 2|s3: 0"
"s1: 4|s2: 2|s3: 1"

```

![rxjs combineLatest](/assets/uploads/2017/09/rxjs-combineLatest.png)


**withLatestFrom**: `withLatestFrom(other: Observable, project: Function): Observable`

Lưu ý: chỉ có thể sử dụng instance operator với **withLatestFrom**.

Sử dụng để emit value của Observable này `this` kết hợp với latest value của `other` Observable, nếu `other` chưa emit gì thì `this` có emit value cũng không emit gì cả.

![rxjs withLatestFrom](/assets/uploads/2017/09/rxjs-withLatestFrom.png)


```ts

const s1 = Rx.Observable.interval(200).take(10)
  .map(x => `s1: ${x}`);

const s2 = Rx.Observable.interval(500).take(4)
  .map(x => `s2: ${x}`);


const source = s1.withLatestFrom(
  s2,
  (a, b) => (a + '|' + b)
);

const sub = source
  .subscribe(x => console.log(x));

// output
"s1: 2|s2: 0"
"s1: 3|s2: 0"
"s1: 4|s2: 1"
"s1: 5|s2: 1"
"s1: 6|s2: 1"
"s1: 7|s2: 2"
"s1: 8|s2: 2"
"s1: 9|s2: 3"

```

Stream `s1` bị phụ thuộc vào `s2` trong giai đoạn đầu tiên, vì khi đó `s2` chưa emit gì, nên `s1` cũng không emit, đến khi `s2` bắt đầu emit thì những lần emit sau đó của `s1` sẽ kết hợp với giá trị mới nhất của `s2`.

Nếu bạn muốn mỗi khi có giá trị của stream emit thì emit giá trị mới nhất của các stream khác, lúc này bạn nên dùng `combineLatest`.
Chẳng hạn, bạn có search box với `n` fields để thiết lập điều kiện, và khi mỗi field thay đổi thì sẽ lấy danh sách mới dựa theo list các điều kiện kia chẳng hạn.

**forkJoin**: `forkJoin(...observables, selector : function): Observable`

Khi tất cả các Observables complete, emit giá trị cuối cùng của mỗi Observable.

Lưu ý: nếu còn một stream không complete, hoặc 1 stream không emit value nào `empty` thì không có gì được emit cả.

Chỉ có thể sử dụng static operator.

```ts
const s1 = Rx.Observable.interval(200).take(10)
  .map(x => `s1: ${x}`);

const s2 = Rx.Observable.interval(500).take(4)
  .map(x => `s2: ${x}`);


const source = Rx.Observable.forkJoin(
  s1,
  s2,
  (a, b) => (a + '|' + b)
);

const sub = source
  .subscribe(x => console.log(x));

// output
"s1: 9|s2: 3"

```

Không emit gì cả ngoài `complete`:

```ts
const s1 = Rx.Observable.interval(200).take(10)
  .map(x => `s1: ${x}`);

const s2 = Rx.Observable.interval(500).take(2)
  .map(x => `s2: ${x}`);
const s3 = Rx.Observable.empty();


const source = Rx.Observable.forkJoin(
  s1,
  s2,
  s3,
  (a, b) => (a + '|' + b)
);

const sub = source
  .subscribe(
    x => console.log(x),
    null,
    () => console.log('complete')
);

// output
"complete"

```

**zip**: `zip(observables: *): Observable`

Sau khi tất cả Observables emit value, thì emit 1 mảng các giá trị tương ứng (cùng index). Nếu một phần tử không emit gì cả `never`, hoặc complete ngay `empty`, thì không có gì emit cả. Trường hợp `empty` thì chỉ send `complete` signal.

> The zip operator will subscribe to all inner observables, waiting for each to emit a value. Once this occurs, all values with the corresponding index will be emitted. This will continue until at least one inner observable completes.

![rxjs zip](/assets/uploads/2017/09/rxjs-zip.png)


```ts
const s1 = Rx.Observable.interval(200).take(10)
  .map(x => `s1: ${x}`);

const s2 = Rx.Observable.interval(500).take(3)
  .map(x => `s2: ${x}`);


const source = Rx.Observable.zip(
  s1,
  s2,
);

const sub = source
  .subscribe(
    x => console.log(x),
    null,
    () => console.log('complete')
  );

// output
["s1: 0", "s2: 0"]
["s1: 1", "s2: 1"]
["s1: 2", "s2: 2"]
"complete"

```

### 10.5 Error Handling Operators
{:#rxjs-ErrorHandlingOperators}

Error Handling Operators sử dụng để handle error trong ứng dụng của bạn.

**catch**: `catch(project : function): Observable`

Thường được sử dụng rộng rãi để handle error.

Ví dụ:

```ts
//emit error
const source = Rx.Observable.throw('This is an error!');
//gracefully handle error, returning observable with error message
const example = source.catch(val => Rx.Observable.of(`I caught: ${val}`));

const subscribe = example.subscribe(val => console.log(val));

//output:
'I caught: This is an error'

```

**retry**: `retry(num: number): Observable`

Sử dụng để restart lại stream trong trường hợp stream bị văng ra lỗi. Có thể giới hạn số lần retry bằng cách truyền vào tham số. Nếu không truyền vào, sẽ  luôn retry mỗi khi lỗi văng ra.

Chẳng hạn khi bạn reqest lên server để lấy dữ liệu, giả sử trong quá trình này bạn muốn request lại 2 lần nếu bị văng ra lỗi.

```ts
//emit value every 1s
const source = Rx.Observable.interval(1000);
const example = source
  .mergeMap(val => {
    //throw error for demonstration
    if(val > 5){
      return Rx.Observable.throw('Error!');
    }
    return Rx.Observable.of(val);
  })
  //retry 2 times on error
  .retry(2);
const subscribe = example
  .subscribe({
     next: val => console.log(val),
     error: val => console.log(`${val}: Retried 2 times then quit!`)
});

// output: 
"0..1..2..3..4..5..."
"0..1..2..3..4..5..."
"0..1..2..3..4..5..."
"Error!: Retried 2 times then quit!"

```

**retryWhen**: `retryWhen(receives: (errors: Observable) => Observable, the: scheduler): Observable`

Retry một Observable dựa vào một `errors` Observable emit value. `errors` Observable này chỉ emit `next` khi `source` Observable văng ra error, khi đó chúng ta có thể xác định khi nào lại subscribe vào `source` Observable lần nữa.

```ts
const source = Rx.Observable.interval(1000);
const retryWhen$ = source
  .map(val => {
    if(val > 5){
     //error will be picked up by retryWhen
     throw val;
    }
    return val;
  })
  .retryWhen(errors => errors.delay(500));

const subscribe = retryWhen$.subscribe(
  val => console.log(val)
);

// output
0
1
2
3
4
5
// error then wait 500ms
0
1
2
3
...

```

### 10.6 Utility Observables
{:#rxjs-UtilityOperators}

**do**: `do(nextOrObserver: function, error: function, complete: function): Observable`

Dùng để thực hiện một hành động nào đó, và đảm bảo side-effect không ảnh hưởng tới source. Như ví dụ dưới đây, chúng ta đã thực hiện update value cho `val` trong `do`, nhưng không bị ảnh hưởng gì.

```ts
const source = Rx.Observable.of(1, 2, 3);

const foo$ = source
  .do(function(val) {
    console.log(`BEFORE: ${val}`);
    
    // do some stuff
    val++;
    return val;
  })
  .map(
    val => val + 10
  );

const subscribe = foo$.subscribe(val => console.log(val));

// output
"BEFORE MAP: 1"
11
"BEFORE MAP: 2"
12
"BEFORE MAP: 3"
13

```

**delay**: `delay(delay: number | Date, scheduler: Scheduler): Observable`

Delay emit value theo một khoảng thời gian cho trước.

Ví dụ chúng ta muốn delay 1s rồi mới bắt đầu emit value cho stream sau:

```ts

const source = Rx.Observable.of(1, 2, 3);

const foo$ = source.delay(1000);

foo$.subscribe(x => console.log(x));

```

Và còn nhiều operators khác như `toPromise` trên trang chủ của ReactiveX.

### 10.7 Higher Order Observables
{:#rxjs-HigherOrderOperators}

Higher Order Observable (HOO) là một Observable trả về một Observable, nó giống như mảng nhiều chiều vậy - mảng 2 chiều chứa trong nó các mảng 1 chiều.

Ví dụ:

```ts

const interval = Rx.Observable.interval(500).take(4);
const source = Rx.Observable.of(1, 2, 3);

const foo$ = interval.map(x => source);

foo$.subscribe(result => {
  result.subscribe(val => console.log(val));
});

```

Oh, nhìn thế này không ổn, phải có cách nào khác. Hãy quay lại ví dụ flatten Array ở trên, Observable cũng cung cấp cho chúng ta giải pháp để thực hiện flatten HOO.

**mergeMap**: `mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable`

```ts
const interval = Rx.Observable.interval(500).take(4);
const source = Rx.Observable.of(1, 2, 3);

const foo$ = interval
  .map(x => source)
  .mergeAll();

foo$.subscribe(val => console.log(val));

```

Hay có một cách viết ngắn gọn hơn, là alias của cách viết ở trên:

```ts
const foo$ = interval
  .mergeMap(x => source);

```

Bây giờ chúng ta thay đổi 1 chút, cứ mỗi lần click vào `document`, chúng ta sẽ start stream `interval`:

```ts
const click$ = Rx.Observable.fromEvent(document, 'click');

const interval = Rx.Observable.interval(500).take(4);

const foo$ = click$
  .mergeMap(x => interval);

foo$.subscribe(val => console.log(val));

```

Khi bạn click 3 lần chẳng hạn, sẽ tạo ra 3 stream chạy đồng thời (nếu cái trước chưa complete thì cái mới vẫn start), lúc này tương tự như `merge`, chúng ta có thể control có bao nhiêu stream được chạy đồng thời.

Ví dụ chúng ta giới hạn có 2 stream chạy đồng thời.

```ts
const click$ = Rx.Observable.fromEvent(document, 'click');

const interval = Rx.Observable.interval(500).take(4);

const foo$ = click$
  .mergeMap(x => interval, null, 2);

foo$.subscribe(val => console.log(val));

```

Tham số thứ 2 của `mergeMap` được đặt tên là `resultSelector`, tham số này cho phép chúng ta truyền vào 1 hàm để xử lý inner và outer Observable value.

Ví dụ, mình muốn lấy về tọa độ `X`, `Y` của stream `click$` kèm theo giá trị emit của `interval`:


```ts

const foo$ = click$
  .mergeMap(x => interval, (outer, inner) => {
    const cord = {
      x: outer.clientX,
      y: outer.clientY
    };
    
    return {
      outer: cord,
      inner: inner
    };
  }, 2);

// output
{
  inner: 0,
  outer: {
    x: 132,
    y: 157
  }
}
...

```

Lưu ý: `flatMap` là một alias cho `mergeMap`


**concatMap**: `concatMap(project: function, resultSelector: function): Observable`

Khi chỉ cho phép 1 stream được chạy, các stream khác phải đợi stream trước complete mới được chạy - tương tự `concat` thì chúng ta có operator `concatMap`.


```ts
const click$ = Rx.Observable.fromEvent(document, 'click');

const interval = Rx.Observable.interval(500).take(4);

const foo$ = click$
  .concatMap(x => interval);

foo$.subscribe(val => console.log(val));

```

Khi bạn click vào document nhiều lần thì chỉ có 1 stream `interval` chạy tại 1 thời điểm, những stream khác phải đợi stream trước complete mới thực thi.

Tham số `resultSelector` cũng giống như `mergeMap`.

**switchMap**: `switchMap(project: function: Observable, resultSelector: function(outerValue, innerValue, outerIndex, innerIndex): any): Observable`

Chỉ cho phép 1 stream được chạy, nếu stream trước chưa `complete` thì `unsubscribe`.

`switchMap` rất hữu ích khi làm việc với HTTP request, giả sử request cũ chưa trả về giá trị mà người dùng đã request dữ liệu mới thì chúng ta có thể cancel để tránh việc dư thừa hoặc xử lý sai dữ liệu (dữ liệu cũ hơn response sau dữ liệu mới hơn). Khi cần đảm bảo chỉ có stream mới nhất đang chạy.


```ts
const click$ = Rx.Observable.fromEvent(document, 'click');

const interval = Rx.Observable.interval(500).take(4);

const foo$ = click$
  .switchMap(x => interval);

foo$.subscribe(val => console.log(val));

```

Khi bạn click vào document nhiều lần, nếu để ý bạn sẽ thấy những stream trước đó chưa complete sẽ bị cancel và start stream mới.

Ngoài ra nó còn hữu ích để tránh việc bị leak. Giả sử stream `interval` kia chạy vô hạn, nếu bạn không cancel trước đó thì chẳng mấy chốc ứng dụng của bạn sẽ crash khi người dùng click càng ngày càng nhiều lần.


```ts

const click$ = Rx.Observable.fromEvent(document, 'click');

const interval = Rx.Observable.interval(500);

const foo$ = click$
  .switchMap(x => interval);

foo$.subscribe(val => console.log(val));

// vs mergeMap

const click$ = Rx.Observable.fromEvent(document, 'click');

const interval = Rx.Observable.interval(500);

const foo$ = click$
  .mergeMap(x => interval);

foo$.subscribe(val => console.log(val));

```

`switchMap` cũng có `resultSelector` cho phép chúng ta tùy chọn dữ liệu cần emit.

Lưu ý: Trong hầu hết các trường hợp nếu bạn không có ý định gì đặc biệt thì nên dùng `switchMap` thay vì `mergeMap`.

## 11. Tổng kết
{:#rxjs-summary}

Trong bài này chúng ta đã tìm hiểu rất nhiều vấn đề về Reactive Programming với Rxjs, nhưng vẫn còn thiếu phần **Multicasting**, hi vọng mình sẽ làm xong phần đó trong thời gian tới.

**Marble diagrams** các bạn có thể theo dõi trên trang chủ ReactiveX.

**Observable vs Promise**: Khả năng mở rộng của Observable là rất lớn, nó bao quát được nhiều vấn đề mà Promise còn thiếu, như emit multiple values, hay cancel execution. Hơn nữa, nó đang trong giai đoạn phát triển để trở thành standard của EcmaScript (hiện tại đang ở stage-1), nên việc sử dụng Observable thay vì Promise có lẽ là điều chúng ta nên cân nhắc.

Các bạn quan tâm về Rxjs có thể theo dõi thêm các phần khác ở trong link tham khảo cuối bài.

Sau đây là một phần bonus để các bạn tạo ra một `Decorator` mà nó chịu trách nhiệm tự `unsubscribe` các subscription trong ứng dụng của bạn.

{% raw %}
```ts

// `decorators.ts`
import { Subject } from 'rxjs/Subject';

export function Destroy() {
  return function (target: any, key: string) {
    target[key] = new Subject();
    const oldNgOnDestroy = target.ngOnDestroy;
    target.ngOnDestroy = () => {
      if (oldNgOnDestroy) {
        oldNgOnDestroy();
      }
      target[key].next(true); // any kind of value
      target[key].complete();
    };
  }
}

// `app.component.ts`

import { Component, OnDestroy } from '@angular/core';
import { Destroy } from './decorators';

// alway import Observable, Subject, etc this way
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'some-component',
  template: `Tick: {{ tick }}`,
})
export class SomeComponent {
  @Destroy() destroy$: Subject<any>;

  tick: number;
  constructor() {
    Observable.interval(500)
      .takeUntil(this.destroy$)
      .subscribe(e => {
        console.log(e);
        this.tick = e;
      });
  }
}

@Component({
  selector: 'app-root',
  template: `
    <button (click)="show = !show">Toggle</button>

    <some-component *ngIf="show"></some-component>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  show = true;
}

```
{% endraw %}

## 12. Link tham khảo
{:#rxjs-references}

<a href="http://reactivex.io/rxjs/manual/overview.html" target="_blank">Rxjs Official Docs</a>

<a href="https://www.learnrxjs.io/" target="_blank">learnrxjs.io</a>

<a href="http://rxmarbles.com/" target="_blank">rxmarbles.com</a>

<a href="https://rxviz.com/" target="_blank">Rx Visualizer</a>

<a href="https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339" target="_blank">Hot vs Cold Observables</a>

<a href="https://gist.github.com/staltz/868e7e9bc2a7b8c1f754" target="_blank">The introduction to Reactive Programming you've been missing</a>

<a href="https://github.com/ReactiveX/rxjs" target="_blank">Rxjs Github Repo</a>
