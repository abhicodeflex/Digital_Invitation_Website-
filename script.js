// Wedding Date
const weddingDate = new Date("2026-03-26T12:15:00").getTime();
// Countdown container
const countdown = document.getElementById("countdown");

function updateCountdown() {

  if (!countdown) return;

  const now = new Date().getTime();
  const gap = weddingDate - now;

  if (gap <= 0) {
    countdown.innerHTML =
      '<div class="countdown-item celebration"><span class="countdown-number">We are Married! 💍</span></div>';
    return;
  }

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const d = Math.floor(gap / day);
  const h = Math.floor((gap % day) / hour);
  const m = Math.floor((gap % hour) / minute);
  const s = Math.floor((gap % minute) / second);

  countdown.innerHTML = `
      <div class="countdown-item">
          <span class="countdown-number">${d}</span>
          <span class="countdown-label">Days</span>
      </div>

      <div class="countdown-item">
          <span class="countdown-number">${String(h).padStart(2,"0")}</span>
          <span class="countdown-label">Hours</span>
      </div>

      <div class="countdown-item">
          <span class="countdown-number">${String(m).padStart(2,"0")}</span>
          <span class="countdown-label">Minutes</span>
      </div>

      <div class="countdown-item">
          <span class="countdown-number">${String(s).padStart(2,"0")}</span>
          <span class="countdown-label">Seconds</span>
      </div>
  `;
}

// Update every second
setInterval(updateCountdown, 1000);

// Initial run
updateCountdown();

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isExpanded = navLinks.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isExpanded);
    // Toggle icon between bars and times
    const icon = hamburger.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) navLinks.classList.remove("active");
    if (hamburger) {
      hamburger.setAttribute("aria-expanded", "false");
      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Offset for fixed header
      const headerOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Scroll Animation (Simple Fade In)
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply animation styles initially
document
  .querySelectorAll(
    ".section-title, .event-card, .person, .gallery-item, .story-item, .venue-card, .dresscode-card, .registry-card, .hotel-card, .faq-item",
  )
  .forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    observer.observe(el);
  });

// Navbar scroll effect - using theme colors
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Add parallax effect to hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
    heroContent.style.opacity = Math.max(0, 1 - scrolled / window.innerHeight);
  }
});

// RSVP Form Handling
const rsvpForm = document.getElementById("rsvp-form");
const rsvpSuccess = document.getElementById("rsvp-success-message");
const rsvpAnotherBtn = document.getElementById("rsvp-another");
const guestDetailsSection = document.getElementById("guest-details-section");
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

// Helper function to toggle required fields (defined in outer scope)
function toggleRequired(isRequired) {
  if (!guestDetailsSection) return;

  const inputs = guestDetailsSection.querySelectorAll(
    "input, select, textarea",
  );
  inputs.forEach((input) => {
    // Only toggle required for fields that were originally intended to be required
    if (input.id !== "phone" && input.id !== "dietary") {
      input.required = isRequired;
    }
  });
}

if (rsvpForm) {
  // Initialize: Hide guest details if no attendance is selected
  // Check if any radio is already checked (e.g. browser autofill)
  const selectedAttendance = document.querySelector(
    'input[name="attendance"]:checked',
  );
  if (!selectedAttendance || selectedAttendance.value === "no") {
    if (guestDetailsSection) {
      guestDetailsSection.style.display = "none";
      toggleRequired(false);
    }
  }

  // Handle Attendance Selection
  attendanceRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "yes") {
        if (guestDetailsSection) {
          guestDetailsSection.style.display = "block";
          toggleRequired(true);

          // Animation
          guestDetailsSection.style.opacity = "0";
          guestDetailsSection.style.transform = "translateY(20px)";
          requestAnimationFrame(() => {
            guestDetailsSection.style.transition = "all 0.5s ease";
            guestDetailsSection.style.opacity = "1";
            guestDetailsSection.style.transform = "translateY(0)";
          });
        }
      } else {
        if (guestDetailsSection) {
          guestDetailsSection.style.display = "none";
          toggleRequired(false);
        }
      }
    });
  });

  // Handle Form Submission
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = rsvpForm.querySelector(".submit-btn");
    if (submitBtn) submitBtn.classList.add("loading");

    // Simulate API call
    setTimeout(() => {
      if (submitBtn) submitBtn.classList.remove("loading");
      rsvpForm.style.display = "none";
      if (rsvpSuccess) {
        rsvpSuccess.classList.remove("hidden");
        rsvpSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 1500);
  });
}

