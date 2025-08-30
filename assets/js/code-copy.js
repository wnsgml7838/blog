/**
 * Code Copy Functionality
 * 
 * Simple, reliable copy-to-clipboard for code blocks
 * Works with Jekyll's Rouge syntax highlighter
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  // Copy text to clipboard
  function copyToClipboard(text) {
    // Modern approach with Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    
    // Fallback for older browsers
    return new Promise(function(resolve, reject) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          resolve();
        } else {
          reject(new Error('Copy failed'));
        }
      } catch (err) {
        document.body.removeChild(textArea);
        reject(err);
      }
    });
  }

  // Show feedback on copy button
  function showCopyFeedback(button, success) {
    const originalText = button.textContent;
    const originalClass = button.className;
    
    if (success) {
      button.textContent = 'Copied!';
      button.classList.add('copied');
    } else {
      button.textContent = 'Failed';
      button.style.color = '#ef4444';
    }
    
    // Reset after 2 seconds
    setTimeout(function() {
      button.textContent = originalText;
      button.className = originalClass;
      button.style.color = '';
    }, 2000);
  }

  // Get code text from code block
  function getCodeText(codeBlock) {
    const pre = codeBlock.querySelector('pre');
    const code = pre ? pre.querySelector('code') : null;
    
    if (code) {
      // Get the text content, preserving line breaks
      return code.textContent || code.innerText || '';
    }
    
    return '';
  }

  // Create copy button
  function createCopyButton() {
    const button = document.createElement('button');
    button.className = 'code-copy-btn';
    button.type = 'button';
    button.innerHTML = `
      <svg class="copy-icon" viewBox="0 0 24 24">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy
    `;
    button.setAttribute('aria-label', 'Copy code to clipboard');
    return button;
  }

  // Create code header with language and copy button
  function createCodeHeader(language, copyButton) {
    const header = document.createElement('div');
    header.className = 'code-header';
    
    const langSpan = document.createElement('span');
    langSpan.className = 'code-language';
    langSpan.textContent = language || 'code';
    
    header.appendChild(langSpan);
    header.appendChild(copyButton);
    
    return header;
  }

  // Detect language from code block
  function detectLanguage(codeBlock) {
    // Check for Rouge's language class on highlight div
    const highlight = codeBlock.querySelector('.highlight');
    if (highlight) {
      const classList = highlight.classList;
      for (let i = 0; i < classList.length; i++) {
        const className = classList[i];
        if (className.startsWith('language-')) {
          return className.replace('language-', '').toUpperCase();
        }
      }
    }
    
    // Check for language class on pre or code element
    const pre = codeBlock.querySelector('pre');
    const code = codeBlock.querySelector('code');
    
    const elements = [pre, code].filter(Boolean);
    
    for (const element of elements) {
      const classList = element.classList;
      for (let i = 0; i < classList.length; i++) {
        const className = classList[i];
        if (className.startsWith('language-')) {
          return className.replace('language-', '').toUpperCase();
        }
        if (className.startsWith('highlight-')) {
          return className.replace('highlight-', '').toUpperCase();
        }
      }
    }
    
    return null;
  }

  // Wrap code block with header
  function wrapCodeBlock(codeBlock) {
    // Skip if already wrapped
    if (codeBlock.classList.contains('code-block-wrapper')) {
      return;
    }
    
    const language = detectLanguage(codeBlock);
    const copyButton = createCopyButton();
    const header = createCodeHeader(language, copyButton);
    
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    
    // Insert wrapper before code block
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    
    // Move code block into wrapper and add header
    wrapper.appendChild(header);
    wrapper.appendChild(codeBlock);
    
    // Add copy functionality
    copyButton.addEventListener('click', function() {
      const codeText = getCodeText(codeBlock);
      
      if (!codeText.trim()) {
        showCopyFeedback(copyButton, false);
        return;
      }
      
      copyToClipboard(codeText)
        .then(function() {
          showCopyFeedback(copyButton, true);
        })
        .catch(function() {
          showCopyFeedback(copyButton, false);
        });
    });
    
    // Keyboard support
    copyButton.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyButton.click();
      }
    });
  }

  // Initialize code blocks
  function initCodeBlocks() {
    // Find all code blocks (Rouge generates .highlight divs)
    const codeBlocks = document.querySelectorAll('.highlight');
    
    codeBlocks.forEach(function(codeBlock) {
      // Make sure it contains actual code
      const pre = codeBlock.querySelector('pre');
      const code = codeBlock.querySelector('code');
      
      if (pre && code) {
        wrapCodeBlock(codeBlock);
      }
    });
  }

  // Initialize when DOM is ready
  ready(initCodeBlocks);

  // Re-initialize for dynamic content (if needed)
  window.initCodeBlocks = initCodeBlocks;

})();