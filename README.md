# 개발 블로그

Jekyll 기반 개발 블로그입니다.

## 🚀 빠른 시작

### 1. 로컬 환경 설정

#### Ruby 설치 확인
```bash
ruby --version
```

Ruby가 설치되어 있지 않다면 [Ruby 공식 웹사이트](https://www.ruby-lang.org/)에서 설치하세요.

#### Jekyll 및 의존성 설치
```bash
# Bundler 설치
gem install bundler

# 의존성 설치
bundle install
```

### 2. 로컬 서버 실행

```bash
# 개발 서버 시작
bundle exec jekyll serve

# 또는 자동 재빌드와 함께
bundle exec jekyll serve --livereload
```

브라우저에서 `http://localhost:4000`으로 접속하여 블로그를 확인할 수 있습니다.

## 📝 GitHub Pages 배포

### 1. GitHub 저장소 생성

1. GitHub에서 새 저장소를 생성합니다
2. 저장소 이름은 다음 중 하나로 설정:
   - `[username].github.io` (메인 사이트용)
   - 또는 원하는 이름 (프로젝트 사이트용)

### 2. Git 저장소 초기화 및 연결

```bash
# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "Initial commit: Jekyll blog setup"

# GitHub 저장소와 연결 (본인의 저장소 URL로 변경)
git remote add origin https://github.com/[username]/[repository-name].git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 3. GitHub Pages 활성화

1. GitHub 저장소 페이지에서 **Settings** 탭으로 이동
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**에서 **Deploy from a branch** 선택
4. **Branch**에서 **main** 선택하고 **Save**

몇 분 후 `https://[username].github.io/[repository-name]`에서 블로그를 확인할 수 있습니다.

## ⚙️ 설정 사용자화

### _config.yml 수정

`_config.yml` 파일에서 다음 내용을 본인의 정보로 수정하세요:

```yaml
title: "본인의 블로그 제목"
description: "블로그 설명"
url: "https://[username].github.io"  # GitHub Pages URL
baseurl: ""  # 저장소 이름이 username.github.io가 아닌 경우 "/repository-name"

author:
  name: "본인 이름"
  email: "이메일@example.com"
  github: "github-username"

social_links:
  github: github-username
  twitter: twitter-username
  linkedin: linkedin-username
```

## 📰 새 포스트 작성

### 포스트 파일 생성

`_posts` 폴더에 `YYYY-MM-DD-title.md` 형식으로 파일을 생성합니다.

```markdown
---
layout: post
title: "포스트 제목"
date: YYYY-MM-DD HH:MM:SS +0900
categories: [카테고리1, 카테고리2]
tags: [태그1, 태그2, 태그3]
excerpt: "포스트 요약"
---

포스트 내용을 여기에 작성합니다.
```

### 포스트 작성 팁

- 파일명은 영문으로 작성하는 것을 권장합니다
- 날짜는 정확한 날짜를 입력하세요
- excerpt는 홈페이지에서 미리보기로 표시됩니다

## 🎨 커스터마이징

### CSS 수정
- `assets/css/main.css`에서 스타일을 수정할 수 있습니다

### 레이아웃 수정
- `_layouts` 폴더의 파일들을 수정하여 레이아웃을 변경할 수 있습니다

### 새 페이지 추가
- 루트 디렉토리에 `.md` 파일을 생성하여 새 페이지를 추가할 수 있습니다

## 📂 프로젝트 구조

```
├── _config.yml          # Jekyll 설정 파일
├── _layouts/            # 레이아웃 템플릿
│   ├── default.html
│   ├── home.html
│   ├── page.html
│   └── post.html
├── _posts/              # 블로그 포스트
├── _includes/           # 재사용 가능한 HTML 조각
├── _sass/               # Sass 스타일시트
├── assets/              # 정적 파일 (CSS, JS, 이미지)
│   ├── css/
│   ├── js/
│   └── images/
├── index.md             # 홈페이지
├── about.md             # 소개 페이지
├── posts.md             # 포스트 목록 페이지
├── Gemfile              # Ruby 의존성 관리
└── README.md            # 이 파일
```

## 🔧 문제 해결

### 의존성 오류
```bash
bundle update
```

### 로컬 서버가 시작되지 않는 경우
```bash
bundle exec jekyll doctor
```

### GitHub Pages 빌드 실패
- GitHub 저장소의 Actions 탭에서 오류 로그를 확인하세요
- `_config.yml`의 플러그인이 GitHub Pages에서 지원되는지 확인하세요

## 📚 참고 자료

- [Jekyll 공식 문서](https://jekyllrb.com/)
- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [Markdown 가이드](https://www.markdownguide.org/)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.