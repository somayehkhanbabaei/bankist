'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=> btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', function(e) {

  section1.scrollIntoView({behavior: 'smooth'})
})


// page navigation //

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     })
//   })
// })

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior:'smooth'
    })
  }
})


// Tabbed component 

const tabsContainer = document.querySelector('.operations__tab-container')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab') /* closest parent base to what i write in ()*/
  if(!clicked) return;

  tabsContent.forEach(c=> c.classList.remove('operations__content--active'))

  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  document.querySelector
    (`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
})



// Menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function(e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', function(e) {
  handleHover(e, .5)
})

nav.addEventListener('mouseout', function(e) {
  handleHover(e, 1)
})

// nav.addEventListener('mouseover', handleHover.bind( 0.5))
// nav.addEventListener('mouseout', handleHover.bind(1))


// Sticky navigation

// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function() {
//   if(window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky')
//   }
// })

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries
  if(!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}

const headerObserver = new IntersectionObserver(
  stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
  }
)

headerObserver.observe(header)


// Reveal sections

const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(
  revealSection, {
    root: null,
    threshold: 0.15
  }
)

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})


// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img')
  });

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))