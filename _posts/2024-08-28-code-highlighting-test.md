---
layout: post
title: "코드 하이라이팅 테스트"
date: 2024-08-28 15:00:00 +0900
categories: [개발, 테스트]
tags: [코드, 하이라이팅, 블로그]
author: 김준희
---

# 코드 하이라이팅 개선 테스트

새로운 코드 하이라이팅 기능을 테스트해보겠습니다! 다양한 언어의 코드블럭이 어떻게 렌더링되는지 확인해보세요.

## JavaScript 예제

```javascript
// React 함수형 컴포넌트 예제
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError('사용자 정보를 불러오는데 실패했습니다.');
        console.error('User fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <div className="spinner">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>이메일: {user.email}</p>
      <p>가입일: {new Date(user.createdAt).toLocaleDateString('ko-KR')}</p>
    </div>
  );
};

export default UserProfile;
```

## Python 예제

```python
# Django REST API 뷰 예제
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.cache import cache
import logging

logger = logging.getLogger(__name__)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_detail_api(request, user_id):
    """
    사용자 상세 정보 API
    - GET: 사용자 정보 조회
    - POST: 새 사용자 생성  
    - PUT: 사용자 정보 수정
    - DELETE: 사용자 삭제
    """
    
    # 캐시 키 생성
    cache_key = f"user_detail_{user_id}"
    
    if request.method == 'GET':
        # 캐시에서 먼저 확인
        cached_user = cache.get(cache_key)
        if cached_user:
            logger.info(f"Cache hit for user {user_id}")
            return Response(cached_user)
        
        try:
            user = get_object_or_404(User, id=user_id)
            serializer = UserSerializer(user)
            
            # 5분간 캐시 저장
            cache.set(cache_key, serializer.data, 300)
            
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error fetching user {user_id}: {str(e)}")
            return Response(
                {'error': '사용자 정보를 가져올 수 없습니다.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    elif request.method == 'PUT':
        user = get_object_or_404(User, id=user_id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            # 캐시 갱신
            cache.set(cache_key, serializer.data, 300)
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

## HTML/CSS 예제

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>반응형 카드 컴포넌트</title>
    <style>
        .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            padding: 1.5rem;
            color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        
        .card-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .card-description {
            opacity: 0.9;
            line-height: 1.6;
        }
        
        @media (max-width: 768px) {
            .card-container {
                grid-template-columns: 1fr;
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="card-container">
        <div class="card">
            <h3 class="card-title">반응형 디자인</h3>
            <p class="card-description">
                모든 기기에서 완벽하게 작동하는 반응형 웹사이트를 구축합니다.
            </p>
        </div>
        <div class="card">
            <h3 class="card-title">성능 최적화</h3>
            <p class="card-description">
                빠른 로딩 속도와 부드러운 사용자 경험을 제공합니다.
            </p>
        </div>
    </div>
</body>
</html>
```

## 인라인 코드 테스트

여기서는 `const greeting = "Hello World!"` 같은 인라인 코드와 `npm install react` 명령어, 그리고 `document.querySelector('.highlight')` 같은 JavaScript 메서드들을 테스트해봅니다.

## SQL 쿼리 예제

```sql
-- 복잡한 JOIN 쿼리 예제
SELECT 
    u.id,
    u.username,
    u.email,
    COUNT(p.id) as post_count,
    AVG(p.views) as avg_views,
    MAX(p.created_at) as last_post_date,
    c.name as category_name
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
LEFT JOIN categories c ON p.category_id = c.id
WHERE u.is_active = true
    AND u.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
GROUP BY u.id, u.username, u.email, c.name
HAVING post_count > 5
ORDER BY avg_views DESC, post_count DESC
LIMIT 20;

-- 인덱스 생성
CREATE INDEX idx_posts_author_created 
ON posts(author_id, created_at DESC);

-- 트리거 예제
DELIMITER $$
CREATE TRIGGER update_user_stats 
AFTER INSERT ON posts
FOR EACH ROW
BEGIN
    UPDATE users 
    SET post_count = post_count + 1,
        last_activity = NOW()
    WHERE id = NEW.author_id;
END$$
DELIMITER ;
```

