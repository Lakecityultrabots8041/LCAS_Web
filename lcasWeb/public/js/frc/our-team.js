/**
 * Lake City Ultrabots Team 8041
 * "Our Team" Page Specific JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {

    if (document.querySelector('.polaroid-stack-container')) {
        initPolaroidStack();
    }

    function initPolaroidStack() {
        const container = document.querySelector('.polaroid-stack-container');
        if (!container) return;

        const polaroids = container.querySelectorAll('.polaroid-card');
        if (!polaroids.length) return;

        let activeCard = null;

        // Store initial CSS transform and z-index for each card
        polaroids.forEach(card => {
            const computedStyle = getComputedStyle(card);
            card.dataset.initialTransform = computedStyle.transform === 'none' ? '' : computedStyle.transform;
            card.dataset.initialZIndex = computedStyle.zIndex;
            const closeBtn = card.querySelector('.polaroid-close-btn');

            card.addEventListener('click', function(event) {
                if (closeBtn && event.target === closeBtn) {
                    return; // Let the close button's listener handle it
                }

                if (this.classList.contains('is-active')) {
                    // Clicking an already active card closes it
                    deactivateCard(this);
                } else {
                    // Deactivate any other card that might be active
                    if (activeCard) {
                        deactivateCard(activeCard);
                    }
                    // Activate this card
                    this.classList.add('is-active');
                    // CSS will handle the fixed positioning and z-index: 1000 for .is-active
                    activeCard = this;
                    container.classList.add('has-active-polaroid');
                    document.body.style.overflow = 'hidden'; // Prevent body scroll
                }
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', function(event) {
                    event.stopPropagation();
                    deactivateCard(card); // Deactivate the parent card of this button
                });
            }
        });

        function deactivateCard(cardToDeactivate) {
            if (cardToDeactivate) {
                cardToDeactivate.classList.remove('is-active');
                // CSS will handle reverting to initial transform and z-index via non-active styles
                // JS only needs to remove the .is-active class.
                // cardToDeactivate.style.transform = cardToDeactivate.dataset.initialTransform;
                // cardToDeactivate.style.zIndex = cardToDeactivate.dataset.initialZIndex;
                if (activeCard === cardToDeactivate) {
                    activeCard = null;
                }
            }
            // Check if any card is still active before removing container class
            let anyStillActive = false;
            polaroids.forEach(p => {
                if (p.classList.contains('is-active')) anyStillActive = true;
            });
            if (!anyStillActive) {
                container.classList.remove('has-active-polaroid');
                document.body.style.overflow = ''; // Restore body scroll
            }
        }

        // Click outside active card to close it
        document.addEventListener('click', function(event) {
            if (activeCard && !event.target.closest('.polaroid-card.is-active')) {
                 // If click is outside the currently active card, close it.
                deactivateCard(activeCard);
            }
        });

        // ESC key to close active polaroid
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && activeCard) {
                deactivateCard(activeCard);
            }
        });
    } // End initPolaroidStack
});