---
layout: api-docs
title: "Node.js REST API 완전 가이드"
date: 2025-08-16 16:00:00 +0900
categories: [Backend, API]
tags: [nodejs, express, api, rest, documentation]
difficulty: "중급"
description: "Node.js와 Express를 사용한 RESTful API 개발 가이드입니다. 실제 프로덕션 환경에서 사용할 수 있는 완전한 API를 구축해보겠습니다."
api_version: "v1.0"
base_url: "https://api.example.com/v1"
api_info:
  authentication: "Bearer Token (JWT)"
  rate_limit: "100 requests/hour"
  response_format: "JSON"
  sdk_links:
    - name: "JavaScript SDK"
      url: "https://github.com/example/js-sdk"
    - name: "Python SDK"
      url: "https://github.com/example/python-sdk"
    - name: "Postman Collection"
      url: "https://www.postman.com/collections/example"
quick_start: |
  # API 키 발급
  curl -X POST https://api.example.com/v1/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email": "your@email.com", "password": "your_password"}'
  
  # 기본 API 호출
  curl -X GET https://api.example.com/v1/users \
    -H "Authorization: Bearer YOUR_TOKEN"
tech_stack:
  - "Node.js"
  - "Express.js"
  - "MongoDB"
  - "JWT"
  - "Joi"
---

이 문서는 Node.js와 Express를 사용하여 구축된 RESTful API의 완전한 참조 가이드입니다. 모든 엔드포인트, 요청/응답 형식, 에러 코드를 포함하고 있습니다.

## 인증 시스템

API 접근을 위해서는 JWT 토큰 기반 인증이 필요합니다.

{% include api-endpoint.html 
   method="POST" 
   endpoint="/auth/register" 
   title="사용자 회원가입"
   description="새로운 사용자 계정을 생성합니다."
   auth_required=false
   parameters=site.data.api_register_params
   request_example="curl -X POST https://api.example.com/v1/auth/register \
  -H \"Content-Type: application/json\" \
  -d '{
    \"name\": \"김준희\",
    \"email\": \"kimjoonhee@example.com\",
    \"password\": \"securePassword123!\"
  }'"
   response_example="{
  \"success\": true,
  \"data\": {
    \"user\": {
      \"id\": \"64f123abc456def789\",
      \"name\": \"김준희\",
      \"email\": \"kimjoonhee@example.com\",
      \"createdAt\": \"2025-08-16T07:00:00.000Z\"
    },
    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"
  }
}"
   error_codes=site.data.api_register_errors %}

{% include api-endpoint.html 
   method="POST" 
   endpoint="/auth/login" 
   title="사용자 로그인"
   description="기존 사용자 계정으로 로그인하고 인증 토큰을 받습니다."
   auth_required=false
   request_example="curl -X POST https://api.example.com/v1/auth/login \
  -H \"Content-Type: application/json\" \
  -d '{
    \"email\": \"kimjoonhee@example.com\",
    \"password\": \"securePassword123!\"
  }'"
   response_example="{
  \"success\": true,
  \"data\": {
    \"user\": {
      \"id\": \"64f123abc456def789\",
      \"name\": \"김준희\",
      \"email\": \"kimjoonhee@example.com\"
    },
    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\",
    \"expiresIn\": \"24h\"
  }
}" %}

## 사용자 관리

인증된 사용자의 정보를 관리하는 엔드포인트들입니다.

{% include api-endpoint.html 
   method="GET" 
   endpoint="/users" 
   title="사용자 목록 조회"
   description="등록된 모든 사용자의 목록을 페이지네이션과 함께 조회합니다."
   auth_required=true
   rate_limit="50 requests/hour"
   request_example="curl -X GET 'https://api.example.com/v1/users?page=1&limit=10&sort=createdAt' \
  -H \"Authorization: Bearer YOUR_TOKEN\""
   response_example="{
  \"success\": true,
  \"data\": {
    \"users\": [
      {
        \"id\": \"64f123abc456def789\",
        \"name\": \"김준희\",
        \"email\": \"kimjoonhee@example.com\",
        \"role\": \"user\",
        \"createdAt\": \"2025-08-16T07:00:00.000Z\"
      }
    ],
    \"pagination\": {
      \"currentPage\": 1,
      \"totalPages\": 5,
      \"totalUsers\": 50,
      \"hasNext\": true,
      \"hasPrev\": false
    }
  }
}" %}

