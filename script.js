// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      
      if (indicators.length > 0) {
        indicators[currentSlide].classList.add('active');
      }
    }
    
    // Event listeners for controls
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
      });
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Auto-play functionality
    let interval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
    
    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);
    });
    
    // Initialize the first slide
    showSlide(0);
  });
  
  // Tab Functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.parentElement;
      const activeButton = parent.querySelector('.active');
      
      if (activeButton) {
        activeButton.classList.remove('active');
      }
      
      button.classList.add('active');
    });
  });
  
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});

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

// JavaScript for Personalized Study Plans
const studyPlanForm = document.getElementById('studyPlanForm');
const studyPlanResult = document.getElementById('studyPlanResult');

if (studyPlanForm) {
    studyPlanForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const examType = document.getElementById('examType').value;
    const preparationTime = document.getElementById('preparationTime').value;
    
    const strengths = Array.from(document.querySelectorAll('input[name="strengths"]:checked'))
        .map(checkbox => checkbox.value);
        
    const improvements = Array.from(document.querySelectorAll('input[name="improvements"]:checked'))
        .map(checkbox => checkbox.value);
    
    if (!examType || !preparationTime || strengths.length === 0 || improvements.length === 0) {
        alert('Please fill in all fields');
        return;
    }
    
    // Generate and display the study plan
    generateStudyPlan(examType, preparationTime, strengths, improvements);
    });
}

function generateStudyPlan(examType, months, strengths, improvements) {
    // In a real application, this would likely call an API
    // For this example, we'll generate a simple template
    
    const examName = examType.toUpperCase();
    const totalWeeks = months * 4;
    
    let planHTML = `
    <h3>Your Personalized ${examName} Study Plan (${months} month${months > 1 ? 's' : ''})</h3>
    <p>Based on your strengths in ${strengths.join(', ')} and focus areas for improvement in ${improvements.join(', ')}</p>
    
    <div class="weekly-plan">
    `;
    
    // Generate a template for each week
    for (let week = 1; week <= Math.min(totalWeeks, 4); week++) {
    planHTML += `
        <div class="week-block">
        <h4>Week ${week}</h4>
        
        <div class="day-plan">
            <h5>Days 1-2: Focus on ${improvements[0] || 'Core Topics'}</h5>
            <ul>
            <li>Study key concepts in ${improvements[0] || 'selected subject'}</li>
            <li>Complete 30 practice questions</li>
            <li>Review weak areas from practice</li>
            </ul>
        </div>
        
        <div class="day-plan">
            <h5>Days 3-4: Build on ${strengths[0] || 'Strengths'}</h5>
            <ul>
            <li>Advanced practice in ${strengths[0] || 'your strong subject'}</li>
            <li>Take a timed test</li>
            <li>Review and reinforce concepts</li>
            </ul>
        </div>
        
        <div class="day-plan">
            <h5>Days 5-7: Mixed Practice & Review</h5>
            <ul>
            <li>Full-length practice test</li>
            <li>Review problem areas</li>
            <li>Schedule 1-hour breaks between study sessions</li>
            </ul>
        </div>
        
        <div class="resources-section">
            <h5>Recommended Resources:</h5>
            <div class="resources-list">
            <span class="resource-tag">Study Guide: ${examName} Fundamentals</span>
            <span class="resource-tag">Practice Test Set #${week}</span>
            <span class="resource-tag">Video Lessons: ${improvements[0] || 'Core Topics'}</span>
            </div>
        </div>
        </div>
    `;
    }
    
    planHTML += `
    </div>
    <p><strong>Note:</strong> This is a sample of your first ${Math.min(totalWeeks, 4)} weeks. The complete ${totalWeeks}-week plan is available in your dashboard.</p>
    <button id="printPlanBtn" class="btn btn-secondary" style="margin-top: 20px;">Print/Save Plan as PDF</button>
    `;
    
    // Display the result
    if (studyPlanResult) { // Check if element exists
        studyPlanResult.innerHTML = planHTML;
        studyPlanResult.style.display = 'block';

        // Add event listener to the new print button
        const printBtn = document.getElementById('printPlanBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }
        
        // Scroll to the result
        studyPlanResult.scrollIntoView({ behavior: 'smooth' });
    }
}

// JavaScript for Discussion Forum
// Sample data for forum discussions
const forumData = [
    {
    id: 1,
    category: 'cds',
    title: 'Best Strategy for CDS Mathematics in 60 Days',
    excerpt: "I've been struggling with the Maths section and need a focused strategy for the upcoming CDS exam. Has anyone prepared for Maths in 2 months and succeeded?",
    author: 'Rahul Sharma',
    authorImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    replies: 24,
    views: 856,
    timestamp: 'Updated 2 hours ago'
    },
    {
    id: 2,
    category: 'capf',
    title: 'Essay Writing Tips for CAPF Paper II',
    excerpt: "Looking for structured approach to essay writing for Paper II. Any recommendations on practice and improvement techniques?",
    author: 'Ananya Patel',
    authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
    replies: 16,
    views: 621,
    timestamp: 'Updated yesterday'
    },
    {
    id: 3,
    category: 'study',
    title: 'Recommended Books for CDS General Knowledge',
    excerpt: "Can anyone suggest the most effective books for GK preparation? Especially focusing on History and Geography sections.",
    author: 'Vikram Singh',
    authorImg: 'https://randomuser.me/api/portraits/men/45.jpg',
    replies: 32,
    views: 742,
    timestamp: 'Updated 3 days ago'
    },
    {
    id: 4,
    category: 'success',
    title: 'My Journey to AIR 56 in CDS I 2024',
    excerpt: "I want to share my preparation strategy that helped me secure AIR 56 in the recent CDS exam. From basics to advanced topics, here's how I planned my studies.",
    author: 'Capt. Rohan Mehra',
    authorImg: 'https://randomuser.me/api/portraits/men/22.jpg',
    replies: 47,
    views: 1289,
    timestamp: 'Updated 1 week ago'
    },
    {
    id: 5,
    category: 'capf',
    title: 'Physical Fitness Preparation for CAPF',
    excerpt: "What's the best approach to prepare for the physical fitness test? Looking for a structured workout plan alongside studies.",
    author: 'Deepak Kumar',
    authorImg: 'https://randomuser.me/api/portraits/men/67.jpg',
    replies: 29,
    views: 532,
    timestamp: 'Updated 4 days ago'
    },
    {
    id: 6,
    category: 'success',
    title: 'From 3 Failed Attempts to Success: My CAPF Journey',
    excerpt: "After failing 3 times, I finally cleared the CAPF exam with a good rank. Here's what I changed in my approach and what worked for me.",
    author: 'Priya Sharma',
    authorImg: 'https://randomuser.me/api/portraits/women/28.jpg',
    replies: 53,
    views: 1456,
    timestamp: 'Updated 2 weeks ago'
    }
];

// Elements
const discussionsContainer = document.querySelector('.forum-discussions');
const categoryTabs = document.querySelectorAll('.category-tab');
const searchInput = document.getElementById('forumSearch');
const searchBtn = document.getElementById('searchBtn');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages'); // Added selector for totalPages

// State
let currentCategory = 'all';
let currentPage = 1;
const itemsPerPage = 5;
let filteredDiscussions = [...forumData];

// Initialize
if (discussionsContainer) { // Check if the container exists before rendering
  renderDiscussions();
}

// Event listeners
if (categoryTabs) {
    categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Update current category and reset page
        currentCategory = category;
        currentPage = 1;
        
        // Filter and render
        filterAndRenderDiscussions();
    });
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', function() {
    currentPage = 1;
    filterAndRenderDiscussions();
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        currentPage = 1;
        filterAndRenderDiscussions();
    }
    });
}

