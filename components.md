---
layout: page
title: "컴포넌트"
permalink: /components/
---

# 토스 디자인 시스템

토스의 새로운 디자인 시스템으로 만든 모든 컴포넌트를 소개합니다. 일관된 디자인과 사용성을 제공하며, 전체 제품에서 재사용 가능하도록 설계되었습니다.

---

## Colors

브랜드 컬러와 텍스트 컬러를 포함한 토스의 주요 컬러 팔레트입니다.

<div class="grid grid-4 mt-lg">
  <div class="card">
    <div style="width: 100%; height: 80px; background-color: #7C3AED; border-radius: 12px; margin-bottom: 20px;"></div>
    <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 4px;">Primary Purple</div>
    <div style="font-size: 14px; color: #6B7684;">#7C3AED</div>
  </div>
  <div class="card">
    <div style="width: 100%; height: 80px; background-color: #191919; border-radius: 12px; margin-bottom: 20px;"></div>
    <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 4px;">Grey 900</div>
    <div style="font-size: 14px; color: #6B7684;">#191919</div>
  </div>
  <div class="card">
    <div style="width: 100%; height: 80px; background-color: #6B7684; border-radius: 12px; margin-bottom: 20px;"></div>
    <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 4px;">Grey 600</div>
    <div style="font-size: 14px; color: #6B7684;">#6B7684</div>
  </div>
  <div class="card">
    <div style="width: 100%; height: 80px; background-color: #F2F4F6; border-radius: 12px; margin-bottom: 20px;"></div>
    <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 4px;">Grey 100</div>
    <div style="font-size: 14px; color: #6B7684;">#F2F4F6</div>
  </div>
</div>

---

## Typography

토스 브랜드에 맞춰 디자인된 폰트 체계입니다. 가독성과 사용성을 고려하여 설계되었습니다.

<div class="card mt-lg">
  <div style="font-size: 48px; line-height: 1.2; font-weight: 700; margin-bottom: 32px; color: #191919;">Hero Title</div>
  <div style="font-size: 36px; line-height: 1.3; font-weight: 700; margin-bottom: 24px; color: #191919;">Heading 1</div>
  <div style="font-size: 28px; line-height: 1.4; font-weight: 600; margin-bottom: 20px; color: #191919;">Heading 2</div>
  <div style="font-size: 20px; line-height: 1.5; font-weight: 600; margin-bottom: 16px; color: #191919;">Heading 3</div>
  <div style="font-size: 16px; line-height: 1.6; font-weight: 400; margin-bottom: 16px; color: #191919;">본문 텍스트입니다. 가독성을 위해 적절한 줄 간격과 크기로 설정되었습니다.</div>
  <div style="font-size: 14px; line-height: 1.5; font-weight: 400; color: #6B7684;">보조 텍스트 및 메타 정보에 사용됩니다.</div>
</div>

---

## Buttons

토스의 새로운 버튼 디자인은 명확하고 직관적인 사용자 경험을 제공합니다.

<div class="grid grid-2 mt-lg">
  <div class="card">
    <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 16px;">Primary</div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <button class="btn btn-primary">Primary Button</button>
      <button class="btn btn-primary btn-small">Small Primary</button>
      <button class="btn btn-primary btn-large">Large Primary</button>
    </div>
  </div>
  
  <div class="card">
    <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 16px;">Secondary</div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <button class="btn btn-secondary">Secondary Button</button>
      <button class="btn btn-secondary btn-small">Small Secondary</button>
      <button class="btn btn-secondary btn-large">Large Secondary</button>
    </div>
  </div>
</div>

<div class="card mt-lg">
  <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 16px;">Ghost Buttons</div>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <button class="btn btn-ghost">Ghost Button</button>
    <button class="btn btn-ghost btn-small">Small Ghost</button>
    <button class="btn btn-ghost btn-large">Large Ghost</button>
  </div>
</div>

---

## Cards

콘텐츠를 직관적이고 일관된 방식으로 표시하는 카드 컴포넌트입니다.

