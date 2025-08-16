---
layout: page
title: 프로젝트
permalink: /projects/
---

다양한 기술을 활용하여 개발한 프로젝트들을 소개합니다.

<div class="project-grid" style="margin-top: 2rem;">
    <!-- 프로젝트 1: 기술 블로그 -->
    <article class="project-card">
        <h3>기술 블로그</h3>
        <p>Jekyll과 GitHub Pages를 활용한 개인 기술 블로그입니다. 모던한 UI/UX 디자인, 다크 모드 지원, 반응형 레이아웃, 그리고 SEO 최적화를 통해 사용자 경험을 극대화했습니다.</p>
        <div class="project-links">
            <a href="https://github.com/{{ site.author.github }}/blog" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
            <a href="{{ '/' | relative_url }}">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Live Demo
            </a>
        </div>
        <div class="tech-stack">
            <span class="tech-tag">Jekyll</span>
            <span class="tech-tag">HTML/CSS</span>
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">GitHub Pages</span>
            <span class="tech-tag">Responsive Design</span>
            <span class="tech-tag">SEO</span>
        </div>
    </article>

    <!-- 프로젝트 2: 포트폴리오 웹사이트 -->
    <article class="project-card">
        <h3>포트폴리오 웹사이트</h3>
        <p>개인 포트폴리오와 프로젝트를 소개하는 반응형 웹사이트입니다. React와 TypeScript를 활용하여 개발했으며, 모바일 최적화와 SEO를 고려한 설계로 뛰어난 사용자 경험을 제공합니다.</p>
        <div class="project-links">
            <a href="https://github.com/{{ site.author.github }}/portfolio" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
        </div>
        <div class="tech-stack">
            <span class="tech-tag">React</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Tailwind CSS</span>
            <span class="tech-tag">Vercel</span>
            <span class="tech-tag">Framer Motion</span>
        </div>
    </article>

    <!-- 프로젝트 3: 학습 관리 시스템 -->
    <article class="project-card">
        <h3>학습 관리 시스템 (LMS)</h3>
        <p>학생들의 학습 진도를 관리하고 과제를 제출할 수 있는 종합적인 웹 애플리케이션입니다. 실시간 알림, 대시보드, 진도 추적 기능을 통해 효율적인 학습 환경을 제공합니다.</p>
        <div class="project-links">
            <a href="https://github.com/{{ site.author.github }}/lms" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
        </div>
        <div class="tech-stack">
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">Express</span>
            <span class="tech-tag">MongoDB</span>
            <span class="tech-tag">Socket.io</span>
            <span class="tech-tag">JWT</span>
            <span class="tech-tag">Mongoose</span>
        </div>
    </article>

    <!-- 프로젝트 4: 날씨 앱 -->
    <article class="project-card">
        <h3>날씨 정보 앱</h3>
        <p>실시간 날씨 정보를 제공하는 PWA(Progressive Web App)입니다. 위치 기반 서비스, 7일 예보, 날씨 알림 기능을 통해 사용자에게 편리한 날씨 정보를 제공합니다.</p>
        <div class="project-links">
            <a href="https://github.com/{{ site.author.github }}/weather-app" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
            <a href="#">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Live Demo
            </a>
        </div>
        <div class="tech-stack">
            <span class="tech-tag">Vanilla JS</span>
            <span class="tech-tag">PWA</span>
            <span class="tech-tag">Service Worker</span>
            <span class="tech-tag">Geolocation API</span>
            <span class="tech-tag">Weather API</span>
        </div>
    </article>

    <!-- 프로젝트 5: 할 일 관리 앱 -->
    <article class="project-card">
        <h3>할 일 관리 앱 (Todo App)</h3>
        <p>Vue.js와 Vuex를 활용한 할 일 관리 애플리케이션입니다. 드래그 앤 드롭, 카테고리별 분류, 마감일 알림 등의 기능을 통해 효율적인 업무 관리를 지원합니다.</p>
        <div class="project-links">
            <a href="https://github.com/{{ site.author.github }}/todo-app" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
            <a href="#">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Live Demo
            </a>
        </div>
        <div class="tech-stack">
            <span class="tech-tag">Vue.js</span>
            <span class="tech-tag">Vuex</span>
            <span class="tech-tag">Vue Router</span>
            <span class="tech-tag">SCSS</span>
            <span class="tech-tag">Local Storage</span>
        </div>
    </article>

    <!-- 프로젝트 6: 이커머스 사이트 -->
    <article class="project-card">
        <h3>이커머스 플랫폼</h3>
        <p>Next.js와 Strapi를 활용한 헤드리스 이커머스 플랫폼입니다. 상품 관리, 주문 처리, 결제 시스템, 관리자 대시보드 등 완전한 온라인 쇼핑몰 기능을 제공합니다.</p>
        <div class="project-links">
            <a href="https://github.com/{{ site.author.github }}/ecommerce" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
        </div>
        <div class="tech-stack">
            <span class="tech-tag">Next.js</span>
            <span class="tech-tag">Strapi</span>
            <span class="tech-tag">PostgreSQL</span>
            <span class="tech-tag">Stripe</span>
            <span class="tech-tag">Tailwind CSS</span>
            <span class="tech-tag">Vercel</span>
        </div>
    </article>
</div>

## 기술 스택

다음과 같은 기술들을 활용하여 프로젝트를 개발하고 있습니다:

### Frontend
- **JavaScript/TypeScript**: 모던 JavaScript ES6+, TypeScript로 타입 안정성 확보
- **React**: 컴포넌트 기반 UI 라이브러리, Hooks, Context API 활용
- **Vue.js**: 점진적 프레임워크, Composition API, Vuex 상태 관리
- **Next.js**: React 기반 풀스택 프레임워크, SSR/SSG 지원
- **CSS**: CSS3, SCSS, Tailwind CSS, CSS-in-JS (styled-components)

### Backend
- **Node.js**: JavaScript 런타임, Express.js 프레임워크
- **Python**: Flask, Django 웹 프레임워크
- **Database**: MongoDB, PostgreSQL, MySQL
- **API**: RESTful API, GraphQL

### Tools & DevOps
- **Version Control**: Git, GitHub, GitLab
- **Build Tools**: Webpack, Vite, Parcel
- **Testing**: Jest, Cypress, Testing Library
- **Deployment**: Vercel, Netlify, Heroku, AWS
- **Others**: Docker, CI/CD, ESLint, Prettier

## 연락처

프로젝트에 대한 문의나 협업 제안이 있으시면 언제든지 연락해 주세요!

- **Email**: {{ site.author.email }}
- **GitHub**: [{{ site.author.github }}](https://github.com/{{ site.author.github }})