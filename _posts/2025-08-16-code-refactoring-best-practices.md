---
layout: post
title: "코드 리팩토링 모범 사례: 더 나은 코드를 위한 실전 가이드"
date: 2025-08-16 18:00:00 +0900
categories: [Development, Best-Practices]
tags: [refactoring, clean-code, javascript, programming]
difficulty: "고급"
description: "실제 코드 예시를 통해 배우는 리팩토링 기법과 모범 사례들입니다. 가독성, 유지보수성, 성능을 모두 고려한 리팩토링 전략을 학습해보세요."
prerequisites:
  - "JavaScript 중급 이상의 지식"
  - "객체지향 프로그래밍 이해"
  - "디자인 패턴 기초 지식"
tech_stack:
  - "JavaScript ES6+"
  - "Node.js"
  - "Jest (테스팅)"
---

리팩토링은 단순히 코드를 정리하는 것이 아닙니다. 코드의 구조, 가독성, 성능을 개선하여 장기적으로 유지보수하기 좋은 코드베이스를 만드는 중요한 과정입니다.

## 📋 목차

1. [리팩토링의 원칙](#리팩토링의-원칙)
2. [함수 추출과 분리](#함수-추출과-분리)
3. [조건문 개선](#조건문-개선)
4. [클래스 구조 개선](#클래스-구조-개선)
5. [성능 최적화](#성능-최적화)
6. [테스트 주도 리팩토링](#테스트-주도-리팩토링)

---

## 리팩토링의 원칙

리팩토링을 시작하기 전에 반드시 지켜야 할 핵심 원칙들입니다.

### 1. 기능 유지 원칙

리팩토링은 코드의 외부 동작을 변경하지 않으면서 내부 구조를 개선하는 것입니다.

### 2. 작은 단계로 진행

한 번에 많은 것을 바꾸지 말고, 작은 단위로 점진적으로 개선합니다.

### 3. 테스트 우선

리팩토링 전에 반드시 테스트를 작성하고, 각 단계마다 테스트를 실행합니다.

---

## 함수 추출과 분리

긴 함수를 작은 단위로 분리하여 가독성과 재사용성을 높이는 방법을 알아보겠습니다.

{% include code-comparison.html 
   title="긴 함수 분리하기"
   before_lang="javascript"
   after_lang="javascript"
   before="// 😰 개선이 필요한 코드
function processOrder(order) {
  // 주문 유효성 검사
  if (!order || !order.items || order.items.length === 0) {
    throw new Error('주문이 비어있습니다');
  }
  
  if (!order.customerId) {
    throw new Error('고객 ID가 필요합니다');
  }
  
  // 총 금액 계산
  let totalAmount = 0;
  for (let item of order.items) {
    if (item.quantity <= 0) {
      throw new Error('수량은 0보다 커야 합니다');
    }
    totalAmount += item.price * item.quantity;
  }
  
  // 할인 적용
  let discount = 0;
  if (totalAmount > 100000) {
    discount = totalAmount * 0.1;
  } else if (totalAmount > 50000) {
    discount = totalAmount * 0.05;
  }
  
  const finalAmount = totalAmount - discount;
  
  // 재고 확인 및 업데이트
  for (let item of order.items) {
    const product = getProduct(item.productId);
    if (product.stock < item.quantity) {
      throw new Error(`재고 부족: ${product.name}`);
    }
    updateStock(item.productId, product.stock - item.quantity);
  }
  
  // 주문 저장
  const processedOrder = {
    id: generateOrderId(),
    customerId: order.customerId,
    items: order.items,
    totalAmount: totalAmount,
    discount: discount,
    finalAmount: finalAmount,
    status: 'processed',
    createdAt: new Date()
  };
  
  saveOrder(processedOrder);
  sendOrderConfirmation(order.customerId, processedOrder);
  
  return processedOrder;
}"
   after="// ✨ 개선된 코드
function processOrder(order) {
  validateOrder(order);
  
  const totalAmount = calculateTotalAmount(order.items);
  const discount = calculateDiscount(totalAmount);
  const finalAmount = totalAmount - discount;
  
  updateInventory(order.items);
  
  const processedOrder = createOrderRecord(order, totalAmount, discount, finalAmount);
  saveOrder(processedOrder);
  sendOrderConfirmation(order.customerId, processedOrder);
  
  return processedOrder;
}

function validateOrder(order) {
  if (!order || !order.items || order.items.length === 0) {
    throw new Error('주문이 비어있습니다');
  }
  
  if (!order.customerId) {
    throw new Error('고객 ID가 필요합니다');
  }
  
  validateOrderItems(order.items);
}

function validateOrderItems(items) {
  for (let item of items) {
    if (item.quantity <= 0) {
      throw new Error('수량은 0보다 커야 합니다');
    }
  }
}

function calculateTotalAmount(items) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

function calculateDiscount(totalAmount) {
  if (totalAmount > 100000) return totalAmount * 0.1;
  if (totalAmount > 50000) return totalAmount * 0.05;
  return 0;
}

function updateInventory(items) {
  for (let item of items) {
    const product = getProduct(item.productId);
    if (product.stock < item.quantity) {
      throw new Error(`재고 부족: ${product.name}`);
    }
    updateStock(item.productId, product.stock - item.quantity);
  }
}

function createOrderRecord(order, totalAmount, discount, finalAmount) {
  return {
    id: generateOrderId(),
    customerId: order.customerId,
    items: order.items,
    totalAmount,
    discount,
    finalAmount,
    status: 'processed',
    createdAt: new Date()
  };
}"
   before_issues=["하나의 함수가 너무 많은 책임을 가짐", "가독성이 떨어짐", "테스트하기 어려움", "재사용성이 낮음"]
   after_improvements=["단일 책임 원칙 준수", "각 함수가 명확한 목적을 가짐", "테스트하기 쉬움", "재사용 가능한 함수들"]
   explanation="긴 함수를 의미 있는 단위로 분리하여 각 함수가 하나의 책임만 가지도록 개선했습니다."
   metrics=site.data.refactoring_metrics %}

## 조건문 개선

복잡한 조건문을 더 읽기 쉽고 유지보수하기 쉽게 개선하는 방법들입니다.

### 1. 조기 반환 패턴 (Early Return)

{% include code-comparison.html 
   title="중첩된 조건문 개선"
   before_lang="javascript"
   after_lang="javascript"
   before="function getUserDiscount(user) {
  let discount = 0;
  
  if (user) {
    if (user.isPremium) {
      if (user.yearsActive >= 5) {
        discount = 0.2;
      } else if (user.yearsActive >= 2) {
        discount = 0.15;
      } else {
        discount = 0.1;
      }
    } else {
      if (user.yearsActive >= 3) {
        discount = 0.05;
      } else {
        discount = 0;
      }
    }
  }
  
  return discount;
}"
   after="function getUserDiscount(user) {
  if (!user) return 0;
  
  if (user.isPremium) {
    return getPremiumDiscount(user.yearsActive);
  }
  
  return getStandardDiscount(user.yearsActive);
}

function getPremiumDiscount(yearsActive) {
  if (yearsActive >= 5) return 0.2;
  if (yearsActive >= 2) return 0.15;
  return 0.1;
}

function getStandardDiscount(yearsActive) {
  return yearsActive >= 3 ? 0.05 : 0;
}"
   before_issues=["깊은 중첩으로 인한 가독성 저하", "로직 파악이 어려움"]
   after_improvements=["조기 반환으로 중첩 감소", "명확한 함수 분리", "더 나은 가독성"] %}

### 2. 전략 패턴 활용

{% include code-comparison.html 
   title="타입별 처리 로직 개선"
   before_lang="javascript"
   after_lang="javascript"
   before="function calculateShippingCost(order) {
  let cost = 0;
  
  if (order.type === 'express') {
    if (order.weight <= 1) {
      cost = 5000;
    } else if (order.weight <= 5) {
      cost = 8000;
    } else {
      cost = 12000;
    }
    
    if (order.distance > 50) {
      cost += 3000;
    }
  } else if (order.type === 'standard') {
    if (order.weight <= 1) {
      cost = 2000;
    } else if (order.weight <= 5) {
      cost = 4000;
    } else {
      cost = 6000;
    }
  } else if (order.type === 'economy') {
    cost = Math.max(1000, order.weight * 500);
  }
  
  return cost;
}"
   after="const shippingStrategies = {
  express: {
    calculateCost(order) {
      const baseCost = this.getBaseCost(order.weight);
      const distanceCost = order.distance > 50 ? 3000 : 0;
      return baseCost + distanceCost;
    },
    
    getBaseCost(weight) {
      if (weight <= 1) return 5000;
      if (weight <= 5) return 8000;
      return 12000;
    }
  },
  
  standard: {
    calculateCost(order) {
      return this.getBaseCost(order.weight);
    },
    
    getBaseCost(weight) {
      if (weight <= 1) return 2000;
      if (weight <= 5) return 4000;
      return 6000;
    }
  },
  
  economy: {
    calculateCost(order) {
      return Math.max(1000, order.weight * 500);
    }
  }
};

function calculateShippingCost(order) {
  const strategy = shippingStrategies[order.type];
  
  if (!strategy) {
    throw new Error(`지원하지 않는 배송 타입: ${order.type}`);
  }
  
  return strategy.calculateCost(order);
}"
   before_issues=["긴 if-else 체인", "새로운 타입 추가 시 기존 코드 수정 필요", "로직이 한 곳에 집중됨"]
   after_improvements=["전략 패턴으로 각 타입별 로직 분리", "새로운 타입 추가가 쉬움", "각 전략이 독립적으로 테스트 가능"] %}

## 클래스 구조 개선

객체지향 원칙을 적용하여 클래스 구조를 개선하는 방법을 알아보겠습니다.

{% include code-comparison.html 
   title="신 클래스(God Class) 분리"
   before_lang="javascript"
   after_lang="javascript"
   before="class UserManager {
  constructor() {
    this.users = [];
    this.emailService = new EmailService();
    this.database = new Database();
  }
  
  createUser(userData) {
    // 유효성 검사
    if (!userData.email || !userData.password) {
      throw new Error('이메일과 비밀번호는 필수입니다');
    }
    
    if (userData.password.length < 8) {
      throw new Error('비밀번호는 8자 이상이어야 합니다');
    }
    
    // 중복 검사
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('이미 존재하는 이메일입니다');
    }
    
    // 비밀번호 해싱
    const hashedPassword = this.hashPassword(userData.password);
    
    // 사용자 생성
    const user = {
      id: this.generateId(),
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      createdAt: new Date(),
      isActive: true
    };
    
    // 데이터베이스 저장
    this.database.save('users', user);
    this.users.push(user);
    
    // 환영 이메일 전송
    this.emailService.sendWelcomeEmail(user.email, user.name);
    
    return user;
  }
  
  updateUser(userId, updateData) {
    // 사용자 찾기
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }
    
    // 유효성 검사
    if (updateData.email) {
      const existingUser = this.users.find(u => u.email === updateData.email && u.id !== userId);
      if (existingUser) {
        throw new Error('이미 존재하는 이메일입니다');
      }
    }
    
    // 업데이트
    Object.assign(user, updateData, { updatedAt: new Date() });
    
    // 데이터베이스 저장
    this.database.update('users', userId, user);
    
    return user;
  }
  
  deleteUser(userId) {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('사용자를 찾을 수 없습니다');
    }
    
    const user = this.users[userIndex];
    this.users.splice(userIndex, 1);
    this.database.delete('users', userId);
    
    // 계정 삭제 이메일 전송
    this.emailService.sendAccountDeletionEmail(user.email, user.name);
    
    return true;
  }
  
  hashPassword(password) {
    // 비밀번호 해싱 로직
    return btoa(password); // 실제로는 bcrypt 등을 사용
  }
  
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}"
   after="// 사용자 엔티티