<div class="grid grid-2 mt-lg">
  <div class="card">
    <div class="card-header">
      <div class="card-title">Default Card</div>
      <div class="card-description">기본 카드 컴포넌트로 콘텐츠를 구조화하여 표시합니다.</div>
    </div>
    <div class="card-content">
      <p style="color: #6B7684; font-size: 15px; line-height: 1.6; margin: 0;">카드의 주요 콘텐츠가 여기에 들어갑니다. 텍스트, 이미지, 버튼 등 다양한 요소를 포함할 수 있습니다.</p>
    </div>
    <div class="card-footer">
      <div style="font-size: 14px; color: #8B95A1;">2024.01.15</div>
      <button class="btn btn-ghost btn-small">더보기</button>
    </div>
  </div>
  
  <div class="card card-bordered card-clickable">
    <div class="card-header">
      <div class="card-title">Interactive Card</div>
      <div class="card-description">클릭 가능한 카드로 호버 효과와 인터랙션을 제공합니다.</div>
    </div>
    <div class="card-content">
      <p style="color: #6B7684; font-size: 15px; line-height: 1.6; margin: 0;">마우스를 올려보세요. 카드가 살짝 위로 올라가는 애니메이션을 확인할 수 있습니다.</p>
    </div>
    <div class="card-footer">
      <div style="font-size: 14px; color: #8B95A1;">2024.01.15</div>
      <span class="badge badge-primary">추천</span>
    </div>
  </div>
</div>

---

## Tags & Badges

콘텐츠를 분류하고 중요한 정보를 강조하는 태그와 배지 컴포넌트입니다.

<div class="grid grid-2 mt-lg">
  <div class="card">
    <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 16px;">Tags</div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <span class="tag">기본</span>
      <span class="tag tag-primary">React</span>
      <span class="tag tag-success">TypeScript</span>
      <span class="tag tag-warning">JavaScript</span>
      <span class="tag tag-danger">Deprecated</span>
    </div>
  </div>
  
  <div class="card">
    <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 16px;">Badges</div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <span class="badge badge-primary">New</span>
      <span class="badge badge-secondary">Hot</span>
      <span class="badge badge-primary">Premium</span>
    </div>
  </div>
</div>

---

## Avatars

사용자를 나타내는 아바타 컴포넌트로 다양한 크기를 지원합니다.

<div class="card mt-lg">
  <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="avatar avatar-sm">김</div>
      <div style="font-size: 13px; color: #6B7684;">Small (32px)</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="avatar avatar-md">김준</div>
      <div style="font-size: 13px; color: #6B7684;">Medium (40px)</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="avatar avatar-lg">김준희</div>
      <div style="font-size: 13px; color: #6B7684;">Large (48px)</div>
    </div>
  </div>
</div>

---

## Article Cards

블로그 글과 아티클을 표시하는 전용 카드 컴포넌트입니다.

<div class="grid grid-2 mt-lg">
  <a href="#" class="article-card">
    <div class="article-card-title">토스의 새로운 디자인 시스템</div>
    <div class="article-card-description">더 나은 사용자 경험을 위해 새롭게 만든 토스의 디자인 시스템을 소개합니다.</div>
    <div class="article-card-meta">
      <span>2024.01.15</span>
      <span>•</span>
      <span>5분 읽기</span>
      <span>•</span>
      <span>김준희</span>
    </div>
    <div class="article-card-tags">
      <span class="tag tag-primary">Design</span>
      <span class="tag">Frontend</span>
      <span class="tag">UI</span>
    </div>
  </a>
  
  <a href="#" class="article-card">
    <div class="article-card-title">React로 브랜드 경험 만들기</div>
    <div class="article-card-description">리액트를 사용해 일관된 브랜드 경험을 만드는 방법을 알아보세요.</div>
    <div class="article-card-meta">
      <span>2024.01.12</span>
      <span>•</span>
      <span>7분 읽기</span>
      <span>•</span>
      <span>김준희</span>
    </div>
    <div class="article-card-tags">
      <span class="tag tag-primary">React</span>
      <span class="tag tag-success">TypeScript</span>
    </div>
  </a>
</div>

---

## Loading Spinners

데이터를 불러오거나 처리 중일 때 사용하는 로딩 스피너입니다.

<div class="card mt-lg">
  <div style="display: flex; gap: 48px; align-items: center; justify-content: center; flex-wrap: wrap;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <div class="spinner spinner-sm"></div>
      <div style="font-size: 13px; color: #6B7684;">Small (16px)</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <div class="spinner"></div>
      <div style="font-size: 13px; color: #6B7684;">Medium (20px)</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <div class="spinner spinner-lg"></div>
      <div style="font-size: 13px; color: #6B7684;">Large (24px)</div>
    </div>
  </div>
