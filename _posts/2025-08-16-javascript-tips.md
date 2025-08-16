---
layout: post
title: "유용한 JavaScript 팁 5가지"
date: 2025-08-16 16:00:00 +0900
categories: [Frontend, JavaScript]
tags: [javascript, tips, es6, programming]
excerpt: "개발할 때 유용한 JavaScript 팁들을 소개합니다."
---

개발하면서 자주 사용하는 유용한 JavaScript 팁들을 정리해보았습니다.

## 1. 배열 중복 제거

Set을 활용하면 간단하게 배열의 중복을 제거할 수 있습니다.

```javascript
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
```

## 2. 객체 구조 분해 할당

객체에서 필요한 속성만 깔끔하게 추출할 수 있습니다.

```javascript
const user = {
  name: '김개발',
  age: 25,
  email: 'dev@example.com',
  city: '서울'
};

const { name, email } = user;
console.log(name, email); // 김개발 dev@example.com
```

## 3. 옵셔널 체이닝 (Optional Chaining)

중첩된 객체의 속성에 안전하게 접근할 수 있습니다.

```javascript
const user = {
  profile: {
    social: {
      twitter: '@developer'
    }
  }
};

// 기존 방식
const twitter1 = user && user.profile && user.profile.social && user.profile.social.twitter;

// 옵셔널 체이닝
const twitter2 = user?.profile?.social?.twitter;
```

## 4. 배열 메서드 체이닝

map, filter, reduce를 조합하여 데이터를 효율적으로 처리할 수 있습니다.

```javascript
const products = [
  { name: '노트북', price: 1500000, category: '전자제품' },
  { name: '키보드', price: 100000, category: '전자제품' },
  { name: '의자', price: 200000, category: '가구' }
];

const expensiveElectronics = products
  .filter(product => product.category === '전자제품')
  .filter(product => product.price > 150000)
  .map(product => product.name);

console.log(expensiveElectronics); // ['노트북']
```

## 5. 템플릿 리터럴 활용

문자열 조합을 더 읽기 쉽게 작성할 수 있습니다.

```javascript
const name = '김개발';
const age = 25;

// 기존 방식
const message1 = '안녕하세요, 저는 ' + name + '이고 ' + age + '세입니다.';

// 템플릿 리터럴
const message2 = `안녕하세요, 저는 ${name}이고 ${age}세입니다.`;

// 여러 줄 문자열
const html = `
  <div class="user-card">
    <h2>${name}</h2>
    <p>나이: ${age}세</p>
  </div>
`;
```

## 마무리

이런 작은 팁들이 모여서 더 깔끔하고 읽기 쉬운 코드를 만들 수 있습니다. 
앞으로도 유용한 팁들을 계속 공유하겠습니다! 🚀