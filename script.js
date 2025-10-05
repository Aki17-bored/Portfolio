// ===== Typing Animation =====
document.addEventListener("DOMContentLoaded", () => {
  const typedTextSpan = document.querySelector(".typing-text span");
  const textArray = ["Student", "Programmer"];
  const typingDelay = 100;
  const erasingDelay = 60;
  const newTextDelay = 1500;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay);
    }
  }

  setTimeout(type, 500); // initial delay
});

// ===== Sticky Navbar =====
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);
});

// ===== Active Navigation Highlight =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.href.includes(current)) a.classList.add("active");
  });
});

// ===== Scroll Reveal Animation =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.2 });

document.querySelectorAll(".slide").forEach(el => observer.observe(el));

// ===== Mobile Menu Toggle + Overlay =====
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const overlay = document.getElementById("overlay");

if (menuToggle && navbar && overlay) {
  const toggleMenu = () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    menuToggle.innerHTML = navbar.classList.contains("active")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  };

  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Close menu on nav link click (mobile)
  const navLinksMobile = document.querySelectorAll(".nav-link");
  navLinksMobile.forEach(link => link.addEventListener("click", () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));
}
