---
id: 9
title: ES2015 var, let và const keywords
publishDate: 2016-09-23T01:59:20+00:00
author: Tiep Phan
guid: https://www.tiepphan.com/?p=9
permalink: /es2015-var-let-const-keywords/
description: 'Giới thiệu chi tiết về đặc điểm của let, var, const trong ES2015'
image: '@public/assets/uploads/2016/09/es2015-logo.png'
categories:
  - Lập Trình
  - Programming
tags:
  - const
  - ES2015
  - Javascript
  - let
  - var
---

#  ES2015 var, let và const keywords


## Giới thiệu:

ES2015 giới thiệu một số tính năng mới, trong đó phải kể đến `biến cục bộ theo khối lệnh` và `hằng số`.

Vậy nếu đã có cách khai báo sử dụng `var` thì tại sao lại cần `let` và `const`. Trong bài viết này, tôi sẽ giới thiệu chi tiết về đặc điểm của chúng.


## Function scope và variable hoisting

Phạm vi của 1 biến trong Javascript phụ thuộc vào nơi biến được khai báo, nếu biến đó khai báo trong 1 hàm, nó là biến local của hàm đó, nếu khai báo bên ngoài 1 hàm, nó là biến global.

Ví dụ:

```js
'use strict';

function addWithDoubleValue(a, b) {
  var doubleA = a * 2;
  var doubleB = a * 2;
  return doubleA + doubleB;
}

console.log(doubleA);
```

Kết quả nhận được là ta có thông báo lỗi biến `doubleA` chưa được khai báo:

> `Uncaught ReferenceError: doubleA is not defined`

Trong Javascript không có biến cục bộ của khối lệnh và biến có thể sử dụng trước khi nó khai báo mà không sinh ra lỗi. Chẳng hạn, trong đoạn code sau:

```js
'use strict';

console.log(doubleA);

var doubleA = 5;
```

Lúc này, kết quả nhận được của chúng ta không còn giống như kết quả lúc trước nữa. Kết quả hiển thị trong console lúc này không còn là lỗi, mà là giá trị mặc định của biến khi chưa được khởi tạo:

> `undefined`

Tại sao lại có sự khác biệt như thế. Tất cả phải chăng là magic. Ở đây Javascript có 1 khái niệm là variable hoisting. Các biến dù được khai báo ở bất kỳ đâu trong hàm, đều được di chuyển lên đầu tiên. Chúng ta có thể viết lại đoạn code trên như sau:

```js
'use strict';
var doubleA;

console.log(doubleA);

doubleA = 5;
```

Điều này giải thích nguyên nhân vì sao chúng ta nhận được kết quả là `undefined` mà không phải là lỗi.

Hay trong 1 ví dụ khác, trong ví dụ dưới đây, tôi sẽ minh họa cả vấn đề biến cục bộ trong Javascript.

```js
'use strict';

var age = 15;

if (age >= 18) {
  var message = 'Bạn đã đủ tuổi xem phim 18+';
}

// sử dụng đến biến message, chúng ta mong muốn nó sinh ra lỗi.
console.log(message);
```

Nhưng kết quả nhận được của chúng ta lúc này vẫn là:

> `undefined`

Nguyên nhân là trong Javascript không có biến cục bộ theo khối lệnh, biến `message` được khai báo trong block `if` nhưng nó bị `hoisting` lên trên bắt đầu hàm, lúc này kết quả nhận được sẽ là `undefined`.

Hẳn là trong 1 số ứng dụng, có thể chúng ta gặp tình trạng như sau:

```js
function blockScope() {
  'use strict';
  var arr = [];

  for (var i = 0; i < 5; ++i) {
    arr.push(function() {
      console.log(i * i);
    });
  }

  arr[3]();
}

blockScope();
```

Kết quả nhận được trong đoạn code trên như sau:

> `25`

Lúc này chúng ta mắt chữ A, mồm chữ O, lẩm bẩm wtf, mình đã làm sai chỗ nào, sao kết quả lại sai tè le thế.

