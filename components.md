---
layout: page
title: "컴포넌트"
permalink: /components/
---

# 토스 디자인 시스템 컴포넌트

이 페이지는 토스 기술 블로그에서 사용하는 디자인 시스템의 모든 컴포넌트를 보여줍니다. 각 컴포넌트는 일관된 디자인과 사용성을 제공하며, 프로젝트 전반에서 재사용할 수 있도록 설계되었습니다.

---

## 🎨 컬러 시스템

<div class="grid grid-3 mt-lg">
  <div class="card">
    <div style="width: 100%; height: 60px; background-color: #3182F6; border-radius: 8px; margin-bottom: 16px;"></div>
    <div class="text-h3">Primary</div>
    <div class="text-small text-muted">#3182F6</div>
  </div>
  <div class="card">
    <div style="width: 100%; height: 60px; background-color: #191919; border-radius: 8px; margin-bottom: 16px;"></div>
    <div class="text-h3">Text</div>
    <div class="text-small text-muted">#191919</div>
  </div>
  <div class="card">
    <div style="width: 100%; height: 60px; background-color: #6B7684; border-radius: 8px; margin-bottom: 16px;"></div>
    <div class="text-h3">Muted</div>
    <div class="text-small text-muted">#6B7684</div>
  </div>
</div>

---

## 🔤 타이포그래피

<div class="card mt-lg">
  <div class="text-hero mb-md">Hero Text (48px)</div>
  <div class="text-h1 mb-md">Heading 1 (36px)</div>
  <div class="text-h2 mb-md">Heading 2 (28px)</div>
  <div class="text-h3 mb-md">Heading 3 (20px)</div>
  <div class="text-body mb-md">Body Text (16px) - 이것은 본문 텍스트입니다. 가독성을 위해 적절한 줄 간격과 크기로 설정되었습니다.</div>
  <div class="text-small text-muted">Small Text (14px) - 보조 정보나 메타데이터에 사용됩니다.</div>
</div>

---

## 🔘 버튼

<div class="card mt-lg">
  <div class="text-h3 mb-md">Primary Buttons</div>
  <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 32px;">
    <button class="btn btn-primary">Primary Button</button>
    <button class="btn btn-primary btn-small">Small Primary</button>
    <button class="btn btn-primary btn-large">Large Primary</button>
  </div>
  
  <div class="text-h3 mb-md">Secondary Buttons</div>
  <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 32px;">
    <button class="btn btn-secondary">Secondary Button</button>
    <button class="btn btn-secondary btn-small">Small Secondary</button>
    <button class="btn btn-secondary btn-large">Large Secondary</button>
  </div>
  
  <div class="text-h3 mb-md">Ghost Buttons</div>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <button class="btn btn-ghost">Ghost Button</button>
    <button class="btn btn-ghost btn-small">Small Ghost</button>
    <button class="btn btn-ghost btn-large">Large Ghost</button>
  </div>
</div>

---

## 🃏 카드

<div class="grid grid-2 mt-lg">
  <div class="card">
    <div class="card-header">
      <div class="card-title">기본 카드</div>
      <div class="card-description">이것은 기본 카드 컴포넌트입니다. 콘텐츠를 구조화하여 표시할 때 사용합니다.</div>
    </div>
    <div class="card-content">
      <p>카드의 주요 콘텐츠가 여기에 들어갑니다. 텍스트, 이미지, 버튼 등 다양한 요소를 포함할 수 있습니다.</p>
    </div>
    <div class="card-footer">
      <div class="text-small text-muted">2024.01.15</div>
      <button class="btn btn-ghost btn-small">더보기</button>
    </div>
  </div>
  
  <div class="card card-bordered card-clickable">
    <div class="card-header">
      <div class="card-title">클릭 가능한 카드</div>
      <div class="card-description">이 카드는 클릭할 수 있으며, 호버 효과가 적용됩니다.</div>
    </div>
    <div class="card-content">
      <p>마우스를 올려보세요. 카드가 살짝 위로 올라가는 애니메이션을 확인할 수 있습니다.</p>
    </div>
    <div class="card-footer">
      <div class="text-small text-muted">2024.01.15</div>
      <span class="badge badge-primary">추천</span>
    </div>
  </div>
</div>

---

## 🏷️ 태그 & 배지

<div class="card mt-lg">
  <div class="text-h3 mb-md">태그</div>
  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;">
    <span class="tag">기본 태그</span>
    <span class="tag tag-primary">Primary</span>
    <span class="tag tag-success">Success</span>
    <span class="tag tag-warning">Warning</span>
    <span class="tag tag-danger">Danger</span>
  </div>
  
  <div class="text-h3 mb-md">배지</div>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <span class="badge badge-primary">New</span>
    <span class="badge badge-secondary">Hot</span>
    <span class="badge badge-primary">Premium</span>
  </div>
</div>

---

## 👤 아바타

<div class="card mt-lg">
  <div class="text-h3 mb-md">아바타 크기</div>
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    <div class="avatar avatar-sm">김</div>
    <div class="avatar avatar-md">김준</div>
    <div class="avatar avatar-lg">김준희</div>
  </div>
</div>

---

