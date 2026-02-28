/**
 * Global Pencil Cursor System
 * Replaces default mouse arrow with themed pencil cursor
 * Adapts colors based on page theme
 * Works immediately without page refresh
 * Performance optimized
 */

// Initialize cursor immediately (don't wait for DOMContentLoaded)
(function() {
    // Detect page theme based on URL or body class
    function getPageTheme() {
        const currentPath = window.location.pathname;
        const hostname = window.location.hostname;
        
        // School1 theme (Purple #bf50ac, Orange #FF6600)
        if (currentPath.includes('school1') || document.body.classList.contains('school1-theme')) {
            return {
                primary: '#bf50ac',
                secondary: '#FF6600',
                pencil: '✏️',
                name: 'School1'
            };
        }
        
        // School2 theme (Blue #2359b6, Yellow #f9dc5d)
        else if (currentPath.includes('school2') || document.body.classList.contains('school2-theme')) {
            return {
                primary: '#2359b6',
                secondary: '#f9dc5d',
                pencil: '✏️',
                name: 'School2'
            };
        }
        
        // Main page theme (Black #000000, Yellow #fbbf24)
        else {
            return {
                primary: '#000000',
                secondary: '#fbbf24',
                pencil: '✏️',
                name: 'Main'
            };
        }
    }

    const theme = getPageTheme();
    
    // Hide default cursor immediately
    function hideDefaultCursor() {
        const style = document.createElement('style');
        style.id = 'hide-default-cursor';
        style.textContent = `
            * {
                cursor: none !important;
            }
            
            *:hover {
                cursor: none !important;
            }
            
            *:active {
                cursor: none !important;
            }
            
            *:focus {
                cursor: none !important;
            }
            
            html, body {
                cursor: none !important;
            }
            
            .pencil-cursor {
                cursor: none !important;
            }
            
            /* Force hide on all elements */
            a, button, input, textarea, select, div, span, p, h1, h2, h3, h4, h5, h6,
            img, video, audio, canvas, svg, path, rect, circle, ellipse, line, polygon,
            ul, ol, li, table, tr, td, th, thead, tbody, tfoot, form, label, fieldset,
            legend, article, section, header, footer, nav, aside, main, figure, figcaption,
            details, summary, dialog, menu, menuitem, iframe, embed, object, param {
                cursor: none !important;
            }
            
            /* Hide on all pseudo-elements */
            *::before, *::after, *::first-letter, *::first-line {
                cursor: none !important;
            }
            
            /* Hide on all states */
            :hover, :active, :focus, :visited, :link, :target {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Hide default cursor immediately
    hideDefaultCursor();
    
    // Create pencil cursor immediately
    let pencilCursor = document.querySelector('.pencil-cursor');
    if (!pencilCursor) {
        pencilCursor = document.createElement('div');
        pencilCursor.className = 'pencil-cursor';
        pencilCursor.innerHTML = theme.pencil;
        pencilCursor.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            font-size: 20px;
            pointer-events: none;
            z-index: 99999;
            transition: transform 0.15s ease-out, opacity 0.3s ease, filter 0.3s ease;
            opacity: 0;
            transform: translate(-50%, -50%) rotate(-45deg);
            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
            text-shadow: 0 0 10px ${theme.primary}40;
        `;
        
        // Add to body immediately (even if DOM not fully loaded)
        if (document.body) {
            document.body.appendChild(pencilCursor);
        } else {
            // If body doesn't exist yet, wait for it
            document.addEventListener('DOMContentLoaded', () => {
                document.body.appendChild(pencilCursor);
                hideDefaultCursor(); // Re-apply cursor hiding after DOM load
            });
        }
    }

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isHovering = false;
    let isClicking = false;
    let animationFrame = null;
    let lastUpdateTime = 0;
    let isInitialized = false;

    // Throttled mouse move handler
    function handleMouseMove(e) {
        const now = Date.now();
        if (now - lastUpdateTime > 16) { // ~60fps throttle
            mouseX = e.clientX;
            mouseY = e.clientY;
            lastUpdateTime = now;
        }
    }

    // Optimized cursor animation
    function animateCursor() {
        if (!pencilCursor) return;
        
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;
        
        pencilCursor.style.left = currentX + 'px';
        pencilCursor.style.top = currentY + 'px';
        
        animationFrame = requestAnimationFrame(animateCursor);
    }

    // Show/hide cursor based on mouse position
    function handleMouseEnter() {
        if (pencilCursor) pencilCursor.style.opacity = '1';
    }

    function handleMouseLeave() {
        if (pencilCursor) pencilCursor.style.opacity = '0';
    }

    // Add event listeners immediately
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Start animation immediately
    animateCursor();

    // Interactive elements detection and setup (optimized)
    function setupInteractiveElements() {
        if (isInitialized) return; // Prevent multiple initializations
        
        const interactiveSelectors = [
            'a', 'button', 'input', 'textarea', 'select', 
            '.story-card', '.unmute-btn', '.nav-link-animate',
            '.card', '.facility-card', '[onclick]', '[role="button"]',
            'label', '.clickable', '.interactive'
        ];

        // Add hover effects to interactive elements
        interactiveSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element.style.cursor === 'none') return; // Skip if already processed
                
                element.style.cursor = 'none';
                
                element.addEventListener('mouseenter', () => {
                    isHovering = true;
                    if (pencilCursor) {
                        pencilCursor.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1.2)';
                        pencilCursor.style.fontSize = '24px';
                        pencilCursor.style.filter = `drop-shadow(3px 3px 6px rgba(0,0,0,0.4)) text-shadow: 0 0 15px ${theme.primary}60`;
                        
                        // Change pencil emoji based on element type
                        if (element.tagName === 'A' || element.classList.contains('nav-link-animate')) {
                            pencilCursor.innerHTML = '🔗';
                        } else if (element.tagName === 'BUTTON' || element.classList.contains('unmute-btn')) {
                            pencilCursor.innerHTML = '✏️';
                        } else if (element.classList.contains('story-card')) {
                            pencilCursor.innerHTML = '�';
                        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            pencilCursor.innerHTML = '✏️';
                        } else {
                            pencilCursor.innerHTML = theme.pencil;
                        }
                    }
                }, { passive: true });
                
                element.addEventListener('mouseleave', () => {
                    isHovering = false;
                    if (pencilCursor) {
                        pencilCursor.style.transform = 'translate(-50%, -50%) rotate(-45deg) scale(1)';
                        pencilCursor.style.fontSize = '20px';
                        pencilCursor.style.filter = `drop-shadow(2px 2px 4px rgba(0,0,0,0.3)) text-shadow: 0 0 10px ${theme.primary}40`;
                        pencilCursor.innerHTML = theme.pencil;
                    }
                }, { passive: true });
                
                element.addEventListener('mousedown', () => {
                    isClicking = true;
                    if (pencilCursor) {
                        pencilCursor.style.transform = 'translate(-50%, -50%) rotate(-90deg) scale(0.9)';
                        pencilCursor.innerHTML = '✏️';
                    }
                }, { passive: true });
                
                element.addEventListener('mouseup', () => {
                    isClicking = false;
                    if (pencilCursor) {
                        pencilCursor.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1.2)';
                        pencilCursor.innerHTML = isHovering ? '✏️' : theme.pencil;
                    }
                }, { passive: true });
            });
        });
        
        isInitialized = true;
    }

    // Global click animation
    function handleMouseDown() {
        isClicking = true;
        if (pencilCursor) {
            pencilCursor.style.transform = 'translate(-50%, -50%) rotate(-90deg) scale(0.9)';
            pencilCursor.innerHTML = '✏️';
        }
    }

    function handleMouseUp() {
        isClicking = false;
        if (pencilCursor) {
            pencilCursor.style.transform = 'translate(-50%, -50%) rotate(-45deg) scale(1)';
            pencilCursor.innerHTML = theme.pencil;
        }
    }

    // Add global event listeners
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Add CSS to hide default cursor globally
    function addCursorStyles() {
        // Remove existing style if present
        const existingStyle = document.querySelector('#pencil-cursor-styles');
        if (existingStyle) {
            existingStyle.remove();
        }

        const style = document.createElement('style');
        style.id = 'pencil-cursor-styles';
        style.textContent = `
            /* Comprehensive cursor hiding */
            * {
                cursor: none !important;
            }
            
            *:hover, *:active, *:focus {
                cursor: none !important;
            }
            
            html, body {
                cursor: none !important;
            }
            
            /* All HTML elements */
            a, button, input, textarea, select, div, span, p, h1, h2, h3, h4, h5, h6,
            img, video, audio, canvas, svg, path, rect, circle, ellipse, line, polygon,
            ul, ol, li, table, tr, td, th, thead, tbody, tfoot, form, label, fieldset,
            legend, article, section, header, footer, nav, aside, main, figure, figcaption,
            details, summary, dialog, menu, menuitem, iframe, embed, object, param {
                cursor: none !important;
            }
            
            /* Pseudo-elements */
            *::before, *::after, *::first-letter, *::first-line {
                cursor: none !important;
            }
            
            /* Interactive states */
            :hover, :active, :focus, :visited, :link, :target {
                cursor: none !important;
            }
            
            .pencil-cursor {
                transition: transform 0.15s ease-out, opacity 0.3s ease, filter 0.3s ease;
                cursor: none !important;
            }
            
            /* Show default cursor ONLY for text selection in inputs */
            input, textarea {
                cursor: text !important;
            }
            
            /* Special handling for scrollbars */
            ::-webkit-scrollbar {
                width: 8px;
            }
            
            ::-webkit-scrollbar-track {
                background: ${theme.secondary}20;
            }
            
            ::-webkit-scrollbar-thumb {
                background: ${theme.primary};
                border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: ${theme.secondary};
            }
            
            /* Theme-specific scrollbar colors */
            ${theme.name === 'School1' ? `
                ::-webkit-scrollbar-thumb { background: #bf50ac; }
                ::-webkit-scrollbar-thumb:hover { background: #FF6600; }
            ` : ''}
            
            ${theme.name === 'School2' ? `
                ::-webkit-scrollbar-thumb { background: #2359b6; }
                ::-webkit-scrollbar-thumb:hover { background: #f9dc5d; }
            ` : ''}
            
            ${theme.name === 'Main' ? `
                ::-webkit-scrollbar-thumb { background: #000000; }
                ::-webkit-scrollbar-thumb:hover { background: #fbbf24; }
            ` : ''}
        `;
        
        // Add to head immediately
        if (document.head) {
            document.head.appendChild(style);
        } else {
            // If head doesn't exist yet, wait for it
            document.addEventListener('DOMContentLoaded', () => {
                document.head.appendChild(style);
            });
        }
    }

    // Initialize everything immediately
    addCursorStyles();
    setupInteractiveElements();

    // Re-initialize when DOM is fully loaded (for elements that might not exist yet)
    document.addEventListener('DOMContentLoaded', () => {
        setupInteractiveElements();
        addCursorStyles();
    });

    // Handle page navigation (SPA-like behavior) - debounced
    let navigationTimeout;
    window.addEventListener('popstate', () => {
        clearTimeout(navigationTimeout);
        navigationTimeout = setTimeout(() => {
            isInitialized = false; // Reset to allow re-initialization
            hideDefaultCursor(); // Re-hide default cursor
            setupInteractiveElements();
        }, 100);
    });

    // Observe DOM changes for dynamically added elements (optimized)
    if (window.MutationObserver) {
        let observerTimeout;
        const observer = new MutationObserver(() => {
            clearTimeout(observerTimeout);
            observerTimeout = setTimeout(() => {
                isInitialized = false; // Reset to allow re-initialization
                hideDefaultCursor(); // Re-hide default cursor
                setupInteractiveElements();
            }, 500); // Debounce to prevent excessive calls
        });
        
        observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true,
            attributes: false, // Don't watch attributes for performance
            characterData: false // Don't watch text changes
        });
    }

    // Handle page visibility changes (when switching tabs)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Page became visible again
            hideDefaultCursor();
            isInitialized = false;
            setupInteractiveElements();
        }
    });

    // Handle page load events
    window.addEventListener('load', () => {
        hideDefaultCursor();
        isInitialized = false;
        setupInteractiveElements();
    });

    // Handle focus events (when window gains focus)
    window.addEventListener('focus', () => {
        hideDefaultCursor();
        isInitialized = false;
        setupInteractiveElements();
    });

    // Also check every second to ensure cursor is working
    setInterval(() => {
        if (!document.querySelector('.pencil-cursor')) {
            // Cursor was removed, recreate it
            location.reload(); // Force reload to reinitialize
        }
        hideDefaultCursor();
    }, 1000);

    // Console log for debugging
    console.log(`Pencil cursor initialized with ${theme.name} theme: ${theme.primary}, ${theme.secondary}`);

    // Cleanup function for page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        clearTimeout(navigationTimeout);
        clearTimeout(observerTimeout);
    });
})();