class User {
  constructor(userData) {
    this.id = this.generateId();
    this.email = userData.email;
    this.name = userData.name;
    this.password = userData.password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
  }
  
  updateInfo(updateData) {
    Object.assign(this, updateData, { updatedAt: new Date() });
  }
  
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// 유효성 검사 서비스
class UserValidator {
  static validateCreateData(userData) {
    if (!userData.email || !userData.password) {
      throw new Error('이메일과 비밀번호는 필수입니다');
    }
    
    if (userData.password.length < 8) {
      throw new Error('비밀번호는 8자 이상이어야 합니다');
    }
  }
  
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// 비밀번호 서비스
class PasswordService {
  static hash(password) {
    // 실제로는 bcrypt 등을 사용
    return btoa(password);
  }
  
  static verify(password, hashedPassword) {
    return this.hash(password) === hashedPassword;
  }
}

// 사용자 저장소
class UserRepository {
  constructor(database) {
    this.database = database;
    this.users = [];
  }
  
  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }
  
  findById(id) {
    return this.users.find(user => user.id === id);
  }
  
  save(user) {
    this.database.save('users', user);
    this.users.push(user);
    return user;
  }
  
  update(user) {
    this.database.update('users', user.id, user);
    return user;
  }
  
  delete(userId) {
    const index = this.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.database.delete('users', userId);
      return true;
    }
    return false;
  }
}

