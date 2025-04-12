// General site functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleDateString();
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // In a real app, you would send this to your server
        console.log('Subscribed email:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
      });
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav ul');
    
    if (hamburger && nav) {
      hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
      });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          nav.classList.remove('active');
          hamburger.classList.remove('active');
        }
      });
    });
  });