## 📰 아티클 카드

<div class="grid grid-2 mt-lg">
  <a href="#" class="article-card">
    <div class="article-card-title">React 18의 새로운 기능들</div>
    <div class="article-card-description">React 18에서 새롭게 추가된 Concurrent Features와 Automatic Batching에 대해 알아봅시다.</div>
    <div class="article-card-meta">
      <span>2024.01.15</span>
      <span>•</span>
      <span>5분 읽기</span>
      <span>•</span>
      <span>김준희</span>
    </div>
    <div class="article-card-tags">
      <span class="tag tag-primary">React</span>
      <span class="tag">Frontend</span>
      <span class="tag">JavaScript</span>
    </div>
  </a>
  
  <a href="#" class="article-card">
    <div class="article-card-title">TypeScript 5.0 새로운 기능</div>
    <div class="article-card-description">TypeScript 5.0에서 추가된 새로운 기능들과 개선사항을 살펴보겠습니다.</div>
    <div class="article-card-meta">
      <span>2024.01.12</span>
      <span>•</span>
      <span>7분 읽기</span>
      <span>•</span>
      <span>김준희</span>
    </div>
    <div class="article-card-tags">
      <span class="tag tag-success">TypeScript</span>
      <span class="tag">JavaScript</span>
    </div>
  </a>
</div>

---

## 🔄 로딩 스피너

<div class="card mt-lg">
  <div class="text-h3 mb-md">스피너 크기</div>
  <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="spinner spinner-sm"></div>
      <div class="text-small">Small</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="spinner"></div>
      <div class="text-small">Medium</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="spinner spinner-lg"></div>
      <div class="text-small">Large</div>
    </div>
  </div>
</div>

---

## 📐 그리드 시스템

<div class="card mt-lg">
  <div class="text-h3 mb-md">2열 그리드</div>
  <div class="grid grid-2" style="margin-bottom: 32px;">
    <div style="background: #f2f4f6; padding: 16px; border-radius: 8px; text-align: center;">Grid Item 1</div>
    <div style="background: #f2f4f6; padding: 16px; border-radius: 8px; text-align: center;">Grid Item 2</div>
  </div>
  
  <div class="text-h3 mb-md">3열 그리드</div>
  <div class="grid grid-3" style="margin-bottom: 32px;">
    <div style="background: #f2f4f6; padding: 16px; border-radius: 8px; text-align: center;">Grid Item 1</div>
    <div style="background: #f2f4f6; padding: 16px; border-radius: 8px; text-align: center;">Grid Item 2</div>
    <div style="background: #f2f4f6; padding: 16px; border-radius: 8px; text-align: center;">Grid Item 3</div>
  </div>
  
  <div class="text-h3 mb-md">4열 그리드</div>
  <div class="grid grid-4">
    <div style="background: #f2f4f6; padding: 16px; border-radius: 8px; text-align: center;">Grid Item 1</div>
    <div style="background: #f2f4f6; padding: 16px; border-radius: 8px; text-align: center;">Grid Item 2</div>
    <div style="background: #f2f4f6; padding: 16px; border-radius: 8px; text-align: center;">Grid Item 3</div>
    <div style="background: #f2f4f6; padding: 16px; border-radius: 8px; text-align: center;">Grid Item 4</div>
  </div>
</div>

---

## 📱 반응형 테스트

<div class="card mt-lg">
  <div class="text-h3 mb-md">반응형 동작 확인</div>
  <p class="text-body mb-md">브라우저 창 크기를 조절해보세요. 다음과 같은 변화를 확인할 수 있습니다:</p>
  <ul style="margin: 16px 0; padding-left: 24px;">
    <li>모바일 (768px 미만): 모든 그리드가 1열로 변경</li>
    <li>태블릿 (768px-1024px): 3열/4열 그리드가 2열로 변경</li>
    <li>데스크톱 (1024px 이상): 모든 그리드가 원래 열 수대로 표시</li>
  </ul>
  
  <div class="divider"></div>
  
  <div class="text-h3 mb-md">간격 테스트</div>
  <div style="background: #f9fafb; padding: 24px; border-radius: 12px;">
    <div class="mb-xs" style="background: #e5e8eb; padding: 8px; border-radius: 4px;">margin-bottom: xs (8px)</div>
    <div class="mb-sm" style="background: #e5e8eb; padding: 8px; border-radius: 4px;">margin-bottom: sm (16px)</div>
    <div class="mb-md" style="background: #e5e8eb; padding: 8px; border-radius: 4px;">margin-bottom: md (24px)</div>
    <div class="mb-lg" style="background: #e5e8eb; padding: 8px; border-radius: 4px;">margin-bottom: lg (32px)</div>
    <div style="background: #e5e8eb; padding: 8px; border-radius: 4px;">마지막 요소</div>
  </div>
</div>

---

<div class="text-center mt-xl">
  <p class="text-muted">이 컴포넌트들은 토스 디자인 시스템을 기반으로 제작되었습니다.</p>
  <p class="text-small text-muted">모든 컴포넌트는 접근성과 사용성을 고려하여 설계되었습니다.</p>
</div>

<style>
  .text-center {
    text-align: center;
  }
</style>