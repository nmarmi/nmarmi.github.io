document.documentElement.classList.add("js-enabled");

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealNodes = [...document.querySelectorAll(".reveal")];
const modeButtons = [...document.querySelectorAll(".mode-button")];
const howIWorkSection = document.querySelector(".how-i-work");
const modePanel = document.querySelector(".mode-panel");

const modeContent = {
  build: {
    label: "Current mode / Build",
    title: "Shipping the core idea before polishing the edges.",
    description:
      "Placeholder text for building mode. This space describes how I scope, prototype, choose tradeoffs, and turn vague ideas into a working version that others can react to.",
    strengths: [
      "Rapid prototyping with a clear architecture in mind",
      "Translating ambiguity into a shippable first version",
      "Keeping UX and implementation constraints in the same frame",
    ],
    signals: [
      "Front-end builds with deliberate interaction design",
      "Systems projects with clean internal interfaces",
      "Product-minded engineering decisions",
    ],
  },
  analyze: {
    label: "Current mode / Analyze",
    title: "Testing assumptions until the signal is hard to ignore.",
    description:
      "Placeholder text for analysis mode. Use this to explain how I break down a problem, inspect data, compare options, and make decisions that are defensible rather than improvised.",
    strengths: [
      "Tracing root causes instead of reacting to surface-level symptoms",
      "Pairing intuition with measurement, validation, and clear evidence",
      "Turning dense information into something decision-ready",
    ],
    signals: [
      "Research or quantitative projects with explicit methodology",
      "Performance investigations and debugging narratives",
      "Write-ups that explain what changed and why it matters",
    ],
  },
  collaborate: {
    label: "Current mode / Collaborate",
    title: "Making complex work easier for other people to move with.",
    description:
      "Placeholder text for collaboration mode. This is where future content can show communication style, ownership, feedback loops, and the ability to make shared work smoother for a team.",
    strengths: [
      "Writing clearly enough that the work survives handoff",
      "Asking sharper questions early to reduce downstream churn",
      "Balancing speed with alignment across design, product, or research",
    ],
    signals: [
      "Team projects with shared ownership and clean interfaces",
      "Documentation, demos, and structured decision-making",
      "Cross-functional momentum without losing technical rigor",
    ],
  },
};

const modeLabel = document.getElementById("mode-label");
const modeTitle = document.getElementById("mode-title");
const modeDescription = document.getElementById("mode-description");
const modeStrengths = document.getElementById("mode-strengths");
const modeSignals = document.getElementById("mode-signals");

function closeNav() {
  if (!navToggle || !siteNav) return;
  navToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
}

function setActiveLink(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderList(node, items) {
  node.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    node.appendChild(li);
  });
}

function setMode(mode) {
  const nextMode = modeContent[mode];
  if (!nextMode || !modePanel || !howIWorkSection) return;

  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  modePanel.classList.add("is-swapping");

  window.setTimeout(() => {
    modeLabel.textContent = nextMode.label;
    modeTitle.textContent = nextMode.title;
    modeDescription.textContent = nextMode.description;
    renderList(modeStrengths, nextMode.strengths);
    renderList(modeSignals, nextMode.signals);
    howIWorkSection.dataset.activeMode = mode;
    modePanel.classList.remove("is-swapping");
  }, 130);
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960) {
      closeNav();
    }
  });
}

if (sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries[0]) {
        setActiveLink(visibleEntries[0].target.id);
      }
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.15, 0.35, 0.6],
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (revealNodes.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

setMode("build");
