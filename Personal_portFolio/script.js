// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Scroll-to-top button
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "⬆️";
scrollBtn.id = "scrollTopBtn";
document.body.appendChild(scrollBtn);

Object.assign(scrollBtn.style, {
  position: "fixed", bottom: "20px", right: "20px",
  padding: "10px 12px", border: "none", borderRadius: "50%",
  background: "#00f2fe", color: "black", cursor: "pointer",
  display: "none", zIndex: "999", fontSize: "18px"
});

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark/Light mode toggle
const themeBtn = document.createElement("button");
themeBtn.innerHTML = "🌙";
themeBtn.id = "themeToggle";
document.body.appendChild(themeBtn);

Object.assign(themeBtn.style, {
  position: "fixed", bottom: "20px", left: "20px",
  padding: "10px 12px", border: "none", borderRadius: "50%",
  background: "#333", color: "white", cursor: "pointer", zIndex: "999"
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeBtn.innerHTML = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// Light mode override
const style = document.createElement("style");
style.innerHTML = `
.light-mode { background: #f5f5f5; color: #222; }
.light-mode .card { background: #fff; color: #222; }
.light-mode .section-dark, .light-mode .section-darker { background: #fafafa; color: #222; }
.light-mode .navbar, .light-mode footer { background: #eee !important; color: #000; }
`;
document.head.appendChild(style);

// Fade-in effect
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

fadeElements.forEach(el => observer.observe(el));
// Counter animation for About section
const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const increment = target / 200; // speed factor
  let value = 0;

  const updateCounter = () => {
    if (value < target) {
      value += increment;
      counter.innerText = Math.ceil(value);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      counterObserver.unobserve(entry.target); // run once
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));
// Show certificate link on click
function showCertificate(card) {
  const linkDiv = card.querySelector(".cert-link");
  linkDiv.classList.toggle("d-none"); // toggle visibility
}

// Toggle certificate button reveal
function toggleCertificate(card) {
  const linkDiv = card.querySelector(".cert-link");
  linkDiv.classList.toggle("show");
}

