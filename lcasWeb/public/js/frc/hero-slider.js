/**
 * Hero Slider for Lake City Ultrabots Team 8041
 * This script handles the automatic rotation of hero images on the homepage
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with a hero slider
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;
    
    // Get all slides
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length || slides.length <= 1) return; // No need for slider with 0-1 slides
    
    // Track current slide
    let currentSlide = 0;
    const slideInterval = 5000; // Change slides every 5 seconds
    let slideTimer;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to the current slide
        slides[index].classList.add('active');
        currentSlide = index;
        
        // Update dots if they exist
        if (document.querySelector('.slider-dots')) {
            updateDots();
        }
    }
    
    // Function to show the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Start the slideshow
    function startSlideshow() {
        if (slideTimer) {
            clearInterval(slideTimer);
        }
        slideTimer = setInterval(nextSlide, slideInterval);
    }
    
    // Initialize the slider
    showSlide(0); // Start with the first slide
    startSlideshow();
    
    // Add navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (index === 0) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
            showSlide(index);
            startSlideshow(); // Reset the timer
        });
        
        dotsContainer.appendChild(dot);
    });
    
    // Add dots to the hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.appendChild(dotsContainer);
    }
    
    // Update dots based on current slide
    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Pause slideshow on hover
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        startSlideshow();
    });
});