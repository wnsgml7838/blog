/**
 * 기술 블로그 특화 JavaScript 기능
 * - 코드 복사 기능
 * - 튜토리얼 진행 추적
 * - 인터랙티브 요소
 */

(function() {
    'use strict';

    // 유틸리티 함수들
    const utils = {
        // 로컬 스토리지에서 데이터 가져오기
        getFromStorage: function(key) {
            try {
                return JSON.parse(localStorage.getItem(key)) || {};
            } catch(e) {
                return {};
            }
        },

        // 로컬 스토리지에 데이터 저장
        saveToStorage: function(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch(e) {
                console.warn('로컬 스토리지 저장 실패:', e);
            }
        },

        // 알림 표시
        showNotification: function(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            
            // 스타일 설정
            Object.assign(notification.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '12px 16px',
                borderRadius: '6px',
                color: 'white',
                backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
                zIndex: '9999',
                opacity: '0',
                transform: 'translateY(-20px)',
                transition: 'all 0.3s ease'
            });
            
            document.body.appendChild(notification);
            
            // 애니메이션
            requestAnimationFrame(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateY(0)';
            });
            
            // 자동 제거
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
    };

    // 코드 복사 기능
    const codeClipboard = {
        init: function() {
            this.attachEventListeners();
        },

        attachEventListeners: function() {
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('copy-code-btn') || 
                    e.target.closest('.copy-code-btn')) {
                    e.preventDefault();
                    this.handleCopyClick(e.target.closest('.copy-code-btn'));
                }
            });
        },

        handleCopyClick: function(button) {
            const codeBlock = button.closest('.code-block-container');
            const codeElement = codeBlock.querySelector('code');
            
            if (!codeElement) {
                utils.showNotification('코드를 찾을 수 없습니다.', 'error');
                return;
            }

            const code = codeElement.textContent;
            
            // 클립보드에 복사
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(code).then(() => {
                    this.showCopySuccess(button);
                }).catch(() => {
                    this.fallbackCopy(code, button);
                });
            } else {
                this.fallbackCopy(code, button);
            }
        },

        fallbackCopy: function(text, button) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                this.showCopySuccess(button);
            } catch (err) {
                utils.showNotification('복사에 실패했습니다.', 'error');
            } finally {
                document.body.removeChild(textarea);
            }
        },

        showCopySuccess: function(button) {
            const originalText = button.querySelector('.copy-text').textContent;
            button.querySelector('.copy-text').textContent = '복사됨!';
            button.style.backgroundColor = '#10b981';
            button.style.borderColor = '#10b981';
            button.style.color = 'white';
            
            setTimeout(() => {
                button.querySelector('.copy-text').textContent = originalText;
                button.style.backgroundColor = '';
                button.style.borderColor = '';
                button.style.color = '';
            }, 2000);
            
            utils.showNotification('코드가 클립보드에 복사되었습니다!');
        }
    };

    // 튜토리얼 진행 추적
    const tutorialProgress = {
        storageKey: 'tech-blog-tutorial-progress',

        init: function() {
            this.loadProgress();
            this.attachEventListeners();
        },

        attachEventListeners: function() {
            // 단계 완료 버튼
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('step-complete-btn') || 
                    e.target.closest('.step-complete-btn')) {
                    const button = e.target.closest('.step-complete-btn');
                    const stepNumber = button.getAttribute('onclick')?.match(/\d+/)?.[0];
                    if (stepNumber) {
                        this.markStepComplete(parseInt(stepNumber));
                    }
                }
            });

            // 체크포인트 체크박스
            document.addEventListener('change', (e) => {
                if (e.target.classList.contains('checkpoint-input')) {
                    this.saveCheckpointProgress();
                }
            });
        },

        loadProgress: function() {
            const progress = utils.getFromStorage(this.storageKey);
            const pageUrl = window.location.pathname;
            const pageProgress = progress[pageUrl] || {};

            // 완료된 단계 표시
            if (pageProgress.completedSteps) {
                pageProgress.completedSteps.forEach(step => {
                    this.markStepAsCompleted(step);
                });
            }

            // 체크포인트 상태 복원
            if (pageProgress.checkpoints) {
                Object.keys(pageProgress.checkpoints).forEach(checkpointId => {
                    const checkbox = document.getElementById(checkpointId);
                    if (checkbox) {
                        checkbox.checked = pageProgress.checkpoints[checkpointId];
                    }
                });
            }
        },

        markStepComplete: function(stepNumber) {
            const progress = utils.getFromStorage(this.storageKey);
            const pageUrl = window.location.pathname;
            
            if (!progress[pageUrl]) {
                progress[pageUrl] = {};
            }
            if (!progress[pageUrl].completedSteps) {
                progress[pageUrl].completedSteps = [];
            }

            if (!progress[pageUrl].completedSteps.includes(stepNumber)) {
                progress[pageUrl].completedSteps.push(stepNumber);
                utils.saveToStorage(this.storageKey, progress);
                this.markStepAsCompleted(stepNumber);
                utils.showNotification(`Step ${stepNumber} 완료!`);
            }
        },

        markStepAsCompleted: function(stepNumber) {
            const stepElement = document.querySelector(`[data-step="${stepNumber}"]`);
            if (stepElement) {
                stepElement.classList.add('step-completed');
                const button = stepElement.querySelector('.step-complete-btn');
                if (button) {
                    button.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                        </svg>
                        완료됨
                    `;
                    button.style.backgroundColor = '#10b981';
                }
            }
        },

        saveCheckpointProgress: function() {
            const progress = utils.getFromStorage(this.storageKey);
            const pageUrl = window.location.pathname;
            
            if (!progress[pageUrl]) {
                progress[pageUrl] = {};
            }
            if (!progress[pageUrl].checkpoints) {
                progress[pageUrl].checkpoints = {};
            }

            const checkboxes = document.querySelectorAll('.checkpoint-input');
            checkboxes.forEach(checkbox => {
                progress[pageUrl].checkpoints[checkbox.id] = checkbox.checked;
            });

            utils.saveToStorage(this.storageKey, progress);
        }
    };

    // 확장 가능한 섹션
    const expandableSections = {
        init: function() {
            this.enhanceExpandableSections();
        },

        enhanceExpandableSections: function() {
            const sections = document.querySelectorAll('.expandable-section');
            sections.forEach(section => {
                const details = section.querySelector('.expandable-details');
                const summary = section.querySelector('.expandable-summary');
                
                if (details && summary) {
                    details.addEventListener('toggle', (e) => {
                        section.setAttribute('data-expanded', details.open);
                        
                        if (details.open) {
                            const content = section.querySelector('.expandable-content');
                            if (content) {
                                content.style.animation = 'expandContent 0.3s ease-out';
                            }
                        }
                    });
                }
            });
        }
    };

    // 기술 스택 인터랙션
    const techStackInteraction = {
        init: function() {
            this.attachEventListeners();
        },

        attachEventListeners: function() {
            document.addEventListener('click', (e) => {
                const techItem = e.target.closest('.tech-item');
                if (techItem) {
                    this.showTechDetails(techItem);
                }
            });
        },

        showTechDetails: function(techItem) {
            const techName = techItem.querySelector('.tech-name')?.textContent;
            const techDescription = techItem.querySelector('.tech-description')?.textContent;
            const proficiency = techItem.querySelector('.proficiency-value')?.textContent;
            
            if (techName) {
                // 간단한 모달이나 툴팁 표시 (여기서는 알림으로 대체)
                let message = `${techName}`;
                if (proficiency) {
                    message += ` (숙련도: ${proficiency})`;
                }
                if (techDescription) {
                    message += `\n${techDescription}`;
                }
                
                // 실제 구현에서는 더 세련된 모달을 사용할 수 있습니다
                console.log(message);
            }
        }
    };

    // 읽기 진행률 추적
    const readingProgress = {
        init: function() {
            if (document.querySelector('.post-content')) {
                this.createProgressBar();
                this.attachScrollListener();
            }
        },

        createProgressBar: function() {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'reading-progress';
            progressContainer.innerHTML = '<div class="reading-progress-bar"></div>';
            document.body.appendChild(progressContainer);
        },

        attachScrollListener: function() {
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.updateProgress();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        },

        updateProgress: function() {
            const content = document.querySelector('.post-content');
            const progressBar = document.querySelector('.reading-progress-bar');
            
            if (!content || !progressBar) return;

            const contentTop = content.offsetTop;
            const contentHeight = content.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            const progress = Math.min(
                Math.max((scrollTop - contentTop + windowHeight) / contentHeight, 0),
                1
            );
            
            progressBar.style.width = `${progress * 100}%`;
        }
    };

    // GitHub Gist 통합
    const githubGistIntegration = {
        init: function() {
            this.loadGists();
        },

        loadGists: function() {
            const gistElements = document.querySelectorAll('[data-gist-id]');
            gistElements.forEach(element => {
                const gistId = element.getAttribute('data-gist-id');
                const filename = element.getAttribute('data-gist-file');
                this.embedGist(element, gistId, filename);
            });
        },

        embedGist: function(element, gistId, filename) {
            const script = document.createElement('script');
            let src = `https://gist.github.com/${gistId}.js`;
            if (filename) {
                src += `?file=${filename}`;
            }
            script.src = src;
            script.onload = () => {
                element.classList.add('gist-loaded');
            };
            script.onerror = () => {
                element.innerHTML = '<p>Gist를 로드할 수 없습니다.</p>';
                element.classList.add('gist-error');
            };
            element.appendChild(script);
        }
    };

    // 전역 함수들 (HTML에서 호출용)
    window.markStepComplete = function(stepNumber) {
        tutorialProgress.markStepComplete(stepNumber);
    };

    // DOM이 로드되면 초기화
    document.addEventListener('DOMContentLoaded', function() {
        codeClipboard.init();
        tutorialProgress.init();
        expandableSections.init();
        techStackInteraction.init();
        readingProgress.init();
        githubGistIntegration.init();
    });

    // 페이지 로드 완료 후 추가 초기화
    window.addEventListener('load', function() {
        // 코드 하이라이팅이 완료된 후 라인 번호 추가 등의 작업
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach((codeBlock, index) => {
            // 추가적인 코드 블록 개선사항들
            if (codeBlock.closest('pre').hasAttribute('data-lang')) {
                codeBlock.closest('.code-block-container')?.classList.add('has-language');
            }
        });
    });

})();