/**
 * Events Page Functionality for Lake City Ultrabots Team 8041
 * Fetches event data from /data/events.json (expecting {"events": [...]}),
 * renders the timeline, and handles event reminder functionality using localStorage.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize events page features
    initEventsPageFeatures();

    function initEventsPageFeatures() {
        // Fetch and load events data from /data/events.json
        loadEventsData();
    }

    /**
     * Fetch events data from JSON file (/data/events.json)
     * Now expects the structure: { "events": [ {event1}, {event2}, ... ] }
     */
    async function loadEventsData() {
        const timelineContainer = document.querySelector('.events-timeline');
        if (!timelineContainer) {
            console.error('Error: Events timeline container (.events-timeline) not found.');
            return;
        }

        try {
            // Fetch from the path specified in the .pages.yml configuration
            const response = await fetch('/data/events.json');
            if (!response.ok) {
                throw new Error(`Failed to load events data. Status: ${response.status} ${response.statusText}`);
            }

            // Parse the JSON response - this should be the object { events: [...] }
            const data = await response.json();

            // --- REFACTORED SECTION START ---
            // Check if the fetched data is an object and contains the 'events' key which holds an array
            if (data && typeof data === 'object' && data.events && Array.isArray(data.events)) {
                // Extract the actual array of events
                const events = data.events;

                // Sort events by date before rendering (important for chronological order)
                events.sort((a, b) => new Date(a.date) - new Date(b.date));

                // Render the fetched events array
                renderEvents(events);

                // Initialize event reminder buttons only AFTER events are rendered
                initializeEventReminderButtons();
                // Check localStorage for previously set reminders AFTER buttons are initialized
                checkExistingEventReminders();

            } else {
                // Handle cases where the JSON structure is not as expected
                console.error("Error: 'events' array not found or invalid in /data/events.json. Expected structure: { \"events\": [...] }");
                showFallbackMessage('.events-timeline', 'Unable to load events. Data format error.');
                // Do not proceed if data structure is wrong
            }
            // --- REFACTORED SECTION END ---

        } catch (error) {
            // Catch fetch errors or JSON parsing errors
            console.error('Error loading or processing events:', error);
            showFallbackMessage('.events-timeline', `Unable to load events. ${error.message}. Please try again later.`);
        }
    }

    /**
     * Render events array to the timeline, grouped by month.
     * (This function remains unchanged as it expects an array of event objects)
     */
    function renderEvents(events) {
        const timeline = document.querySelector('.events-timeline');
        if (!timeline) return;

        // Clear previous content
        timeline.innerHTML = '';

        // Handle the case of an empty events array after successful fetch & parse
        if (!events || events.length === 0) {
            showFallbackMessage('.events-timeline', '<h3>No upcoming events</h3><p>Check back soon for new events!</p>');
            return;
        }

        // Constants for date formatting
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthAbbr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
                           'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        let currentMonthYear = ''; // Track the current month/year for dividers

        events.forEach((event, index) => {
            try {
                const eventDate = new Date(event.date + 'T00:00:00');
                if (isNaN(eventDate.getTime())) {
                    console.warn(`Invalid date format for event "${event.title || 'Untitled'}": ${event.date}. Skipping.`);
                    return;
                }

                const month = eventDate.getMonth();
                const year = eventDate.getFullYear();
                const day = eventDate.getDate();
                const weekday = eventDate.getDay();
                const eventMonthYear = `${months[month]} ${year}`;

                if (eventMonthYear !== currentMonthYear) {
                    const monthDivider = document.createElement('div');
                    monthDivider.className = 'month-divider';
                    monthDivider.innerHTML = `<h3>${eventMonthYear}</h3>`;
                    timeline.appendChild(monthDivider);
                    currentMonthYear = eventMonthYear;
                }

                const safeTitle = (event.title || 'event').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const eventCardId = `event-${event.date}-${safeTitle}-${index}`;

                const eventCard = document.createElement('div');
                eventCard.className = `event-card ${event.type || 'meeting'}`;
                eventCard.id = eventCardId;

                eventCard.innerHTML = `
                    <div class="event-date">
                        <div class="date-day">${day}</div>
                        <div class="date-month">${monthAbbr[month]}</div>
                        <div class="date-weekday">${weekdays[weekday]}</div>
                    </div>
                    <div class="event-details">
                        <div class="event-badge">${capitalizeFirstLetter(event.type || 'Meeting')}</div>
                        <h3 class="event-title">${event.title || 'Untitled Event'}</h3>
                        <div class="event-meta">
                            ${event.time ? `
                            <div class="event-time">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                ${event.time}
                            </div>` : ''}
                            ${event.location ? `
                            <div class="event-location">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                ${event.location}
                            </div>` : ''}
                        </div>
                        ${event.description ? `
                        <div class="event-description">
                            <p>${event.description}</p>
                        </div>` : ''}
                        <div class="event-actions">
                            <button class="btn btn-reminder" data-event-id="${eventCardId}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                Add Reminder
                            </button>
                        </div>
                    </div>
                `;
                timeline.appendChild(eventCard);

            } catch (e) {
                console.error(`Error rendering event: ${event.title || 'Unknown Event'}`, e);
            }
        });
    }

    // --- Event Card Reminder Button Functionality (using localStorage) ---
    // (These functions remain unchanged as they operate on the rendered elements)

    function initializeEventReminderButtons() {
        const eventTimeline = document.querySelector('.events-timeline');
        if (!eventTimeline) return;
        eventTimeline.addEventListener('click', function(event) {
             const reminderButton = event.target.closest('.btn-reminder');
             if (reminderButton && !reminderButton.disabled) {
                  handleReminderButtonClick(reminderButton);
             }
        });
    }

    function handleReminderButtonClick(button) {
        const eventCard = button.closest('.event-card');
        const eventId = button.getAttribute('data-event-id');
        const eventTitleElement = eventCard?.querySelector('.event-title');
        const eventTitle = eventTitleElement ? eventTitleElement.textContent.trim() : 'Event';

        if (!eventId) {
            console.error("Could not find event ID for reminder button.");
            showToast("Error: Could not set reminder.");
            return;
        }
        saveEventReminder(eventId);
        updateReminderButtonState(button, true);
        showToast(`Reminder set for: ${eventTitle}`);
    }

    function saveEventReminder(eventId) {
        try {
            const reminders = JSON.parse(localStorage.getItem('eventReminders') || '{}');
            reminders[eventId] = { timestamp: new Date().toISOString(), notified: false };
            localStorage.setItem('eventReminders', JSON.stringify(reminders));
        } catch (error) {
            console.error('Error saving event reminder to localStorage:', error);
            showToast("Error: Could not save reminder preference.");
        }
    }

    function checkExistingEventReminders() {
        try {
            const reminders = JSON.parse(localStorage.getItem('eventReminders') || '{}');
            if (typeof reminders !== 'object' || reminders === null) {
                 console.warn('Invalid event reminders data in localStorage. Resetting.');
                 localStorage.setItem('eventReminders', JSON.stringify({}));
                 return;
            }
            document.querySelectorAll('.event-card .btn-reminder').forEach(button => {
                const eventId = button.getAttribute('data-event-id');
                if (eventId && reminders[eventId]) {
                    updateReminderButtonState(button, true);
                } else {
                    updateReminderButtonState(button, false);
                }
            });
        } catch (error) {
            console.error('Error checking existing event reminders from localStorage:', error);
        }
    }

    function updateReminderButtonState(button, isSet) {
        if (!button) return;
        if (isSet) {
            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Reminder Set
            `;
            button.disabled = true;
            button.classList.add('reminder-set');
        } else {
             button.innerHTML = `
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                 Add Reminder
             `;
            button.disabled = false;
            button.classList.remove('reminder-set');
        }
    }

    // --- Helper Functions ---
    // (These functions remain unchanged)

    function showToast(message) {
        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            toast.style.cssText = `
                position: fixed; bottom: 20px; right: 20px;
                background-color: var(--primary-dark, #2c3e50); color: white;
                padding: 12px 20px; border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1050;
                opacity: 0; transition: opacity 0.3s ease-in-out;
                pointer-events: none; font-size: 0.9rem;
                max-width: 300px; word-wrap: break-word;
            `;
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        void toast.offsetWidth;
        toast.style.opacity = '1';
        setTimeout(() => {
             if (toast) toast.style.opacity = '0';
             setTimeout(() => {
                 if (toast && toast.style.opacity === '0') toast.remove();
             }, 350);
            }, 3000);
    }

    function showFallbackMessage(containerSelector, htmlMessage) {
        const container = document.querySelector(containerSelector);
        if (container) {
            container.innerHTML = '';
            const messageEl = document.createElement('div');
            messageEl.className = 'fallback-message events-fallback';
            messageEl.innerHTML = htmlMessage;
            container.appendChild(messageEl);
        } else {
            console.error(`Fallback message container not found: ${containerSelector}`);
        }
    }

    function capitalizeFirstLetter(string) {
        if (!string || typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});