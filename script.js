// NAVIGATION MENU

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function() {
        navLinks.classList.toggle("show");
    });
}


// EMAILJS CONTACT FORM

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Initialise EmailJS
if (window.emailjs) {
    emailjs.init({
        publicKey: "h21k-rTEuAy2ZQ9Tk"
    });
}

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const sendButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (!window.emailjs) {
            formStatus.textContent =
                "Email service could not load. Please refresh and try again.";
            return;
        }

        sendButton.disabled = true;
        sendButton.textContent = "Sending...";

        if (formStatus) {
            formStatus.textContent = "Sending your message...";
        }

        emailjs.sendForm(
            "service_4rrwh9k",
            "template_qcjv448",
            contactForm
        )

        .then(function() {

            formStatus.textContent =
                "Your message has been sent successfully! Thank you for contacting KENDIVORA.";

            contactForm.reset();

        })

        .catch(function(error) {

            console.error("EmailJS error:", error);

            formStatus.textContent =
                "Sorry, your message could not be sent. Please try again.";

        })

        .finally(function() {

            sendButton.disabled = false;
            sendButton.textContent = "Send Message";

        });

    });

}


// IMAGE LIGHTBOX

let currentImageIndex = 0;
function openLightbox(image) {
    const images = document.querySelectorAll(".graphic-image");
    const selectedImage = image.closest(".graphic-image");

    currentImageIndex = Array.from(images).indexOf(selectedImage);

    const poster = selectedImage.querySelector("img");

    document.getElementById("lightbox-image").src = poster.src;
    document.getElementById("lightbox").classList.add("active");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
}

function changeImage(direction) {
    const images = document.querySelectorAll(".graphic-image");

    currentImageIndex =
        (currentImageIndex + direction + images.length) % images.length;

    const poster = images[currentImageIndex].querySelector("img");

    document.getElementById("lightbox-image").src = poster.src;
}

document.addEventListener("keydown", function(event) {
    const lightbox = document.getElementById("lightbox");

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "ArrowRight") {
        changeImage(1);
    }

    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }

    if (event.key === "Escape") {
        closeLightbox();
    }
});
// MOBILE LIGHTBOX SWIPE NAVIGATION

let touchStartX = 0;
let touchEndX = 0;

const lightbox = document.getElementById("lightbox");

if (lightbox) {
    lightbox.addEventListener("touchstart", function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function(event) {
        touchEndX = event.changedTouches[0].screenX;

        const swipeDistance = touchEndX - touchStartX;

        if (!lightbox.classList.contains("active")) return;

        if (swipeDistance < -50) {
            changeImage(1);
        }

        if (swipeDistance > 50) {
            changeImage(-1);
        }
    }, { passive: true });
}

// LIGHT AND DARK MODE

const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
const savedTheme = localStorage.getItem("kendivora-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

function updateThemeButton() {

    if (!themeToggle) return;

    if (document.body.classList.contains("light-mode")) {

        themeToggle.textContent = "🌙 Dark Mode";

    } else {

        themeToggle.textContent = "☀️ Light Mode";

    }

}

if (themeToggle) {

    updateThemeButton();

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const currentTheme =
            document.body.classList.contains("light-mode")
                ? "light"
                : "dark";

        localStorage.setItem("kendivora-theme", currentTheme);

        updateThemeButton();

    });

}

// KENDIVORA CALENDLY THEME SWITCHER

function updateCalendlyTheme() {
    const container = document.getElementById("calendly-container");

    if (!container || !window.Calendly) return;

    const isLightMode = document.body.classList.contains("light-mode");

    const background = isLightMode ? "FFFFFF" : "0B0B0B";
    const text = isLightMode ? "171717" : "FFFFFF";
    const primary = isLightMode ? "B99555" : "D6B779";

    const bookingURL = new URL(
        "https://calendly.com/kendie-kiugu/30min"
    );

    bookingURL.searchParams.set("background_color", background);
    bookingURL.searchParams.set("text_color", text);
    bookingURL.searchParams.set("primary_color", primary);

    container.innerHTML = "";

    Calendly.initInlineWidget({
        url: bookingURL.toString(),
        parentElement: container
    });
}

// Wait for Calendly to load
const calendlyScript = document.querySelector(
    'script[src*="calendly.com/assets/external/widget.js"]'
);

if (window.Calendly) {
    updateCalendlyTheme();
} else if (calendlyScript) {
    calendlyScript.addEventListener("load", updateCalendlyTheme);
}

// Update calendar when the theme button is clicked
const themeButton = document.getElementById("theme-toggle");

if (themeButton) {
    themeButton.addEventListener("click", updateCalendlyTheme);
}

/* =====================================
   KENDIVORA — SCROLL REVEAL ANIMATION
===================================== */

document.documentElement.classList.add("js-enabled");

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-stagger"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}


/* KENDIVORA — FLOWER CELEBRATION */

const bookingButton = document.querySelector(".floating-booking");

if (bookingButton) {
    bookingButton.addEventListener("click", function(event) {
        event.preventDefault();

        if (bookingButton.dataset.celebrating === "true") return;

        bookingButton.dataset.celebrating = "true";

        const destination = bookingButton.href;

        let layer = document.querySelector(".booking-celebration-layer");

        if (!layer) {
            layer = document.createElement("div");
            layer.className = "booking-celebration-layer";
            document.body.appendChild(layer);
        }

        const symbols = ["🌸", "🌼", "🌺", "✿", "✨", "🎉", "🥂"];

        const rect = bookingButton.getBoundingClientRect();

        // Five consecutive celebration bursts
        for (let burst = 0; burst < 5; burst++) {

            setTimeout(() => {

                for (let i = 0; i < 18; i++) {

                    const particle = document.createElement("span");

                    particle.className = "booking-particle";

                    particle.textContent =
                        symbols[Math.floor(Math.random() * symbols.length)];

                    const angle = Math.random() * Math.PI * 2;
                    const distance = 90 + Math.random() * 140;

                    particle.style.setProperty(
                        "--start-x",
                        `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 45}px`
                    );

                    particle.style.setProperty(
                        "--start-y",
                        `${rect.top + rect.height / 2 + (Math.random() - 0.5) * 35}px`
                    );

                    particle.style.setProperty(
                        "--dx",
                        `${Math.cos(angle) * distance}px`
                    );

                    particle.style.setProperty(
                        "--dy",
                        `${Math.sin(angle) * distance}px`
                    );

                    particle.style.setProperty(
                        "--size",
                        `${18 + Math.random() * 17}px`
                    );

                    particle.style.setProperty(
                        "--spin",
                        `${Math.random() * 360}deg`
                    );

                    layer.appendChild(particle);

                    setTimeout(() => particle.remove(), 1600);
                }

            }, burst * 180);
        }

        setTimeout(() => {
            window.location.assign(destination);
        }, 2000);
    });
}