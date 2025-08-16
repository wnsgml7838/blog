# 기술 블로그 특화 기능 가이드

Jekyll 기술 블로그에 추가된 고급 기능들에 대한 완전한 가이드입니다.

## 🚀 구현된 기능 목록

### 1. 고급 코드 하이라이팅
- **파일**: `_includes/code-block.html`
- **기능**:
  - 코드 블록 메타데이터 (파일명, 버전, 언어)
  - 복사 버튼과 언어 배지
  - 코드 설명 및 주석 시스템
  - 라인 번호 표시

**사용법**:
```liquid
{% include code-block.html 
   language="javascript" 
   title="React 컴포넌트"
   file_name="App.js"
   version="ES2023"
   copy=true
   content="function App() { return <div>Hello World</div>; }" %}
```

### 2. API 문서화 컴포넌트
- **파일**: `_includes/api-endpoint.html`, `_layouts/api-docs.html`
- **기능**:
  - HTTP 메서드별 색상 배지
  - 요청/응답 예시
  - 매개변수 테이블
  - 에러 코드 문서화
  - 인증 및 레이트 리밋 표시

**사용법**:
```liquid
{% include api-endpoint.html 
   method="POST" 
   endpoint="/api/users" 
   title="사용자 생성"
   auth_required=true
   parameters=site.data.user_params %}
```

### 3. 단계별 튜토리얼 시스템
- **파일**: `_includes/tutorial-step.html`, `_layouts/tutorial.html`
- **기능**:
  - 진행률 추적 및 로컬 저장
  - 체크포인트 시스템
  - 단계별 완료 상태 관리
  - 도움말 및 팁 섹션

**사용법**:
```liquid
{% include tutorial-step.html 
   step="1" 
   title="환경 설정" 
   total_steps="5"
   duration="15분"
   checkpoints=["Node.js 설치", "프로젝트 생성"] %}
```

### 4. 기술 스택 시각화
- **파일**: `_includes/tech-stack.html`, `_data/frontend_stack.yml`
- **기능**:
  - 기술별 숙련도 표시
  - 프로젝트 경험 및 링크
  - 그리드/리스트 레이아웃
  - 아이콘 및 배지 시스템

**사용법**:
```liquid
{% include tech-stack.html 
   title="프론트엔드 스택" 
   technologies=site.data.frontend_stack 
   layout="grid" %}
```

### 5. 코드 비교 (Before/After)
- **파일**: `_includes/code-comparison.html`
- **기능**:
  - 리팩토링 전후 비교
  - 문제점 및 개선사항 하이라이트
  - 성능 지표 표시
  - 설명 및 메트릭 포함

**사용법**:
```liquid
{% include code-comparison.html 
   title="함수 분리 예시"
   before_lang="javascript"
   after_lang="javascript"
   before="// 개선 전 코드"
   after="// 개선 후 코드"
   before_issues=["복잡한 로직", "가독성 부족"]
   after_improvements=["함수 분리", "명확한 네이밍"] %}
```

### 6. 기술 아티클 메타데이터
- **파일**: `_includes/reading-time.html`, `_includes/difficulty-badge.html`
- **기능**:
  - 읽기 시간 자동 계산
  - 난이도 배지 (초급/중급/고급/전문가)
  - 필요한 사전 지식 표시
  - 기술 스택 태그

**Front Matter 예시**:
```yaml
---
difficulty: "중급"
prerequisites:
  - "JavaScript 기본 문법"
  - "React 기초"
tech_stack:
  - "React 18"
  - "TypeScript"
---
```

### 7. 인터랙티브 요소
- **파일**: `assets/js/tech-blog.js`
- **기능**:
  - 코드 복사 기능
  - 튜토리얼 진행 추적
  - 확장 가능한 섹션
  - 읽기 진행률 표시
  - GitHub Gist 통합

### 8. 개발 도구 통합
- **GitHub Gist**: 외부 코드 스니펫 임베드
- **CodePen/JSFiddle**: 실시간 코드 에디터 통합 준비
- **자동 링크 감지**: GitHub, 문서 링크 아이콘 표시

## 📁 파일 구조

