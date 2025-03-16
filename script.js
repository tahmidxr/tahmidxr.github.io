document.addEventListener('DOMContentLoaded', () => {
    // Hide the hello screen after animation
    setTimeout(() => {
        const helloScreen = document.querySelector('.hello-screen');
        helloScreen.classList.add('exit');
        setTimeout(() => {
            helloScreen.style.display = 'none';
            // Start the rest of your animations
            startPageAnimations();
        }, 800);
    }, 2500);

    // Initialize progress bars right away
    initProgressBars();

    // Initialize sections animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-hidden');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('section-visible');
                    });
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        sectionObserver.observe(section);
    });
});

// Wrap your existing window.onload code in this function
function startPageAnimations() {
    // Typing effect
    const texts = ["graphic designer", "social media expert"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        requestAnimationFrame(() => {
            document.querySelector(".typing").textContent = letter;
        });
        
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    }

    type();

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
        
        // Animate the menu icon
        if (menu.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            menuToggle.style.transform = 'rotate(180deg)';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
            menuToggle.style.transform = 'rotate(0deg)';
        }
    });

    // Smooth scroll for About section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add highlight effect
            target.style.transition = 'background-color 0.5s ease';
            target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            setTimeout(() => {
                target.style.backgroundColor = 'transparent';
            }, 1000);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
            menuToggle.style.transform = 'rotate(0deg)';
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
            menuToggle.style.transform = 'rotate(0deg)';
        });
    });

    // Enhanced scroll animations
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Intersection Observer for About section animation
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    observer.observe(aboutSection);

    // Remove Swiper initialization and add Education section animation
    const educationItems = document.querySelectorAll('.education-item');
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotate3d(1, 0, 0, 0deg)';
                educationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    educationItems.forEach(item => {
        educationObserver.observe(item);
    });

    // Add scroll down icon animation
    window.addEventListener('load', () => {
        const scrollDown = document.querySelector('.scroll-down');
        setTimeout(() => {
            scrollDown.classList.add('visible');
        }, 1000);
    });

    // Hide scroll icon when scrolling down
    const handleScroll = throttle(() => {
        const scrollDown = document.querySelector('.scroll-down');
        if (window.scrollY > 100) {
            scrollDown.style.opacity = '0';
        } else {
            scrollDown.style.opacity = '1';
        }
    }, 50);

    window.addEventListener('scroll', handleScroll);

    // Parallax effect on scroll
    const points = document.querySelectorAll('.color-points .point');
    document.addEventListener('mousemove', throttle((e) => {
        requestAnimationFrame(() => {
            points.forEach(point => {
                const rect = point.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                
                if (distance < 300) { 
                    const strength = (300 - distance) / 300 * 15; 
                    const moveX = (distanceX / distance) * strength;
                    const moveY = (distanceY / distance) * strength;
                    
                    point.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
                } else {
                    point.style.transform = '';
                }
            });
        });
    }, 50)); 

    // Email sending function
    function sendEmail(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const mailtoLink = `mailto:shariartahmid158@gmail.com?subject=Message from ${name}&body=From: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
        
        window.location.href = mailtoLink;
        
        // Reset form
        document.getElementById('emailForm').reset();
    }

    // Magnetic bending effect
    const bendableElements = document.querySelectorAll('.menu a, .skill, .education-content, #emailForm button, .social-icons a, .logo');

    bendableElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to center
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate the bend strength based on mouse distance from center
            const bendStrength = 15; // Maximum pixels of movement
            const maxDistance = Math.max(rect.width, rect.height) / 2;
            
            // Calculate movement
            const deltaX = (mouseX - centerX) / maxDistance * bendStrength;
            const deltaY = (mouseY - centerY) / maxDistance * bendStrength;
            
            // Apply transform
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        element.addEventListener('mouseleave', () => {
            // Reset position
            element.style.transform = 'translate(0px, 0px)';
        });
    });

    // Enhanced hover effect for skills section
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mousemove', (e) => {
            const rect = skill.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            skill.style.setProperty('--mouse-x', `${x}px`);
            skill.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Enhanced scroll animations for progress bars - Fixed version
    // Improved progress bar initialization function
    // Improved progress bar initialization function is defined below

    // Add social icons animation
    const socialIconsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const socialSections = entry.target.querySelectorAll('.social-section');
                socialSections.forEach((section) => {
                    section.classList.add('visible');
                });
                socialIconsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    const socialIcons = document.querySelector('.social-icons');
    socialIconsObserver.observe(socialIcons);
}

// Improved progress bar initialization function
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                
                requestAnimationFrame(() => {
                    progressBar.style.width = targetWidth;
                });
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    progressBars.forEach(bar => {
        bar.style.width = '0';
        progressObserver.observe(bar);
    });
}