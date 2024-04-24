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

