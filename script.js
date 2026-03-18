const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const revealElements = document.querySelectorAll(".reveal");
const typingElement = document.getElementById("typing");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

const typingTexts = [
  "Aspiring IT Support Specialist",
  "Technical Support Enthusiast",
  "Future Network Engineer",
  "Web & Networking Learner"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = typingTexts[textIndex];

  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 90);
}

typeEffect();

function revealOnScroll() {
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));

        const activeLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.45
  }
);

sections.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });
});

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

const certificateCards = document.querySelectorAll(".certificate-card");
const certificateModal = document.getElementById("certificateModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

certificateCards.forEach((card) => {
  card.addEventListener("click", () => {
    const imagePath = card.getAttribute("data-image");
    modalImage.src = imagePath;
    certificateModal.classList.add("show");
  });
});

modalClose.addEventListener("click", () => {
  certificateModal.classList.remove("show");
  modalImage.src = "";
});

certificateModal.addEventListener("click", (e) => {
  if (e.target === certificateModal) {
    certificateModal.classList.remove("show");
    modalImage.src = "";
  }
});
