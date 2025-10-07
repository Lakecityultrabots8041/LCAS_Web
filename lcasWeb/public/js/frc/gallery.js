/**
 * Gallery System for Lake City Ultrabots Team 8041 Website
 * Works with year-based folders (2023, 2024, 2025)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the gallery page
    if (document.querySelector('.gallery-grid')) {
        initGallerySystem();
    }

    function initGallerySystem() {
        // DOM Elements
        const galleryItems = document.querySelectorAll('.gallery-item');
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const closeModal = document.querySelector('.close-modal');
        const prevButton = document.querySelector('.prev-image');
        const nextButton = document.querySelector('.next-image');
        const categoryTabs = document.querySelectorAll('.category-tab');
        const seasonDots = document.querySelectorAll('.season-dot');
        const prevSeasonBtn = document.getElementById('prevSeason');
        const nextSeasonBtn = document.getElementById('nextSeason');
        const seasonTitle = document.querySelector('.season-title');
        const galleryGrid = document.getElementById('currentSeasonGallery');
        
        // Gallery state
        let currentItemIndex = 0;
        let visibleItems = [...galleryItems];
        
        // Seasons data - newest first
        const seasons = [
            {
                id: '2025',
                name: '2025 Season',
                items: [...galleryItems], // Current season items are already in the DOM
                imagePath: 'images/2025'
            },
            {
                id: '2024',
                name: '2024 Season',
                items: [], // Will be populated when season is selected
                imagePath: 'images/2024'
            },
            {
                id: '2023',
                name: '2023 Season',
                items: [],
                imagePath: 'images/2023'
            }
        ];
        
        let currentSeasonIndex = 0; // Start with current/newest season
        
        // Category filter functionality
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.dataset.category;
                filterGallery(category);
            });
        });
        
        function filterGallery(category) {
            const currentSeasonItems = seasons[currentSeasonIndex].items;
            
            // Show all items if 'all' category is selected
            if (category === 'all') {
                currentSeasonItems.forEach(item => {
                    item.style.display = 'block';
                });
                visibleItems = [...currentSeasonItems];
            } else {
                // Filter items by category
                visibleItems = [];
                currentSeasonItems.forEach(item => {
                    if (item.dataset.category === category) {
                        item.style.display = 'block';
                        visibleItems.push(item);
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        }
        
        // Gallery modal functionality
        galleryItems.forEach((item) => {
            const zoomButton = item.querySelector('.gallery-zoom');
            if (zoomButton) {
                zoomButton.addEventListener('click', function() {
                    openModal(item);
                });
            }
            
            // Also make the entire gallery image clickable
            const galleryImage = item.querySelector('.gallery-image');
            if (galleryImage) {
                galleryImage.addEventListener('click', function(e) {
                    // If they didn't click the zoom button directly
                    if (e.target !== zoomButton) {
                        openModal(item);
                    }
                });
            }
        });
        
        function openModal(item) {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            
            modalImage.src = img.src;
            modalCaption.innerHTML = caption.innerHTML;
            modal.style.display = 'block';
            
            currentItemIndex = visibleItems.indexOf(item);
            
            // Add a smooth fade-in animation
            modal.classList.add('fade-in');
            
            // Disable body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
        
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.classList.remove('fade-in');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 200);
            });
        }
        
        // Next and previous image navigation
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', showPrevImage);
            nextButton.addEventListener('click', showNextImage);
        }
        
        function showPrevImage() {
            if (visibleItems.length > 0) {
                currentItemIndex = (currentItemIndex - 1 + visibleItems.length) % visibleItems.length;
                const prevItem = visibleItems[currentItemIndex];
                updateModalContent(prevItem);
            }
        }
        
        function showNextImage() {
            if (visibleItems.length > 0) {
                currentItemIndex = (currentItemIndex + 1) % visibleItems.length;
                const nextItem = visibleItems[currentItemIndex];
                updateModalContent(nextItem);
            }
        }
        
        function updateModalContent(item) {
            // Get image and caption from the item
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            
            // Create a new image element for preloading
            const newImage = new Image();
            newImage.onload = function() {
                // Add fade out effect
                modalImage.classList.add('fade-out');
                
                // After a short delay, update the image and fade it back in
                setTimeout(() => {
                    modalImage.src = img.src;
                    modalCaption.innerHTML = caption.innerHTML;
                    modalImage.classList.remove('fade-out');
                }, 200);
            };
            
            // Start loading the new image
            newImage.src = img.src;
        }
        
        // Keyboard navigation for gallery
        document.addEventListener('keydown', function(e) {
            if (modal && modal.style.display === 'block') {
                if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                } else if (e.key === 'Escape') {
                    closeModal.click();
                }
            }
        });
        
        /**
         * Season navigation with next/previous year labels
         */
        if (prevSeasonBtn && nextSeasonBtn) {
            prevSeasonBtn.addEventListener('click', showNewerSeason);
            nextSeasonBtn.addEventListener('click', showOlderSeason);
            
            // Set initial button text
            updateSeasonButtons();
        }
        
        function showNewerSeason() {
            if (currentSeasonIndex > 0) {
                currentSeasonIndex--;
                updateSeason();
            }
        }
        
        function showOlderSeason() {
            if (currentSeasonIndex < seasons.length - 1) {
                currentSeasonIndex++;
                updateSeason();
            }
        }
        
        // Dot navigation
        seasonDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSeasonIndex = index;
                updateSeason();
            });
        });
        
        function updateSeasonButtons() {
            if (prevSeasonBtn) {
                prevSeasonBtn.disabled = currentSeasonIndex === 0;
                
                if (currentSeasonIndex > 0) {
                    const nextYear = seasons[currentSeasonIndex - 1].id;
                    prevSeasonBtn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg> 
                        ${nextYear}`;
                } else {
                    prevSeasonBtn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg> 
                        Next Year`;
                }
            }
            
            if (nextSeasonBtn) {
                nextSeasonBtn.disabled = currentSeasonIndex === seasons.length - 1;
                
                if (currentSeasonIndex < seasons.length - 1) {
                    const prevYear = seasons[currentSeasonIndex + 1].id;
                    nextSeasonBtn.innerHTML = `
                        ${prevYear} 
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;
                } else {
                    nextSeasonBtn.innerHTML = `
                        Previous Year 
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;
                }
            }
        }
        
        /**
         * Updates season content and navigation state 
         */
        function updateSeason() {
            // Update season title
            if (seasonTitle) {
                seasonTitle.textContent = seasons[currentSeasonIndex].name;
            }
            
            // Update active season dot
            seasonDots.forEach((dot, index) => {
                if (index === currentSeasonIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Update navigation buttons
            updateSeasonButtons();
            
            // Season content loading transition
            if (galleryGrid) {
                // Fade out current content
                galleryGrid.style.opacity = '0';
                galleryGrid.style.transform = 'translateY(20px)';
                
                // After a short delay, update the content and fade it back in
                setTimeout(() => {
                    loadSeasonImages(currentSeasonIndex);
                    
                    // Apply current category filter
                    const activeCategory = document.querySelector('.category-tab.active');
                    if (activeCategory) {
                        filterGallery(activeCategory.dataset.category);
                    }
                    
                    // Fade in the updated content
                    galleryGrid.style.opacity = '1';
                    galleryGrid.style.transform = 'translateY(0)';
                }, 300);
            }
        }
        
        /**
         * Load images for the selected season
         * For manual implementation, this would show items from your pre-defined season
         */
        function loadSeasonImages(seasonIndex) {
            // In a real implementation with manual uploads, this function would:
            // 1. Check if we've already loaded this season's images
            // 2. If not, fetch the HTML from a season-specific page or update the src attributes
            
            // For now, we're just showing/hiding the current DOM items
            if (seasonIndex === 0) {
                // Current season - show all items
                galleryItems.forEach(item => {
                    item.style.display = '';
                });
            } else {
                // Prior seasons - handle differently
                // Since you're manually uploading, you might want to:
                // 1. Update the src attributes to point to your year folders
                // 2. Or show a placeholder or "Coming soon" message
                
                // This example just shows a limited number of items for past seasons
                galleryItems.forEach((item, index) => {
                    if (index < 4) {
                        // Show first 4 items with modified captions
                        item.style.display = '';
                        
                        // Update caption to show season
                        const caption = item.querySelector('.gallery-caption h3');
                        if (caption) {
                            // Make sure we're not adding the year multiple times
                            if (!caption.innerText.includes(seasons[seasonIndex].id)) {
                                caption.innerText = caption.innerText + ` (${seasons[seasonIndex].id})`;
                            }
                        }
                        
                        // If you have actual images for past seasons in your folders,
                        // you would update the src attributes here:
                        // const img = item.querySelector('img');
                        // img.src = img.src.replace(/images\/\d{4}\//, `images/${seasons[seasonIndex].id}/`);
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        }
        
        /**
         * Image optimization with lazy loading
         */
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('.gallery-image img');
            images.forEach(img => {
                img.loading = 'lazy';
            });
        }
        
        /**
         * Touch navigation support
         */
        if (modalImage) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            modalImage.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            modalImage.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleGallerySwipe();
            });
        }
        
        function handleGallerySwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - show next image
                showNextImage();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - show previous image
                showPrevImage();
            }
        }
        
        // Initialize the gallery
        updateSeason();
    }
    
    // Export for global access if needed
    window.initGallerySystem = initGallerySystem;
});