```
깃블로그/
├── _includes/
│   ├── code-block.html          # 고급 코드 블록
│   ├── api-endpoint.html        # API 엔드포인트
│   ├── tutorial-step.html       # 튜토리얼 단계
│   ├── tech-stack.html          # 기술 스택 표시
│   ├── code-comparison.html     # 코드 비교
│   ├── reading-time.html        # 읽기 시간
│   ├── difficulty-badge.html    # 난이도 배지
│   └── expandable-section.html  # 확장 섹션
├── _layouts/
│   ├── tutorial.html            # 튜토리얼 레이아웃
│   ├── api-docs.html           # API 문서 레이아웃
│   └── post.html               # 개선된 포스트 레이아웃
├── _data/
│   ├── frontend_stack.yml      # 프론트엔드 기술 스택
│   └── backend_stack.yml       # 백엔드 기술 스택
├── assets/
│   ├── css/main.css            # 확장된 스타일시트
│   └── js/tech-blog.js         # 기술 블로그 JavaScript
└── _config.yml                 # 기술 블로그 설정 추가
```

## 🎨 스타일링 특징

### CSS 변수 시스템
- 일관된 색상 및 간격 체계
- 다크모드 완전 지원
- 반응형 디자인
- 접근성 고려 (WCAG 2.1 AA)

### 컴포넌트 기반 설계
- 재사용 가능한 UI 컴포넌트
- 모듈러 CSS 구조
- 확장 가능한 디자인 시스템

## ⚡ 성능 최적화

### JavaScript 최적화
- 이벤트 위임 사용
- 로컬 스토리지 캐싱
- 지연 로딩 및 비동기 처리

### CSS 최적화
- CSS 변수로 재계산 최소화
- 효율적인 셀렉터 사용
- 애니메이션 최적화

## 🔧 설정 옵션

### _config.yml 설정
```yaml
tech_blog:
  reading_speed: 200  # 분당 단어 수
  code_highlighting:
    line_numbers: true
    copy_button: true
    language_badges: true
  tutorial:
    progress_tracking: true
    completion_rewards: true
  api_docs:
    expand_examples: true
    interactive_try: false
```

## 📝 포스트 작성 가이드

### 튜토리얼 포스트
```yaml
---
layout: tutorial
title: "React 튜토리얼"
tutorial_steps: 5
difficulty: "중급"
prerequisites:
  - "JavaScript 기본"
tools:
  - "VS Code"
  - "Node.js"
---
```

### API 문서 포스트
```yaml
---
layout: api-docs
title: "API 가이드"
api_version: "v1.0"
base_url: "https://api.example.com"
quick_start: |
  curl -X GET https://api.example.com/users
---
```

## 🚀 향후 확장 계획

### 계획된 기능들
1. **실시간 코드 에디터**: Monaco Editor 통합
2. **다이어그램 지원**: Mermaid.js 통합
3. **검색 기능**: Algolia 또는 Lunr.js
4. **댓글 시스템**: Giscus 또는 Utterances
5. **다국어 지원**: i18n 플러그인
6. **PWA 기능**: 오프라인 읽기 지원

### 성능 개선
1. **이미지 최적화**: WebP 지원, 지연 로딩
2. **코드 분할**: 필요한 기능만 로드
3. **CDN 통합**: 정적 리소스 최적화

## 🤝 기여 가이드

### 새로운 컴포넌트 추가
1. `_includes/` 폴더에 HTML 템플릿 생성
2. `assets/css/main.css`에 스타일 추가
3. 필요시 `assets/js/tech-blog.js`에 기능 추가
4. 사용 예시와 문서 작성

### 스타일 가이드
- CSS 변수 사용 필수
- BEM 네이밍 컨벤션 준수
- 접근성 고려 (ARIA, 시멘틱 HTML)
- 모바일 우선 반응형 디자인

이 기술 블로그 시스템은 개발자들이 효과적으로 기술 콘텐츠를 작성하고 공유할 수 있도록 설계되었습니다. 각 컴포넌트는 독립적으로 사용할 수 있으며, 필요에 따라 확장하거나 수정할 수 있습니다.