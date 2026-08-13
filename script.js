// Highlight active section in navbar on scroll
const sections = document.querySelectorAll("section, footer[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 90;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinksList = document.querySelector(".nav-links");
if (navToggle && navLinksList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinksList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
  navLinksList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksList.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal-on-scroll (respects prefers-reduced-motion via CSS)
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}