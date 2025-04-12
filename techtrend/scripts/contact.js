// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
      };

      // Save to localStorage (simulating form submission)
      let contactSubmissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
      contactSubmissions.push(formData);
      localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions));

      // Show success message
      showFormSuccess();

      // Reset form
      contactForm.reset();
    });
  }
});

function showFormSuccess() {
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success-message';
  successMessage.innerHTML = `
        <p>Thank you for your message! We'll get back to you soon.</p>
    `;

  const formSection = document.querySelector('.contact-form-section');
  formSection.insertBefore(successMessage, formSection.firstChild);

  setTimeout(() => {
    successMessage.classList.add('show');
  }, 10);

  setTimeout(() => {
    successMessage.classList.remove('show');
    setTimeout(() => {
      formSection.removeChild(successMessage);
    }, 300);
  }, 5000);
}

// Add success message styles dynamically
const successStyles = document.createElement('style');
successStyles.textContent = `
    .form-success-message {
        background-color: var(--accent-green);
        color: white;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1.5rem;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .form-success-message.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .form-success-message p {
        margin: 0;
        text-align: center;
        font-weight: 500;
    }
`;
document.head.appendChild(successStyles);