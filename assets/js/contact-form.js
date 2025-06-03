document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('contactForm');
    if (!form) {
        return; // Stop script execution if form is not found
    }

    // Define input elements, their error placeholders, and validation logic
    const inputs = {
        name: {
            input: document.getElementById('name'),
            error: createErrorElement(),
            validate: (value) => {
                if (!value.trim()) return 'This field is required';
                if (value.length < 3) return 'Name must be at least 3 characters';
                if (value.length > 60) return 'Name cannot exceed 60 characters';
                if (/\d/.test(value)) return 'Name cannot contain numbers';
                return '';
            }
        },
        email: {
            input: document.getElementById('email'),
            error: createErrorElement(),
            validate: (value) => {
                if (!value.trim()) return 'This field is required';
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            }
        },
        phone: {
            input: document.getElementById('phone'),
            error: createErrorElement(),
            validate: (value) => {
                if (!value.trim()) return 'This field is required';
                if (!/^[6-9]/.test(value)) return 'Phone number must start with 6, 7, 8, or 9';
                if (!/^\d{10}$/.test(value)) return 'Phone number must be exactly 10 digits';
                return '';
            }
        },
        subject: {
            input: document.querySelector('select[name="subject"]'),
            error: createErrorElement(),
            validate: (value) => {
                if (!value || value === '') return 'Please select a subject';
                return '';
            }
        },
        message: {
            input: document.getElementById('message'),
            error: createErrorElement(),
            validate: (value) => {
                if (!value.trim()) return 'This field is required';
                if (value.length < 10) return 'Message must be at least 10 characters';
                return '';
            }
        }
    };

    // Check if all required input elements were found at initialization
    checkInputElements(inputs);

    // Create error element (helper function)
    function createErrorElement() {
        const error = document.createElement('p');
        error.className = 'text-red-500 text-xs mt-1 error-message';
        error.style.display = 'none';
        return error;
    }

     // Check if all required input elements were found
    function checkInputElements(inputsMap) {
         Object.entries(inputsMap).forEach(([key, {input}]) => {
            if (!input) {
                // Keeping this console.error as it indicates a critical setup issue
                console.error(`Form input element for "${key}" not found! Check ID or selector.`);
            }
        });
    }

    // Add error elements to the DOM (new function)
    function addErrorElements(inputsMap) {
        Object.values(inputsMap).forEach(({input, error}) => {
            if (input && input.parentNode) {
                 // Find the closest parent that is a form group or similar container
                 let container = input.closest('.form-group');
                 if (container) {
                     container.appendChild(error);
                 } else {
                    // Fallback if no specific container found, append after input/parent
                     if (input.tagName === 'SELECT' && input.parentNode.classList.contains('relative')) {
                         input.parentNode.after(error); // After the relative div for select
                     } else {
                        input.after(error); // After the input element
                     }
                 }
            }
        });
    }

    // Validate a single input and update its UI (existing function, slightly adjusted)
    function validateInput(key) {
        const {input, error, validate} = inputs[key]; // Access inputs from outer scope
        if (!input || !error) return false;

        const value = input.value;
        const errorMessage = validate(value);

        if (errorMessage) {
            error.textContent = errorMessage;
            error.style.display = 'block';
            input.classList.add('border-red-500');
            input.classList.remove('border-gray-200');
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

    // Validate all inputs and return overall form validity (existing function)
    function validateForm() {
        let isValid = true;
        Object.keys(inputs).forEach(key => { // Access inputs from outer scope
            // Calling validateInput here updates the UI (shows/hides errors)
            if (!validateInput(key)) {
                isValid = false;
            }
        });
        return isValid;
    }

    // Set up real-time validation event listeners (new function)
    function setupRealtimeValidation(inputsMap) {
        Object.entries(inputsMap).forEach(([key, {input}]) => {
            if (!input) return;

            // For phone input: filter non-digits and validate on input/blur
            if (key === 'phone') {
                input.addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    validateInput(key);
                });
                 input.addEventListener('blur', () => validateInput(key));
            }
            // For name input: filter digits and validate on input/blur
            else if (key === 'name') {
                input.addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/\d/g, '');
                    validateInput(key);
                });
                 input.addEventListener('blur', () => validateInput(key));
            }
            // For subject select: validate on change and blur
            else if (key === 'subject') {
                input.addEventListener('change', () => validateInput(key));
                input.addEventListener('blur', () => validateInput(key));
            }
            // For other inputs (email, message): validate on input and blur
            else {
                 input.addEventListener('input', () => validateInput(key));
                 input.addEventListener('blur', () => validateInput(key));
            }
        });
    }

    // Show success message popup (new function, extracted from submit handler)
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50';
        successMessage.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-2xl text-amber-500"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p class="text-amber-600">Thank you for contacting us. We'll get back to you soon.</p>
            </div>
        `;

        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40';

        document.body.appendChild(overlay);
        document.body.appendChild(successMessage);

        // Trigger animation
        requestAnimationFrame(() => {
            successMessage.style.transition = 'all 0.3s ease-out';
            overlay.style.transition = 'opacity 0.3s ease-out';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translate(-50%, -50%) scale(1)';
            overlay.style.opacity = '1';
        });

        // Hide message and reset form after delay
        setTimeout(() => {
            hideSuccessMessageAndReset(successMessage, overlay);
        }, 3000); // Display for 3 seconds
    }

    // Hide success message and reset form (new function)
    function hideSuccessMessageAndReset(successMessage, overlay) {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translate(-50%, -50%) scale(0.9)';
        overlay.style.opacity = '0';

        setTimeout(() => {
            // Remove elements from DOM
            if (document.body.contains(successMessage)) {
                document.body.removeChild(successMessage);
            }
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }

            // Reset form fields and clear validation states
            form.reset();
            Object.values(inputs).forEach(({input, error}) => { // Access inputs from outer scope
                if (input) {
                    input.classList.remove('border-red-500');
                    input.classList.add('border-gray-200');
                    // For select, reset parent div border
                     if (input.tagName === 'SELECT' && input.parentNode.classList.contains('relative')) {
                         input.parentNode.classList.remove('border-red-500');
                         input.parentNode.classList.add('border-gray-200');
                     }
                }
                if (error) {
                    error.style.display = 'none';
                }
            });
        }, 300); // Delay removal slightly longer than transition
    }


    // Handle form submission (main handler, now calling other functions)
    async function handleFormSubmit(e) {
        e.preventDefault(); // Prevent default browser form submission

        // Validate all fields first. This also updates UI errors.
        const isFormValid = validateForm();

        if (!isFormValid) {
            // Find the first key where validateInput returns false
            const firstInvalidKey = Object.keys(inputs).find(key => !validateInput(key));

            if (firstInvalidKey && inputs[firstInvalidKey].input) {
                 const targetInput = inputs[firstInvalidKey].input;
                 targetInput.focus();
                // Scroll to the first error
                targetInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // Do NOT proceed with submission or show success message
            return;
        }

        // --- Proceed with form submission ONLY if isFormValid is true ---

        // Here you would typically send the form data to your server (AJAX request)
        // This part remains commented out as before, but is where your server logic goes.
        // const formData = new FormData(form);
        // try {
        //     const response = await fetch('/your-endpoint', { // Replace '/your-endpoint'
        //         method: 'POST',
        //         body: formData,
        //         headers: {
        //             'Accept': 'application/json' // Example header
        //         }
        //     });
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const result = await response.json();
        //     // If server submission is successful, then show the success message:
        //     showSuccessMessage();
        // } catch (error) {
        //     console.error('Form submission failed:', error);
        //     // Handle submission error (e.g., show an error message to the user)
        //     // You might want to add an error popup here as well
        // }

        // For demonstration (without server submission), just show the success message:
         showSuccessMessage();
    }

    // --- Script Initialization ---

    // Add error message elements to the form
    addErrorElements(inputs);

    // Set up real-time validation listeners
    setupRealtimeValidation(inputs);

    // Add the main submit event listener to the form
    form.addEventListener('submit', handleFormSubmit);
});

// Note: Make sure you have included the Font Awesome library for icons.
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> 