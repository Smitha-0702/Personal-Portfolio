// ===== HIGHLIGHT ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
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


// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "#111111";
  } else {
    navbar.style.backgroundColor = "#1a1a1a";
  }
});


// ===== FADE-IN ANIMATION ON SCROLL =====
const faders = document.querySelectorAll("section");

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => appearOnScroll.observe(fader));


// ===== TYPED TEXT EFFECT IN HERO =====
const roles = ["Frontend Developer", "UI Designer", "Problem Solver", "Freelancer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typedText = document.getElementById("typed-text");

function type() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    setTimeout(() => (isDeleting = true), 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type();
// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Close menu when a link is clicked
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});
// ===== CONTACT FORM SUBMISSION =====
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

submitBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "⚠️ Please fill in all fields.";
    formStatus.style.color = "#ff5252";
    return;
  }

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://formspree.io/f/xaqapvnq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      formStatus.textContent = "✅ Message sent successfully!";
      formStatus.style.color = "#00bcd4";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    } else {
      formStatus.textContent = "❌ Something went wrong. Try again.";
      formStatus.style.color = "#ff5252";
    }
  } catch (error) {
    formStatus.textContent = "❌ Network error. Please try again.";
    formStatus.style.color = "#ff5252";
  }

  submitBtn.textContent = "Send Message";
  submitBtn.disabled = false;
});