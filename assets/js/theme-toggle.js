// 다크 모드 토글 기능
(function() {
    'use strict';
    
    // 테마 상태 관리
    const THEME_KEY = 'blog-theme';
    const LIGHT_THEME = 'light';
    const DARK_THEME = 'dark';
    
    // DOM 요소
    let themeToggle;
    let lightIcon;
    let darkIcon;
    
    // 초기화
    function init() {
        // DOM 요소 찾기
        themeToggle = document.querySelector('.theme-toggle');
        lightIcon = themeToggle?.querySelector('.light-icon');
        darkIcon = themeToggle?.querySelector('.dark-icon');
        
        if (!themeToggle) return;
        
        // 초기 테마 설정
        const savedTheme = getSavedTheme();
        const initialTheme = savedTheme || getSystemTheme();
        setTheme(initialTheme);
        
        // 이벤트 리스너 등록
        themeToggle.addEventListener('click', toggleTheme);
        
        // 시스템 테마 변경 감지
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);
        }
        
        // 스크롤 진행률 바 초기화
        initReadingProgress();
        
        // 헤더 스크롤 효과 초기화
        initScrollHeader();
    }
    
    // 저장된 테마 가져오기
    function getSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY);
        } catch (e) {
            return null;
        }
    }
    
    // 시스템 테마 가져오기
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_THEME;
        }
        return LIGHT_THEME;
    }
    
    // 테마 설정
    function setTheme(theme) {
        const isDark = theme === DARK_THEME;
        
        // HTML 요소에 테마 속성 설정
        document.documentElement.setAttribute('data-theme', theme);
        
        // 아이콘 토글
        if (lightIcon && darkIcon) {
            lightIcon.style.display = isDark ? 'none' : 'block';
            darkIcon.style.display = isDark ? 'block' : 'none';
        }
        
        // localStorage에 저장
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {
            console.warn('테마 설정을 저장할 수 없습니다:', e);
        }
        
        // 접근성을 위한 aria-label 업데이트
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 
                isDark ? '라이트 모드로 전환' : '다크 모드로 전환'
            );
        }
    }
    
    // 테마 토글
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        setTheme(newTheme);
    }
    
    // 시스템 테마 변경 처리
    function handleSystemThemeChange(e) {
        const savedTheme = getSavedTheme();
        if (!savedTheme) {
            // 사용자가 수동으로 테마를 설정하지 않은 경우에만 시스템 테마 따라가기
            setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
    }
    
    // 읽기 진행률 표시바
    function initReadingProgress() {
        const progressBar = document.querySelector('.reading-progress-bar');
        if (!progressBar) return;
        
        function updateReadingProgress() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / documentHeight) * 100;
            
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
        
        // 스크롤 이벤트 리스너 (쓰로틀링 적용)
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateReadingProgress();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });
        updateReadingProgress(); // 초기값 설정
    }
    
    // 헤더 스크롤 효과
    function initScrollHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;
        
        let lastScrollY = window.pageYOffset;
        
        function updateHeader() {
            const currentScrollY = window.pageYOffset;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        }
        
        // 스크롤 이벤트 리스너 (쓰로틀링 적용)
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    // 키보드 접근성
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + D로 다크 모드 토글
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // DOM 로드 완료 후 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // 키보드 네비게이션 초기화
    initKeyboardNavigation();
    
})();