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





// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Function to initialize form validation for a given form
    function initializeFormValidation(formId, inputConfig) {
        const form = document.getElementById(formId);
        if (!form) {
            console.error(`Form element with ID "${formId}" not found!`);
            return; // Stop initialization if form is not found
        }

        // Map input keys to their elements, errors, and validation logic
        const inputs = {};
        Object.entries(inputConfig).forEach(([key, config]) => {
             const inputElement = document.getElementById(config.inputId);
             if (!inputElement) {
                 console.error(`Form input element with ID "${config.inputId}" for key "${key}" not found!`);
                 // Skip this input if element is not found
                 return;
             }
             inputs[key] = {
                 input: inputElement,
                 error: createErrorElement(),
                 validate: config.validate
             };
        });

        // Check if all *configured* input elements were found
        checkInputElements(inputs);

        // Add error elements to the DOM
        addErrorElements(inputs);

        // Set up real-time validation listeners
        setupRealtimeValidation(inputs);

        // Add the main submit event listener
        form.addEventListener('submit', (e) => handleFormSubmit(e, inputs, form));

        console.log(`Form validation initialized for form ID: ${formId}`);
    }

    // Helper function to create an error element
    function createErrorElement() {
        const error = document.createElement('p');
        error.className = 'text-red-500 text-xs mt-1 error-message';
        error.style.display = 'none';
        return error;
    }

    // Check if all input elements defined in the inputs object were successfully found
    function checkInputElements(inputsMap) {
         Object.keys(inputsMap).forEach(key => {
            if (!inputsMap[key].input) {
                // This case should ideally be caught during the initial mapping,
                // but this serves as an extra check if needed.
                console.error(`Input element for key "${key}" is missing in the inputs map.`);
            }
        });
    }

    // Add error elements to the DOM
    function addErrorElements(inputsMap) {
        Object.values(inputsMap).forEach(({input, error}) => {
            if (input && input.parentNode) {
                 // Find the closest parent that is a form group or similar container
                 let container = input.closest('.form-group');
                 if (container) {
                     container.appendChild(error);
                 } else {
                    // Fallback if no specific container found
                     if (input.tagName === 'SELECT' && input.parentNode.classList.contains('relative')) {
                         input.parentNode.after(error); // After the relative div for select
                     } else {
                        input.after(error); // After the input element
                     }
                 }
            }
        });
    }

    // Validate a single input and update its UI
    function validateInput(key, inputsMap) {
        const {input, error, validate} = inputsMap[key];
        if (!input || !error) return false; // Critical error: element or error div missing

        const value = input.value;
        const errorMessage = validate(value);

        if (errorMessage) {
            error.textContent = errorMessage;
            error.style.display = 'block';
            input.classList.add('border-red-500');
            input.classList.remove('border-gray-200'); // Assuming default border is gray-200
            // For select, also add red border to the parent div if needed for styling
            if (input.tagName === 'SELECT' && input.parentNode.classList.contains('relative')) {
                 input.parentNode.classList.add('border-red-500');
                 input.parentNode.classList.remove('border-gray-200');
            }
            return false;
        } else {
            error.style.display = 'none';
            input.classList.remove('border-red-500');
            input.classList.add('border-gray-200');
             // For select, remove red border from the parent div
             if (input.tagName === 'SELECT' && input.parentNode.classList.contains('relative')) {
                 input.parentNode.classList.remove('border-red-500');
                 input.parentNode.classList.add('border-gray-200');
            }
            return true;
        }
    }

    // Validate all inputs and return overall form validity
    function validateForm(inputsMap) {
        let isValid = true;
        // Use Object.keys to iterate over successfully found inputs
        Object.keys(inputsMap).forEach(key => {
            if (!validateInput(key, inputsMap)) {
                isValid = false;
            }
        });
        return isValid;
    }

    // Set up real-time validation event listeners
    function setupRealtimeValidation(inputsMap) {
        Object.entries(inputsMap).forEach(([key, {input}]) => {
            if (!input) return; // Should not happen if checkInputElements works

            // For phone input: filter non-digits and validate on input/blur
            if (key === 'phone') {
                input.addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    validateInput(key, inputsMap);
                });
                 input.addEventListener('blur', () => validateInput(key, inputsMap));
            }
            // For name input: filter digits and validate on input/blur
            else if (key === 'name') {
                input.addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/\d/g, '');
                    validateInput(key, inputsMap);
                });
                 input.addEventListener('blur', () => validateInput(key, inputsMap));
            }
            // For subject select: validate on change and blur
            else if (key === 'subject') {
                input.addEventListener('change', () => validateInput(key, inputsMap));
                input.addEventListener('blur', () => validateInput(key, inputsMap));
            }
            // For other inputs (email, message): validate on input and blur
            else {
                 input.addEventListener('input', () => validateInput(key, inputsMap));
                 input.addEventListener('blur', () => validateInput(key, inputsMap));
            }
        });
    }

    // Show success message popup
    function showSuccessMessage(formElement) {
        // Remove any existing messages first
        removeMessageElements();

        const successMessage = document.createElement('div');
        // Use tailwind classes for styling
        successMessage.className = 'success-message mt-4 p-3 rounded-lg text-green-700 bg-green-100 border border-green-200';
        successMessage.textContent = 'Thank you for your message. We will get back to you soon!';

        // Insert the success message after the form
        if (formElement && formElement.parentNode) {
             formElement.parentNode.insertBefore(successMessage, formElement.nextSibling);
             successMessage.style.display = 'block'; // Make it visible
        }


        // Auto-hide after 5 seconds (adjust time as needed)
        setTimeout(() => {
            if (successMessage && successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 5000);
    }

    // Remove any existing success or error messages from previous submissions
     function removeMessageElements() {
         const existingMessages = document.querySelectorAll('.success-message, .error-message-submission');
         existingMessages.forEach(msg => msg.parentNode.removeChild(msg));
     }


    // Handle form submission
    async function handleFormSubmit(e, inputsMap, formElement) {
        e.preventDefault(); // Prevent default browser form submission

        // Remove previous submission messages
        removeMessageElements();

        // Validate all fields first. This also updates UI errors.
        const isFormValid = validateForm(inputsMap);

        if (!isFormValid) {
            // Find the first key where validateInput returns false
            const firstInvalidKey = Object.keys(inputsMap).find(key => !validateInput(key, inputsMap));

            if (firstInvalidKey && inputsMap[firstInvalidKey].input) {
                 const targetInput = inputsMap[firstInvalidKey].input;
                 targetInput.focus();
                // Scroll to the first error
                targetInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // Do NOT proceed with submission
            return;
        }

        // --- Proceed with form submission ONLY if isFormValid is true ---

        // Here you would typically send the form data to your server (AJAX request)
        // Example (replace with your actual endpoint and logic):
        // const formData = new FormData(formElement);
        // try {
        //     const response = await fetch('/your-server-endpoint', {
        //         method: 'POST',
        //         body: formData
        //     });
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const result = await response.json();
        //     console.log('Server response:', result);
        //     // If server submission is successful, then show the success message:
        //     showSuccessMessage(formElement);
        //     formElement.reset(); // Reset form on successful submission
        //      // Also reset all validation error states visually
        //     Object.values(inputsMap).forEach(({input, error}) => {
        //         if (input) {
        //             input.classList.remove('border-red-500');
        //             input.classList.add('border-gray-200');
        //              if (input.tagName === 'SELECT' && input.parentNode.classList.contains('relative')) {
        //                  input.parentNode.classList.remove('border-red-500');
        //                  input.parentNode.classList.add('border-gray-200');
        //              }
        //         }
        //         if (error) {
        //             error.style.display = 'none';
        //         }
        //     });
        //
        // } catch (error) {
        //     console.error('Form submission failed:', error);
        //     // Handle submission error (e.g., show an error message)
        //     const errorMessage = document.createElement('div');
        //      errorMessage.className = 'error-message-submission mt-4 p-3 rounded-lg text-red-700 bg-red-100 border border-red-200';
        //     errorMessage.textContent = 'An error occurred. Please try again.'; // Generic error message
        //     if (formElement && formElement.parentNode) {
        //          formElement.parentNode.insertBefore(errorMessage, formElement.nextSibling);
        //           errorMessage.style.display = 'block';
        //     }
        // }

        // For demonstration (without server submission), just show the success message and reset form:
         showSuccessMessage(formElement);
         formElement.reset();
         // Also reset all validation error states visually
        Object.values(inputsMap).forEach(({input, error}) => {
            if (input) {
                input.classList.remove('border-red-500');
                input.classList.add('border-gray-200');
                 if (input.tagName === 'SELECT' && input.parentNode.classList.contains('relative')) {
                     input.parentNode.classList.remove('border-red-500');
                     input.parentNode.classList.add('border-gray-200');
                 }
            }
            if (error) {
                error.style.display = 'none';
            }
        });
    }

    // --- Script Initialization ---

    // Define configuration for the contact form in index.html
    const indexContactFormConfig = {
        name: {
             inputId: 'nameIndex',
             validate: (value) => {
                if (!value.trim()) return 'This field is required';
                if (value.length < 3) return 'Name must be at least 3 characters';
                if (value.length > 60) return 'Name cannot exceed 60 characters';
                if (/\d/.test(value)) return 'Name cannot contain numbers';
                return '';
            }
        },
        email: {
             inputId: 'emailIndex',
             validate: (value) => {
                if (!value.trim()) return 'This field is required';
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            }
        },
        phone: {
             inputId: 'phoneIndex',
             validate: (value) => {
                if (!value.trim()) return 'This field is required';
                if (!/^[6-9]/.test(value)) return 'Phone number must start with 6, 7, 8, or 9';
                if (!/^\d{10}$/.test(value)) return 'Phone number must be exactly 10 digits';
                return '';
            }
        },
        subject: {
             inputId: 'subjectIndex',
             validate: (value) => {
                if (!value || value === '') return 'Please select a subject';
                return '';
            }
        },
        message: {
             inputId: 'messageIndex',
             validate: (value) => {
                if (!value.trim()) return 'This field is required';
                if (value.length < 10) return 'Message must be at least 10 characters';
                return '';
            }
        }
    };

    // Initialize validation for the contact form in index.html
    initializeFormValidation('contactFormIndex', indexContactFormConfig);

    // You can add initialization for other forms here if needed
    // initializeFormValidation('anotherFormId', anotherFormConfig);
}); 