{% include api-endpoint.html 
   method="GET" 
   endpoint="/users/{id}" 
   title="특정 사용자 조회"
   description="사용자 ID를 사용하여 특정 사용자의 상세 정보를 조회합니다."
   auth_required=true
   request_example="curl -X GET https://api.example.com/v1/users/64f123abc456def789 \
  -H \"Authorization: Bearer YOUR_TOKEN\""
   response_example="{
  \"success\": true,
  \"data\": {
    \"user\": {
      \"id\": \"64f123abc456def789\",
      \"name\": \"김준희\",
      \"email\": \"kimjoonhee@example.com\",
      \"role\": \"user\",
      \"profile\": {
        \"bio\": \"풀스택 개발자\",
        \"location\": \"서울\",
        \"website\": \"https://kimjoonhee.dev\"
      },
      \"createdAt\": \"2025-08-16T07:00:00.000Z\",
      \"updatedAt\": \"2025-08-16T08:30:00.000Z\"
    }
  }
}" %}

{% include api-endpoint.html 
   method="PUT" 
   endpoint="/users/{id}" 
   title="사용자 정보 수정"
   description="인증된 사용자가 자신의 정보를 수정합니다."
   auth_required=true
   request_example="curl -X PUT https://api.example.com/v1/users/64f123abc456def789 \
  -H \"Authorization: Bearer YOUR_TOKEN\" \
  -H \"Content-Type: application/json\" \
  -d '{
    \"name\": \"김준희 (수정됨)\",
    \"profile\": {
      \"bio\": \"시니어 풀스택 개발자\",
      \"location\": \"부산\"
    }
  }'"
   response_example="{
  \"success\": true,
  \"data\": {
    \"user\": {
      \"id\": \"64f123abc456def789\",
      \"name\": \"김준희 (수정됨)\",
      \"email\": \"kimjoonhee@example.com\",
      \"profile\": {
        \"bio\": \"시니어 풀스택 개발자\",
        \"location\": \"부산\",
        \"website\": \"https://kimjoonhee.dev\"
      },
      \"updatedAt\": \"2025-08-16T09:15:00.000Z\"
    }
  }
}" %}

{% include api-endpoint.html 
   method="DELETE" 
   endpoint="/users/{id}" 
   title="사용자 계정 삭제"
   description="사용자 계정을 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다."
   auth_required=true
   request_example="curl -X DELETE https://api.example.com/v1/users/64f123abc456def789 \
  -H \"Authorization: Bearer YOUR_TOKEN\""
   response_example="{
  \"success\": true,
  \"message\": \"사용자 계정이 성공적으로 삭제되었습니다.\"
}" %}

## 포스트 관리

블로그 포스트나 컨텐츠를 관리하는 엔드포인트들입니다.

{% include api-endpoint.html 
   method="GET" 
   endpoint="/posts" 
   title="포스트 목록 조회"
   description="게시된 모든 포스트를 조회합니다. 필터링과 정렬이 가능합니다."
   auth_required=false
   request_example="curl -X GET 'https://api.example.com/v1/posts?category=tech&sort=-createdAt&limit=5'"
   response_example="{
  \"success\": true,
  \"data\": {
    \"posts\": [
      {
        \"id\": \"64f789def123abc456\",
        \"title\": \"React 완전 정복 가이드\",
        \"slug\": \"react-complete-guide\",
        \"excerpt\": \"React의 기초부터 고급 기능까지...\",
        \"category\": \"tech\",
        \"tags\": [\"react\", \"javascript\", \"frontend\"],
        \"author\": {
          \"id\": \"64f123abc456def789\",
          \"name\": \"김준희\"
        },
        \"publishedAt\": \"2025-08-16T14:30:00.000Z\",
        \"readingTime\": 15
      }
    ],
    \"pagination\": {
      \"currentPage\": 1,
      \"totalPages\": 3,
      \"totalPosts\": 15
    }
  }
}" %}

{% include api-endpoint.html 
   method="POST" 
   endpoint="/posts" 
   title="새 포스트 작성"
   description="새로운 블로그 포스트를 작성합니다."
   auth_required=true
   request_example="curl -X POST https://api.example.com/v1/posts \
  -H \"Authorization: Bearer YOUR_TOKEN\" \
  -H \"Content-Type: application/json\" \
  -d '{
    \"title\": \"Node.js 성능 최적화 팁\",
    \"content\": \"Node.js 애플리케이션의 성능을 향상시키는...\",
    \"category\": \"tech\",
    \"tags\": [\"nodejs\", \"performance\", \"backend\"],
    \"status\": \"published\"
  }'"
   response_example="{
  \"success\": true,
  \"data\": {
    \"post\": {
      \"id\": \"64f999ghi789jkl012\",
      \"title\": \"Node.js 성능 최적화 팁\",
      \"slug\": \"nodejs-performance-optimization\",
      \"content\": \"Node.js 애플리케이션의 성능을 향상시키는...\",
      \"category\": \"tech\",
      \"tags\": [\"nodejs\", \"performance\", \"backend\"],
      \"status\": \"published\",
      \"author\": {
        \"id\": \"64f123abc456def789\",
        \"name\": \"김준희\"
      },
      \"createdAt\": \"2025-08-16T16:45:00.000Z\",
      \"publishedAt\": \"2025-08-16T16:45:00.000Z\"
    }
  }
}" %}

