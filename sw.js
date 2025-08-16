/**
 * Service Worker for Progressive Web App
 * 기술 블로그 성능 최적화를 위한 캐싱 전략
 */

const CACHE_NAME = 'tech-blog-v1.0.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const IMAGE_CACHE = 'images-v1';

// 캐시할 중요 리소스들
const STATIC_ASSETS = [
    '/',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/js/theme-toggle.js',
    '/assets/js/tech-blog.js',
    '/about/',
    '/posts/',
    '/projects/',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// 캐시 우선순위 설정
const CACHE_STRATEGIES = {
    // 정적 파일은 캐시 우선
    static: ['/', '/about/', '/posts/', '/projects/'],
    // CSS/JS는 네트워크 우선, 캐시 폴백
    assets: ['/assets/'],
    // 이미지는 캐시 우선
    images: ['/assets/images/', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    // 폰트는 캐시 우선
    fonts: ['fonts.googleapis.com', 'fonts.gstatic.com'],
    // API는 네트워크 우선
    api: ['/api/']
};

// Service Worker 설치
self.addEventListener('install', event => {
    console.log('Service Worker: Installing');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Cache installation failed', error);
            })
    );
});

// Service Worker 활성화
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // 이전 버전 캐시 삭제
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName !== IMAGE_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// 네트워크 요청 인터셉트
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // GET 요청만 처리
    if (request.method !== 'GET') {
        return;
    }
    
    // 적절한 캐싱 전략 선택
    event.respondWith(
        handleRequest(request, url)
    );
});

// 요청 처리 함수
async function handleRequest(request, url) {
    const pathname = url.pathname;
    const hostname = url.hostname;
    
    try {
        // 1. 폰트: 캐시 우선
        if (isFontRequest(hostname, pathname)) {
            return await cacheFirst(request, STATIC_CACHE);
        }
        
        // 2. 이미지: 캐시 우선
        if (isImageRequest(pathname)) {
            return await cacheFirst(request, IMAGE_CACHE);
        }
        
        // 3. 정적 자산: 네트워크 우선, 캐시 폴백
        if (isStaticAsset(pathname)) {
            return await networkFirst(request, STATIC_CACHE);
        }
        
        // 4. 페이지: 네트워크 우선, 캐시 폴백
        if (isPageRequest(pathname)) {
            return await networkFirst(request, DYNAMIC_CACHE);
        }
        
        // 5. 기타: 네트워크만
        return await fetch(request);
        
    } catch (error) {
        console.error('Service Worker: Request handling failed', error);
        
        // 오프라인 폴백
        if (isPageRequest(pathname)) {
            const fallbackResponse = await caches.match('/');
            return fallbackResponse || new Response('오프라인 상태입니다', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        }
        
        throw error;
    }
}

// 캐시 우선 전략
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
        // 백그라운드에서 업데이트
        fetch(request).then(response => {
            if (response.ok) {
                cache.put(request, response.clone());
            }
        }).catch(() => {
            // 네트워크 오류 무시
        });
        
        return cached;
    }
    
    const response = await fetch(request);
    if (response.ok) {
        cache.put(request, response.clone());
    }
    
    return response;
}

// 네트워크 우선 전략
async function networkFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    
    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        if (cached) {
            return cached;
        }
        throw error;
    }
}

// 요청 타입 판별 함수들
function isFontRequest(hostname, pathname) {
    return CACHE_STRATEGIES.fonts.some(pattern => hostname.includes(pattern)) ||
           pathname.includes('.woff') || pathname.includes('.woff2');
}

function isImageRequest(pathname) {
    return CACHE_STRATEGIES.images.some(pattern => {
        return pathname.includes(pattern) || pathname.endsWith(pattern);
    });
}

function isStaticAsset(pathname) {
    return CACHE_STRATEGIES.assets.some(pattern => pathname.startsWith(pattern));
}

function isPageRequest(pathname) {
    return !pathname.includes('.') || pathname.endsWith('.html') ||
           CACHE_STRATEGIES.static.some(pattern => pathname.startsWith(pattern));
}

// 백그라운드 동기화 (향후 확장용)
self.addEventListener('sync', event => {
    console.log('Service Worker: Background sync', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // 백그라운드 작업 수행
            doBackgroundSync()
        );
    }
});

async function doBackgroundSync() {
    try {
        // 오프라인 중 수집된 데이터 동기화
        console.log('Service Worker: Performing background sync');
    } catch (error) {
        console.error('Service Worker: Background sync failed', error);
    }
}

// 푸시 알림 (향후 확장용)
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/assets/images/icon-192x192.png',
        badge: '/assets/images/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: data.data,
        actions: data.actions || []
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data?.url || '/')
    );
});

// 캐시 크기 관리
async function limitCacheSize(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxItems) {
        // 오래된 항목부터 삭제
        const deleteCount = keys.length - maxItems;
        for (let i = 0; i < deleteCount; i++) {
            await cache.delete(keys[i]);
        }
    }
}

// 주기적으로 캐시 정리
setInterval(() => {
    limitCacheSize(DYNAMIC_CACHE, 50);
    limitCacheSize(IMAGE_CACHE, 100);
}, 1000 * 60 * 60); // 1시간마다

// 메시지 처리 (클라이언트와 통신)
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_CACHE_SIZE') {
        getCacheSize().then(size => {
            event.ports[0].postMessage({ cacheSize: size });
        });
    }
});

// 캐시 크기 계산
async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        totalSize += keys.length;
    }
    
    return totalSize;
}