// 사용자 서비스
class UserService {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }
  
  async createUser(userData) {
    UserValidator.validateCreateData(userData);
    
    // 중복 검사
    const existingUser = this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('이미 존재하는 이메일입니다');
    }
    
    // 비밀번호 해싱
    const hashedPassword = PasswordService.hash(userData.password);
    
    // 사용자 생성
    const user = new User({
      ...userData,
      password: hashedPassword
    });
    
    // 저장
    const savedUser = this.userRepository.save(user);
    
    // 환영 이메일 전송
    await this.emailService.sendWelcomeEmail(user.email, user.name);
    
    return savedUser;
  }
  
  async updateUser(userId, updateData) {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }
    
    // 이메일 중복 검사
    if (updateData.email) {
      const existingUser = this.userRepository.findByEmail(updateData.email);
      if (existingUser && existingUser.id !== userId) {
        throw new Error('이미 존재하는 이메일입니다');
      }
    }
    
    user.updateInfo(updateData);
    return this.userRepository.update(user);
  }
  
  async deleteUser(userId) {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다');
    }
    
    const deleted = this.userRepository.delete(userId);
    
    if (deleted) {
      await this.emailService.sendAccountDeletionEmail(user.email, user.name);
    }
    
    return deleted;
  }
}"
   before_issues=["하나의 클래스가 너무 많은 책임을 가짐", "단일 책임 원칙 위반", "테스트하기 어려움", "코드 재사용성 낮음"]
   after_improvements=["각 클래스가 단일 책임을 가짐", "의존성 주입으로 테스트 용이성 향상", "관심사의 분리", "재사용 가능한 컴포넌트들"] %}

