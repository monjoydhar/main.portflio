// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializePortfolio();
    initializeContactForm();
    initializeAnimations();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-visual');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Portfolio functionality
function initializePortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Portfolio data
    const portfolioItems = [
        {
            id: 1,
            title: 'E-commerce Platform',
            description: 'Modern e-commerce solution with advanced features and seamless user experience.',
            image: 'project-placeholder.svg',
            category: 'ecommerce',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Collaborative task management application with real-time updates and team features.',
            image: 'project-placeholder.svg',
            category: 'web',
            tags: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 3,
            title: 'Mobile Banking App',
            description: 'Secure mobile banking application with biometric authentication and modern UI.',
            image: 'project-placeholder.svg',
            category: 'mobile',
            tags: ['React Native', 'TypeScript', 'Firebase'],
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 4,
            title: 'Restaurant Ordering System',
            description: 'Complete restaurant management system with online ordering and delivery tracking.',
            image: 'project-placeholder.svg',
            category: 'web',
            tags: ['Angular', 'Python', 'Django', 'MySQL'],
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 5,
            title: 'Fitness Tracking App',
            description: 'Mobile app for tracking workouts, nutrition, and health metrics with social features.',
            image: 'project-placeholder.svg',
            category: 'mobile',
            tags: ['Flutter', 'Dart', 'Firebase', 'Charts'],
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 6,
            title: 'SaaS Dashboard',
            description: 'Analytics dashboard for SaaS applications with real-time data visualization.',
            image: 'project-placeholder.svg',
            category: 'web',
            tags: ['React', 'D3.js', 'Node.js', 'Redis'],
            liveUrl: '#',
            codeUrl: '#'
        }
    ];

    // Render portfolio items
    function renderPortfolio(items) {
        portfolioGrid.innerHTML = '';
        items.forEach((item, index) => {
            const portfolioItem = createPortfolioItem(item, index);
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    // Create portfolio item HTML
    function createPortfolioItem(item, index) {
        const div = document.createElement('div');
        div.className = 'portfolio-item fade-in';
        div.style.animationDelay = `${index * 0.1}s`;
        div.dataset.category = item.category;

        div.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <div class="portfolio-links">
                        <a href="${item.liveUrl}" class="portfolio-link" target="_blank" aria-label="View Live">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${item.codeUrl}" class="portfolio-link" target="_blank" aria-label="View Code">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-description">${item.description}</p>
                <div class="portfolio-tags">
                    ${item.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        return div;
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            const filteredItems = filter === 'all' 
                ? portfolioItems 
                : portfolioItems.filter(item => item.category === filter);

            renderPortfolio(filteredItems);

            // Re-observe new elements for animations
            setTimeout(() => {
                document.querySelectorAll('.portfolio-item').forEach(el => {
                    el.classList.add('fade-in');
                });
            }, 50);
        });
    });

    // Initial render
    renderPortfolio(portfolioItems);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters and spaces only, minimum 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: true,
            minLength: 5,
            message: 'Subject must be at least 5 characters long'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Message must be at least 10 characters long'
        }
    };

    // Validate individual field
    function validateField(field, rules) {
        const value = field.value.trim();
        const errors = [];

        if (rules.required && !value) {
            errors.push('This field is required');
        }

        if (value && rules.minLength && value.length < rules.minLength) {
            errors.push(`Minimum ${rules.minLength} characters required`);
        }

        if (value && rules.pattern && !rules.pattern.test(value)) {
            errors.push(rules.message || 'Invalid format');
        }

        return errors;
    }

    // Show field error
    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Clear field error
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                const errors = validateField(this, validationRules[fieldName]);
                if (errors.length > 0) {
                    showFieldError(this, errors[0]);
                } else {
                    clearFieldError(this);
                }
            });

            field.addEventListener('input', function() {
                if (this.closest('.form-group').classList.contains('error')) {
                    const errors = validateField(this, validationRules[fieldName]);
                    if (errors.length === 0) {
                        clearFieldError(this);
                    }
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Clear all previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorElement = group.querySelector('.error-message');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        });

        // Validate all fields
        let isValid = true;
        const formData = new FormData(this);
        const data = {};

        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errors = validateField(field, validationRules[fieldName]);
            
            if (errors.length > 0) {
                showFieldError(field, errors[0]);
                isValid = false;
            } else {
                data[fieldName] = field.value.trim();
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await simulateFormSubmission(data);
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Hide loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) { // 90% success rate
                    resolve(data);
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'hsl(142 76% 36%)' : 'hsl(0 84% 60%)'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Animation initialization
function initializeAnimations() {
    // Add fade-in class to animated elements
    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .service-card, .skill-item, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add typing cursor effect
        const style = document.createElement('style');
        style.textContent = `
            .typing-cursor::after {
                content: '|';
                animation: blink 1s infinite;
                margin-left: 2px;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Download CV functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a simple CV/Resume content
            const cvContent = generateCVContent();
            downloadCV(cvContent, 'WebDev_Pro_CV.pdf');
            
            showNotification('CV download started!', 'success');
        });
    }
});

// Generate CV content
function generateCVContent() {
    return `
JOHN DOE - WEB DEVELOPER
========================

Contact Information:
Email: hello@webdevpro.com
Phone: +1 (555) 123-4567
Website: www.webdevpro.com

Professional Summary:
Passionate web developer with 5+ years of experience creating modern, responsive websites and web applications. Specialized in full-stack development with expertise in React, Node.js, and modern web technologies.

Technical Skills:
- Frontend: HTML5, CSS3, JavaScript, React, Vue.js, Angular
- Backend: Node.js, Python, PHP, Express.js
- Databases: MongoDB, PostgreSQL, MySQL
- Tools: Git, Docker, AWS, Webpack, Sass

Experience:
Senior Web Developer (2020-Present)
- Led development of 15+ web applications
- Improved application performance by 40%
- Mentored junior developers

Web Developer (2018-2020)
- Developed responsive websites for 30+ clients
- Implemented modern UI/UX designs
- Collaborated with design and marketing teams

Education:
Bachelor of Computer Science
University of Technology (2014-2018)

Certifications:
- AWS Certified Developer
- Google Analytics Certified
- MongoDB Certified Developer
    `.trim();
}

// Simple CV download (creates a text file)
function downloadCV(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounced scroll handler
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll handling code
        }, 16); // ~60fps
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here in a real application
        console.log('Service Worker support detected');
    });
}
