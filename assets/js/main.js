// 메인 JavaScript 파일
(function() {
    'use strict';
    
    // 부드러운 스크롤 기능
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // 코드 블록 복사 기능 (보안 강화)
    function initCodeCopy() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach((codeBlock, index) => {
            const pre = codeBlock.parentElement;
            const button = document.createElement('button');
            
            button.className = 'copy-code-btn';
            button.innerHTML = `
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
                <span class="copy-text">복사</span>
            `;
            button.setAttribute('aria-label', '코드 복사');
            button.setAttribute('title', '클립보드에 복사');
            button.setAttribute('type', 'button');
            
            // 버튼 스타일
            Object.assign(button.style, {
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                opacity: '0',
                transition: 'opacity 0.2s ease'
            });
            
            // pre 태그에 상대 위치 설정
            pre.style.position = 'relative';
            
            // 마우스 오버 시 버튼 표시
            pre.addEventListener('mouseenter', () => {
                button.style.opacity = '1';
            });
            
            pre.addEventListener('mouseleave', () => {
                button.style.opacity = '0';
            });
            
            // 복사 기능 (보안 검증 포함)
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                
                try {
                    // 코드 내용 검증 및 정제
                    const codeText = codeBlock.textContent;
                    
                    // 기본 보안 검증 (악성 코드 패턴 감지)
                    const dangerousPatterns = [
                        /rm\s+-rf\s+\//, 
                        /sudo\s+rm/,
                        /:\(\)\{.*\}/, // fork bomb
                        /eval\s*\(/,
                        /document\.write\s*\(/
                    ];
                    
                    const hasDangerousPattern = dangerousPatterns.some(pattern => 
                        pattern.test(codeText)
                    );
                    
                    if (hasDangerousPattern) {
                        window.announceToScreenReader?.('보안상의 이유로 이 코드는 복사할 수 없습니다');
                        return;
                    }
                    
                    // 클립보드 API 보안 확인
                    if (!navigator.clipboard || !window.isSecureContext) {
                        throw new Error('보안 컨텍스트가 필요합니다');
                    }
                    
                    await navigator.clipboard.writeText(codeText);
                    
                    // 성공 피드백
                    const originalContent = button.innerHTML;
                    const copyTextSpan = button.querySelector('.copy-text');
                    
                    if (copyTextSpan) {
                        copyTextSpan.textContent = '복사됨!';
                    }
                    
                    button.style.backgroundColor = 'var(--primary-color)';
                    button.style.color = 'white';
                    
                    // 스크린 리더에 알림
                    window.announceToScreenReader?.('코드가 클립보드에 복사되었습니다');
                    
                    setTimeout(() => {
                        button.innerHTML = originalContent;
                        button.style.backgroundColor = 'var(--bg-tertiary)';
                        button.style.color = 'var(--text-secondary)';
                    }, 2000);
                    
                } catch (err) {
                    console.error('코드 복사 실패:', err);
                    
                    // 실패 피드백
                    const copyTextSpan = button.querySelector('.copy-text');
                    if (copyTextSpan) {
                        copyTextSpan.textContent = '복사 실패';
                        setTimeout(() => {
                            copyTextSpan.textContent = '복사';
                        }, 2000);
                    }
                    
                    window.announceToScreenReader?.('코드 복사에 실패했습니다');
                }
            });
            
            pre.appendChild(button);
        });
    }
    
    // 목차 자동 생성 (포스트 페이지에서만)
    function initTableOfContents() {
        if (!document.querySelector('.post-content')) return;
        
        const headings = document.querySelectorAll('.post-content h2, .post-content h3');
        if (headings.length < 3) return; // 헤딩이 3개 미만이면 목차 생성 안함
        
        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.innerHTML = '<h3>목차</h3><ul></ul>';
        
        const tocList = toc.querySelector('ul');
        
        headings.forEach((heading, index) => {
            // ID 생성
            const id = `heading-${index}`;
            heading.id = id;
            
            // 목차 아이템 생성
            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-sub' : 'toc-main';
            
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth' });
            });
            
            li.appendChild(link);
            tocList.appendChild(li);
        });
        
        // 목차 스타일
        const tocStyles = `
            .table-of-contents {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 1.5rem;
                margin: 2rem 0;
                max-width: 300px;
                position: sticky;
                top: 100px;
                align-self: flex-start;
            }
            
            .table-of-contents h3 {
                margin: 0 0 1rem 0;
                font-size: 1rem;
                color: var(--text-primary);
            }
            
            .table-of-contents ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .table-of-contents li {
                margin-bottom: 0.5rem;
            }
            
            .table-of-contents .toc-sub {
                margin-left: 1rem;
                font-size: 0.9rem;
            }
            
            .table-of-contents a {
                color: var(--text-secondary);
                text-decoration: none;
                transition: color 0.2s ease;
            }
            
            .table-of-contents a:hover {
                color: var(--primary-color);
            }
        `;
        
        // 스타일 추가
        if (!document.querySelector('#toc-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'toc-styles';
            styleSheet.textContent = tocStyles;
            document.head.appendChild(styleSheet);
        }
        
        // 첫 번째 헤딩 앞에 목차 삽입
        const firstHeading = document.querySelector('.post-content h2');
        if (firstHeading) {
            firstHeading.parentNode.insertBefore(toc, firstHeading);
        }
    }
    
    // 이미지 레이지 로딩
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // 검색 기능 (미래 확장을 위한 기본 구조)
    function initSearch() {
        const searchInput = document.querySelector('#search-input');
        if (!searchInput) return;
        
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = e.target.value.trim();
                if (query.length > 2) {
                    // 여기에 검색 로직 구현
                    console.log('검색어:', query);
                }
            }, 300);
        });
    }
    
    // 외부 링크 보안 및 접근성 강화
    function initExternalLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (link.hostname !== window.location.hostname) {
                // 보안 속성 설정
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer nofollow');
                
                // URL 검증 (기본적인 보안 검사)
                const href = link.getAttribute('href');
                try {
                    const url = new URL(href);
                    
                    // 의심스러운 프로토콜 차단
                    if (!['http:', 'https:'].includes(url.protocol)) {
                        console.warn('차단된 프로토콜:', url.protocol);
                        link.style.opacity = '0.5';
                        link.setAttribute('aria-label', '보안상의 이유로 차단된 링크');
                        return;
                    }
                    
                } catch (e) {
                    console.warn('유효하지 않은 URL:', href);
                    return;
                }
                
                // 스크린 리더용 텍스트 추가
                const srText = document.createElement('span');
                srText.className = 'sr-only';
                srText.textContent = ' (새 창에서 열림)';
                link.appendChild(srText);
                
                // 외부 링크 아이콘 추가
                if (!link.querySelector('.external-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'external-icon';
                    icon.setAttribute('aria-hidden', 'true');
                    icon.innerHTML = `
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-left: 0.25rem; vertical-align: text-top;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    `;
                    link.appendChild(icon);
                }
                
                // 클릭 이벤트 보안 강화
                link.addEventListener('click', (e) => {
                    // 추가 보안 검증
                    const currentHref = link.getAttribute('href');
                    if (currentHref !== href) {
                        e.preventDefault();
                        console.warn('링크가 변조되었습니다');
                        window.announceToScreenReader?.('보안상의 이유로 링크가 차단되었습니다');
                        return false;
                    }
                });
            }
        });
    }
    
    // 마이크로 인터랙션 및 애니메이션 초기화
    function initMicroInteractions() {
        // 페이지 로드 애니메이션
        const elementsToAnimate = document.querySelectorAll('.post-item, .project-card, .hero, .posts, .projects');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // 버튼 애니메이션 초기화
    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.btn, .project-card, .post-item');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-2px) scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-2px)';
            });
        });
    }
    
    // 텍스트 타이핑 애니메이션 (히어로 섹션용)
    function initTypingAnimation() {
        const heroTitle = document.querySelector('.hero h1');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // 타이핑 완료 후 커서 깜빡임 효과
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // 페이지 로드 후 0.5초 뒤에 타이핑 시작
        setTimeout(typeWriter, 500);
    }
    
    // 스크롤 시 패럴랙스 효과
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }, { passive: true });
    }
    
    // 카드 호버 효과 개선
    function initAdvancedCardEffects() {
        const cards = document.querySelectorAll('.post-item, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }
    
    // 스크롤 진행률 원형 인디케이터
    function initCircularProgress() {
        if (!document.querySelector('.post-content')) return;
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'circular-progress';
        progressContainer.innerHTML = `
            <svg width="60" height="60">
                <circle cx="30" cy="30" r="25" stroke="var(--border-color)" stroke-width="3" fill="none"></circle>
                <circle cx="30" cy="30" r="25" stroke="var(--primary-color)" stroke-width="3" fill="none" 
                        stroke-dasharray="157" stroke-dashoffset="157" class="progress-ring"></circle>
            </svg>
            <span class="progress-text">0%</span>
        `;
        
        // 스타일 추가
        Object.assign(progressContainer.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '1000',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });
        
        document.body.appendChild(progressContainer);
        
        const progressRing = progressContainer.querySelector('.progress-ring');
        const progressText = progressContainer.querySelector('.progress-text');
        const circumference = 2 * Math.PI * 25;
        
        function updateProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop / documentHeight) * 100;
            
            const offset = circumference - (progress / 100 * circumference);
            progressRing.style.strokeDashoffset = offset;
            progressText.textContent = Math.round(progress) + '%';
            
            if (scrollTop > 100) {
                progressContainer.style.opacity = '1';
            } else {
                progressContainer.style.opacity = '0';
            }
        }
        
        window.addEventListener('scroll', updateProgress, { passive: true });
    }
    
    // 전역 보안 및 오류 처리
    function initSecurity() {
        // Content Security Policy 위반 감지
        document.addEventListener('securitypolicyviolation', (e) => {
            console.warn('CSP 위반 감지:', e.violatedDirective, e.blockedURI);
        });
        
        // 전역 오류 처리
        window.addEventListener('error', (e) => {
            console.error('JavaScript 오류:', e.error, e.filename, e.lineno);
            
            // 사용자에게 친화적인 오류 메시지 (개발 환경에서만)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.group('디버그 정보');
                console.log('오류 메시지:', e.message);
                console.log('파일:', e.filename);
                console.log('라인:', e.lineno);
                console.log('스택:', e.error?.stack);
                console.groupEnd();
            }
        });
        
        // Promise 거부 처리
        window.addEventListener('unhandledrejection', (e) => {
            console.error('처리되지 않은 Promise 거부:', e.reason);
            e.preventDefault(); // 기본 에러 처리 방지
        });
        
        // 기본적인 XSS 방지
        const sanitizeString = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };
        
        // 전역 유틸리티로 제공
        window.sanitizeString = sanitizeString;
        
        // localStorage 사용 시 보안 검증
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            // 민감한 정보 저장 방지
            const sensitivePatterns = [
                /password/i,
                /token/i,
                /secret/i,
                /api[_-]?key/i
            ];
            
            if (sensitivePatterns.some(pattern => pattern.test(key))) {
                console.warn('민감한 정보를 localStorage에 저장하려 했습니다:', key);
                return;
            }
            
            return originalSetItem.call(this, key, value);
        };
    }
    
    // 접근성 개선 초기화
    function initAccessibility() {
        // 키보드 네비게이션 개선
        document.addEventListener('keydown', function(e) {
            // ESC 키로 모달/오버레이 닫기
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal, .overlay');
                modals.forEach(modal => {
                    if (modal.style.display !== 'none') {
                        modal.style.display = 'none';
                        // 포커스를 이전 요소로 복원
                        const trigger = modal.dataset.trigger;
                        if (trigger) {
                            document.querySelector(trigger)?.focus();
                        }
                    }
                });
            }
            
            // Tab 트래핑 (모달이 열려있을 때)
            if (e.key === 'Tab') {
                const modal = document.querySelector('.modal:not([style*="display: none"])');
                if (modal) {
                    const focusableElements = modal.querySelectorAll(
                        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
                    );
                    const firstFocusable = focusableElements[0];
                    const lastFocusable = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            }
        });
        
        // 스킵 링크 개선
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // ARIA 라이브 리전 추가
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'live-region';
        document.body.appendChild(liveRegion);
        
        // 전역 라이브 리전 함수
        window.announceToScreenReader = function(message) {
            const liveRegion = document.querySelector('.live-region');
            if (liveRegion) {
                liveRegion.textContent = message;
                setTimeout(() => {
                    liveRegion.textContent = '';
                }, 1000);
            }
        };
        
        // 현재 페이지 표시
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath || 
                (currentPath !== '/' && link.getAttribute('href').includes(currentPath))) {
                link.setAttribute('aria-current', 'page');
            }
        });
        
        // 동적 콘텐츠 접근성
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // 새로 추가된 버튼에 접근성 속성 추가
                        const buttons = node.querySelectorAll ? node.querySelectorAll('button') : [];
                        buttons.forEach(button => {
                            if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                                button.setAttribute('aria-label', '버튼');
                            }
                        });
                        
                        // 새로 추가된 이미지에 alt 속성 확인
                        const images = node.querySelectorAll ? node.querySelectorAll('img') : [];
                        images.forEach(img => {
                            if (!img.getAttribute('alt')) {
                                img.setAttribute('alt', '');
                            }
                        });
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // 페이지 로드 시 초기화
    function init() {
        initSmoothScroll();
        initCodeCopy();
        initTableOfContents();
        initLazyLoading();
        initSearch();
        initExternalLinks();
        initMicroInteractions();
        initButtonAnimations();
        initTypingAnimation();
        initParallaxEffect();
        initAdvancedCardEffects();
        initCircularProgress();
        initSecurity();
        initAccessibility();
    }
    
    // DOM 로드 완료 후 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();