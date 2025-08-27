
console.log(sum(10, 20));

console.log(sum('안녕', '하세요'));

// 함수의 결과값을 변수에 대입호가, 그 변수를 가지고 또 연산을 할 수 있을겁니다.
let result = sum(11, 22);
console.log(result);

let result2 = sum(result, 33);
console.log(result2);

function sum(x, y) {
  let sum = x + y;
  return sum;
}

function sum(x, y) {
  let sum =  x- y;
  return sum;
}