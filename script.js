const projects = [
  {
    number: "01", filter: "aem", category: "PROYECTOS DE CLIENTE · AEM 6.5", title: "Desarrollo frontend en AEM",
    description: "Desarrollo, adaptación y mantenimiento de páginas y componentes en Adobe Experience Manager. Trabajo con Author, Publish, templates, DAM y fragmentos de contenido.",
    tags: ["AEM 6.5", "HTML5", "SCSS", "JavaScript"],
    detail: "aem-experiences.html", tone: "project-aem", label: "ÁREA DE CONTRIBUCIÓN"
  },
  {
    number: "02", filter: "ui", category: "PROYECTOS DE CLIENTE · RESPONSIVE", title: "Maquetación de interfaces web",
    description: "Implementación de interfaces web y mobile a partir de propuestas visuales, con enfoque Mobile First, consistencia visual, usabilidad y adaptación a distintos breakpoints.",
    tags: ["Figma", "Adobe XD", "CSS Grid", "Flexbox"],
    detail: "responsive-interfaces.html", tone: "project-ui", label: "ÁREA DE CONTRIBUCIÓN"
  },
  {
    number: "03", filter: "access", category: "UI / UX · ACCESIBILIDAD", title: "Usabilidad y accesibilidad",
    description: "Aplicación de criterios de accesibilidad, HTML semántico, WAI-ARIA, navegación por teclado, contraste y formularios accesibles en la construcción de interfaces.",
    tags: ["WCAG", "WAI-ARIA", "HTML semántico", "Lighthouse"],
    detail: "accessibility.html", tone: "project-access", label: "ÁREA DE CONTRIBUCIÓN"
  },
  {
    number: "04", filter: "email", category: "EXPERIENCIA ANTERIOR · EMAIL", title: "Maquetación de email responsive",
    description: "Maquetación de emails responsive mediante tablas HTML y CSS inline, cuidando la lectura y la estructura en diferentes dispositivos y resoluciones.",
    tags: ["HTML Email", "CSS Inline", "HTML Tables", "Responsive"],
    detail: "responsive-email.html", tone: "project-email", label: "EXPERIENCIA PROFESIONAL"
  }
];

const skillGroups = {
  "#frontend-skills": [
    "HTML5 · HTML semántico", "CSS3 · SCSS / Sass · LESS", "JavaScript · DOM · JSON · XML",
    "Responsive Web Design · Mobile First", "Flexbox · CSS Grid · Media Queries · BEM",
    "Angular · AngularJS", "Bootstrap · Foundation · Tailwind CSS · Material Design", "Web Components · Animaciones · Transiciones"
  ],
  "#design-skills": [
    "Adobe Experience Manager 6.5", "AEM Author · AEM Publish", "Components · Templates · Editable Templates",
    "CRXDE / CRXDE Lite · DAM", "Content Fragments · Experience Fragments",
    "Figma · Adobe XD · Wireframes · Prototyping", "UI Design · UX · Design Systems",
    "WCAG · WAI-ARIA · Accesibilidad web"
  ],
  "#tool-skills": [
    "Git · GitHub · GitLab · Bitbucket", "npm · Visual Studio Code",
    "Jira · Confluence · Trello", "Chrome · Firefox · Edge DevTools",
    "Lighthouse · Responsive testing", "HTML Email · CSS Inline · HTML Tables",
    "Scrum · Trabajo colaborativo"
  ]
};

const certifications = [
  ["2025", "AEM Developer Masterclass", "Formación técnica"],
  ["2025", "Modern Web HTML5 / CSS3 / JS", "Desarrollo web"],
  ["2025", "Modern JavaScript", "JavaScript"],
  ["2024", "AEM 6.5 Build Websites and Components", "Adobe Experience Manager"],
  ["2024", "Scrum Fundamentals", "Metodología ágil"],
  ["2024", "AI Introduction", "Inteligencia artificial"],
  ["2024", "PL-400", "Microsoft"],
  ["2024", "Usability / UX / Accessibility", "Diseño y accesibilidad"],
  ["2024", "CSS Grid", "CSS"],
  ["2024", "Figma Responsive", "UI / UX"],
  ["2024", "Angular", "Frontend"]
];

