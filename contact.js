// Contact Page Animations and Interactivity

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSubmitSuccess');
    const sendAnotherBtn = document.getElementById('sendAnotherBtn');
    const contactMethods = document.querySelectorAll('.contact-method');
    const socialLinks = document.querySelectorAll('.social-links a');
    const formInputs = document.querySelectorAll('.form-control');

    // Animate contact methods on page load
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            method.style.transition = 'all 0.5s ease';
            method.style.opacity = '1';
            method.style.transform = 'translateX(0)';
        }, 200 * (index + 1));
    });

    // Animate emojis on hover
    const emojis = document.querySelectorAll('.icon');
    emojis.forEach(emoji => {
        emoji.addEventListener('mouseover', () => {
            emoji.style.transform = 'scale(1.2) rotate(10deg)';
            emoji.style.transition = 'transform 0.3s ease';
        });

        emoji.addEventListener('mouseout', () => {
            emoji.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Form validation and submission
    const validateField = (field) => {
        const value = field.value.trim();
        const fieldName = field.id;
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        let isValid = true;
        let errorMessage = '';

        switch(fieldName) {
            case 'fullName':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.opacity = isValid ? '0' : '1';
            field.style.borderColor = isValid ? '#ddd' : '#e5989b';
        }

        return isValid;
    };

    // Add input event listeners for real-time validation
    formInputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    // Form submission handler
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isFormValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) return;

        // Animate submit button
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerHTML = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

            // Show success message with animation
            contactForm.style.opacity = '0';
            contactForm.style.transform = 'translateY(-20px)';
            contactForm.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                formSuccess.classList.remove('hidden');
                
                // Animate success message
                setTimeout(() => {
                    formSuccess.style.opacity = '1';
                    formSuccess.style.transform = 'translateY(0)';
                }, 100);
            }, 500);

        } catch (error) {
            console.error('Error submitting form:', error);
            submitBtn.innerHTML = 'Send Message';
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
            alert('There was an error sending your message. Please try again.');
        }
    });

    // Send another message button handler
    sendAnotherBtn.addEventListener('click', () => {
        // Reset form
        contactForm.reset();
        formInputs.forEach(input => {
            input.style.borderColor = '#ddd';
            const errorElement = document.getElementById(`${input.id}Error`);
            if (errorElement) errorElement.style.opacity = '0';
        });

        // Hide success message and show form
        formSuccess.style.opacity = '0';
        formSuccess.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            formSuccess.style.display = 'none';
            formSuccess.classList.add('hidden');
            contactForm.style.display = 'block';
            
            setTimeout(() => {
                contactForm.style.opacity = '1';
                contactForm.style.transform = 'translateY(0)';
            }, 100);
        }, 500);
    });

    // Social links hover animation
    socialLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'translateY(-3px)';
            link.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseout', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // FAQ section animations
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Initially hide answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.display = 'none';
                    otherItem.querySelector('.faq-question').classList.remove('active');
                }
            });
            
            // Toggle current answer
            if (isOpen) {
                answer.style.display = 'none';
                question.classList.remove('active');
            } else {
                answer.style.display = 'block';
                answer.style.animation = 'fadeIn 0.5s ease';
                question.classList.add('active');
            }
        });
    });
});

// Add necessary CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .contact-method {
        opacity: 0;
        transform: translateX(-20px);
    }

    #formSubmitSuccess {
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.5s ease;
    }

    .faq-question.active {
        color: var(--primary-color);
    }

    .error-message {
        color: var(--error-color);
        font-size: 0.875rem;
        transition: opacity 0.3s ease;
        opacity: 0;
    }
`;
document.head.appendChild(style);