## 성능 최적화

코드 리팩토링과 함께 성능도 개선하는 방법들을 살펴보겠습니다.

### 1. 불필요한 연산 제거

{% include code-comparison.html 
   title="반복 연산 최적화"
   before_lang="javascript"
   after_lang="javascript"
   before="function processUsers(users) {
  const results = [];
  
  for (let user of users) {
    // 매번 새로운 Date 객체 생성
    const currentDate = new Date();
    
    // 매번 정규식 컴파일
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(user.email)) {
      const age = Math.floor((currentDate - new Date(user.birthDate)) / (365.25 * 24 * 60 * 60 * 1000));
      
      if (age >= 18) {
        // 매번 같은 연산 반복
        const discountRate = user.isPremium ? 0.15 : 0.05;
        
        results.push({
          ...user,
          age: age,
          discount: user.totalPurchase * discountRate
        });
      }
    }
  }
  
  return results;
}"
   after="// 상수와 정규식을 함수 외부로 이동
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MILLISECONDS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
const DISCOUNT_RATES = {
  premium: 0.15,
  standard: 0.05
};

function processUsers(users) {
  // 현재 날짜를 한 번만 계산
  const currentDate = new Date();
  
  return users
    .filter(user => EMAIL_REGEX.test(user.email))
    .map(user => ({
      ...user,
      age: calculateAge(user.birthDate, currentDate)
    }))
    .filter(user => user.age >= 18)
    .map(user => ({
      ...user,
      discount: calculateDiscount(user)
    }));
}

function calculateAge(birthDate, currentDate = new Date()) {
  return Math.floor((currentDate - new Date(birthDate)) / MILLISECONDS_PER_YEAR);
}

function calculateDiscount(user) {
  const rate = user.isPremium ? DISCOUNT_RATES.premium : DISCOUNT_RATES.standard;
  return user.totalPurchase * rate;
}"
   before_issues=["매번 새로운 Date 객체 생성", "정규식을 반복 컴파일", "불필요한 반복 연산"]
   after_improvements=["상수를 외부로 이동하여 재사용", "함수형 프로그래밍 스타일 적용", "더 나은 가독성과 성능"] %}