const projectGrid = document.querySelector("#project-grid");
const yearNode = document.querySelector("#year");

function renderProjects() {
  if (!projectGrid) return;
  projectGrid.innerHTML = projects.map(project => `
    <article class="project-card ${project.tone}" data-category="${project.filter}">
      <div class="project-art" aria-hidden="true"><span class="art-index">${project.number}</span><span class="art-orbit"></span><span class="art-caption">${project.label}</span></div>
      <div class="project-content">
        <div class="project-meta"><span>${project.number} — ${project.category}</span><span>↗</span></div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <ul class="tag-list">${project.tags.map(tag => `<li>${tag}</li>`).join("")}</ul>
        <a class="project-link" href="projects/${project.detail}">Ver responsabilidades y tecnologías <span>↗</span></a>
      </div>
    </article>`).join("");
}

function renderSkills() {
  Object.entries(skillGroups).forEach(([selector, items]) => {
    const root = document.querySelector(selector);
    if (root) root.innerHTML = `<ul class="plain-skill-list">${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
  });
}

function renderCertifications() {
  const root = document.querySelector("#certification-list");
  if (!root) return;
  root.innerHTML = certifications.map(([yearValue, title, provider]) => `
    <article class="certification"><div class="cert-year">${yearValue}</div><div class="cert-title">${title}</div><div class="cert-provider">${provider}</div></article>
  `).join("");
}

function initNavigation() {
  const nav = document.querySelector("#main-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;
  const close = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
  document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
}

function initReveal() {
  const items = document.querySelectorAll(".section-heading, .project-card, .skills-card, .timeline-item, .certification, .intro-text");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  items.forEach(item => { item.classList.add("reveal"); observer.observe(item); });
}

function initActiveSection() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".main-nav a")];
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach(section => observer.observe(section));
}

renderProjects();
renderSkills();
renderCertifications();
if (yearNode) yearNode.textContent = new Date().getFullYear();
initNavigation();
initReveal();
initActiveSection();


function initProjectFilters() {
  const buttons = [...document.querySelectorAll(".filter-chip")];
  const status = document.querySelector(".filter-status");
  if (!buttons.length || !projectGrid) return;
  buttons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let visible = 0;
    projectGrid.querySelectorAll(".project-card").forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible++;
    });
    if (status) status.textContent = `Mostrando ${visible} ${visible === 1 ? "área" : "áreas"} de experiencia`;
  }));
}

function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress span");
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) return;
  const update = () => button.classList.toggle("is-visible", window.scrollY > 650);
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function initCopyEmail() {
  const button = document.querySelector(".copy-email");
  if (!button) return;
  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail;
    try {
      await navigator.clipboard.writeText(email);
      button.classList.add("copied");
      button.innerHTML = '<span aria-hidden="true">✓</span> Email copiado';
      window.setTimeout(() => {
        button.classList.remove("copied");
        button.innerHTML = '<span aria-hidden="true">▢</span> Copiar email';
      }, 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}

function initCountUp() {
  const counters = document.querySelectorAll(".profile-facts strong");
  if (!counters.length || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const target = Number(node.dataset.count);
      if (!Number.isFinite(target)) { observer.unobserve(node); return; }
      const start = performance.now();
      const duration = 1000;
      const tick = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        node.textContent = `${Math.round(target * eased)}${node.dataset.suffix || ""}`;
        if (t < 1) window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
      observer.unobserve(node);
    });
  }, { threshold: .7 });
  counters.forEach(node => observer.observe(node));
}

initProjectFilters();
initScrollProgress();
initBackToTop();
initCopyEmail();

initCountUp();
