const main = document.querySelector('#content')

class Email {
    send() {
        const from_name = document.getElementById('from_name')
        const from_email = document.getElementById('from_email')
        const message = document.getElementById('message')
        const message_status = document.querySelector('.message_status')

        if (from_name.value && from_email.value && message.value) {

            message_status.innerHTML = 'Sending!!'

            const tempParams = {
                from_name: from_name.value,
                from_email: from_email.value,
                message: message.value,
            }

            emailjs.send("service_ygd6m6q", "template_zgc8t6b", tempParams,)
                .then(() => {
                    from_name.value = ''
                    from_email.value = ''
                    message.value = ''
                    message_status.innerHTML = "&#10003 message sent!!"
                });

        } else {
            if (!from_name.value) {
                from_name.classList.add('w3-border', 'w3-border-red')
            } else {
                from_name.classList.remove('w3-border', 'w3-border-red')
            }

            if (!from_email.value) {
                from_email.classList.add('w3-border', 'w3-border-red')
            } else {
                from_email.classList.remove('w3-border', 'w3-border-red')
            }

            if (!message.value) {
                message.classList.add('w3-border', 'w3-border-red')
            } else {
                message.classList.remove('w3-border', 'w3-border-red')
            }
        }
    }
}

class Sidebar {
    constructor() {
        // Get the Sidebar
        this.mySidebar = document.getElementById("mySidebar");
        // Get the DIV with overlay effect
        this.overlayBg = document.getElementById("myOverlay");
    }
    execute() {
        const open = document.querySelector('.open_sidebar');
        const close = document.querySelectorAll('.close_sidebar');

        if (open) {
            open.addEventListener('click', () => {
                this.open()
            });
        }

        close.forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.close()
            });
        });
    }
    open() {
        if (this.mySidebar.style.display === 'block') {
            this.mySidebar.style.display = 'none';
            this.overlayBg.style.display = "none";
        } else {
            this.mySidebar.style.display = 'block';
            this.overlayBg.style.display = "block";
        }
    }
    close() {
        this.mySidebar.style.display = "none";
        this.overlayBg.style.display = "none";
    }
}

class App {
    constructor() {
        // Store event listeners for cleanup
        this.eventListeners = new Map();
        this.projectCounterAnimated = false;
    }

    // Cleanup method to remove event listeners
    cleanup() {
        // Remove all stored event listeners
        this.eventListeners.forEach((listener, element) => {
            element.removeEventListener(listener.event, listener.handler);
        });
        this.eventListeners.clear();
    }

