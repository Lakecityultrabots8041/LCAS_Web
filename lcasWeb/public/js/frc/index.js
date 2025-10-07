/**
 * Lake City Ultrabots Team 8041
 * Index page specific JavaScript functionality (e.g., Hero Slider)
 */

document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();

    /**
     * Hero Slider Functionality
     */
     function initHeroSlider() {
        const heroSliderElement = document.querySelector('.hero-slider');
        if (!heroSliderElement) {
            return;
        }

        const slides = heroSliderElement.querySelectorAll('.hero-slide');
        const dotsContainer = document.querySelector('.slider-dots');

        // Exit if not enough slides or essential containers are missing
        if (!slides.length || slides.length <= 1) {
            if (slides.length === 1) slides[0].classList.add('active');
            if (dotsContainer) dotsContainer.style.display = 'none';
            return;
        }
        if (!dotsContainer) {
            console.error('Slider dots container (.slider-dots) not found in the HTML.');
            return;
        }

        let currentSlideIndex = 0;
        const slideIntervalTime = 3000; // 3 seconds
        let slideTimer;
        let dotElements = [];

        function showSlide(index) {
            if (index < 0 || index >= slides.length) {
                return;
            }
            slides.forEach(slide => slide.classList.remove('active'));
            dotElements.forEach(dot => dot.classList.remove('active'));

            slides[index].classList.add('active');
            if (dotElements[index]) {
                dotElements[index].classList.add('active');
            }
            currentSlideIndex = index;
        }

        function nextSlide() {
            let nextIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        function startSlideshow() {
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, slideIntervalTime);
        }

        // Function to create navigation dots
        function createDots() {
            dotsContainer.innerHTML = ''; 
            dotElements = []; 

            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('slider-dot');

                dot.addEventListener('click', () => {
                    if (currentSlideIndex !== index) {
                        showSlide(index);
                        startSlideshow(); 
                    }
                });
                dotsContainer.appendChild(dot);
                dotElements.push(dot);
            });
        }

        // --- Initialize the Slider ---
        createDots();

        heroSliderElement.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
        });
        heroSliderElement.addEventListener('mouseleave', () => {
            startSlideshow();
        });

        showSlide(0); // Show the initial slide (and activate its dot)
        startSlideshow(); // Start the automatic slideshow
    } // End initHeroSlider

}); // End DOMContentLoaded