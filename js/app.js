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
 * Define Global Variables
 *
 */
const secTitle = 'Section';
const secContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra
                        dapibus.Suspendisse potenti.Aenean aliquam elementum mi, ac euismod augue.Donec eget lacinia ex.Phasellus
                        imperdiet porta orci eget mollis.Sed convallis sollicitudin mauris ac tincidunt.Donec bibendum, nulla eget
                        bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue.Pellentesque maximus imperdiet
                        elit a pharetra.Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus.Morbi a tincidunt felis.Sed leo
                        nunc, pharetra et elementum non, faucibus vitae elit.Integer nec libero venenatis libero ultricies molestie
                        semper in tellus.Sed congue et odio sed euismod.
                        `;
const options = {
    root: 0px,
    threshold: 0.7,
    rootMargin: '-100px'
}

const observer = new IntersectionObserver(callback, options);
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
 function callback(entries, observer) {
     entries.forEach(entry => {
         if (entry.isIntersecting)
             toggleActiveClasses(entry.target);
     });
 }

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * @description build section element
 * @param {number} order
 * @returns {HTMLElement} section html element
 */
function generateSection(order) {
    const secEl = document.createElement('section');
    secEl.setAttribute('id', `${secTitle.toLowerCase()}${order}`);
    secEl.setAttribute('data-nav', `${secTitle} ${order}`);
    const divEl = document.createElement('div');
    divEl.classList.add('landing__container');
    const headEl = document.createElement('h2');
    headEl.textContent = `${secTitle} ${order}`;
    divEl.appendChild(headEl);
    const paraEl = document.createElement('p');
    paraEl.textContent = secContent;
    divEl.appendChild(paraEl);
    secEl.appendChild(divEl);
    return secEl;
}

/**
 * @description implement sections observation
 */
function observeSections() {
    const sections = document.querySelectorAll('section');
    Array.from(sections).forEach(section => {
        observer.observe(section);
    })
}

/**
 * @description toggle active classes of navigation links and sections
 */
function toggleActiveClasses(section) {
    document.querySelector('.your-active-class').classList.remove('your-active-class');
    document.querySelector('.menu__link__active').classList.remove('menu__link__active');
    section.classList.add('your-active-class');
    document.querySelector(`[data-scroll="${section.getAttribute('id')}"]`).classList.add('menu__link__active');
}

/**
 * @description Generate random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number} random number between min and max
 */
function getSectionsCount(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @description Append sections to main element
 */
function appendSections() {
    const count = getSectionsCount(4, 10);
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= count; i++) {
        const sectionEl = generateSection(i);
        fragment.appendChild(sectionEl);
    }
    fragment.querySelector('section').classList.add('your-active-class');
    const mainEl = document.querySelector('main');
    mainEl.appendChild(fragment);
}

/**
 * @description Add collabse functionality to sections
 */
function makeSectionsCollabsible() {
    const heads = document.querySelectorAll('h2');
    Array.from(heads).forEach(head => {
        head.addEventListener('click', collabseSection)
    })
}

/**
 * @description Handle section collabse on click
 * @param {Event} $event
 */
function collabseSection($event) {
    const content = $event.target.nextElementSibling;
    content.classList.toggle('hidden')
}

/**
 * @description Toggle scroll to top button visibility
 */
function toggleScrollTopButton() {
    window.addEventListener('scroll', ($event) => {
        const mybutton = document.getElementById("scrollTopBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    });
}

/**
 * @description Handle scroll to top button click
 */
function handleScrollTopButtonClick() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    scrollTopBtn.addEventListener('click', scrollToTop);
}

/**
 * @description Scroll to top page
 * @param {Event} $event
 */
function scrollToTop($event) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * @description Build navigation Links
 */
function buildNav() {
    const sections = document.getElementsByTagName('section');
    const navHolder = document.getElementById('navbar__list');
    const fragment = document.createDocumentFragment();
    for (section of sections) {
        const navEl = document.createElement('li');
        const anchorEl = document.createElement('a');
        anchorEl.classList.add('menu__link');
        anchorEl.setAttribute('data-scroll', section.getAttribute('id'));
        anchorEl.addEventListener('click', handleNavLinkClick);
        anchorEl.textContent = section.getAttribute('data-nav');
        navEl.appendChild(anchorEl);
        fragment.appendChild(navEl);
    }
    fragment.querySelector('a').classList.add('menu__link__active');
    navHolder.appendChild(fragment);
}

/**
 * @description Handle navigation Link Click
 */
function handleNavLinkClick($event) {
    const scrollTarget = document.getElementById($event.target.getAttribute('data-scroll'));
    document.querySelector('.menu__link__active').classList.remove('menu__link__active');
    document.querySelector('.your-active-class').classList.remove('your-active-class');
    $event.target.classList.add('menu__link__active');
    scrollTarget.classList.add('your-active-class');
    window.scrollTo({
        top: scrollTarget.offsetTop,
        behavior: 'smooth'
    });
}

/**
 * End Main Functions
 * Begin Events
 *
 */
window.addEventListener('DOMContentLoaded', ($event) => {
    appendSections();
    // Build menu
    buildNav();
    toggleScrollTopButton();
    handleScrollTopButtonClick();
    // Scroll to section on link click
    scrollToTop();
    observeSections();
    makeSectionsCollabsible();
});
callback();