    // Helper to add tracked event listener
    addTrackedListener(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
            this.eventListeners.set(element, { event, handler });
        }
    }

    home() {
        const homeElements = document.querySelectorAll(".home");
        homeElements.forEach(el => {
            el.addEventListener("click", () => {
                this.loadHome();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                sidebar.close();
            });
        });
    }

    project() {
        const projectElements = document.querySelectorAll(".project");
        projectElements.forEach(el => {
            el.addEventListener("click", () => {
                this.loadProject();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                sidebar.close();
            });
        });
    }

    about() {
        const aboutElements = document.querySelectorAll(".about");
        aboutElements.forEach(el => {
            el.addEventListener("click", () => {
                this.loadAbout();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                sidebar.close();
            });
        });
    }

    loadHome() {
        // Cleanup before loading new content
        this.cleanup();
        
        LoadingState.show();
        fetch('./home.html')
        .then(response => response.text())
        .then(data => {
            LoadingState.hide();
            main.innerHTML = data
            
            // Add fade-in animation
            const content = main.querySelector('.homecontent');
            if (content) {
                content.classList.add('fade-in');
            }
            
            // Calculate and display age dynamically
            this.updateAge();
            
            Metz('#sub').animateText({
                text: 'Web Developer',
            }, 20)

            Metz('#card').animateColor({
                color: 'random',
                type: 'border'
            }, 500)

            Metz('.introduction').animateChar({
                effect: 'random',
                speed: 10
            })

            // Re-attach navigation listeners (no duplicates due to cleanup)
            this.project();
            this.about();

            // Handle resume download error
            const resumeBtn = document.getElementById('resume-download');
            if (resumeBtn) {
                const resumeHandler = (e) => {
                    // Check if file exists, if not show alert
                    fetch('resume/Ersel_Metz_Magbanua_Resume.pdf', { method: 'HEAD' })
                        .then(response => {
                            if (!response.ok) {
                                e.preventDefault();
                                alert('Resume file not found. Please upload your resume to the resume/ folder as "Ersel_Metz_Magbanua_Resume.pdf"');
                            }
                        })
                        .catch(() => {
                            e.preventDefault();
                            alert('Resume file not found. Please upload your resume to the resume/ folder as "Ersel_Metz_Magbanua_Resume.pdf"');
                        });
                };
                this.addTrackedListener(resumeBtn, 'click', resumeHandler);
            }
        })
        .catch(error => {
            LoadingState.hide();
            console.error('Error loading home page:', error);
            main.innerHTML = '<div class="w3-container w3-padding-64"><p class="w3-text-red">Error loading page. Please try again.</p></div>';
        });
    }

    updateAge() {
        // Simple age calculation - born in 2004
        const birthDate = new Date(2004, 0, 1);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Adjust age if birthday hasn't occurred this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Update age in home page
        const ageElement = document.getElementById('age');
        if (ageElement) {
            ageElement.textContent = age;
        }
        
        // Update age in about page
        const aboutAgeElement = document.getElementById('about-age');
        if (aboutAgeElement) {
            aboutAgeElement.textContent = age;
        }
    }

    loadProject() {
        // Cleanup before loading new content
        this.cleanup();
        this.projectCounterAnimated = false;
        
        LoadingState.show();
        fetch('./project.html')
            .then(response => response.text())
            .then((data) => {
                LoadingState.hide();
                main.innerHTML = data
                
                // Add fade-in animation to project cards
                const projectCards = document.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    card.classList.add('fade-in');
                    card.style.animationDelay = `${index * 0.1}s`;
                });

                // Animate project counter
                setTimeout(() => {
                    const projectCountElement = document.getElementById('project');
                    if (projectCountElement && !this.projectCounterAnimated) {
                        const targetCount = parseInt(projectCountElement.textContent) || 0;
                        if (targetCount > 0) {
                            projectCountElement.textContent = '0';
                            animateCounter(projectCountElement, targetCount);
                            this.projectCounterAnimated = true;
                        }
                    }
                }, 300);

                const images = document.querySelectorAll('.image')
                
                // Create modal elements if they don't exist
                let imageShowModal = document.querySelector('.imageShowModal')
                if (!imageShowModal) {
                    imageShowModal = document.createElement('div')
                    imageShowModal.className = 'imageShowModal w3-modal'
                    imageShowModal.style.display = 'none'
                    imageShowModal.innerHTML = `
                        <div class="w3-modal-content w3-animate-zoom" style="max-width:90%; margin-top:50px;">
                            <div class="w3-container w3-black">
                                <span class="w3-button w3-display-topright hideModal" style="font-size:28px; cursor:pointer;">&times;</span>
                                <img class="imageShow" style="width:100%;" alt="Project Image">
                            </div>
                        </div>
                    `
                    document.body.appendChild(imageShowModal)
                }
                
                const imageShow = imageShowModal.querySelector('.imageShow')
                const hideModal = imageShowModal.querySelectorAll('.hideModal')

                const clickImage = (e) => {
                    if (imageShowModal && imageShow) {
                        imageShowModal.style.display = 'block'
                        imageShow.src = e.target.src
                        imageShow.alt = e.target.alt || 'Project Image'
                    }
                }

                const clickHideModalButton = (e) => {
                    if (imageShowModal) {
                        imageShowModal.style.display = 'none'
                    }
                }

                // Add click listeners to images
                if (images.length > 0) {
                    images.forEach(img => {
                        this.addTrackedListener(img, 'click', clickImage);
                    })
                }

                // Add click listeners to modal close buttons
                if (hideModal.length > 0) {
                    hideModal.forEach(btn => {
                        this.addTrackedListener(btn, 'click', clickHideModalButton);
                    })
                }
                
                // Close modal when clicking outside
                if (imageShowModal) {
                    const modalClickHandler = (e) => {
                        if (e.target === imageShowModal) {
                            imageShowModal.style.display = 'none'
                        }
                    };
                    this.addTrackedListener(imageShowModal, 'click', modalClickHandler);
                }
            })
            .catch(error => {
                LoadingState.hide();
                console.error('Error loading project page:', error);
                main.innerHTML = '<div class="w3-container w3-padding-64"><p class="w3-text-red">Error loading page. Please try again.</p></div>';
            });
    }

    loadAbout() {
        // Cleanup before loading new content
        this.cleanup();
        
        LoadingState.show();
        fetch('./about.html')
            .then(response => response.text())
            .then((data) => {
                LoadingState.hide();
                main.innerHTML = data
                
                // Add fade-in animation
                const aboutContent = main.querySelector('.w3-container');
                if (aboutContent) {
                    aboutContent.classList.add('fade-in');
                }
                
                // Update age in about page
                this.updateAge();
                
                // Initialize skills filter
                setTimeout(() => {
                    skillsFilter.init();
                    // Animate skill progress bars
                    animateSkillProgress();
                }, 100);
            })
            .catch(error => {
                LoadingState.hide();
                console.error('Error loading about page:', error);
                main.innerHTML = '<div class="w3-container w3-padding-64"><p class="w3-text-red">Error loading page. Please try again.</p></div>';
            });
    }
}

