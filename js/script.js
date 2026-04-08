// 1. PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});

// 2. INIT AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// 3. CUSTOM CURSOR
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" },
  );
});

// 4. TYPEWRITER EFFECT
const textElement = document.querySelector(".typewriter span");
const titles = [
  "Serial Entrepreneur",
  "Launch Director of BNI",
  "Business Network startegist",
  "INDUSTRIAL SAFETY EXPERT",
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    textElement.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentTitle.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}
document.addEventListener("DOMContentLoaded", type);

// 5. CANVAS PARTICLES
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
  }
  draw() {
    ctx.fillStyle = "#ff003c";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 50; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    // Draw connections
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.strokeStyle = "rgba(255, 0, 60, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// 6. NAVBAR SCROLL
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

// 7. CONTACT FORM HANDLER
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value;

    // Construct Mailto Link
    const mailtoLink = `mailto:arunkumarappadoure@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

    // Open Mail Client
    window.location.href = mailtoLink;

    // Optional: Reset form or show success message
    alert("Transmission initiated. Opening your email client...");
    contactForm.reset();
  });
}

// 8. IMAGE POPUP

const heroImg = document.getElementById("heroPopupImg");
const popup = document.getElementById("imgPopup");
const closeBtn = document.getElementById("closePopup");

let popupOpen = false;

function openPopup() {
  popup.classList.add("active");
  document.body.classList.add("popup-open");
  popupOpen = true;
}

function closePopup() {
  popup.classList.remove("active");
  document.body.classList.remove("popup-open");
  popupOpen = false;
}

heroImg.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopup();
});

// ✅ CLOSE ON SCROLL INTENT (DESKTOP)
window.addEventListener(
  "wheel",
  () => {
    if (popupOpen) closePopup();
  },
  { passive: true },
);

// ✅ CLOSE ON SCROLL INTENT (MOBILE)
window.addEventListener(
  "touchmove",
  () => {
    if (popupOpen) closePopup();
  },
  { passive: true },
);

// ✅ OPTIONAL: CLOSE ON KEYBOARD SCROLL
window.addEventListener("keydown", (e) => {
  if (
    popupOpen &&
    ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(e.key)
  ) {
    closePopup();
  }
});

// hall of fame img popup

(function () {
  const galleryPopup = document.getElementById("galleryPopup");
  const galleryPopupImg = document.getElementById("galleryPopupImg");
  const galleryClose = document.getElementById("galleryClose");

  let isGalleryOpen = false;

  // OPEN gallery popup
  document.querySelectorAll("#gallery .popup-img").forEach((img) => {
    img.addEventListener("click", () => {
      galleryPopupImg.src = img.src;
      galleryPopupImg.alt = img.alt || "";
      galleryPopup.classList.add("active");
      document.body.classList.add("popup-open");
      isGalleryOpen = true;
    });
  });

  // CLOSE function
  function closeGalleryPopup() {
    galleryPopup.classList.remove("active");
    document.body.classList.remove("popup-open");
    isGalleryOpen = false;
  }

  galleryClose.addEventListener("click", closeGalleryPopup);

  galleryPopup.addEventListener("click", (e) => {
    if (e.target === galleryPopup) closeGalleryPopup();
  });

  // CLOSE on scroll intent (gallery only)
  window.addEventListener(
    "wheel",
    () => {
      if (isGalleryOpen) closeGalleryPopup();
    },
    { passive: true },
  );

  window.addEventListener(
    "touchmove",
    () => {
      if (isGalleryOpen) closeGalleryPopup();
    },
    { passive: true },
  );

  window.addEventListener("keydown", (e) => {
    if (isGalleryOpen && e.key === "Escape") closeGalleryPopup();
  });
})();
