/**
 * FTC HOMEPAGE JAVASCRIPT
 * Middle school friendly interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==============================
    // HERO STATS ANIMATION
    // ==============================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            
            if (numericValue && numericValue > 0) {
                animateCounter(stat, 0, numericValue, finalValue, 2000);
            }
        });
    }

    function animateCounter(element, start, end, suffix, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            if (suffix.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }


    //
    // Youtube Iframe API for enhanced video control 
    //
    //
document.addEventListener('DOMContentLoaded', function() {
    const videoContainers = document.querySelectorAll('.video-responsive');
    
    videoContainers.forEach(container => {
        // Add click-to-expand functionality
        container.style.cursor = 'pointer';
        container.setAttribute('title', 'Click to expand video');
        
        container.addEventListener('click', function(e) {
            // Don't trigger if clicking on the iframe itself
            if (e.target.tagName === 'IFRAME') return;
            
            createVideoModal(this);
        });
    });
});

function createVideoModal(videoContainer) {
    const iframe = videoContainer.querySelector('iframe');
    const videoSrc = iframe.src;
    
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    // Create expanded video container
    const expandedVideo = document.createElement('div');
    expandedVideo.style.cssText = `
        position: relative;
        width: 90%;
        max-width: 1200px;
        height: 0;
        padding-bottom: 56.25%;
        background: #000;
        border-radius: 8px;
        overflow: hidden;
    `;
    
    // Create new iframe
    const expandedIframe = document.createElement('iframe');
    expandedIframe.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    `;
    expandedIframe.src = videoSrc + '&autoplay=1'; // Autoplay in modal
    expandedIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    expandedIframe.allowFullscreen = true;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255,255,255,0.9);
        border: none;
        font-size: 24px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Assemble modal
    expandedVideo.appendChild(expandedIframe);
    modal.appendChild(expandedVideo);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Close modal functionality
    function closeModal() {
        document.body.removeChild(modal);
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}
    // ==============================
    // ACTIVITY CARDS INTERACTIONS
    // ==============================
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add bounce to icon
            const icon = this.querySelector('.activity-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 8px 20px rgba(204, 0, 0, 0.3)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset icon
            const icon = this.querySelector('.activity-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '0 4px 12px rgba(204, 0, 0, 0.2)';
            }
        });
    });

    // ==============================
    // ACHIEVEMENT BADGES ANIMATION
    // ==============================
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    achievementItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.achievement-badge');
            if (badge) {
                badge.style.transform = 'scale(1.15) rotate(10deg)';
                badge.style.boxShadow = '0 8px 20px rgba(204, 0, 0, 0.4)';
            }
        });

        item.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.achievement-badge');
            if (badge) {
                badge.style.transform = 'scale(1) rotate(0deg)';
                badge.style.boxShadow = '0 4px 12px rgba(204, 0, 0, 0.3)';
            }
        });
    });

    // ==============================
    // INTERSECTION OBSERVER ANIMATIONS
    // ==============================
    if ('IntersectionObserver' in window) {
        // Hero stats animation trigger
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateStats, 500);
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            statsObserver.observe(heroStats);
        }

        // Activity cards stagger animation
        const activitiesSection = document.querySelector('.activities-section');
        if (activitiesSection) {
            const activitiesObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.activity-card');
                        
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                    }
                });
            }, { threshold: 0.2 });
            
            // Set initial state
            activityCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
            });
            
            activitiesObserver.observe(activitiesSection);
        }

        // Achievement showcase animation
        const successSection = document.querySelector('.success-section');
        if (successSection) {
            const successObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const achievements = entry.target.querySelectorAll('.achievement-item');
                        
                        achievements.forEach((achievement, index) => {
                            setTimeout(() => {
                                achievement.style.opacity = '1';
                                achievement.style.transform = 'translateY(0) scale(1)';
                            }, index * 200);
                        });
                    }
                });
            }, { threshold: 0.3 });
            
            // Set initial state
            achievementItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px) scale(0.95)';
                item.style.transition = 'all 0.6s ease';
            });
            
            successObserver.observe(successSection);
        }
    }

    // ==============================
    // FTC HIGHLIGHTS INTERACTION
    // ==============================
    const highlightItems = document.querySelectorAll('.highlight-item');
    
    highlightItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a gentle "pop" effect when clicked
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // ==============================
    // JOIN SECTION INTERACTIONS
    // ==============================
    const joinButtons = document.querySelectorAll('.join-buttons .btn');
    
    joinButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log(`User clicked: ${buttonText}`);
            
            // Track which action students are most interested in
            localStorage.setItem('ftc-interest', buttonText);
        });
    });

    // ==============================
    // FRIENDLY WELCOME ANIMATIONS
    // ==============================
    const heroText = document.querySelector('.hero-text');
    
    if (heroText) {
        const heroElements = [
            heroText.querySelector('h1'),
            heroText.querySelector('h2'),
            heroText.querySelector('p'),
            heroText.querySelector('.hero-buttons')
        ];

        // Staggered entrance animation
        heroElements.forEach((element, index) => {
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 300);
                
                // Set initial state
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.8s ease';
            }
        });
    }

    // ==============================
    // VIDEO INTERACTION TRACKING
    // ==============================
    const videoContainer = document.querySelector('.content-video');
    
    if (videoContainer) {
        videoContainer.addEventListener('click', function() {
            console.log('Student engaged with FTC intro video');
        });
    }

    // ==============================
    // SCROLL PROGRESS INDICATOR
    // ==============================
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), #ff4444);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        function updateProgress() {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;
            progressBar.style.width = Math.min(progress, 100) + '%';
        }

        window.addEventListener('scroll', window.ultrabotsUtils ? 
            window.ultrabotsUtils.throttle(updateProgress, 16) : updateProgress);
    }

    // Create scroll progress for FTC (more visual feedback for younger users)
    createScrollProgress();

    // ==============================
    // ACCESSIBILITY ENHANCEMENTS
    // ==============================
    
    // Add helpful aria labels for younger users
    const activityIcons = document.querySelectorAll('.activity-icon');
    activityIcons.forEach((icon, index) => {
        icon.setAttribute('aria-label', `Activity ${index + 1} icon`);
    });

    // Make achievement badges more interactive for screen readers
    const achievementBadges = document.querySelectorAll('.achievement-badge');
    achievementBadges.forEach(badge => {
        badge.setAttribute('role', 'img');
        const parentItem = badge.closest('.achievement-item');
        if (parentItem) {
            const title = parentItem.querySelector('h3').textContent;
            badge.setAttribute('aria-label', `${title} achievement badge`);
        }
    });

    // ==============================
    // ENGAGEMENT TRACKING
    // ==============================
    
    // Track user engagement with different sections
    const sections = document.querySelectorAll('section[class*="section"]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.className.split(' ')[0];
                console.log(`Student viewed: ${sectionName}`);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));

    // ==============================
    // PARENT/GUARDIAN INFORMATION
    // ==============================
    
    // Detect if this might be a parent viewing (simple heuristic)
    function detectAudience() {
        const userAgent = navigator.userAgent;
        const viewportWidth = window.innerWidth;
        const timeOfDay = new Date().getHours();
        
        // Simple heuristics - not perfect but helpful
        const likelyParent = (timeOfDay >= 9 && timeOfDay <= 15) || viewportWidth > 1200;
        
        if (likelyParent) {
            // Could add subtle parent-focused elements or information
            console.log('Possible parent/guardian viewing FTC page');
        }
    }

    detectAudience();

    // ==============================
    // FUN EASTER EGGS FOR STUDENTS
    // ==============================
    
    // Konami code for fun effect
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > 10) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Fun confetti effect or robot dance animation
            addConfetti();
            konamiCode = [];
        }
    });

    function addConfetti() {
        // Simple confetti effect
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#cc0000', '#ff4444', '#ffffff'][Math.floor(Math.random() * 3)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                z-index: 10000;
                pointer-events: none;
                transform: rotate(${Math.random() * 360}deg);
            `;
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(100vh) rotate(360deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }
        
        console.log('🎉 FTC students found the secret code! 🤖');
    }

    console.log('FTC homepage scripts loaded! Ready to build cool robots! 🤖');
});