## JSON 데이터 예제

```json
{
  "name": "김준희의 개발 블로그",
  "version": "2.1.0",
  "description": "현대적인 Jekyll 블로그 with 코드 하이라이팅",
  "author": {
    "name": "김준희",
    "email": "wnsgml7838@naver.com",
    "github": "wnsgml7838"
  },
  "dependencies": {
    "jekyll": "^3.9.0",
    "jekyll-feed": "^0.17.0",
    "jekyll-seo-tag": "^2.8.0"
  },
  "scripts": {
    "dev": "bundle exec jekyll serve --livereload",
    "build": "JEKYLL_ENV=production bundle exec jekyll build",
    "deploy": "npm run build && gh-pages -d _site"
  },
  "features": {
    "codeHighlighting": {
      "enabled": true,
      "copyButton": true,
      "languageLabels": true,
      "lineNumbers": true,
      "themes": ["purple-dark", "purple-light"]
    },
    "responsive": true,
    "accessibility": {
      "wcag": "2.1 AA",
      "screenReader": true,
      "keyboardNavigation": true
    },
    "performance": {
      "lazyLoading": true,
      "codeOptimization": true,
      "caching": true
    }
  }
}
```

## Bash 스크립트 예제

```bash
#!/bin/bash

# Jekyll 블로그 배포 스크립트
set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 함수 정의
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 환경 변수 확인
check_env() {
    log_info "환경 변수 확인 중..."
    
    if [ -z "$GITHUB_TOKEN" ]; then
        log_error "GITHUB_TOKEN이 설정되지 않았습니다."
        exit 1
    fi
    
    if [ ! -f "_config.yml" ]; then
        log_error "_config.yml 파일이 없습니다."
        exit 1
    fi
    
    log_info "환경 변수 확인 완료 ✓"
}

# 의존성 설치
install_dependencies() {
    log_info "의존성 설치 중..."
    
    if ! command -v bundle &> /dev/null; then
        log_error "Bundler가 설치되지 않았습니다. gem install bundler를 실행하세요."
        exit 1
    fi
    
    bundle install --quiet
    log_info "의존성 설치 완료 ✓"
}

# 빌드 실행
build_site() {
    log_info "사이트 빌드 중..."
    
    # 기존 빌드 파일 정리
    rm -rf _site/
    
    # 프로덕션 빌드
    JEKYLL_ENV=production bundle exec jekyll build
    
    if [ $? -eq 0 ]; then
        log_info "빌드 완료 ✓"
    else
        log_error "빌드 실패"
        exit 1
    fi
}

# 배포 실행
deploy() {
    log_info "GitHub Pages에 배포 중..."
    
    # git 설정
    git config --global user.email "wnsgml7838@naver.com"
    git config --global user.name "김준희"
    
    # 배포 실행
    npx gh-pages -d _site -t true
    
    log_info "배포 완료 ✓"
    log_info "사이트 URL: https://wnsgml7838.github.io/blog/"
}

# 메인 실행
main() {
    log_info "Jekyll 블로그 배포 시작"
    
    check_env
    install_dependencies
    build_site
    deploy
    
    log_info "모든 작업이 완료되었습니다! 🎉"
}

# 스크립트 실행
main "$@"
```

---

## 코드블럭 기능 정리

✨ **새로운 기능들**:

1. **언어 라벨**: 각 코드블럭 상단에 프로그래밍 언어 표시
2. **복사 버튼**: 원클릭으로 코드를 클립보드에 복사
3. **보라색 테마**: 블로그 테마와 조화로운 보라색 계열 색상
4. **반응형 디자인**: 모바일에서도 완벽하게 작동
5. **접근성 지원**: 키보드 네비게이션, 스크린 리더 지원
6. **성능 최적화**: 지연 로딩, 효율적인 렌더링

이제 모든 코드가 더욱 아름답게 표시됩니다! 🚀