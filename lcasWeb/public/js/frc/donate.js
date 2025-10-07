/**
 * Donation Page JavaScript
 * Handles functionality for donation pages including form downloads,
 * Google Form setup, event calendar integration, and sub-navigation toggle.
 */

// Initialize all functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setupGoogleForm();
    setupFundraiserFormDownload();
    
    // Set up event buttons if they exist on the page
    if (document.getElementById('addToCalendarBtn')) {
        setupEventButtons();
    }
});


/**
 * Sets up the download functionality for fundraiser order forms
 */
function setupFundraiserFormDownload() {
    const downloadBtn = document.getElementById('downloadOrderForm');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const formPath = 'forms/tshirt-order-form.pdf';
            const tempLink = document.createElement('a');
            tempLink.href = formPath;
            tempLink.setAttribute('download', 'Ultrabots-Tshirt-Order-Form.pdf');
            tempLink.style.display = 'none';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        });
    }
}

/**
 * Sets up the Google Form for equipment donation
 */
function setupGoogleForm() {
    const equipmentForm = document.getElementById('equipment-form');
    if (equipmentForm) {
        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfnxMOli7EHHea8AZqxfOLHeAojNA2pZ-GgWh9kxq0e6GLeEw/viewform?embedded=true";
        equipmentForm.src = formUrl;
    }
}

/**
 * Sets up event buttons for fundraising events (Example Function)
 */
function setupEventButtons() {
    const calendarBtn = document.getElementById('addToCalendarBtn');
    if (calendarBtn) {
        calendarBtn.addEventListener('click', function() {
            const eventData = { title: 'Robotics Team Car Wash Fundraiser', description: 'Support our robotics team at our car wash fundraiser!', location: 'Lake City High School Parking Lot', startDate: '2025-04-15T10:00:00', endDate: '2025-04-15T15:00:00' };
            const formattedStartDate = eventData.startDate.replace(/-|:|\.\d+/g, '');
            const formattedEndDate = eventData.endDate.replace(/-|:|\.\d+/g, '');
            const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${formattedStartDate}/${formattedEndDate}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
            window.open(calendarUrl, '_blank');
        });
    }

    const flyerBtn = document.getElementById('getFlyerBtn');
    if (flyerBtn) {
        flyerBtn.addEventListener('click', function() {
            showFlyerPlaceholder();
        });
    }
}

/**
 * Creates and displays a modal with fundraiser flyer information (Example Function)
 */
function showFlyerPlaceholder() {
    const modal = document.createElement('div');
    modal.className = 'calendar-modal'; // Requires CSS for .calendar-modal, .calendar-modal-content, etc.
    modal.innerHTML = `
        <div class="calendar-modal-content">
            <span class="close-modal-btn">×</span>
            <h3>Dine-Out Fundraiser Example</h3>
            <p><strong>Date:</strong> April 18, 2025</p>
            <p><strong>Time:</strong> 5:00 PM - 8:00 PM</p>
            <p><strong>Location:</strong> BC Pizza, 123 Main St, Lake City</p>
            <p><strong>Details:</strong> 20% of proceeds donated to the team.</p>
            <p><em>Please mention the Lake City Ultrabots Team when ordering!</em></p>
            <button class="close-modal-bottom">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-modal-btn').addEventListener('click', function() { modal.remove(); });
    modal.querySelector('.close-modal-bottom').addEventListener('click', function() { modal.remove(); });
    modal.addEventListener('click', function(e) { if (e.target === modal) { modal.remove(); } });
}