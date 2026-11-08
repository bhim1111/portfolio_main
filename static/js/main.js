// Enhanced Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update nav indicator based on scroll position
        if (navIndicator) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (currentScroll / scrollHeight) * 100;
            navIndicator.style.width = scrollProgress + '%';
        }

        lastScroll = currentScroll;
    });

    // Mobile Navigation Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Active link highlighting based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Handle home page
        if (window.scrollY < 100) {
            navLinks.forEach(link => {
                if (link.getAttribute('href').includes('#home') || link.getAttribute('href') === '/') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced skill cards animation on scroll
    const skillObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const skillCard = entry.target;
                const skillIndex = parseInt(skillCard.dataset.skillIndex) || 0;
                
                // Staggered card entrance
                setTimeout(() => {
                    skillCard.style.animationDelay = `${skillIndex * 0.1}s`;
                    skillCard.style.animation = 'skillCardEntrance 0.6s ease-out forwards';
                }, skillIndex * 100);

                // Animate progress bar
                const skillProgress = skillCard.querySelector('.skill-progress');
                if (skillProgress) {
                    const proficiency = skillProgress.dataset.proficiency || 0;
                    setTimeout(() => {
                        skillProgress.style.width = proficiency + '%';
                    }, 300 + (skillIndex * 100));
                }

                // Mark as animated
                skillCard.dataset.animated = 'true';
                skillObserver.unobserve(skillCard);
            }
        });
    }, skillObserverOptions);

    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        skillObserver.observe(card);
    });

    // Add interactive hover effects
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon, .skill-icon-placeholder');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon, .skill-icon-placeholder');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Auto-hide messages after 5 seconds
    const messages = document.querySelectorAll('.alert');
    messages.forEach(message => {
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 5000);
    });

    // Interactive Hero Title Effects
    const heroTitle = document.querySelector('.title-line-2');
    if (heroTitle) {
        // Mouse move parallax effect
        heroTitle.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 10;
            const moveY = (y - centerY) / centerY * 10;
            
            this.style.transform = `translate(${moveX}px, ${moveY - 10}px) scale(1.05)`;
            this.style.transition = 'transform 0.1s ease-out';
        });

        heroTitle.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'transform 0.3s ease-out';
        });

        // Click ripple effect
        heroTitle.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add glow effect on hover
        heroTitle.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 30px rgba(245, 158, 11, 0.8), 0 0 60px rgba(245, 158, 11, 0.4)';
        });

        heroTitle.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 30px rgba(245, 158, 11, 0.5)';
        });
    }

    // Add floating particles around the title
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'title-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        const heroTitleWrapper = document.querySelector('.hero-title-wrapper');
        if (heroTitleWrapper) {
            heroTitleWrapper.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }
    }

    // Create particles periodically
    if (document.querySelector('.hero-title-wrapper')) {
        setInterval(createParticle, 800);
    }

    // Interactive Hero Image Effects
    const heroImage = document.querySelector('.hero-profile-img');
    const imageWrapper = document.querySelector('.image-wrapper');
    const imageParticles = document.querySelector('.image-particles');
    
    if (heroImage && imageWrapper) {
        // 3D Tilt Effect on Mouse Move
        imageWrapper.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`;
            heroImage.style.transition = 'transform 0.1s ease-out';
        });

        imageWrapper.addEventListener('mouseleave', function() {
            heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            heroImage.style.transition = 'transform 0.5s ease-out';
        });

        // Parallax effect on scroll
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            const scrollDiff = currentScrollY - lastScrollY;
            
            if (scrollDiff !== 0 && currentScrollY < 500) {
                const parallaxOffset = currentScrollY * 0.3;
                imageWrapper.style.transform = `translateY(${parallaxOffset}px)`;
            }
            
            lastScrollY = currentScrollY;
        });

        // Click zoom effect
        heroImage.addEventListener('click', function(e) {
            this.style.transform = 'scale(1.15)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });

        // Create orbiting particles around image
        function createImageParticle(index, total) {
            const particle = document.createElement('div');
            particle.className = 'image-particle';
            const angle = (360 / total) * index;
            particle.style.setProperty('--angle', angle + 'deg');
            particle.style.animationDelay = (index * 0.5) + 's';
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
            
            if (imageParticles) {
                imageParticles.appendChild(particle);
            }
        }

        // Create 8 particles orbiting the image
        if (imageParticles) {
            for (let i = 0; i < 8; i++) {
                createImageParticle(i, 8);
            }
        }

        // Breathing effect (subtle scale animation)
        setInterval(() => {
            if (!imageWrapper.matches(':hover')) {
                heroImage.style.animation = 'imageFloat 6s ease-in-out infinite, imageBreathe 4s ease-in-out infinite';
            }
        }, 100);
    }

    // Add CSS for breathing animation
    const breathingStyle = document.createElement('style');
    breathingStyle.textContent = `
        @keyframes imageBreathe {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
        }
    `;
    document.head.appendChild(breathingStyle);
});

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