### 2. 메모이제이션 활용

{% include code-comparison.html 
   title="비싼 연산 캐싱"
   before_lang="javascript"
   after_lang="javascript"
   before="function calculateComplexScore(userId, data) {
  // 복잡한 점수 계산 로직
  let score = 0;
  
  // CPU 집약적인 연산들
  for (let i = 0; i < data.length; i++) {
    score += Math.pow(data[i].value, 2) * Math.log(data[i].weight + 1);
    
    for (let j = 0; j < data[i].factors.length; j++) {
      score += Math.sin(data[i].factors[j]) * Math.cos(data[i].factors[j]);
    }
  }
  
  return Math.round(score * 1000) / 1000;
}

// 같은 사용자의 점수를 여러 번 계산할 때마다 전체 연산 반복
const user1Score = calculateComplexScore('user1', userData);
const user1ScoreAgain = calculateComplexScore('user1', userData); // 중복 연산!"
   after="// 메모이제이션을 활용한 캐싱
const scoreCache = new Map();

function calculateComplexScore(userId, data) {
  // 캐시 키 생성 (userId + 데이터 해시)
  const cacheKey = `${userId}_${getDataHash(data)}`;
  
  // 캐시에서 확인
  if (scoreCache.has(cacheKey)) {
    return scoreCache.get(cacheKey);
  }
  
  // 복잡한 점수 계산 로직
  let score = 0;
  
  for (let i = 0; i < data.length; i++) {
    score += Math.pow(data[i].value, 2) * Math.log(data[i].weight + 1);
    
    for (let j = 0; j < data[i].factors.length; j++) {
      score += Math.sin(data[i].factors[j]) * Math.cos(data[i].factors[j]);
    }
  }
  
  const result = Math.round(score * 1000) / 1000;
  
  // 결과를 캐시에 저장
  scoreCache.set(cacheKey, result);
  
  return result;
}

function getDataHash(data) {
  // 간단한 해시 함수 (실제로는 더 정교한 해싱 필요)
  return data.reduce((hash, item) => {
    return hash + item.value + item.weight + item.factors.length;
  }, 0).toString();
}

// 캐시 정리 함수
function clearScoreCache() {
  scoreCache.clear();
}

// 이제 같은 데이터로 같은 사용자 점수를 계산하면 캐시에서 반환
const user1Score = calculateComplexScore('user1', userData);        // 계산 실행
const user1ScoreAgain = calculateComplexScore('user1', userData);   // 캐시에서 반환"
   before_issues=["동일한 연산을 반복 수행", "CPU 집약적인 작업의 비효율성"]
   after_improvements=["메모이제이션으로 중복 연산 제거", "캐시 키 생성으로 정확한 캐싱", "메모리와 CPU 사용량의 균형"] %}

## 테스트 주도 리팩토링

안전한 리팩토링을 위한 테스트 작성 방법을 알아보겠습니다.

{% include code-block.html 
   language="javascript" 
   title="리팩토링 전 테스트 작성"
   file_name="user.service.test.js"
   content="// 리팩토링 전에 기존 동작을 보장하는 테스트 작성
describe('UserService', () => {
  let userService;
  let mockRepository;
  let mockEmailService;
  
  beforeEach(() => {
    mockRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };
    
    mockEmailService = {
      sendWelcomeEmail: jest.fn(),
      sendAccountDeletionEmail: jest.fn()
    };
    
    userService = new UserService(mockRepository, mockEmailService);
  });
  
  describe('createUser', () => {
    it('should create a new user with valid data', async () => {
      // Given
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };
      
      mockRepository.findByEmail.mockReturnValue(null);
      mockRepository.save.mockReturnValue({ id: '123', ...userData });
      
      // When
      const result = await userService.createUser(userData);
      
      // Then
      expect(result).toBeDefined();
      expect(result.email).toBe(userData.email);
      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
        userData.email,
        userData.name
      );
    });
    
    it('should throw error when email already exists', async () => {
      // Given
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Test User'
      };
      
      mockRepository.findByEmail.mockReturnValue({ id: '456', email: userData.email });
      
      // When & Then
      await expect(userService.createUser(userData)).rejects.toThrow(
        '이미 존재하는 이메일입니다'
      );
    });
    
    it('should throw error when password is too short', async () => {
      // Given
      const userData = {
        email: 'test@example.com',
        password: '123',
        name: 'Test User'
      };
      
      // When & Then
      await expect(userService.createUser(userData)).rejects.toThrow(
        '비밀번호는 8자 이상이어야 합니다'
      );
    });
  });
  
  describe('updateUser', () => {
    it('should update existing user', async () => {
      // Given
      const userId = '123';
      const updateData = { name: 'Updated Name' };
      const existingUser = {
        id: userId,
        email: 'test@example.com',
        name: 'Original Name',
        updateInfo: jest.fn()
      };
      
      mockRepository.findById.mockReturnValue(existingUser);
      mockRepository.update.mockReturnValue({ ...existingUser, ...updateData });
      
      // When
      const result = await userService.updateUser(userId, updateData);
      
      // Then
      expect(existingUser.updateInfo).toHaveBeenCalledWith(updateData);
      expect(mockRepository.update).toHaveBeenCalledWith(existingUser);
    });
  });
});" %}