Vì không có biến cục bộ, nên lúc này biến i đã bị hoisting, hàm closure bên trong vòng lặp khi nhận i, sẽ nhận được kết quả bằng 5 sau khi nó thực hiện hết vòng lặp cuối.

Khi đó chúng ta cần 1 loại biến đặc biệt, là biến cục bộ. Chẳng hạn trong ví dụ trên, nếu tôi thay `var i` thành `let i` – có trong ES2015, chúng ta sẽ có kết quả mong muốn.

```js
function blockScope() {
  'use strict';
  var arr = [];

  for (let i = 0; i < 5; ++i) {
    arr.push(function() {
      console.log(i * i);
    });
  }

  arr[3]();
}

blockScope();
```

Kết quả nhận được trong đoạn code trên như sau:

> `9`

Hoặc như đoạn code sau:

```js
function blockScope() {
  'use strict';

  for (let i = 0; i < 5; ++i) {
    // do something
  }
  console.log(i);
}

blockScope();
```

Kết quả chúng ta nhận được cái lỗi to uỳnh:

> `ReferenceError: i is not defined`

## Constant

Như các bạn cũng đã biết trong JS thường, chúng ta không có khái niệm hằng số, các biến của JS đều có thể gán đi mất tiêu luôn. Nhưng trong ES2015 có thêm hằng số. Vậy hằng số có đặc điểm gì. Chính xác là bạn không thể gán 1 hằng khi nó đã được khai báo với 1 giá trị khác. (không dùng phép gán trên hằng được)

```js
function constant() {
  'use strict';
  const PI = 3.14;
  PI = 3.5;
}

constant();
```

Kết quả, bạn nhận được là 1 thông báo lỗi như sau:

> `TypeError: Assignment to constant variable`

Vậy là chúng ta không thể thực hiện phép gán trên hằng số được. Nhưng bạn cần lưu ý điều này, bạn chỉ không gán được, nhưng với các biến kiểu object, thì có thể thay đổi nội tại biến đó, chỉ là không gán cho một biến mới thôi.

Hãy xem ví dụ sau nhé:

```js
function constant() {
  'use strict';
  const obj = {'name': 'constant'};
  
  obj.type = 'Something go wrong!';
  console.log(obj);
}

constant();
```

Kết quả nhận được như sau:

```js
[object Object] {
  name: "constant",
  type: "Something go wrong!"
}
```

Tương tự như thế cho Array, với các đoạn xử lý không thay đổi con trỏ của biến thì không bị lỗi khi sử dụng _const, _chỉ khi nào chúng ta gán biến đó bằng 1 biến khác thì mới bị lỗi.

```js
function constant() {
  'use strict';
  const obj = {'name': 'constant'};

  obj = {
    'name': 'another object name'
  }
}

constant();
```

Chúng ta cũng nhận được lỗi tương tự, vì đã gán 1 hằng cho 1 giá trị khác.

1 số method trên Array như splice, push, &#8230; không làm thay đổi con trỏ của biến kiểu Array, nên nó cũng hợp lệ.

```js
function constant() {
  'use strict';
  const arr = [];
  arr.push(1, 2, 3);
  
  console.log(arr);
  
  arr.splice(1, 1);
  console.log(arr);
  arr.push(4, 7, 9);
  console.log(arr);
  arr.shift();
  console.log(arr);
}

constant();
```

Kết quả có được như sau.

```js
[1, 2, 3]
[1, 3]
[1, 3, 4, 7, 9]
[3, 4, 7, 9]
```

## Tổng kết

Trong bài viết này, tôi đã chỉ ra 1 số ví dụ cơ bản về việc sử dụng các cách thức khai báo biến và scope của các biến trong ngữ cảnh tương ứng sử dụng các tính năng cung cấp bởi ES2015. Hi vọng các bạn hiểu được cơ bản cách dùng của chúng để sử dụng trong công việc của mình. Thank you!

MDN var: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var</a>

MDN let: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let</a>

MDN const: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const</a>
