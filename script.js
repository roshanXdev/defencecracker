document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('#all-tab, #cds-tab, #capf-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('tab-active'));
            
            // Add active class to clicked tab
            this.classList.add('tab-active');
            
            // Here you would normally filter content based on the selected tab
            // For this demo, we're just changing the tab appearance
        });
    });
    
    // Mobile menu toggle functionality could be added here

    // JavaScript for interactive elements from new sections
    // Carousel functionality
    const carousel = document.querySelector('.stories-carousel');
    const cards = document.querySelectorAll('.story-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const cardWidth = 350 + 24; // card width + gap

    function updateCarousel() {
        if (!carousel) return; // Check if carousel exists
        carousel.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
        });

        // Update indicators
        indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
        });
    }

    if (prevBtn && nextBtn) { // Check if buttons exist
        prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
        });

        nextBtn.addEventListener('click', function() {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
        currentIndex = index;
        updateCarousel();
        });
    });

    // Tab functionality for resources (Assuming you have tabs with class 'resource-tab' and content with class 'resource-content')
    const resourceTabs = document.querySelectorAll('.resource-tab'); // Note: Your HTML doesn't have this class yet
    resourceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
        const target = this.getAttribute('data-target');

        // Remove active class from all tabs
        resourceTabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        this.classList.add('active');

        // Show corresponding content
        document.querySelectorAll('.resource-content').forEach(content => { // Note: Your HTML doesn't have this class yet
            content.style.display = 'none';
        });

        const targetElement = document.getElementById(target);
        if (targetElement) {
            targetElement.style.display = 'block';
        }
        });
    });

}); 