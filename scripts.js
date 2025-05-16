// Main JavaScript for Community Learning Hub

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initTestimonialSlider();
    initAnimations();
    initNewsletterForm();
    initFeaturedCourses();
    handleResourceDownload();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#mobile-menu-btn') && !event.target.closest('#main-nav') && mainNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (testimonials.length === 0) return;
    
    let currentTestimonial = 0;
    
    // Set initial active testimonial
    testimonials[currentTestimonial].classList.add('active');
    
    // Previous button functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        });
    }
    
    // Next button functionality
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        });
    }
    
    // Auto-rotate testimonials
    setInterval(function() {
        if (document.visibilityState === 'visible') {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }
    }, 8000);
}

// Scroll and Intersection Animations
function initAnimations() {
    // Elements to animate when they come into view
    const animateOnScroll = document.querySelectorAll('.feature-card, .about-content, .course-card');
    
    // Only proceed if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const element = entry.target;
                
                // Add different animations based on element type
                if (element.classList.contains('feature-card')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                } else if (element.classList.contains('about-content')) {
                    element.classList.add('fade-in');
                } else if (element.classList.contains('course-card')) {
                    element.classList.add('slide-in-right');
                }
                
                appearOnScroll.unobserve(element);
            });
        }, appearOptions);
        
        animateOnScroll.forEach(element => {
            // Set initial styles
            if (element.classList.contains('feature-card')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
            
            appearOnScroll.observe(element);
        });
    }
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .feature-card, .course-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// Newsletter Form Handling
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();
            
            // Simple email validation
            if (!isValidEmail(email)) {
                showFormMessage(newsletterMessage, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage(newsletterMessage, 'Subscribing...', 'info');
            
            // Mock API call with timeout
            setTimeout(function() {
                // Success message
                showFormMessage(newsletterMessage, 'Thank you for subscribing!', 'success');
                emailInput.value = '';
                
                // Reset message after delay
                setTimeout(() => {
                    newsletterMessage.textContent = '';
                    newsletterMessage.className = 'form-message';
                }, 3000);
            }, 1000);
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Helper function to show form messages
function showFormMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = 'form-message';
    
    if (type === 'error') {
        element.style.color = 'var(--error-color)';
    } else if (type === 'success') {
        element.style.color = 'var(--success-color)';
    } else {
        element.style.color = 'var(--light-text)';
    }
}

// Featured Courses Data and Dynamic Load
function initFeaturedCourses() {
    // In a real application, this would come from an API
    const coursesData = [
        {
            title: "Introduction to Digital Literacy",
            description: "Learn essential computer skills for today's digital world.",
            image: "digital-literacy.jpg"
        },
        {
            title: "Financial Literacy Basics",
            description: "Understand personal finance management and budgeting principles.",
            image: "financial-literacy.jpg"
        },
        {
            title: "Professional Communication",
            description: "Enhance your workplace communication skills and confidence.",
            image: "professional-communication.jpg"
        }
    ];
    
    // Remove placeholder cards if we have data
    const courseGrid = document.querySelector('.course-grid');
    if (courseGrid && coursesData.length > 0) {
        // In a real application, you would replace placeholders with actual data
        // For now, we'll just leave the placeholders in place
        
        // Add hover animation to course cards
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.querySelector('.course-content').style.transform = 'translateY(-10px)';
                this.querySelector('.course-content').style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.querySelector('.course-content').style.transform = 'translateY(0)';
            });
        });
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100, // offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Button hover effects with subtle scaling
const allButtons = document.querySelectorAll('.btn');
allButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add soft loading animation when page loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Stagger animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Add subtle animation to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.animation = 'fadeIn 1s ease-out';
    }
});

// Resource Download Handler
function handleResourceDownload() {
    // Get all download buttons
    const downloadButtons = document.querySelectorAll('a[download]');
    
    // Add click event listeners to download buttons
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the resource card containing this button
            const resourceCard = button.closest('.resource-card');
            
            // Get resource information
            const resourceTitle = resourceCard.querySelector('h3').textContent;
            const resourceType = resourceCard.getAttribute('data-type');
            
            // Generate the file name based on the title
            const fileName = `${resourceTitle.toLowerCase().replace(/\s+/g, '-')}.${resourceType}`;
            
            // Get the resource path - this should be replaced with actual file paths
            const resourcePath = `/resources/${resourceType}s/${fileName}`;
            
            // Show loading state
            const originalText = button.textContent;
            button.textContent = 'Downloading...';
            button.style.opacity = '0.7';
            
            // Initiate download
            handleResourceDownload(resourcePath, fileName)
                .finally(() => {
                    // Reset button state
                    button.textContent = originalText;
                    button.style.opacity = '1';
                });
        });
    });

    // Add visual feedback on hover
    downloadButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            button.style.transition = 'all 0.3s ease';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
}

// Add necessary CSS for download button animations
const style = document.createElement('style');
style.textContent = `
    .resource-card .btn[download] {
        position: relative;
        overflow: hidden;
    }

    .resource-card .btn[download]::after {
        content: '⬇';
        position: absolute;
        right: 1rem;
        opacity: 0;
        transform: translateY(-100%);
        transition: all 0.3s ease;
    }

    .resource-card .btn[download]:hover::after {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
  
  