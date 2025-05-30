// Initialize Owl Carousel for Product Showcase
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
});

// Custom Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');

    let currentIndex = 0; // Start at the first slide
    const totalItems = sliderItems.length;
    const slideInterval = 5000; // Autoplay interval in milliseconds
    const transitionDuration = 1000; // Match CSS transition duration
    let autoplayTimer;
    let isAnimating = false; // Flag to prevent rapid clicking

    // Create navigation dots
    function createDots() {
        if (!sliderDotsContainer) return;
        // Clear existing dots before creating new ones
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

        // Remove active class from current item
        sliderItems[currentIndex].classList.remove('active');

        // Update index
        currentIndex = index;

        // Add active class to the new item
        sliderItems[currentIndex].classList.add('active');

        updateDots();

        // Allow animation to complete before enabling clicks
        setTimeout(() => {
            isAnimating = false;
        }, transitionDuration); // Use transitionDuration for timeout
    }

    // Next and previous slide functions for infinite loop
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

    // Autoplay
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

    // Initialize dots and set initial active slide
    createDots();
    // Set the first slide as active on page load
    if (sliderItems.length > 0) {
        sliderItems[0].classList.add('active');
        updateDots(); // Ensure dots are updated for the initial state
    }

    // Start autoplay after initial setup
    startAutoplay();

    // No need to handle window resize specifically for position with fade, but good to recreate dots if items change dynamically (not applicable here)
});

// Product Image Gallery
function initProductGallery() {
    const mainImage = document.querySelector('.product-main-image');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Update main image
                mainImage.src = thumb.src;
                mainImage.alt = thumb.alt;
                
                // Update active state
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }
}

// Initialize Product Gallery
document.addEventListener('DOMContentLoaded', initProductGallery);

// Add to Cart Animation
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
        // Add cart animation
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

// Lazy Loading Images
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

// Product Categories Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    const productCards = document.querySelectorAll('.product-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const filterValue = card.dataset.filter;

            // Remove active class from all category cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to the clicked card
            card.classList.add('active');

            // Filter product cards with fade effect
            productCards.forEach(productCard => {
                const productCategory = productCard.dataset.category;
                if (filterValue === 'all' || productCategory === filterValue) {
                    productCard.style.display = 'block'; // Show the card
                     setTimeout(() => { // Add a slight delay before making it visible for fade effect
                        productCard.style.opacity = '1';
                    }, 10);
                } else {
                    productCard.style.opacity = '0'; // Start fade out
                     setTimeout(() => { // Hide completely after fade out
                         productCard.style.display = 'none';
                     }, 300); // Match with CSS transition duration if you add one
                }
            });
        });
    });

    // Set 'All Products' category as active and show all products on initial load
    const allProductsCard = document.querySelector('.category-card[data-filter="all"]');
    if (allProductsCard) {
        allProductsCard.classList.add('active');
        // Initially show all products (they are displayed by default in HTML)
    }
});
