/* =========================================================
   script.js
   The ONLY job of this file is the hamburger menu:
   open it, close it, and keep it accessible to keyboard
   and screen reader users. Nothing else on the site needs
   JavaScript to work.

   GSAP HOOK: if you want to animate the menu with GSAP instead
   of the CSS transition in style.css, this is the file to do
   it in — swap the classList.add/remove calls below for a
   gsap.to() timeline.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  var menuToggle = document.getElementById('menu-toggle');
  var menuClose  = document.getElementById('menu-close');
  var mobileMenu = document.getElementById('mobile-menu');
  var body       = document.body;

  if (!menuToggle || !mobileMenu || !menuClose) return;

  // All focusable elements inside the menu, used for the focus trap below
  var focusableSelector = 'a[href], button:not([disabled])';

  function getFocusable() {
    return mobileMenu.querySelectorAll(focusableSelector);
  }

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');

    // Send keyboard focus into the menu (WCAG 2.4.3 Focus Order)
    menuClose.focus();

    document.addEventListener('keydown', handleKeydown);
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');

    // Return focus to the button that opened the menu
    menuToggle.focus();

    document.removeEventListener('keydown', handleKeydown);
  }

  function handleKeydown(event) {
    // Escape closes the menu
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    // Simple focus trap: keep Tab cycling inside the open menu
    if (event.key === 'Tab') {
      var focusable = getFocusable();
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

  // Close the menu when a nav link inside it is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

// Find the camera wrapper on the page
const camera = document.querySelector(".camera-wrapper");

// When the camera is clicked...
camera.addEventListener("click", () => {

    // Add the "printed" class
    camera.classList.add("printed");

});
/* =========================================================
   slow-scroll.js
   Watches for elements with class .slow-reveal entering the
   viewport and adds .is-visible to trigger their CSS transition.

   Sections marked with [data-slow-scroll] get a longer
   transition-duration applied inline, making them feel more
   deliberate than the rest of the page.

   GSAP HOOK: if you later want to replace this with GSAP
   ScrollTrigger, delete this file and swap .slow-reveal /
   .is-visible for gsap.from() timelines on the same elements.
   The HTML data-slow-scroll attribute can stay as a selector hook.
   ========================================================= */

(function () {

  /* Respect users who prefer no motion — skip all reveals entirely
     and just make everything visible immediately (WCAG 2.3.3). */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.slow-reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  /* For sections marked [data-slow-scroll], override the transition
     duration inline so they animate at 1.3s instead of the 0.9s
     default in the CSS. */
  document.querySelectorAll('[data-slow-scroll] .slow-reveal').forEach(function (el) {
    el.style.transitionDuration = '1.3s';
  });

  /* IntersectionObserver fires when an element crosses into view.
     threshold: 0.15 means 15% of the element must be visible
     before the reveal triggers — so it doesn't fire the moment
     a single pixel enters the screen. */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        /* Stop watching once revealed — no need to re-trigger */
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.slow-reveal').forEach(function (el) {
    observer.observe(el);
  });

})();

const howItems = document.querySelectorAll(".how-item");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            howItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add("show");
                }, index * 500);
            });

            observer.disconnect(); // only run once
        }
    });
}, {
    threshold: 0.3
});

observer.observe(document.querySelector(".how-section"));

const projects = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const image = entry.target.querySelector(".project-image-link");
            const text = entry.target.querySelector(".project-content");

            image.classList.add("show");

            setTimeout(() => {
                text.classList.add("show");
            }, 250);

            projectObserver.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.3
});

projects.forEach(project => {
    projectObserver.observe(project);
});
const creativeHeading = document.querySelector(".creative-lab .section-intro h2");

const creativeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            creativeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

creativeObserver.observe(creativeHeading);


const aboutHeading = document.querySelector(".about-text h2");

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            aboutObserver.unobserve(entry.target);
        }

    });
}, {
    threshold: 0.5
});

aboutObserver.observe(aboutHeading);




const skillsHeading = document.querySelector(".skills-text h2");

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillsObserver.observe(skillsHeading);
});