## 에러 처리

API는 표준 HTTP 상태 코드와 함께 구조화된 에러 응답을 반환합니다.

### 에러 응답 형식

모든 에러 응답은 다음과 같은 구조를 따릅니다:

{% include code-block.html 
   language="json" 
   title="에러 응답 예시"
   content="{
  \"success\": false,
  \"error\": {
    \"code\": \"VALIDATION_ERROR\",
    \"message\": \"입력 데이터가 유효하지 않습니다.\",
    \"details\": [
      {
        \"field\": \"email\",
        \"message\": \"유효한 이메일 주소를 입력해주세요.\"
      }
    ]
  },
  \"timestamp\": \"2025-08-16T16:45:00.000Z\",
  \"path\": \"/api/v1/users\"
}" %}

### 공통 에러 코드

| 상태 코드 | 에러 코드 | 설명 |
|-----------|-----------|------|
| 400 | VALIDATION_ERROR | 요청 데이터가 유효하지 않음 |
| 401 | UNAUTHORIZED | 인증이 필요하거나 토큰이 유효하지 않음 |
| 403 | FORBIDDEN | 접근 권한이 없음 |
| 404 | NOT_FOUND | 요청한 리소스를 찾을 수 없음 |
| 409 | CONFLICT | 리소스 충돌 (예: 이미 존재하는 이메일) |
| 429 | RATE_LIMIT_EXCEEDED | 요청 제한 초과 |
| 500 | INTERNAL_ERROR | 서버 내부 오류 |

## SDK 사용 예시

### JavaScript SDK

```javascript
import { ApiClient } from '@example/js-sdk';

const client = new ApiClient({
  baseUrl: 'https://api.example.com/v1',
  token: 'your-jwt-token'
});

// 사용자 목록 조회
const users = await client.users.list({
  page: 1,
  limit: 10,
  sort: 'createdAt'
});

// 새 포스트 작성
const post = await client.posts.create({
  title: '새로운 포스트',
  content: '포스트 내용...',
  category: 'tech'
});
```

### Python SDK

```python
from example_sdk import ApiClient

client = ApiClient(
    base_url='https://api.example.com/v1',
    token='your-jwt-token'
)

# 사용자 목록 조회
users = client.users.list(page=1, limit=10, sort='createdAt')

# 새 포스트 작성
post = client.posts.create(
    title='새로운 포스트',
    content='포스트 내용...',
    category='tech'
)
```

## 웹훅

특정 이벤트가 발생할 때 지정된 URL로 HTTP POST 요청을 전송합니다.

### 지원하는 이벤트

- `user.created` - 새 사용자 가입
- `user.updated` - 사용자 정보 수정
- `user.deleted` - 사용자 계정 삭제
- `post.published` - 새 포스트 게시
- `post.updated` - 포스트 수정
- `post.deleted` - 포스트 삭제

### 웹훅 페이로드 예시

{% include code-block.html 
   language="json" 
   title="user.created 이벤트"
   content="{
  \"event\": \"user.created\",
  \"timestamp\": \"2025-08-16T16:45:00.000Z\",
  \"data\": {
    \"user\": {
      \"id\": \"64f123abc456def789\",
      \"name\": \"김준희\",
      \"email\": \"kimjoonhee@example.com\",
      \"createdAt\": \"2025-08-16T16:45:00.000Z\"
    }
  }
}" %}

---

## 기술 스택

{% include tech-stack.html title="백엔드 기술 스택" technologies=site.data.backend_stack %}

## 추가 리소스

- [GitHub 저장소](https://github.com/example/api)
- [이슈 추적](https://github.com/example/api/issues)
- [변경 로그](https://github.com/example/api/releases)
- [커뮤니티 포럼](https://community.example.com)

질문이나 문제가 있으시면 언제든지 문의해 주세요!