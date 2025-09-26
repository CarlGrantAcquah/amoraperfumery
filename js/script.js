document.addEventListener('DOMContentLoaded', function() {
    
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');
    const navToggle = document.querySelector('.mobile-nav-toggle');

    // Header Style on Scroll (for Home Page only)
    if (document.body.classList.contains('home-page')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const visibility = nav.getAttribute('data-visible');
            if (visibility === "false" || visibility === null) {
                nav.setAttribute('data-visible', true);
                navToggle.setAttribute('aria-expanded', true);
            } else {
                nav.setAttribute('data-visible', false);
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    }

    // Hero Slider Functionality
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        const slideInterval = 5000;
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };
        setInterval(nextSlide, slideInterval);
    }

    // Gift Card Denomination Logic
    const giftCardFormEl = document.getElementById('gift-card-form');
    if (giftCardFormEl) {
        const amountDisplay = document.getElementById('card-amount');
        const denomButtons = document.querySelectorAll('.denom-btn');
        denomButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                denomButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                if(amountDisplay) amountDisplay.textContent = button.dataset.value;
            });
        });
    }

    // Product Page Logic
    if (document.querySelector('.product-page')) {
        // Image Gallery
        const mainImage = document.querySelector('.main-product-image img');
        const thumbnails = document.querySelectorAll('.product-thumbnails .thumb');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const thumbNumMatch = thumb.src.match(/thumb(\d)/);
                if (thumbNumMatch) {
                    const thumbNum = thumbNumMatch[1];
                    let newSrc = thumb.src.replace(/thumb\d/, 'main' + thumbNum);
                    mainImage.src = newSrc;
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                }
            });
        });
        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    // ===================================================================
    // ================== NEW SIMPLIFIED FORM HANDLING ===================
    // ===================================================================

    // --- CONFIGURATION ---
    const yourEmail = "amoraperfumery@gmail.com"; // The email address where forms are sent
    const whatsappNumber = "233552630163";      // Your WhatsApp number with country code

    // --- Contact Form Handler ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const message = contactForm.querySelector('#message').value;

            // 1. Construct the WhatsApp message and URL
            const whatsappMessage = `*New Contact Inquiry*\n\n*Name:*\n${name}\n\n*Email:*\n${email}\n\n*Message:*\n${message}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // 2. Construct the Mailto link
            const mailtoSubject = `Contact Inquiry from ${name}`;
            const mailtoBody = `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoUrl = `mailto:${yourEmail}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

            // 3. Open both links
            window.open(whatsappUrl, '_blank');
            window.location.href = mailtoUrl;

            // Optional: Give user feedback
            const submitButton = contactForm.querySelector('.btn-submit');
            submitButton.textContent = 'Done!';
            setTimeout(() => { 
                submitButton.textContent = 'Send Message';
                contactForm.reset();
            }, 3000);
        });
    }

    // --- Gift Card Form Handler ---
    const giftForm = document.getElementById('gift-card-form');
    if (giftForm) {
        giftForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const senderName = giftForm.querySelector('input[name="sender_name"]').value;
            const senderEmail = giftForm.querySelector('input[name="sender_email"]').value || 'Not provided';
            const recipientName = giftForm.querySelector('input[name="recipient_name"]').value;
            const recipientEmail = giftForm.querySelector('input[name="recipient_email"]').value || 'Not provided';
            const message = giftForm.querySelector('textarea[name="message"]').value || 'Not provided';
            const activeDenom = giftForm.querySelector('.denom-btn.active');
            const denomination = activeDenom ? `GH₵${activeDenom.dataset.value}` : 'Not selected';

            // 1. Construct the WhatsApp message and URL
            const whatsappMessage = `*New Gift Card Request*\n\n*Amount:*\n${denomination}\n\n*Sender's Name:*\n${senderName}\n*Sender's Email:*\n${senderEmail}\n\n*Recipient's Name:*\n${recipientName}\n*Recipient's Email:*\n${recipientEmail}\n\n*Message:*\n${message}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // 2. Construct the Mailto link
            const mailtoSubject = `Gift Card Request from ${senderName}`;
            const mailtoBody = `A new gift card request has been submitted:\n\nAmount: ${denomination}\n\n--- Sender Info ---\nName: ${senderName}\nEmail: ${senderEmail}\n\n--- Recipient Info ---\nName: ${recipientName}\nEmail: ${recipientEmail}\n\n--- Message ---\n${message}`;
            const mailtoUrl = `mailto:${yourEmail}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

            // 3. Open both links
            window.open(whatsappUrl, '_blank');
            window.location.href = mailtoUrl;

            // Optional: Give user feedback
            const submitButton = giftForm.querySelector('.btn-submit');
            submitButton.textContent = 'Done!';
             setTimeout(() => { 
                submitButton.textContent = 'Send as Gift';
                giftForm.reset();
            }, 3000);
        });
    }
});