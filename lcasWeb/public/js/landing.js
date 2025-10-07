// Clean Landing Page JavaScript - Only Essential Features
document.addEventListener('DOMContentLoaded', function() {
    console.log('Landing page JavaScript loaded');
    
    // ==============================
    // IMAGE FALLBACK HANDLING
    // ==============================
    function initializeImageFallbacks() {
        const programImages = document.querySelectorAll('.program-image img');
        
        programImages.forEach(img => {
            const container = img.parentElement;
            
            function handleImageSuccess() {
                container.classList.remove('no-image');
                console.log('Image loaded successfully:', img.src);
            }
            
            function handleImageFailure() {
                container.classList.add('no-image');
                console.log('Image failed to load, showing fallback:', img.src);
            }
            
            function checkImageStatus() {
                // Check if image has no source or empty source
                if (!img.src || img.src === '' || img.src === window.location.href) {
                    handleImageFailure();
                    return;
                }
                
                // Check if image is already loaded
                if (img.complete) {
                    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                        handleImageSuccess();
                    } else {
                        handleImageFailure();
                    }
                }
            }
            
            // Set up event listeners
            img.addEventListener('load', handleImageSuccess);
            img.addEventListener('error', handleImageFailure);
            
            // Initial check for already loaded images
            checkImageStatus();
        });
    }
    
    // ==============================
    // CARD ANIMATIONS ENHANCEMENT
    // ==============================
    function initializeCardAnimations() {
        const programCards = document.querySelectorAll('.program-card');
        
        // Add intersection observer for scroll-based animations
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Initialize cards for animation
            programCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }
    }
    
    // ==============================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==============================
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    
    // ==============================
    // BUTTON LOADING STATES
    // ==============================
    function initializeButtonStates() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function() {
                // Add loading state if navigating to new page
                if (this.href && !this.href.includes('#')) {
                    this.style.opacity = '0.7';
                    const originalText = this.textContent;
                    this.textContent = originalText + ' →';
                    
                    // Reset after a short delay in case navigation is slow
                    setTimeout(() => {
                        this.style.opacity = '1';
                        this.textContent = originalText;
                    }, 2000);
                }
            });
        });
    }
    
    // ==============================
    // RESPONSIVE UTILITY FUNCTIONS
    // ==============================
    function isMobile() {
        return window.innerWidth < 768;
    }
    
    function isTablet() {
        return window.innerWidth >= 768 && window.innerWidth < 1024;
    }
    
    function isDesktop() {
        return window.innerWidth >= 1024;
    }
    
    // ==============================
    // ACCESSIBILITY ENHANCEMENTS
    // ==============================
    function initializeAccessibility() {
        // Add keyboard navigation for card interactions
        document.querySelectorAll('.program-card').forEach(card => {
            card.setAttribute('tabindex', '0');
            
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    const link = this.querySelector('.btn');
                    if (link) {
                        e.preventDefault();
                        link.click();
                    }
                }
            });
        });
        
        // Enhanced focus indicators
        document.querySelectorAll('.btn, .program-card').forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--primary)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
    
    // ==============================
    // PERFORMANCE MONITORING
    // ==============================
    function logPerformanceMetrics() {
        // Log page load performance
        window.addEventListener('load', function() {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load metrics:', {
                    domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    fullLoad: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    screenSize: `${window.innerWidth}x${window.innerHeight}`,
                    deviceType: isMobile() ? 'mobile' : isTablet() ? 'tablet' : 'desktop'
                });
            }
        });
    }
    
    // ==============================
    // INITIALIZE ALL FEATURES
    // ==============================
    try {
        initializeImageFallbacks();
        initializeCardAnimations();
        initializeSmoothScrolling();
        initializeButtonStates();
        initializeAccessibility();
        logPerformanceMetrics();
        
        console.log('Landing page initialization complete');
        
    } catch (error) {
        console.error('Error initializing landing page:', error);
    }
    
    // ==============================
    // UTILITY FUNCTIONS (GLOBAL)
    // ==============================
    
    // Function to manually update program images (if needed)
    window.updateProgramImage = function(cardSelector, newImageSrc) {
        const img = document.querySelector(`${cardSelector} .program-image img`);
        const container = img ? img.parentElement : null;
        
        if (!img || !container) {
            console.warn('Could not find image element for:', cardSelector);
            return;
        }
        
        if (newImageSrc && newImageSrc !== '') {
            container.classList.remove('no-image');
            img.src = newImageSrc;
        } else {
            container.classList.add('no-image');
            img.src = '';
        }
    };
    
    // Function to check current device type
    window.getCurrentDevice = function() {
        return {
            isMobile: isMobile(),
            isTablet: isTablet(),
            isDesktop: isDesktop(),
            width: window.innerWidth,
            height: window.innerHeight
        };
    };
});