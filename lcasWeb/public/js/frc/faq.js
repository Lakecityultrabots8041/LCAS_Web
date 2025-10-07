/**
 * FAQ Page Specific JavaScript
 * Handles toggling answers (Accordion Style) for FAQ items.
 */
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const currentlyActive = item.classList.contains('active');

                // --- Accordion Logic: Close OTHERS first ---
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        closeItem(otherItem); // Close any other open item
                    }
                });
                // --- End Accordion Logic ---

                // Now toggle the clicked item
                if (!currentlyActive) {
                    openItem(item); // Open the clicked item
                }
                // If it was already active, the loop above didn't close it,
                // so clicking it again effectively closes it because toggleActive won't re-open
                 else {
                     // Optional: If you want clicking an open item to close it
                     // closeItem(item);
                 }
            });

            // Set initial ARIA states and styles
            setupInitialState(item);
        }
    });

    /**
     * Sets the initial state (collapsed/expanded) and ARIA attributes on load.
     */
    function setupInitialState(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const isInitiallyActive = item.classList.contains('active'); // Check if pre-set as active

        question.setAttribute('aria-expanded', isInitiallyActive ? 'true' : 'false');
        answer.setAttribute('aria-hidden', isInitiallyActive ? 'false' : 'true');

        if (!isInitiallyActive) {
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            answer.style.marginTop = '0'; // Ensure no margin when closed
            answer.style.paddingTop = '0';
            answer.style.paddingBottom = '0';
        } else {
            // Set initial height correctly if starting active
            // Use setTimeout here too, just in case of initial load render issues
            setTimeout(() => {
                 answer.style.maxHeight = answer.scrollHeight + "px";
            }, 10);
            answer.style.opacity = '1';
            answer.style.marginTop = '20px'; // Ensure margin when active
            answer.style.paddingTop = '5px';
            answer.style.paddingBottom = '25px';
        }
    }

    /**
     * Opens a specific FAQ item.
     */
    function openItem(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!item.classList.contains('active')) { // Only act if not already active
             item.classList.add('active');
             question.setAttribute('aria-expanded', 'true');
             answer.setAttribute('aria-hidden', 'false');
             answer.style.marginTop = '20px'; // Add margin first
             answer.style.paddingTop = '5px';
             answer.style.paddingBottom = '25px';
             answer.style.opacity = '1'; // Start fading in padding/margin visible

             // Calculate and set max-height slightly delayed
             setTimeout(() => {
                 answer.style.maxHeight = answer.scrollHeight + "px";
             }, 10); // Small delay allows browser to render layout changes if needed
        }
    }

    /**
     * Closes a specific FAQ item.
     */
    function closeItem(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

         if (item.classList.contains('active')) { // Only act if active
             item.classList.remove('active');
             question.setAttribute('aria-expanded', 'false');
             answer.setAttribute('aria-hidden', 'true');
             answer.style.maxHeight = '0'; // Start collapsing
             answer.style.opacity = '0'; // Start fading out
             answer.style.marginTop = '0'; // Remove margin
             answer.style.paddingTop = '0';
             answer.style.paddingBottom = '0';
         }
    }

}); // End DOMContentLoaded