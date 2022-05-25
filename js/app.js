/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const ulNavEle = document.getElementById("navbar__list");
const scrolltotop = document.getElementById("scrolltotop");
const quantitySection = 4;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build the section
(() => {
  const mainEle = document.getElementById("main");
  const initSectionString = (i) => {
    const activeClass = i === 1 ? "active" : "";
    return `<section id="section${i}" data-nav="Section ${i}" class="${activeClass}">
              <div class="landing__container">
                <h2>Section ${i}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra
                  dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus
                  imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget
                  bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet
                  elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo
                  nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie
                  semper in tellus. Sed congue et odio sed euismod.</p>
  
                <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel
                  luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur
                  porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
              </div>
            </section>`;
  };
  let allSectionString = "";
  for (let i = 1; i < quantitySection + 1; i++) {
    allSectionString += initSectionString(i);
  }
  mainEle.insertAdjacentHTML("beforeend", allSectionString);
})();

// Build the nav
(() => {
  const fragmentNav = document.createDocumentFragment();
  const sectionEles = document.querySelectorAll("[data-nav]");
  sectionEles.forEach((sectionEle, i) => {
    const newNavEle = document.createElement("li");
    newNavEle.textContent = sectionEle.dataset.nav;
    newNavEle.dataset.targetid = `section${i + 1}`;
    newNavEle.classList.add("narbar__item");
    fragmentNav.appendChild(newNavEle);
  });
  ulNavEle.appendChild(fragmentNav);
})();

// Add class 'active' to section when near top of viewport
const activeStyleSectionAndNav = () => {
  const sectionEles = document.querySelectorAll("[data-nav]");
  for (const section of sectionEles) {
    const box = section.getBoundingClientRect();
    const navEle = document.querySelector(`[data-targetid="${section.id}"]`);
    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add("active");
      navEle.classList.add("active");
    } else {
      section.classList.remove("active");
      navEle.classList.remove("active");
    }
  }
};

// Scroll to anchor ID using scrollTO event
const scrollIntoSec = (evt) => {
  const section = document.getElementById(`${evt.target.dataset.targetid}`);
  section.scrollIntoView({ behavior: "smooth" });
};

// Hide fixed navigation bar
const hideNav = () => {
  let setTimeoutId;
  const section = document.getElementById("header");
  document.addEventListener("scroll", () => {
    clearTimeout(setTimeoutId);
    section.classList.remove("page__header--hide");
    setTimeoutId = setTimeout(() => {
      section.classList.add("page__header--hide");
    }, 2000);
  });

  section.addEventListener("mouseover", () => {
    // retain the nav on hover itself
    clearTimeout(setTimeoutId);
  });
};

// scroll to top
const toggleVisibleBtnScrollToTop = () => {
  const halfHeightViewPort = window.innerHeight / 2;
  if (
    document.body.scrollTop > halfHeightViewPort ||
    document.documentElement.scrollTop > halfHeightViewPort
  ) {
    scrolltotop.classList.add("scrolltotop--visible");
  } else {
    scrolltotop.classList.remove("scrolltotop--visible");
  }
};

const scrollToTop = () => {
  window.scroll({ top: 0, behavior: "smooth" });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to section on link click
ulNavEle.addEventListener("click", scrollIntoSec);

// Set sections as active
document.addEventListener("scroll", activeStyleSectionAndNav);

// Hide fixed navigation bar
window.addEventListener("load", hideNav);

// scroll to top
document.addEventListener("scroll", toggleVisibleBtnScrollToTop);
scrolltotop.addEventListener("click", scrollToTop);
