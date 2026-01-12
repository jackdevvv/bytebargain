// Cart functionality
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCartCount();
    showNotification(`✓ ${productName} added to cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function toggleCart() {
    showNotification(`Cart has ${cart.length} items. Full cart feature coming soon!`);
}

// Carousel functionality
let currentSlide = 0;
let carouselAutoplay = null;

function moveCarouselSlide(direction) {
    showCarouselSlide(currentSlide += direction);
}

function currentCarouselSlide(index) {
    showCarouselSlide(currentSlide = index);
}

function showCarouselSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (index >= slides.length) {
        currentSlide = 0;
    }
    if (index < 0) {
        currentSlide = slides.length - 1;
    }

    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }

    // Reset autoplay timer
    clearTimeout(carouselAutoplay);
    startCarouselAutoplay();
}

function startCarouselAutoplay() {
    carouselAutoplay = setTimeout(() => {
        moveCarouselSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Initialize carousel when page loads
window.addEventListener('load', function() {
    showCarouselSlide(0);
});

// Pause carousel on hover
const carouselWrapper = document.querySelector('.carousel-wrapper');
if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', () => {
        clearTimeout(carouselAutoplay);
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        startCarouselAutoplay();
    });
}

// Smooth scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle Add to Cart button clicks
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get product info
        const card = this.closest('.product-card') || this.closest('.featured-item');
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price, .product-price').textContent;
        
        // Show notification
        showNotification(`${productName} added to cart!`);
        
        // Optional: Add animation to button
        this.textContent = '✓ Added to Cart';
        setTimeout(() => {
            this.textContent = 'Add to Cart';
        }, 2000);
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Show success message
        showNotification('Message sent successfully! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: slideInUp 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all product cards and sections
document.querySelectorAll('.product-card, .featured-item, .about-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add fade in animation to stylesheet
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeStyle);

// Smooth navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize Google Ads
window.addEventListener('load', function() {
    if (window.adsbygoogle) {
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
});
