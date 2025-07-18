// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Smooth scrolling for navigation links
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

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Search functionality
function checkAvailability() {
    const date = document.getElementById('tour-date').value;
    const tourType = document.getElementById('tour-type').value;
    const guests = document.getElementById('guests').value;
    
    if (!date) {
        alert('Please select a date for your tour.');
        return;
    }
    
    // This would typically connect to a booking system
    // For now, we'll just show an alert
    alert(`Checking availability for ${tourType} on ${date} for ${guests}. You'll be redirected to our booking system.`);
    
    // In a real implementation, this would redirect to booking system
    // window.location.href = '/booking?date=' + date + '&type=' + tourType + '&guests=' + guests;
}

// Contact form handling
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    showFormLoading(true);
    
    // Submit form to server
    submitToServer(data, form);
}

function validateForm(data) {
    const errors = [];
    
    // Check required fields
    if (!data['first-name']?.trim()) {
        errors.push('First name is required');
        highlightField('first-name', true);
    } else {
        highlightField('first-name', false);
    }
    
    if (!data['last-name']?.trim()) {
        errors.push('Last name is required');
        highlightField('last-name', true);
    } else {
        highlightField('last-name', false);
    }
    
    if (!data['email']?.trim()) {
        errors.push('Email is required');
        highlightField('email', true);
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
        highlightField('email', true);
    } else {
        highlightField('email', false);
    }
    
    if (!data['preferred-date']) {
        errors.push('Preferred date is required');
        highlightField('preferred-date', true);
    } else if (new Date(data['preferred-date']) < new Date()) {
        errors.push('Please select a future date');
        highlightField('preferred-date', true);
    } else {
        highlightField('preferred-date', false);
    }
    
    if (!data['group-size']) {
        errors.push('Group size is required');
        highlightField('group-size', true);
    } else {
        highlightField('group-size', false);
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    // Clear any existing errors
    clearFormErrors();
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function highlightField(fieldName, hasError) {
    const field = document.getElementById(fieldName);
    if (field) {
        if (hasError) {
            field.classList.add('form-error');
        } else {
            field.classList.remove('form-error');
        }
    }
}

function showFormErrors(errors) {
    clearFormErrors();
    
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-errors';
    errorContainer.innerHTML = `
        <div class="error-content">
            <h4>Please fix the following errors:</h4>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        </div>
    `;
    
    const form = document.querySelector('.contact-form');
    form.insertBefore(errorContainer, form.firstChild);
    
    // Scroll to errors
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function clearFormErrors() {
    const existingErrors = document.querySelector('.form-errors');
    if (existingErrors) {
        existingErrors.remove();
    }
}

function showFormLoading(isLoading) {
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitBtn.classList.add('loading');
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Inquiry';
        submitBtn.classList.remove('loading');
    }
}

function showFormSuccess(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✅</div>
            <h3>Thank you for your inquiry!</h3>
            <p>${message || "We've received your booking request and will get back to you within 24 hours with availability and next steps."}</p>
            <p class="success-note">A confirmation email has been sent to your inbox.</p>
        </div>
    `;
    
    const formContainer = document.querySelector('.contact-form-container');
    formContainer.appendChild(successMessage);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.remove();
            }
        }, 300);
    }, 5000);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function submitToServer(data, form) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success message
            showFormSuccess(result.message);
            
            // Reset form
            form.reset();
            
            console.log('✅ Booking inquiry submitted successfully');
        } else {
            // Show error message
            showFormErrors([result.message || 'An error occurred while submitting your inquiry.']);
        }
        
    } catch (error) {
        console.error('❌ Network error:', error);
        showFormErrors(['Network error. Please check your connection and try again.']);
    } finally {
        // Hide loading state
        showFormLoading(false);
    }
}

function sendConfirmationEmail(data) {
    // This function is now handled server-side
    console.log('📧 Confirmation emails will be sent by the server');
}

// Set minimum date for date input to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Also set minimum date for search widget
    const tourDateInput = document.getElementById('tour-date');
    if (tourDateInput) {
        const today = new Date().toISOString().split('T')[0];
        tourDateInput.setAttribute('min', today);
    }
});

// Real-time validation feedback
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
        // Add real-time validation to email field
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    highlightField('email', true);
                    showFieldError('email', 'Please enter a valid email address');
                } else {
                    highlightField('email', false);
                    clearFieldError('email');
                }
            });
        }
        
        // Add real-time validation to date field
        const dateField = document.getElementById('preferred-date');
        if (dateField) {
            dateField.addEventListener('change', function() {
                if (this.value && new Date(this.value) < new Date()) {
                    highlightField('preferred-date', true);
                    showFieldError('preferred-date', 'Please select a future date');
                } else {
                    highlightField('preferred-date', false);
                    clearFieldError('preferred-date');
                }
            });
        }
    }
});

function showFieldError(fieldName, message) {
    clearFieldError(fieldName);
    
    const field = document.getElementById(fieldName);
    const fieldGroup = field.closest('.form-group');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    fieldGroup.appendChild(errorElement);
}

function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const fieldGroup = field.closest('.form-group');
    const existingError = fieldGroup.querySelector('.field-error');
    
    if (existingError) {
        existingError.remove();
    }
}