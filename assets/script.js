// ===== Language Switching System =====
const supportedLanguages = ['en', 'it'];
let currentLang = localStorage.getItem('lang') || 'en';

// Apply language to all elements with data-en / data-it attributes
function setLanguage(lang) {
  if (!supportedLanguages.includes(lang)) lang = 'en';
  localStorage.setItem('lang', lang);
  currentLang = lang;

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  const elements = document.querySelectorAll('[data-en][data-it]');
  elements.forEach(el => {
    const raw = (lang === 'it') ? el.dataset.it : el.dataset.en;
    if(typeof raw === 'string') {
      const html = raw.replace(/(?:\\n|\n)/g, "<br>");
      el.innerHTML = html;
    }
  });

  const event = new Event("langChanged");
  document.dispatchEvent(event);
}

// Toggle between English and Italian
function toggleLanguage() {
  const newLang = currentLang === 'en' ? 'it' : 'en';
  setLanguage(newLang);

  // Dispatch a custom event to notify other parts of the app
  const event = new Event("langChanged");
  document.dispatchEvent(event);
}

// Initialize language on load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  const langBtn = document.createElement('button');
  langBtn.className = 'lang-btn';
  langBtn.textContent = currentLang === 'en' ? 'IT' : 'EN';
  langBtn.onclick = () => {
    toggleLanguage();
    langBtn.textContent = currentLang === 'en' ? 'IT' : 'EN';
  };
  document.body.appendChild(langBtn);
});

// === SCROLL ARROW BEHAVIOR ===
// Select the arrow and second section
const scrollArrow = document.getElementById("scrollArrow");
const nextSection = document.querySelector(".more-about-me");
const scrollText = document.querySelector(".scroll-prompt p");

if (scrollArrow && nextSection) {
  // Scroll smoothly when arrow is clicked
  scrollArrow.addEventListener("click", () => {
    nextSection.scrollIntoView({ behavior: "smooth" });
  });

  // Hide arrow when scrolling down, show when at top
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) { // small threshold
      scrollArrow.style.opacity = "0";
      scrollArrow.style.pointerEvents = "none";
      scrollText.style.opacity = "0";
      scrollText.style.pointerEvents = "none";
    } else {
      scrollArrow.style.opacity = "1";
      scrollArrow.style.pointerEvents = "auto";
      scrollText.style.opacity = "1";
      scrollText.style.pointerEvents = "auto";
    }
  });
}
// === CV Button Dynamic Download ===
const cvBtn = document.getElementById("download-CV-qb");

if (cvBtn) {
  function updateCVButton() {
    // Get current language from localStorage
    const lang = localStorage.getItem("lang") || "en";

    // Set the correct PDF based on language
    const cvFile = lang === "it" ? "assets/downloads/cv_it.pdf" : "assets/downloads/cv_en.pdf";
    cvBtn.onclick = () => {
      window.location.href = cvFile; // triggers download
    };

  }

  // Initial update
  updateCVButton();

  // Update button whenever language changes
  document.addEventListener("langChanged", updateCVButton);
}

// === Resume Button Dynamic Download ===
const resBtn = document.getElementById("download-resume-qb");

if (resBtn) {
  function updateResButton() {
    // Get current language from localStorage
    const lang = localStorage.getItem("lang") || "en";

    // Set the correct PDF based on language
    const resFile = lang === "it" ? "../downloads.html" : "assets/downloads/resume.pdf";
    resBtn.onclick = () => {
      window.location.href = resFile; // triggers download
    };

  }

  // Initial update
  updateResButton();

  // Update button whenever language changes
  document.addEventListener("langChanged", updateResButton);
}

// === Tab Switcher ===

function setupTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const underline = document.querySelector(".switch-underline");
  const contents = document.querySelectorAll(".content");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add("active");

      if (underline) underline.style.transform = `translateX(${index * 100}%)`;
      document.dispatchEvent((index === 1 ? new Event("secondTabSelected") : new Event("firstTabSelected")))
    });
  });
}

document.addEventListener("DOMContentLoaded", setupTabs);
document.addEventListener("DOMContentLoaded", function(){
  document.dispatchEvent(new Event("firstTabSelected"));
});

document.dispatchEvent(new Event("firstTabSelected"))
// Select the arrow and second section
const scrollArrowSkills = document.getElementById("scrollArrowSkills");
const SkillsSection = document.querySelector(".soft-skills");
const scrollTextSkills = document.querySelector(".scroll-prompt-skills p");
const wholePromptSkills = document.querySelector(".scroll-prompt-skills");
document.addEventListener("firstTabSelected", () => {
  wholePromptSkills.style.display = "flex";
  SkillsSection.style.display = "flex";
    // Scroll smoothly when arrow is clicked
  scrollArrowSkills.addEventListener("click", () => {
    SkillsSection.scrollIntoView({ behavior: "smooth" });
  });

  // Hide arrow when scrolling down, show when at top
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) { // small threshold
      scrollArrowSkills.style.opacity = "0";
      scrollArrowSkills.style.pointerEvents = "none";
      scrollTextSkills.style.opacity = "0";
      scrollTextSkills.style.pointerEvents = "none";
    } else {
      scrollArrowSkills.style.opacity = "1";
      scrollArrowSkills.style.pointerEvents = "auto";
      scrollTextSkills.style.opacity = "1";
      scrollTextSkills.style.pointerEvents = "auto";
    }
  });
});
document.addEventListener("secondTabSelected", () => {
  wholePromptSkills.style.display = "none";
  SkillsSection.style.display = "none";
});