</div>

---

## Grid System

콘텐츠를 일관된 그리드로 배치하는 레이아웃 시스템입니다.

<div class="card mt-lg">
  <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 24px;">2 Column Grid</div>
  <div class="grid grid-2" style="margin-bottom: 32px;">
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; color: #191919; font-weight: 500;">Grid Item 1</div>
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; color: #191919; font-weight: 500;">Grid Item 2</div>
  </div>
  
  <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 24px;">3 Column Grid</div>
  <div class="grid grid-3" style="margin-bottom: 32px;">
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; color: #191919; font-weight: 500;">Grid Item 1</div>
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; color: #191919; font-weight: 500;">Grid Item 2</div>
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; color: #191919; font-weight: 500;">Grid Item 3</div>
  </div>
  
  <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 24px;">4 Column Grid</div>
  <div class="grid grid-4">
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; color: #191919; font-weight: 500;">Grid Item 1</div>
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; color: #191919; font-weight: 500;">Grid Item 2</div>
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; color: #191919; font-weight: 500;">Grid Item 3</div>
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; color: #191919; font-weight: 500;">Grid Item 4</div>
  </div>
</div>

---

## Responsive Design

모든 디바이스에서 일관된 경험을 제공하는 반응형 디자인 시스템입니다.

<div class="card mt-lg">
  <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 16px;">반응형 브레이크포인트</div>
  <div style="color: #6B7684; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">브라우저 창 크기를 조절해보세요. 다음과 같은 변화를 확인할 수 있습니다:</div>
  
  <div class="grid grid-3" style="margin-bottom: 32px;">
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center;">
      <div style="font-size: 16px; font-weight: 600; color: #191919; margin-bottom: 8px;">Mobile</div>
      <div style="font-size: 14px; color: #6B7684;">0px - 768px</div>
      <div style="font-size: 13px; color: #8B95A1; margin-top: 4px;">1 Column Grid</div>
    </div>
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center;">
      <div style="font-size: 16px; font-weight: 600; color: #191919; margin-bottom: 8px;">Tablet</div>
      <div style="font-size: 14px; color: #6B7684;">768px - 1024px</div>
      <div style="font-size: 13px; color: #8B95A1; margin-top: 4px;">2 Column Grid</div>
    </div>
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center;">
      <div style="font-size: 16px; font-weight: 600; color: #191919; margin-bottom: 8px;">Desktop</div>
      <div style="font-size: 14px; color: #6B7684;">1024px+</div>
      <div style="font-size: 13px; color: #8B95A1; margin-top: 4px;">Full Grid</div>
    </div>
  </div>
  
  <div class="divider"></div>
  
  <div style="font-size: 18px; font-weight: 600; color: #191919; margin-bottom: 16px;">스페이싱 시스템</div>
  <div style="background: #F9FAFB; padding: 24px; border-radius: 12px;">
    <div class="mb-xs" style="background: #E5E8EB; padding: 12px; border-radius: 8px; font-size: 14px; color: #6B7684;">8px spacing (xs)</div>
    <div class="mb-sm" style="background: #E5E8EB; padding: 12px; border-radius: 8px; font-size: 14px; color: #6B7684;">16px spacing (sm)</div>
    <div class="mb-md" style="background: #E5E8EB; padding: 12px; border-radius: 8px; font-size: 14px; color: #6B7684;">24px spacing (md)</div>
    <div class="mb-lg" style="background: #E5E8EB; padding: 12px; border-radius: 8px; font-size: 14px; color: #6B7684;">32px spacing (lg)</div>
    <div style="background: #E5E8EB; padding: 12px; border-radius: 8px; font-size: 14px; color: #6B7684;">마지막 요소</div>
  </div>
</div>

---

<div class="card mt-xl" style="text-align: center; background: linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%);">
  <div style="font-size: 24px; font-weight: 600; color: #191919; margin-bottom: 16px;">토스 디자인 시스템</div>
  <div style="font-size: 16px; color: #6B7684; line-height: 1.6; margin-bottom: 16px;">사용자 중심의 디자인 철학을 바탕으로 제작된 컴포넌트들입니다.</div>
  <div style="font-size: 14px; color: #8B95A1;">접근성, 사용성, 일관성을 모두 고려한 디자인 시스템</div>
</div>

<style>
  .text-center {
    text-align: center;
  }
</style>