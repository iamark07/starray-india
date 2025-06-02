/* Document Ready Functions */
$(document).ready(function() {
    // Product Showcase Carousel
    $('.product-showcase').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        },
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ]
    });

    // Testimonials Carousel
    $('.testimonials-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    });

    // Category Cards Carousel
    $('.category-cards-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2,
                autoplay: false
            },
            520: {
                items: 3,
                autoplay: false
            },
            640: {
                items: 3,
                autoplay: false
            },
            768: {
                items: 3,
                autoplay: false
            },
            1024: {
                items: 5,
                autoplay: false
            },
            1280: {
                items: 7,
                autoplay: false
            }
        },
        onInitialized: function(event) {
            // Add custom dots only if the container exists
            const dotsContainer = document.querySelector('.custom-nav-dots');
            if (dotsContainer) {
                const items = event.item.count;
                dotsContainer.innerHTML = '';
                
                for (let i = 0; i < items; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'dot' + (i === 0 ? ' active' : '');
                    dot.addEventListener('click', () => {
                        $('.category-cards-carousel').trigger('to.owl.carousel', [i, 300]);
                    });
                    dotsContainer.appendChild(dot);
                }
            }

            // Add click event listeners to category cards
            document.querySelectorAll('.category-card').forEach(card => {
                card.addEventListener('click', function() {
                    // Remove active class from all cards
                    document.querySelectorAll('.category-card').forEach(c => {
                        c.classList.remove('active');
                    });
                    // Add active class to clicked card
                    this.classList.add('active');
                });
            });
        },
        onChanged: function(event) {
            // Update active dot only if dots container exists
            const dotsContainer = document.querySelector('.custom-nav-dots');
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === event.item.index);
                });
            }
        }
    });

    // Custom Navigation for Category Carousel
    $('.category-prev-btn').click(function() {
        $('.category-cards-carousel').trigger('prev.owl.carousel', [300]);
    });

    $('.category-next-btn').click(function() {
        $('.category-cards-carousel').trigger('next.owl.carousel', [300]);
    });
});

/* Hero Slider */
document.addEventListener('DOMContentLoaded', function() {
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');

    let currentIndex = 0;
    const totalItems = sliderItems.length;
    const slideInterval = 5000;
    const transitionDuration = 1000;
    let autoplayTimer;
    let isAnimating = false;

    // Create navigation dots
    function createDots() {
        if (!sliderDotsContainer) return;
        sliderDotsContainer.innerHTML = '';
        sliderItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                if (!isAnimating && index !== currentIndex) {
                    goToSlide(index);
                    resetAutoplay();
                }
            });
            sliderDotsContainer.appendChild(dot);
        });
    }

    // Update active dot
    function updateDots() {
        if (!sliderDotsContainer) return;
        const dots = sliderDotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to a specific slide with fade transition
    function goToSlide(index) {
        if (isAnimating || index < 0 || index >= totalItems) return;

        isAnimating = true;
        sliderItems[currentIndex].classList.remove('active');
        currentIndex = index;
        sliderItems[currentIndex].classList.add('active');
        updateDots();

        setTimeout(() => {
            isAnimating = false;
        }, transitionDuration);
    }

    // Next and previous slide functions
    function nextSlide() {
        if (!isAnimating) {
            goToSlide((currentIndex + 1) % totalItems);
        }
    }

    function prevSlide() {
        if (!isAnimating) {
            goToSlide((currentIndex - 1 + totalItems) % totalItems);
        }
    }

    // Event listeners for arrows
    if (sliderPrev) sliderPrev.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
    if (sliderNext) sliderNext.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

    // Autoplay functions
    function startAutoplay() {
        autoplayTimer = setInterval(nextSlide, slideInterval);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Pause autoplay on hover
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoplay);
        heroSection.addEventListener('mouseleave', startAutoplay);
    }

    // Initialize slider
    createDots();
    if (sliderItems.length > 0) {
        sliderItems[0].classList.add('active');
        updateDots();
    }
    startAutoplay();
});

/* Product Gallery */
function initProductGallery() {
    const mainImage = document.querySelector('.product-main-image');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src;
                mainImage.alt = thumb.alt;
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initProductGallery);

/* Cart Functionality */
function addToCartAnimation(button) {
    const cart = document.querySelector('.cart-icon');
    if (!cart) return;
    
    const buttonRect = button.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();
    
    const flyingImage = document.createElement('img');
    flyingImage.src = button.dataset.image;
    flyingImage.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        z-index: 1000;
        transition: all 0.8s cubic-bezier(0.2, 0.5, 0.3, 1);
    `;
    
    document.body.appendChild(flyingImage);
    
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;
    
    flyingImage.style.left = `${startX}px`;
    flyingImage.style.top = `${startY}px`;
    
    requestAnimationFrame(() => {
        flyingImage.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.1)`;
        flyingImage.style.opacity = '0';
    });
    
    setTimeout(() => {
        flyingImage.remove();
        cart.classList.add('animate-bounce');
        setTimeout(() => cart.classList.remove('animate-bounce'), 1000);
    }, 800);
}

// Initialize Add to Cart Buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        addToCartAnimation(button);
    });
});

/* Lazy Loading */
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
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
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

/* Timeline Animation */
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Timeline hover effects
document.querySelectorAll('.timeline-item .bg-white').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Stats Number Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const duration = 2000; // 2 seconds
                const increment = finalValue / (duration / 16); // 60fps
                
                const updateValue = () => {
                    currentValue = Math.min(currentValue + increment, finalValue);
                    target.textContent = Math.round(currentValue) + '+';
                    
                    if (currentValue < finalValue) {
                        requestAnimationFrame(updateValue);
                    }
                };
                
                updateValue();
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Initialize stats animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing initialization code ...
    
    // Initialize stats animation
    animateStats();
});

// Function to animate products when they are shown
function animateProducts() {
    const productCards = document.querySelectorAll('.product-card');
    
    // First remove show class from all cards
    productCards.forEach(card => {
        card.classList.remove('show');
    });

    // Then add show class to visible cards with a small delay
    setTimeout(() => {
        productCards.forEach(card => {
            if (card.style.display !== 'none') {
                card.classList.add('show');
            }
        });
    }, 50);
}

// Function to handle product filtering (to be called by backend)
function showProducts(products) {
    const productGrid = document.getElementById('product-grid');
    const allProductCards = document.querySelectorAll('.product-card');
    
    // First hide all products
    allProductCards.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('show');
    });

    // Then show only the filtered products
    products.forEach(productId => {
        const card = document.querySelector(`[data-product-id="${productId}"]`);
        if (card) {
            card.style.display = 'block';
        }
    });

    // Animate the visible products
    animateProducts();
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show all products initially with animation
    animateProducts();
});