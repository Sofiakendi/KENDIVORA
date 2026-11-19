const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("show");
});

// CONTACT FORM

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        const recipient = "kendie.kiugu@gmail.com";

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const mailtoLink =
            "mailto:" + recipient +
            "?cc=sofiakendie.kiugu@gmail.com" +
            "&subject=" + emailSubject +
            "&body=" + emailBody;

        window.location.href = mailtoLink;

    });

}

let currentImageIndex = 0;

function openLightbox(image) {
    const images = document.querySelectorAll(".graphic-image");

    currentImageIndex = Array.from(images).indexOf(image);

    document.getElementById("lightbox-image").src = image.src;

    document.getElementById("lightbox").classList.add("active");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
}

function changeImage(direction) {
    const images = document.querySelectorAll(".graphic-image");

    currentImageIndex =
        (currentImageIndex + direction + images.length) % images.length;

    document.getElementById("lightbox-image").src =
        images[currentImageIndex].src;
}