{% include expandable-section.html 
   title="성능 테스트 예시"
   summary="성능 개선을 검증하는 테스트 코드 보기"
   content="```javascript
// 성능 개선을 측정하는 테스트
describe('Performance Tests', () => {
  it('should process large dataset efficiently', () => {
    // Given
    const largeDataset = generateLargeUserDataset(10000);
    
    // When
    const startTime = performance.now();
    const result = processUsers(largeDataset);
    const endTime = performance.now();
    
    // Then
    const executionTime = endTime - startTime;
    expect(executionTime).toBeLessThan(1000); // 1초 이내
    expect(result.length).toBeGreaterThan(0);
  });
  
  it('should benefit from memoization', () => {
    // Given
    const userData = generateComplexUserData();
    const userId = 'test-user';
    
    // When - 첫 번째 호출
    const start1 = performance.now();
    const result1 = calculateComplexScore(userId, userData);
    const time1 = performance.now() - start1;
    
    // When - 두 번째 호출 (캐시된 결과)
    const start2 = performance.now();
    const result2 = calculateComplexScore(userId, userData);
    const time2 = performance.now() - start2;
    
    // Then
    expect(result1).toBe(result2); // 같은 결과
    expect(time2).toBeLessThan(time1 * 0.1); // 90% 이상 빨라야 함
  });
});
```" %}

## 리팩토링 체크리스트

리팩토링을 완료하기 전에 확인해야 할 항목들입니다:

### ✅ 기능적 요구사항
- [ ] 모든 기존 테스트가 통과하는가?
- [ ] 새로운 버그가 발생하지 않았는가?
- [ ] 외부 API와 인터페이스가 변경되지 않았는가?

### ✅ 코드 품질
- [ ] 함수와 클래스가 단일 책임을 가지는가?
- [ ] 의미 있는 이름을 사용했는가?
- [ ] 중복 코드가 제거되었는가?
- [ ] 매직 넘버와 하드코딩된 값이 상수로 대체되었는가?

### ✅ 구조와 설계
- [ ] SOLID 원칙을 준수하는가?
- [ ] 적절한 디자인 패턴을 사용했는가?
- [ ] 의존성이 적절히 관리되는가?

### ✅ 성능
- [ ] 불필요한 연산이 제거되었는가?
- [ ] 메모리 사용량이 개선되었는가?
- [ ] 병목 지점이 해결되었는가?

### ✅ 유지보수성
- [ ] 코드를 읽고 이해하기 쉬운가?
- [ ] 새로운 기능을 추가하기 쉬운가?
- [ ] 테스트하기 쉬운 구조인가?

---

## 마무리

리팩토링은 단순한 코드 정리가 아닌, 소프트웨어의 품질을 지속적으로 개선하는 중요한 과정입니다. 작은 단위로 점진적으로 개선하고, 항상 테스트를 통해 안전성을 보장하며, 팀원들과 함께 코드 품질에 대한 공통된 기준을 만들어 나가는 것이 중요합니다.

좋은 코드는 하루아침에 만들어지지 않습니다. 지속적인 관심과 개선 노력을 통해 더 나은 소프트웨어를 만들어 나가시길 바랍니다! 🚀