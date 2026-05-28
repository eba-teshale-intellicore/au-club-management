/* ============================================================
   AU Club Management System — script.js
   ============================================================ */


/* ----------------------------------------------------------
    NAVBAR — shadow + dark bg on scroll, hide/show on direction
   ---------------------------------------------------------- */
(function navbarBehavior() {
  const header = document.querySelector("header");
  const sticky = document.querySelector(".sticky");
  let lastY = 0;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    // Dark background + shadow after 20px
    if (y > 20) {
      sticky.style.background = "#111";
      sticky.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
      // Make nav links white so they stay visible on dark bg
      document.querySelectorAll(".but li a").forEach(a => {
        if (!a.classList.contains("active-nav")) a.style.color = "#fff";
      });
    } else {
      sticky.style.background = "#fff";
      sticky.style.boxShadow = "none";
      document.querySelectorAll(".but li a").forEach(a => {
        if (!a.classList.contains("active-nav")) a.style.color = "";
      });
    }

    // Hide navbar scrolling down, reveal scrolling up
    if (y > lastY && y > 120) {
      header.style.transform = "translateY(-100%)";
      header.style.transition = "transform 0.35s ease";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastY = y;
  });
})();


/* ----------------------------------------------------------
    MOBILE HAMBURGER MENU
   ---------------------------------------------------------- */
(function mobileMenu() {
  const nav = document.querySelector(".but");
  const buttonGroup = document.querySelector(".button");
  if (!nav) return;

  const burger = document.createElement("button");
  burger.innerHTML = "&#9776;";
  burger.setAttribute("aria-label", "Toggle menu");
  burger.id = "menu-btn";
  burger.style.cssText = `
    display: none; background: none; border: none;
    font-size: 1.8rem; cursor: pointer; padding: 0 20px;
  `;
  document.querySelector(".sticky").prepend(burger);

  const mq = window.matchMedia("(max-width: 768px)");

  function applyMobile(e) {
    if (e.matches) {
      burger.style.display = "block";
      nav.style.display = "none";
      if (buttonGroup) buttonGroup.style.display = "none";
    } else {
      burger.style.display = "none";
      nav.style.display = "flex";
      if (buttonGroup) buttonGroup.style.display = "flex";
    }
  }

  mq.addEventListener("change", applyMobile);
  applyMobile(mq);

  burger.addEventListener("click", () => {
    const open = nav.style.display === "flex";
    nav.style.cssText = open
      ? "display: none;"
      : `display: flex; flex-direction: column; position: absolute;
         top: 70px; left: 0; width: 100%; background: #fff;
         padding: 20px; gap: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); z-index: 99;`;
    if (buttonGroup) {
      buttonGroup.style.display = open ? "none" : "flex";
      if (!open) {
        buttonGroup.style.cssText = `
          flex-direction: column; position: absolute;
          left: 0; width: 100%; background: #fff; padding: 10px 20px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1); z-index: 98;
        `;
      }
    }
  });
})();


/* ----------------------------------------------------------
    SMOOTH SCROLL for anchor links
   ---------------------------------------------------------- */
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* ----------------------------------------------------------
    SCROLL-REVEAL ANIMATION
   ---------------------------------------------------------- */
(function scrollReveal() {
  const targets = document.querySelectorAll(
    ".card, .bord, .testimony p, #dot, .moto, .sectf h3"
  );

  targets.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = `opacity 0.55s ease ${(i % 6) * 0.08}s,
                           transform 0.55s ease ${(i % 6) * 0.08}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
})();


/* ----------------------------------------------------------
    ACTIVE NAV LINK — highlight on scroll
   ---------------------------------------------------------- */
(function activeNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".but li a");
  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      const match = a.getAttribute("href") === `#${current}`;
      a.style.color = match ? "#3639e7" : "";
    });
  });
})();


/* ----------------------------------------------------------
   ACTIVE NAV LINK — highlight on click
   ---------------------------------------------------------- */
