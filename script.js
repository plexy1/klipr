// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Elements that should be animated on scroll
    const elements = document.querySelectorAll('.reveal');
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    // Custom cursor elements
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Detect if device is mobile
    const isMobile = window.innerWidth < 768;
    
    // Add a class to the body once DOM is loaded to trigger initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
        document.body.classList.add('cursor-active');
    }, 300);
    
    // Initial check for elements in viewport
    checkReveal();
    
    // Scroll event listener with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            // Header scroll effect
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Reveal elements
            checkReveal();
        });
    });
    
    // Function to check if elements are in viewport
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
                
                // Start the counter animation when counter elements are in view
                if (element.classList.contains('counter-item')) {
                    const counterNumber = element.querySelector('.counter-number');
                    const targetNumber = parseInt(counterNumber.getAttribute('data-count'));
                    
                    if (!counterNumber.classList.contains('counted')) {
                        counterNumber.classList.add('counted');
                        animateCounter(counterNumber, targetNumber);
                    }
                }
            } else {
                // Optional: hide elements again when they leave viewport
                // element.classList.remove('active');
            }
        });
    }
    
    // Counter animation function
    function animateCounter(element, target) {
        let count = 0;
        const duration = 2000; // 2 seconds for the animation
        const frameRate = 30; // frames per second
        const increment = target / (duration / 1000 * frameRate);
        
        const timer = setInterval(() => {
            count += increment;
            
            if (count >= target) {
                clearInterval(timer);
                element.textContent = target;
            } else {
                element.textContent = Math.floor(count);
            }
        }, 1000 / frameRate);
    }
    
    // Custom cursor functionality
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add a small delay to the cursor follower for a smooth effect
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Hide cursor when leaving the window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        
        // Show cursor when entering the window
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    }
    
    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Show or hide work items based on filter
            workItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Testimonial slider navigation
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialNext && testimonialPrev) {
        let currentSlide = 0;
        
        testimonialNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % dots.length;
            updateSlider();
        });
        
        testimonialPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + dots.length) % dots.length;
            updateSlider();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
        
        function updateSlider() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // In a real implementation, you would slide the testimonials
            // For now, we're just updating the dots for illustration
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add active class to the clicked nav item
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active-link');
                });
                this.classList.add('active-link');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler
    function handleFormSubmit(form) {
        // Get form fields
        const nameField = form.querySelector('input[type="text"]');
        const emailField = form.querySelector('input[type="email"]');
        const messageField = form.querySelector('textarea');
        
        // Simple validation
        if (!nameField.value || !emailField.value || !messageField.value) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission (in a real project this would send data to a server)
        const formButton = form.querySelector('button');
        const originalText = formButton.textContent;
        
        formButton.textContent = 'Sending...';
        formButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Create a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message sent successfully!';
            
            // Replace form with success message
            form.style.height = form.offsetHeight + 'px';
            form.innerHTML = '';
            form.appendChild(successMessage);
            
            // Animation for success message
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 10);
        }, 1500);
    }
    
    // Setup all contact forms
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailField = this.querySelector('input[type="email"]');
            
            if (!emailField.value) {
                alert('Please enter your email address');
                return;
            }
            
            const button = this.querySelector('button');
            button.disabled = true;
            
            setTimeout(() => {
                emailField.value = '';
                button.disabled = false;
                alert('Thank you for subscribing to our newsletter!');
            }, 1000);
        });
    }
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav a').forEach(navLink => {
            navLink.classList.remove('active-link');
            if (navLink.getAttribute('href') === `#${current}`) {
                navLink.classList.add('active-link');
            }
        });
    });
    
    // Cursor effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .work-item, .filter-btn, .testimonial-prev, .testimonial-next, .dot');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.classList.add('interactive-cursor');
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.classList.remove('interactive-cursor');
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Add some animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}); 