if (prevPageBtn) {
    prevPageBtn.addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        renderDiscussions();
    }
    });
}

if (nextPageBtn) {
    nextPageBtn.addEventListener('click', function() {
    const totalPages = Math.ceil(filteredDiscussions.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderDiscussions();
    }
    });
}

// Functions
function filterAndRenderDiscussions() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    filteredDiscussions = forumData.filter(discussion => {
    // Filter by category
    const categoryMatch = currentCategory === 'all' || discussion.category === currentCategory;
    
    // Filter by search term
    const searchMatch = 
        discussion.title.toLowerCase().includes(searchTerm) || 
        discussion.excerpt.toLowerCase().includes(searchTerm) ||
        discussion.author.toLowerCase().includes(searchTerm);
    
    return categoryMatch && searchMatch;
    });
    
    renderDiscussions();
}

function renderDiscussions() {
    if (!discussionsContainer) return;
    
    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil(filteredDiscussions.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredDiscussions.length);
    
    // Update pagination UI
    if (currentPageSpan) currentPageSpan.textContent = currentPage;
    if (totalPagesSpan) totalPagesSpan.textContent = totalPages; // Use the selected totalPagesSpan
    if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
    if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;
    
    // Generate discussion cards
    const discussionsHTML = filteredDiscussions
    .slice(startIndex, endIndex)
    .map(discussion => `
        <div class="discussion-card" data-id="${discussion.id}">
        <div class="discussion-avatar">
            <img src="${discussion.authorImg}" alt="${discussion.author}">
        </div>
        <div class="discussion-content">
            <span class="discussion-category">${getCategoryName(discussion.category)}</span>
            <h3 class="discussion-title">${discussion.title}</h3>
            <p class="discussion-excerpt">${discussion.excerpt}</p>
            <div class="discussion-meta">
            <span class="discussion-author">Posted by: ${discussion.author}</span>
            <div class="discussion-stats">
                <span class="stats-item"><i class="fas fa-comment"></i> ${discussion.replies}</span>
                <span class="stats-item"><i class="fas fa-eye"></i> ${discussion.views}</span>
                <span class="stats-item">${discussion.timestamp}</span>
            </div>
            </div>
        </div>
        </div>
    `)
    .join('');
    
    // Display discussions or "no results" message
    if (discussionsHTML) {
    discussionsContainer.innerHTML = discussionsHTML;
    } else {
    discussionsContainer.innerHTML = `
        <div class="no-results">
        <p>No discussions found matching your criteria.</p>
        </div>
    `;
    }
    
    // Add click event to discussion cards
    document.querySelectorAll('.discussion-card').forEach(card => {
    card.addEventListener('click', function() {
        const discussionId = this.dataset.id;
        // In a real application, this would navigate to the discussion detail page
        alert(`Navigating to discussion #${discussionId}`);
    });
    });
}

function getCategoryName(categorySlug) {
    const categories = {
    'cds': 'CDS Preparation',
    'capf': 'CAPF Preparation',
    'study': 'Study Materials',
    'success': 'Success Stories'
    };
    
    return categories[categorySlug] || categorySlug;
} 