document.querySelectorAll(".but li a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".but li a").forEach(l => l.classList.remove("active-nav"));
    this.classList.add("active-nav");
  });
});


/* ----------------------------------------------------------
    CARD & BUTTON HOVER EFFECTS
   ---------------------------------------------------------- */
document.querySelectorAll(".card, .bord").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-6px) scale(1.02)";
    card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
    card.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
    btn.style.transition = "transform 0.2s ease";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});


/* ----------------------------------------------------------
   TESTIMONIAL AUTO-CAROUSEL (mobile only, every 5s)
   ---------------------------------------------------------- */
(function testimonialCarousel() {
  const items = document.querySelectorAll(".testimony p");
  if (items.length < 2) return;

  let idx = 0;
  const mq = window.matchMedia("(max-width: 900px)");

  function show(n) {
    items.forEach((p, i) => {
      p.style.display = mq.matches ? (i === n ? "block" : "none") : "block";
    });
  }

  show(idx);
  mq.addEventListener("change", () => show(idx));

  setInterval(() => {
    idx = (idx + 1) % items.length;
    show(idx);
  }, 5000);
})();


/* ----------------------------------------------------------
    ANIMATED COUNTER — "50+" (triggers once on scroll into view)
   ---------------------------------------------------------- */
(function animateCounter() {
  const stat = document.querySelector(".stat h1");
  if (!stat) return;

  let started = false;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      let count = 0;
      const timer = setInterval(() => {
        count++;
        stat.textContent = count + "+";
        if (count >= 50) clearInterval(timer);
      }, 35);
    }
  }, { threshold: 0.5 });

  observer.observe(stat);
})();


/* ----------------------------------------------------------
    BACK-TO-TOP BUTTON
   ---------------------------------------------------------- */
(function backToTop() {
  const btn = document.createElement("button");
  btn.innerHTML = "&#8679;";
  btn.setAttribute("aria-label", "Back to top");
  btn.style.cssText = `
    position: fixed; bottom: 30px; right: 30px;
    width: 46px; height: 46px; border-radius: 50%;
    background: #3639e7; color: #fff; border: none;
    font-size: 1.6rem; cursor: pointer; opacity: 0;
    pointer-events: none; transition: opacity 0.3s ease; z-index: 999;
    box-shadow: 0 4px 14px rgba(54,57,231,0.4);
  `;
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    const visible = window.scrollY > 400;
    btn.style.opacity = visible ? "1" : "0";
    btn.style.pointerEvents = visible ? "auto" : "none";
  });

  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
})();


/* ----------------------------------------------------------
    AUTO-UPDATE COPYRIGHT YEAR
   ---------------------------------------------------------- */
(function updateYear() {
  const yearEl = document.querySelector(".fbottom p");
  if (!yearEl) return;
  const year = new Date().getFullYear();
  yearEl.textContent = `© ${year} Ambo University Clubs Portal. All rights reserved.`;
})();




/* ----------------------------------------------------------
    DARK MODE TOGGLE (ready for <button id="dark-mode">)
   ---------------------------------------------------------- */
(function darkMode() {
  const btn = document.querySelector("#dark-mode");
  if (!btn) return;
  btn.addEventListener("click", () => document.body.classList.toggle("dark"));
})();


/* ----------------------------------------------------------
   INJECT GLOBAL STYLES (hover, active-nav)
   ---------------------------------------------------------- */
const style = document.createElement("style");
style.textContent = `
  .active-nav { color: #3639e7 !important; border-bottom: 2px solid #3639e7; }
  .but li a:hover { color: #3639e7 !important; transition: color 0.2s; }
  .log:hover { opacity: 0.85; cursor: pointer; }
  .button button:hover { opacity: 0.85; cursor: pointer; transition: opacity 0.2s; }
  body.dark { background: #121212; color: #eee; }
  body.dark .sticky { background: #1a1a1a !important; }
  body.dark .card, body.dark .bord { background: #1e1e1e; color: #eee; }
`;
document.head.appendChild(style);

