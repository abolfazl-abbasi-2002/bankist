'use strict';

// Modal

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

//btns
const sec1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const navul = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('.nav__link');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnscrollTo = document.querySelector('.btn--scroll-to');
const optabBtn = document.querySelectorAll('.operations__tab');
const optabCon = document.querySelectorAll('.operations__content');
const opContainer = document.querySelector('.operations__tab-container');
const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');
const dotCon = document.querySelector('.dots');

// modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// cookie-message
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.after(message);
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.parentElement.removeChild(message);
});

// btn scroll to
btnscrollTo.addEventListener('click', () => {
  const sec1coord = sec1.getBoundingClientRect();
  // 1

  // window.scrollTo({
  //   left: sec1coord.left + window.pageXOffset,
  //   top: sec1coord.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // 2
  sec1.scrollIntoView({ behavior: 'smooth' });
});

// navigaition

// navLink.forEach(el => {
//   el.addEventListener('click', e => {
//     e.preventDefault();
//     const id = el.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

navul.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// operations
// 1
optabBtn.forEach((el, i) => {
  el.addEventListener('click', () => {
    removeclass();
    el.classList.add('operations__tab--active');
    optabCon[i].classList.add('operations__content--active');
  });
});
const removeclass = function () {
  optabBtn.forEach((el, i) => {
    el.classList.remove('operations__tab--active');
    optabCon[i].classList.remove('operations__content--active');
  });
};
// 2
// opContainer.addEventListener('click', e => {
//   const click = e.target.closest('.operations__tab');
//   if (!click) return;

//   optabBtn.forEach(t => {
//     t.classList.remove('operations__tab--active');
//   });
//   optabCon.forEach(t => {
//     t.classList.remove('operations__content--active');
//   });

//   click.classList.add('operations__tab--active');
//   document
//     .querySelector(`.operations__content--${click.dataset.tab}`).classList.add('operations__content--active');
// });

// hover nav
nav.addEventListener('mouseover', function (e) {
  const link = e.target;
  hover(0.5, link);
});

nav.addEventListener('mouseout', function (e) {
  const link = e.target;
  hover(1, link);
});

const hover = function (op, link) {
  if (link.classList.contains('nav__link')) {
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = op;

      logo.style.opacity = op;
    });
  }
};

// sticky nav
// 1
// const initiolcoord=sec1.getBoundingClientRect()
// window.addEventListener("scroll",()=>{
//   if(window.scrollY > initiolcoord.top) nav.classList.add("sticky")
//   if(window.scrollY < initiolcoord.top) nav.classList.remove("sticky")
// })
// 2 sticky nav api

const navh = nav.getBoundingClientRect().height;
const obsCall = function (en) {
  const [entry] = en;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerobserver = new IntersectionObserver(obsCall, {
  root: null,
  threhold: 0,
  rootMargin: `-${navh}px`,
});
headerobserver.observe(header);

// reserv section

const allSections = document.querySelectorAll('.section');

const revealSection = function (entry, observ) {
  const [current] = entry;

  if (!current.isIntersecting) return;
  current.target.classList.remove('section--hidden');
  observ.unobserve(current.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading image

const allimage = document.querySelectorAll('.features__img');

const revealimg = function (entry, observ) {
  const [current] = entry;
  if (!current.isIntersecting) return;
  current.target.src = current.target.dataset.src;

  current.target.addEventListener('load', () =>
    current.target.classList.remove('lazy-img')
  );
  observ.unobserve(current.target);
};
const imageObserver = new IntersectionObserver(revealimg, {
  root: null,
  threshold: 0.1,
  rootMargin: '-200px',
});

allimage.forEach(img => imageObserver.observe(img));

// slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();

//////////////////////////////////\\\\///////////////
//////////////////////////////////\\\//////////////
/////////////////////////////////\\\\\\//////////////

// const h1 = document.querySelector('.header__title');

// const ff = function (e) {
//   alert('helloooo');
// };

// h1.addEventListener('click', ff);
// setTimeout(() => h1.removeEventListener('click', ff), 3000);

// const nav = document.querySelector('.nav__link');
// const random = num => {
//   return Math.trunc(Math.random() * num) + 1;
// };
// const rgb = () => `rgb(${random(255)},${random(255)},${random(255)})`;
// nav.addEventListener('click', function () {
//   this.style.backgroundColor = rgb();
// });
