// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Smooth scrolling for all "Hazte Anfitrion" buttons
  const hazteAnfitrionButtons = document.querySelectorAll(
    'a[href="#hazte-anfitrion"]'
  );
  hazteAnfitrionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const formSection = document.querySelector("#hazte-anfitrion");
      if (formSection) {
        const offsetTop = formSection.offsetTop - 70; // Account for navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll Animation Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible");
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    ".animate-on-scroll, .animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right"
  );
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Form validation and button state management
  const contactForm = document.querySelector(".contact-form");
  const submitBtn = contactForm?.querySelector(".submit-btn");
  
  function validateForm() {
    if (!contactForm || !submitBtn) return;
    
    const requiredFields = contactForm.querySelectorAll("input[required], select[required]");
    let allValid = true;
    
    requiredFields.forEach(field => {
      if (field.type === "checkbox") {
        if (!field.checked) allValid = false;
      } else if (field.type === "email") {
        // Enhanced email validation
        const emailValue = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue || !emailRegex.test(emailValue)) {
          allValid = false;
        }
      } else {
        if (!field.value.trim()) allValid = false;
      }
    });
    
    submitBtn.disabled = !allValid;
  }
  
  // Add event listeners to all form fields for real-time validation
  if (contactForm) {
    const allFields = contactForm.querySelectorAll("input, select");
    allFields.forEach(field => {
      field.addEventListener("input", validateForm);
      field.addEventListener("change", validateForm);
    });
    
    // Initial validation
    validateForm();
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      try {
        // Collect form data
        const formData = new FormData(this);
        const websiteValue = formData.get("website")?.trim();
        const emailValue = formData.get("email")?.trim();
        
        // Validate email format before submission
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue || !emailRegex.test(emailValue)) {
          throw new Error("Por favor ingresa un email válido");
        }
        
        const data = {
          name: formData.get("name")?.trim(),
          property_name: formData.get("property-name")?.trim(),
          email: emailValue.toLowerCase(), // Normalize email to lowercase
          website: websiteValue && websiteValue.length > 0 ? websiteValue : null,
          region: formData.get("region"),
          whatsapp: formData.get("whatsapp")?.trim(),
          property_type: formData.get("property-type"),
          is_authorized: formData.get("authorization") === "on",
        };

        // Submit to Supabase
        const { error } = await supabase
          .from("host_applications")
          .insert([data]);

        if (error) {
          throw error;
        }

        // Success feedback
        submitBtn.textContent = "¡Enviado exitosamente!";
        submitBtn.style.backgroundColor = "#2f9e72";
        submitBtn.style.color = "white";
        submitBtn.style.opacity = "1";

        // Track successful form submission
        trackFormSubmission(data);

        // Show thank you popup after brief delay
        setTimeout(() => {
          showThankYouPopup();
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = "";
          submitBtn.style.color = "";
          submitBtn.style.opacity = "";
        }, 1000);
      } catch (error) {
        console.error("Error submitting form:", error);

        // Error feedback
        submitBtn.textContent = "Error - Intentar nuevamente";
        submitBtn.style.backgroundColor = "#e74c3c";
        submitBtn.style.color = "white";
        submitBtn.style.opacity = "1";

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = "";
          submitBtn.style.color = "";
          submitBtn.style.opacity = "";
        }, 3000);
      }
    });
  }

  // Thank You Popup Functions
  function showThankYouPopup() {
    const popup = document.getElementById("thankYouPopup");
    if (popup) {
      popup.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  }

  function hideThankYouPopup() {
    const popup = document.getElementById("thankYouPopup");
    if (popup) {
      popup.classList.remove("show");
      document.body.style.overflow = ""; // Restore scrolling
    }
  }

  // Popup event listeners
  const popup = document.getElementById("thankYouPopup");
  if (popup) {
    // Close button
    const closeBtn = popup.querySelector(".popup-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", hideThankYouPopup);
    }

    // CTA button
    const ctaBtn = popup.querySelector(".popup-cta-button");
    if (ctaBtn) {
      ctaBtn.addEventListener("click", hideThankYouPopup);
    }

    // Backdrop click
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        hideThankYouPopup();
      }
    });

    // Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && popup.classList.contains("show")) {
        hideThankYouPopup();
      }
    });
  }

  // Google Analytics and GTM Tracking Functions
  function trackFormSubmission(formData) {
    // Google Analytics 4 Event Tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        event_category: 'Host Application',
        event_label: 'Host Registration Form',
        property_type: formData.property_type,
        region: formData.region,
        custom_parameters: {
          property_name: formData.property_name,
          has_website: formData.website ? 'yes' : 'no'
        }
      });

      // Track conversion
      gtag('event', 'conversion', {
        send_to: 'G-W4463882MQ/CONVERSION_ID',
        event_category: 'Lead Generation',
        event_label: 'Host Application Completed'
      });
    }

    // Google Tag Manager DataLayer Push
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: 'host_application_submitted',
        form_data: {
          property_type: formData.property_type,
          region: formData.region,
          has_website: formData.website ? true : false,
          timestamp: new Date().toISOString()
        },
        user_data: {
          email_domain: formData.email.split('@')[1],
          // Don't send PII in tracking
        }
      });

      // Push conversion event
      window.dataLayer.push({
        event: 'conversion',
        conversion_type: 'host_application',
        conversion_value: 1
      });
    }
  }

  function trackFormStart() {
    // Track when user starts filling the form
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_start', {
        event_category: 'Host Application',
        event_label: 'User Started Form'
      });
    }

    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: 'form_interaction_start',
        form_type: 'host_application'
      });
    }
  }

  function trackButtonClick(buttonType, buttonText) {
    // Track CTA button clicks
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'CTA Button',
        event_label: buttonText,
        button_type: buttonType
      });
    }

    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: 'cta_click',
        button_type: buttonType,
        button_text: buttonText
      });
    }
  }

  // Add tracking to form interactions
  if (contactForm) {
    let formStartTracked = false;
    
    // Track form start on first interaction
    const formFields = contactForm.querySelectorAll('input, select');
    formFields.forEach(field => {
      field.addEventListener('focus', function() {
        if (!formStartTracked) {
          trackFormStart();
          formStartTracked = true;
        }
      }, { once: true });
    });
  }

  // Track CTA button clicks
  const ctaButtons = document.querySelectorAll('.cta-button, .hero-cta-button, .ps-cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      trackButtonClick('primary_cta', this.textContent.trim());
    });
  });

  // Track navigation clicks
  const trackableNavLinks = document.querySelectorAll('.nav-links a, .footer-link');
  trackableNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'Navigation',
          event_label: this.textContent.trim(),
          link_url: this.getAttribute('href')
        });
      }
    });
  });

  // Track scroll depth
  let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
  };

  function trackScrollDepth() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    Object.keys(scrollDepthTracked).forEach(depth => {
      if (scrollPercent >= parseInt(depth) && !scrollDepthTracked[depth]) {
        scrollDepthTracked[depth] = true;
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'scroll', {
            event_category: 'Scroll Depth',
            event_label: `${depth}%`,
            value: parseInt(depth)
          });
        }

        if (typeof window.dataLayer !== 'undefined') {
          window.dataLayer.push({
            event: 'scroll_depth',
            scroll_percentage: parseInt(depth)
          });
        }
      }
    });
  }

  // Throttled scroll tracking
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(trackScrollDepth, 100);
  });

});