class SkillsFilter {
    constructor() {
        this.filterButtons = null;
        this.skillContainers = null;
    }

    init() {
        this.filterButtons = document.querySelectorAll('.skill-filter-btn');
        this.skillContainers = document.querySelectorAll('.skills-container');

        if (this.filterButtons.length === 0) return;

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterSkills(category);
                
                // Update active button
                this.filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.classList.add('w3-light-grey');
                });
                e.target.classList.add('active');
                e.target.classList.remove('w3-light-grey');
            });
        });

        // Show all skills by default
        this.showAllSkills();
    }

    filterSkills(category) {
        this.skillContainers.forEach(container => {
            container.classList.remove('active');
            if (category === 'all' || container.getAttribute('data-category') === category) {
                container.classList.add('active');
            }
        });
    }

    showAllSkills() {
        // Show all skill containers by default
        this.skillContainers.forEach(container => {
            container.classList.add('active');
        });
    }
}

class Navigation {
    constructor() {
        this.backToTopBtn = null;
        this.progressIndicator = null;
        this.scrollHandler = null;
        this.init();
    }

    init() {
        this.createBackToTopButton();
        this.createProgressIndicator();
        this.setupSmoothScroll();
        this.setupScrollListener();
    }

    createBackToTopButton() {
        this.backToTopBtn = document.createElement('button');
        this.backToTopBtn.className = 'back-to-top w3-button w3-teal w3-round-xxlarge';
        this.backToTopBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
        this.backToTopBtn.title = 'Back to Top';
        this.backToTopBtn.style.cssText = 'display: none; position: fixed; bottom: 30px; right: 30px; z-index: 1000; width: 50px; height: 50px;';
        document.body.appendChild(this.backToTopBtn);

        this.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    createProgressIndicator() {
        this.progressIndicator = document.createElement('div');
        this.progressIndicator.className = 'progress-indicator';
        document.body.appendChild(this.progressIndicator);
    }

    setupSmoothScroll() {
        // Smooth scroll for all anchor links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                const href = e.target.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        });
    }

    setupScrollListener() {
        // Debounced scroll handler for better performance
        let scrollTimeout;
        this.scrollHandler = () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                this.updateBackToTopButton();
                this.updateProgressIndicator();
            });
        };
        
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }

    updateBackToTopButton() {
        if (window.scrollY > 300) {
            this.backToTopBtn.style.display = 'block';
            this.backToTopBtn.classList.add('show');
        } else {
            this.backToTopBtn.style.display = 'none';
            this.backToTopBtn.classList.remove('show');
        }
    }

    updateProgressIndicator() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        this.progressIndicator.style.width = scrolled + '%';
    }
}

class LoadingState {
    static show() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner active';
        spinner.id = 'loading-spinner';
        spinner.innerHTML = '<div class="spinner"></div><p>Loading...</p>';
        const main = document.querySelector('#content');
        if (main) {
            main.innerHTML = '';
            main.appendChild(spinner);
        }
    }

    static hide() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }
}

const app = new App();
const sidebar = new Sidebar();
const email = new Email();
const skillsFilter = new SkillsFilter();
const navigation = new Navigation();

app.home();
app.project();
app.about();
app.loadHome();

sidebar.execute();

// Initialize skills filter when about page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        skillsFilter.init();
    }, 100);
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Animate skill progress bars
    animateSkillProgress();
});

// Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            animationObserver.observe(el);
        });
    }
}

// Animate skill progress bars on scroll
function animateSkillProgress() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    if ('IntersectionObserver' in window) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width') || '0%';
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100);
                    progressObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
    }
}

// Counter animation for project count
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}