if (rsvpAnotherBtn) {
  rsvpAnotherBtn.addEventListener("click", () => {
    if (rsvpSuccess) rsvpSuccess.classList.add("hidden");
    if (rsvpForm) {
      rsvpForm.style.display = "block";
      rsvpForm.reset();

      // Reset state
      if (guestDetailsSection) {
        guestDetailsSection.style.display = "none";
        toggleRequired(false);
      }

      rsvpForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

// Scroll Spy for Active Menu
const sections = document.querySelectorAll("section, header");
const navLi = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Offset for fixed header (approx 100px)
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(current)) {
      a.classList.add("active");
    }
  });
});

// Handle select elements floating labels
document.querySelectorAll(".floating-label select").forEach((select) => {
  // Check initial state
  if (select.value) {
    select.classList.add("has-value");
  }

  // Listen for changes
  select.addEventListener("change", function () {
    if (this.value) {
      this.classList.add("has-value");
    } else {
      this.classList.remove("has-value");
    }
  });
});

// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 800);
  }
  document.body.classList.add("loaded");
});

let slideIndex = 0;
let wishes = JSON.parse(localStorage.getItem("wishes")) || [];
let slideTimer;

/* add wish */

function addWish() {
  let name = document.getElementById("guestName").value;
  let wish = document.getElementById("guestWish").value;

  if (name === "" || wish === "") return;

  wishes.push({ name: name, wish: wish });

  localStorage.setItem("wishes", JSON.stringify(wishes));

  document.getElementById("guestName").value = "";
  document.getElementById("guestWish").value = "";

  loadWishes();
}

/* load wishes */

function loadWishes() {
  let container = document.getElementById("wishContainer");

  if (!container) return;

  container.innerHTML = "";

  wishes.forEach((w) => {
    container.innerHTML += `
      <div class="wish">
        <p>${w.wish}</p>
        <div class="name">– ${w.name}</div>
      </div>
    `;
  });

  slideIndex = 0;
  showSlides();
}

/* slideshow */

function showSlides() {

  clearTimeout(slideTimer);

  let slides = document.getElementsByClassName("wish");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  if (slides.length > 0) {
    slides[slideIndex - 1].style.display = "block";
  }

  slideTimer = setTimeout(showSlides, 4000);
}

/* next / previous */

function plusSlides(n) {
  slideIndex += n - 1;
  showSlides();
}

loadWishes();

  // Accessible Audio Player

(function(){
  const audio = document.getElementById('weddingAudio');
  const btnPlay = document.getElementById('btnPlay');
  const playIcon = document.getElementById('playIcon');
  const player = document.getElementById('musicPlayer');
  const NOTES = ['♩','♪','♫','♬'];
  const COLORS = ['#d4af37','#C0392B','#E74C3C','#FFD700','#A93226'];
  let isPlaying = false, noteTimer = null;

  function setPlayIcon(playing) {
    btnPlay.classList.toggle('playing', playing);
    player.classList.toggle('playing', playing);
    playIcon.innerHTML = playing
      ? '<rect x="5" y="4" width="4.5" height="16" rx="2" fill="#fff"/><rect x="14.5" y="4" width="4.5" height="16" rx="2" fill="#fff"/>'
      : '<path d="M6 4L20 12L6 20V4Z" fill="#fff"/>';
  }

  function spawnNote() {
    const n = document.createElement('div');
    n.className = 'note-floater';
    n.textContent = NOTES[Math.floor(Math.random()*NOTES.length)];
    n.style.color = COLORS[Math.floor(Math.random()*COLORS.length)];
    const rect = btnPlay.getBoundingClientRect();
    n.style.left = (rect.left + Math.random()*40 - 10) + 'px';
    n.style.top = (rect.top - 10) + 'px';
    n.style.fontSize = (14 + Math.random()*10) + 'px';
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
  }

  btnPlay.addEventListener('click', function() {
    if (!isPlaying) {
      isPlaying = true; setPlayIcon(true);
      noteTimer = setInterval(spawnNote, 800);
      audio.play().catch(()=>{});
    } else {
      isPlaying = false; setPlayIcon(false);
      clearInterval(noteTimer); audio.pause();
    }
  });

  audio.addEventListener('ended', function() {
    isPlaying = false; setPlayIcon(false); clearInterval(noteTimer);
  });
})();



const supabase = supabase.createClient(
"SUPABASE_URL",
"SUPABASE_ANON_KEY"
)

const form = document.getElementById("wishForm");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const name = document.getElementById("name").value;
const message = document.getElementById("message").value;

await supabase.from("wishes").insert([
{ name:name, message:message }
]);

alert("Wish sent ❤️");

});

