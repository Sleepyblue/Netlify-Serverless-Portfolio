'use strict';

window.addEventListener('load', () => {
  document
    .querySelector(':root')
    .style.setProperty('--vh', window.innerHeight / 100 + 'px');
});

///////////////////////////////////////////////////////////
// Global Variables Block
///////////////////////////////////////////////////////////

// +
const pageAbout = document.querySelector('.page__about');
const pageProjects = document.querySelector('.page__projects');
const pageContact = document.querySelector('.page__contact');
const accordionLeaf = document.querySelectorAll('.accordion__leaf');
const midContainer = document.querySelector('.mid__container');
const btnGithub = document.querySelector('.btn__github');
const btnMobileNavigation = document.querySelector('.btn__mobile-navigation');
const navIndicator = document.querySelector('.nav__indicator');
const navIndicatorTimer = document.querySelector('.nav__indicator-timer');
let timercircularProgress = document.querySelector('.timer__circular-progress');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const aside = document.querySelector('.aside');
const asideBtnClose = document.querySelector('.btn__aside-close');
const blackout = document.querySelector('.blackout');

// ~
const contactSection = document.querySelectorAll('.contact__section');
const loaders = document.querySelectorAll('.loader');
const loaderIcon = document.querySelector('.loader__top-icon');
const bubblesTop = document.querySelectorAll('.loader__bubble-top');
const bubblesBot = document.querySelectorAll('.loader__bubble-bot');
const sectionMain = document.querySelector('.main');
const larr = document.querySelector('.larr');
const rarr = document.querySelector('.rarr');
const modal = document.querySelector('.mid__modal');
const slider = document.querySelector('.slider');
let modalState = false;
let menuState = false;
let counter = 0;
let progress;
let progressValue;
let indexFlexPercentage;
let slideGap;
let shownSlides;
let translateAccumulator;
let fixedAccumulator;

let state = {};

const slideData = [
  {
    title: `Responsive Carousel`,
    description: `A simple carousel asset that's both responsive and adaptive for desktop, tablet and mobile`,
    languageOne: `logo-html5`,
    languageTwo: `logo-sass`,
    languageThree: `logo-javascript`,
    codeLink: `https://codepen.io/SleepyBluee/pen/RwMrgRQ`,
    gitLink: `https://github.com/Sleepyblue/Responsive-Carousel`,
  },
  {
    title: `Carousel Slide Transition`,
    description: `A slide transition animation that can be integrated on the slides from the Responsive Carousel`,
    languageOne: `logo-html5`,
    languageTwo: `logo-sass`,
    languageThree: `logo-javascript`,
    codeLink: `https://codepen.io/SleepyBluee/pen/oNqbwME`,
    gitLink: `https://github.com/Sleepyblue/Carousel-Slide-Transition`,
  },
  {
    title: `Navigation Bar`,
    description: `A vertical navigation bar that can be placed either left or right on the screen`,
    languageOne: `logo-html5`,
    languageTwo: `logo-sass`,
    languageThree: `logo-javascript`,
    codeLink: `https://codepen.io/SleepyBluee/pen/qBobjvx`,
    gitLink: `https://github.com/Sleepyblue/Navigation-Bar`,
  },
  {
    title: `Mobile Navigation Bar`,
    description: `A rework of the vertical navigation bar which better suits the mobile layout available space`,
    languageOne: `logo-html5`,
    languageTwo: `logo-sass`,
    languageThree: `logo-javascript`,
    codeLink: `https://codepen.io/SleepyBluee/pen/eYMJEmR`,
    gitLink: `https://github.com/Sleepyblue/Mobile-Navigation-Bar`,
  },
  {
    title: `Page Loader`,
    description: `A simple loader asset to smooth section transitions on a page`,
    languageOne: `logo-html5`,
    languageTwo: `logo-sass`,
    languageThree: `logo-javascript`,
    codeLink: `https://codepen.io/SleepyBluee/pen/xxWZLVj`,
    gitLink: `https://github.com/Sleepyblue/Page-Loader`,
  },
  {
    title: `Heatmap`,
    description: `An attempt to rebuild a personalized heatmap from the github graphQL API`,
    languageOne: `logo-html5`,
    languageTwo: `logo-sass`,
    languageThree: `logo-javascript`,
    codeLink: `https://codepen.io/SleepyBluee/pen/LYdGWOq`,
    gitLink: `https://github.com/Sleepyblue/Heatmap-Github-GraphQL-API`,
  },
  {
    title: `Modal Window`,
    description: `A popup modal window to display the carousel slides info on the mobile layout`,
    languageOne: `logo-html5`,
    languageTwo: `logo-sass`,
    languageThree: `logo-javascript`,
    codeLink: `https://github.com/Sleepyblue/Modal-Window`,
    gitLink: `https://codepen.io/SleepyBluee/pen/PoRZKpo`,
  },
];

///////////////////////////////////////////////////////////
// Markdown Block
///////////////////////////////////////////////////////////

const createSlide = function () {
  slider.innerHTML = '';

  slideData.forEach((entry) => {
    const markup = `
    <article class="slide">
      <div class="slide__cover" data-cover="${entry.title}">
        <div class="slide__arrow-absolute">
          <ion-icon name="caret-up"></ion-icon>
        </div>
        <div class="slide__content">
          <h2 class="slide__title">
                <span>
                  ${entry.title}
                  </span>
          </h2>
          <div class="slide__arrow">
          </div>
          <p class="slide__description">
            <span>
              ${entry.description}
            </span>
          </p>
          <div class="slide__languages">
            <div class="slide__icon">
              <ion-icon name="${entry.languageOne}"></ion-icon>
            </div>
            <div class="slide__icon">
              <ion-icon name="${entry.languageTwo}"></ion-icon>
            </div>
            <div class="slide__icon">
              <ion-icon name="${entry.languageThree}"></ion-icon>
            </div>
          </div>
          <div class="slide__links">
            <a class="slide__link" href="${entry.codeLink}" target="_blank">
            <ion-icon name="logo-codepen"></ion-icon>
            </a>
            <a class="slide__link" href="${entry.gitLink}" target="_blank">
            <ion-icon name="logo-github"></ion-icon>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
    slider.insertAdjacentHTML('beforeend', markup);
  });
};

const createModal = function (e) {
  const title = e.target.querySelector('.slide__title span').textContent;
  const description = e.target.querySelector(
    '.slide__description span'
  ).textContent;
  const link = e.target.querySelectorAll('.slide__link');

  const modalMarkup = `
  <div class="modal__btn"></div>
  <h2 class="modal__title">
    <span>${title}</span>
  </h2>
  <p class="modal__description">
    <span>${description}</span>
  </p>
  <div class="modal__languages">
    <div class="modal__icon">
      <ion-icon name="logo-html5"></ion-icon>
    </div>
    <div class="modal__icon">
      <ion-icon name="logo-sass"></ion-icon>
    </div>
    <div class="modal__icon">
      <ion-icon name="logo-javascript"></ion-icon>
    </div>
  </div>
  <div class="modal__links">
    <a class="modal__link" href="${link[0]}" target="_blank">
      <ion-icon name="logo-codepen"></ion-icon>
    </a>
    <a class="modal__link" href="${link[1]}" target="_blank">
     <ion-icon name="logo-github"></ion-icon>
    </a>
  </div>
  `;

  modal.innerHTML = '';
  modal.insertAdjacentHTML('afterbegin', modalMarkup);
};

const showCarouselBtns = function (e, section = undefined) {
  const navList = document.querySelector('.nav__list');
  const btnCarousel = document.querySelector('.btn__carousel');
  let data;

  if (section === undefined) data = e.target.dataset.link;
  else data = navList.querySelector(`[data-link=${section}]`).dataset.link;

  if (window.innerWidth > 700 && window.innerHeight > 460) {
    data === 'projects'
      ? (btnCarousel.style.marginBottom = '0%')
      : (btnCarousel.style.marginBottom = '-35%');
    data === 'projects'
      ? (btnCarousel.style.transitionDelay = '3s')
      : (btnCarousel.style.transitionDelay = '0s');
    data === 'projects'
      ? (btnCarousel.style.opacity = '1')
      : (btnCarousel.style.opacity = '0');
    data === 'projects'
      ? (btnCarousel.style.pointerEvents = 'all')
      : (btnCarousel.style.pointerEvents = 'none');

    return;
  }

  if (window.innerWidth <= 700 && window.innerHeight > 460) {
    data === 'projects'
      ? (btnCarousel.style.marginTop = '-16rem')
      : (btnCarousel.style.marginTop = '-28rem');
    data === 'projects'
      ? (btnCarousel.style.transitionDelay = '3s')
      : (btnCarousel.style.transitionDelay = '0s');
    data === 'projects'
      ? (btnCarousel.style.pointerEvents = 'all')
      : (btnCarousel.style.pointerEvents = 'none');

    return;
  }

  if (window.innerHeight < 460) {
    data === 'projects'
      ? (btnCarousel.style.marginTop = '-8rem')
      : (btnCarousel.style.marginTop = '-20rem');
    data === 'projects'
      ? (btnCarousel.style.transitionDelay = '3s')
      : (btnCarousel.style.transitionDelay = '0s');
    data === 'projects'
      ? (btnCarousel.style.pointerEvents = 'all')
      : (btnCarousel.style.pointerEvents = 'none');

    return;
  }
};

const moveGoo = async function (e, section = undefined, fix = undefined) {
  const navList = document.querySelector('.nav__list');
  let svg;

  if (section === undefined) svg = e.target.querySelector('.nav__link-icon');
  else svg = navList.querySelector(`[data-link=${section}]`);

  let svgPosition =
    window.innerWidth > 700 || window.innerHeight < 601
      ? svg.getBoundingClientRect().top
      : svg.getBoundingClientRect().left;

  let svgHeight = svg.getBoundingClientRect().height;

  if (window.innerWidth < 600 && fix !== undefined)
    svgHeight = svg.getBoundingClientRect().height + fix;

  let gooPosition = `${svgPosition + svgHeight / 2}px`;

  if (window.innerWidth > 700 || window.innerHeight < 601) {
    navIndicator.style.top = gooPosition;
  } else if (window.innerWidth <= 700) {
    navIndicator.style.left = gooPosition;
  }
};

///////////////////////////////////////////////////////////
// State Control Block
///////////////////////////////////////////////////////////

const stateInit = function () {
  const stateCheck = JSON.parse(localStorage.getItem('state'));
  stateCheck ? stateHandler(true) : stateDefault();
};

const stateDefault = function () {
  console.log('Running Initializer');

  themeStateControl(true);
  navigationLinkControl(undefined, undefined, true);
  pageStateControl(undefined, true);
  accordionStateControl(undefined, true);
  contactsStateControl(undefined, true);
  carouselStateControl(undefined, true);

  localStorage.setItem('state', JSON.stringify(state));
};

const stateHandler = function (reload = undefined) {
  console.log('Running Handler');
  state = JSON.parse(localStorage.getItem('state'));

  themeStateControl();
  pageStateControl(reload);
  accordionStateControl();
  contactsStateControl();
  carouselStateControl(true);
  navigationLinkControl(undefined, true, false);

  if (!reload) return;
  window.addEventListener('load', function () {
    let fix = window.innerWidth / 3.52;
    moveGoo(undefined, state.page, fix);
  });

  showCarouselBtns(undefined, state.page);
};

const themeStateControl = function (init = false) {
  if (init) state.theme = 'light';

  const btnLight = document.querySelector('.btn__light');
  const btnDark = document.querySelector('.btn__dark');

  if (state.theme === 'light') {
    document.body.classList.remove('dark-theme');
    btnLight.classList.add('active');
    btnDark.classList.remove('active');
  }

  if (state.theme === 'dark') {
    document.body.classList.add('dark-theme');
    btnLight.classList.remove('active');
    btnDark.classList.add('active');
  }
};

const navigationLinkControl = function (e, reload = undefined, init = false) {
  if (init) {
    state.page = 'projects';
    navLinks.forEach((link) =>
      link.dataset.link === state.page ? link.classList.add('select') : ''
    );
    return;
  }

  if (reload) {
    navLinks.forEach((link) =>
      link.dataset.link === state.page ? link.classList.add('select') : ''
    );

    return;
  }

  e.target.classList.add('select');
  navLinks.forEach((el) => {
    el !== e.target ? el.classList.remove('select') : '';
  });
};

const pageStateControl = function (reload = undefined, init = false) {
  const pageContainer = document.querySelectorAll('.page__container');

  if (init) {
    state.page = 'projects';

    pageContainer.forEach((container) => {
      container.style.transitionDelay = `unset`;
      setTimeout(function () {
        container.style.removeProperty(`transition-delay`);
      }, 500);

      container.dataset.page === state.page
        ? container.classList.add('page--show')
        : container.classList.add('page--hide');
    });

    return;
  }

  pageContainer.forEach((container) => {
    if (reload) {
      container.style.transitionDelay = `unset`;
      setTimeout(function () {
        container.style.removeProperty(`transition-delay`);
      }, 500);
    }

    if (container.dataset.page === state.page) {
      container.classList.remove('page--hide');
      container.classList.add('page--show');
    }

    if (container.dataset.page !== state.page) {
      container.classList.remove('page--show');
      container.classList.add('page--hide');
    }
  });
};

const accordionStateControl = function (target, init = false) {
  if (init) {
    state.accordion = 'about';
    accordionLeaf.forEach((leaf) => {
      if (leaf.dataset.leaf === state.accordion) leaf.classList.add('active');
    });

    return;
  }

  accordionLeaf.forEach((leaf) => {
    if (pageAbout.classList.contains('page--hide')) {
      setTimeout(function () {
        accordionLeaf.forEach((leaf) => {
          leaf.dataset.leaf === state.accordion
            ? leaf.classList.add('active')
            : leaf.classList.remove('active');
        });
        state.accordion = 'about';
        localStorage.setItem('state', JSON.stringify(state));
      }, 1000);

      return;
    }

    if (leaf.dataset.leaf === state.accordion && !target)
      leaf.classList.add('active');
  });

  if (!target) return;
  state.accordion = target.dataset.leaf;
  localStorage.setItem('state', JSON.stringify(state));
};

const contactsStateControl = function (target, init = false) {
  if (init) {
    state.contact = '';
    return;
  }

  contactSection.forEach((section) => {
    if (pageContact.classList.contains('page--hide')) {
      setTimeout(function () {
        contactSection.forEach((section) => {
          section.classList.remove('move');
        });
        state.contact = '';
        localStorage.setItem('state', JSON.stringify(state));
      }, 1000);

      return;
    }

    if (section.dataset.contact === state.contact && !target)
      section.classList.add('move');
  });

  if (!target) return;

  state.contact === target.parentNode.dataset.contact
    ? (state.contact = '')
    : (state.contact = target.parentNode.dataset.contact);
  localStorage.setItem('state', JSON.stringify(state));
};

const carouselStateControl = function (reload, init = false) {
  if (init) {
    translateAccumulator = 0;
    state.translation = fixedAccumulator;
    return;
  }

  if (pageProjects.classList.contains('page--hide')) {
    setTimeout(function () {
      translateAccumulator = 0;
      state.translation = translateAccumulator;
      localStorage.setItem('state', JSON.stringify(state));

      slider.style.transform = `translate${
        window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
      }(${translateAccumulator}% )`;
    }, 1000);

    return;
  }

  if (reload) {
    translateAccumulator = state.translation;
    slider.style.transform = `translate${
      window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
    }(${translateAccumulator}% )`;
    return;
  }

  state.translation = fixedAccumulator;
  localStorage.setItem('state', JSON.stringify(state));
};

stateInit();
createSlide();

const slides = document.querySelectorAll('.slide');
const slide = document.querySelector('.slide');
const slideCover = document.querySelectorAll('.slide__cover');

const dynamicSlidesVariables = function () {
  let translate;
  let maxTranslate;

  if (window.innerWidth > 1300) {
    [translate, maxTranslate] = styleSlides(4, 75, 1.6);
  } else if (window.innerWidth <= 1300 && window.innerWidth > 920) {
    [translate, maxTranslate] = styleSlides(3, 75, 1.75);
  } else if (window.innerWidth <= 920 && window.innerWidth > 700) {
    [translate, maxTranslate] = styleSlides(2, 75, 2);
  } else if (window.innerWidth <= 920 && window.innerHeight <= 600) {
    [translate, maxTranslate] = styleSlides(2, 75, 2);
  } else if (window.innerWidth <= 700) {
    [translate, maxTranslate] = styleSlides(3, 31, 1.75);
  }

  return [translate, maxTranslate];
};

const styleSlides = function (shownSlides, slideHeight, slideGap) {
  const slideWidth = (100 - slideGap * (shownSlides + 1)) / shownSlides;

  window.innerWidth > 700 ||
  (window.innerWidth <= 920 && window.innerHeight <= 600)
    ? slides.forEach((slide) => {
        slide.style.width = `${slideWidth}%`;
      })
    : slides.forEach((slide) => {
        slide.style.width = `95%`;
      });

  slides.forEach((slide) => {
    slide.style.height = `${slideHeight}%`;
  });

  const marginTop = mobileFirstChildMargin(slideGap);
  window.innerWidth > 700
    ? (slides[0].style.marginLeft = `${slideGap}%`)
    : (slides[0].style.marginTop = `${marginTop}px`);

  slider.style.gap = `${slideGap}%`;

  return [
    slideGap + slideWidth,
    -(slideGap + slideWidth) * (slideData.length - shownSlides),
  ];
};

const mobileFirstChildMargin = function (slideGap) {
  if (window.innerWidth > 700) return;
  return (slider.clientHeight * slideGap) / 100;
};

let translate = dynamicSlidesVariables()[0];
let maxTranslate = dynamicSlidesVariables()[1];

window.addEventListener('resize', function () {
  dynamicSlidesVariables();
  state.translation = 0;
  localStorage.setItem('state', JSON.stringify(state));
  this.location.reload();
});

const fixAccumulator = function () {
  fixedAccumulator = Number(translateAccumulator.toFixed(2));
};

const moveCarousel = function (e, mobile) {
  fixAccumulator();

  //////////////// TESTING

  // if (mobile) {
  //   if (fixedAccumulator === 0 && swipe.start < swipe.end) {
  //     state.translation = fixedAccumulator;
  //     localStorage.setItem('state', JSON.stringify(state));
  //     return;
  //   } else if (
  //     fixedAccumulator === Number(maxTranslate.toFixed(2)) &&
  //     swipe.start > swipe.end
  //   ) {
  //     state.translation = fixedAccumulator;
  //     localStorage.setItem('state', JSON.stringify(state));
  //     return;
  //   }
  // }

  // if (swipe.start < swipe.end) {
  //   slider.style.transform = `translate${
  //     window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
  //   }(${translateAccumulator}%)`;
  //   translateAccumulator += translate;
  //   fixAccumulator();
  //   return;
  // } else if (swipe.start > swipe.end) {
  //   slider.style.transform = `translate${
  //     window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
  //   }(${translateAccumulator}% )`;
  //   translateAccumulator -= translate;
  //   fixAccumulator();
  //   return;
  // }
  ////////////////////////

  if (fixedAccumulator === 0 && e.target.id === 'larr') {
    state.translation = fixedAccumulator;
    localStorage.setItem('state', JSON.stringify(state));
    return;
  } else if (
    fixedAccumulator === Number(maxTranslate.toFixed(2)) &&
    e.target.id === 'rarr'
  ) {
    state.translation = fixedAccumulator;
    localStorage.setItem('state', JSON.stringify(state));
    return;
  }

  if (e.target.id === 'larr') {
    slider.style.transform = `translate${
      window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
    }(${translateAccumulator}%)`;
    translateAccumulator += translate;
    fixAccumulator();
  } else if (e.target.id === 'rarr') {
    slider.style.transform = `translate${
      window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
    }(${translateAccumulator}% )`;
    translateAccumulator -= translate;
    fixAccumulator();
  }

  slider.style.transform = `translate${
    window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
  }(${translateAccumulator}% )`;
  fixAccumulator();

  state.translation = fixedAccumulator;
  localStorage.setItem('state', JSON.stringify(state));
};

dynamicSlidesVariables();

const noPointerEvents = function () {
  if (fixedAccumulator === 0 || fixedAccumulator === -maxTranslate) {
    btns.forEach(function (i) {
      i.classList.add('btn__no--events');
      setTimeout(function () {
        i.classList.remove('btn__no--events');
      }, 500);
    });
  } else {
    btns.forEach(function (i) {
      i.classList.add('btn__no--events');
      setTimeout(function () {
        i.classList.remove('btn__no--events');
      }, 250);
    });
  }
};

nav.addEventListener('click', function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  // counter += 1;
  // if (counter > 1) {
  //   counter = 0;
  //   return;
  // }

  if (!e.target.classList.contains('select')) noPointerEventsNav(e);

  moveGoo(e);
  navigationLinkControl(e);
  showSection(e);
  showCarouselBtns(e);
  closeModal();
  if (window.innerWidth <= 700 && window.innerHeight > 450) {
    resetTimer();
    showTimer();
  }
  stateHandler();
});

btnMobileNavigation.addEventListener('click', (e) => {
  if (!menuState) {
    mobileMenuOpen();
    showTimer();
  } else {
    mobileMenuClose();
    resetTimer();
    hideTimer();
  }
});

navIndicatorTimer.addEventListener('click', (e) => {
  mobileMenuClose();
  hideTimer();
  resetTimer();
});

slides.forEach((slide) => {
  slide.addEventListener('click', (e) => {
    if (window.innerWidth > 700 && window.innerHeight > 600) {
      if (!slideState) return openSlide(e, slide);

      if (slide != previousSlide) {
        closeSlide(e, previousSlide);
        openSlide(e, slide);
        return;
      }

      let arr = e.currentTarget.querySelector('.slide__arrow');
      if (e.target === arr) return closeSlide(e, slide);
    }

    if (window.innerWidth < 701 || window.innerHeight < 601) {
      openModal(e);
    }
  });
});

larr.addEventListener('click', (e) => {
  noPointerEvents();
  resetStylings();
  if (slideState) closeSlide(e, previousSlide);
  if (modalState) closeModal();
  moveCarousel(e, 'bounceLeft', 'bounceTop');
});

rarr.addEventListener('click', (e) => {
  noPointerEvents();
  resetStylings();
  if (slideState) closeSlide(e, previousSlide);
  if (modalState) closeModal();
  moveCarousel(e, 'bounceRight', 'bounceDown');
});

const noPointerEventsNav = function (e) {
  navLinks.forEach((el) => {
    if (el != e.target) {
      el.classList.add('nav__link--noclick');
      setTimeout(function () {
        el.classList.remove('nav__link--noclick');
      }, 3050);
    }
  });
};

const showSection = function (e) {
  let slideData = e.target.dataset.link;
  const pageContainer = document.querySelectorAll('.page__container');

  pageContainer.forEach((el) => {
    if (el.dataset.page === slideData && el.classList.contains('page--hide'))
      if (el.dataset.page === slideData) {
        sectionTransition();

        el.classList.remove('page--hide');
        el.classList.add('page--show');
      }

    if (el.dataset.page != slideData) {
      el.classList.remove('page--show');
      el.classList.add('page--hide');
    }
  });

  state.page = slideData;
  localStorage.setItem('state', JSON.stringify(state));
};

const sectionTransition = function () {
  loaders.forEach((loader) => {
    const bubbles = loader.querySelectorAll('.loader__bubble');
    const square = loader.querySelectorAll('.loader__square');

    loaderIcon.classList.add('loader--show');
    loader.style.overflow = 'visible';
    loader.classList.add('loader--transition');
    square.forEach((square) => square.classList.add('loader--show'));

    if (loader.classList.contains('loader__top')) {
      loader.style.borderBottom = `4px solid var(--bg)`;
      bubbles.forEach((bubble) => bubble.classList.add('loader--bubbles-top'));
    }

    if (loader.classList.contains('loader__bot')) {
      loader.style.borderTop = `4px solid var(--bg)`;
      bubbles.forEach((bubble) => bubble.classList.add('loader--bubbles-bot'));
    }

    setTimeout(function () {
      loader.style.overflow = 'hidden';
      loader.style.border = 'none';

      loaderIcon.classList.remove('loader--show');
      square.forEach((square) => square.classList.remove('loader--show'));
      loader.classList.remove('loader--transition');
      loader.classList.remove('loader__top--border', 'loader__bot--border');

      bubbles.forEach((bubble) =>
        bubble.classList.remove('loader--bubbles-top', 'loader--bubbles-bot')
      );
    }, 3000);
  });
};

const mobileMenuOpen = function () {
  btnMobileNavigation.style.transform = `translate(-100%, 50%)`;
  btnGithub.style.transform = `translate(100%, 50%)`;
  midContainer.classList.add('inner__shadow--mobile');
  nav.classList.add('nav--mobile');
  navIndicatorTimer.classList.add('open');
  menuState = true;
};

const mobileMenuClose = function () {
  btnMobileNavigation.style.transform = `translate(-50%, 50%)`;
  btnGithub.style.transform = `translate(50%, 50%)`;
  midContainer.classList.remove('inner__shadow--mobile');
  nav.classList.remove('nav--mobile');

  navIndicatorTimer.classList.remove('open');
  menuState = false;
};

const showTimer = function () {
  progressValue = 0;
  let progressEnd = 360;
  let progressSpeed = 1000;
  timercircularProgress.style.opacity = `1`;

  progress = setInterval(() => {
    progressValue += 45;
    timercircularProgress.style.background = `conic-gradient(
      var(--acc2) ${progressValue * 1}deg,
      var(--acc1) ${progressValue * 1}deg
    )`;

    if (progressValue === progressEnd) {
      hideTimer();
      resetTimer();
      mobileMenuClose();
    }
  }, progressSpeed);
};

const resetTimer = function () {
  progressValue = 0;
  timercircularProgress.style.background = `conic-gradient(
    var(--acc2) 0deg,
    var(--acc1) 0deg
    )`;
  clearInterval(progress);
};

resetTimer();

const hideTimer = function () {
  timercircularProgress.style.opacity = `0`;
};

const btns = document.querySelectorAll('.btn');

const flexSlideFirstChild = document.querySelector('.slide:first-child');

const resetStylings = function () {
  const arrowAll = document.querySelectorAll('.slide__arrow-svg');
  arrowAll.forEach((arrow) => arrow.classList.remove('slide__arrow--rotate'));

  slider.classList.add('slider--hover');

  slideCover.forEach((con) => {
    con.classList.remove('project__slide--content');
  });

  slides.forEach((slide) => {
    slide.classList.remove('slide__opacity');
    slide.classList.remove('project__slide--click');
  });
};

let slideState = false;
let previousSlide;

const openSlide = async function (e, slide) {
  previousSlide = slide;
  e.target.classList.add('open');
  slideState = true;
};

const closeSlide = function async(e, slide) {
  let svg;
  if (e.target != slide) {
    svg = previousSlide.querySelector('.slide__arrow-absolute ion-icon');
  } else {
    svg = e.currentTarget.querySelector('.slide__arrow-absolute ion-icon');
  }

  svg.style.transitionDelay = '0.2s';
  setTimeout(() => (svg.style.transitionDelay = '0s'), 200);
  slide.classList.remove('open');
  slideState = false;
};

const openModal = function (e) {
  createModal(e);
  modal.classList.add('open');
  modalState = true;
  console.log('called');
};

const closeModal = function () {
  modal.classList.remove('open');
  modalState = false;
};

modal.addEventListener('click', function (e) {
  let modalBtn = e.currentTarget.querySelector('.modal__btn');

  if (e.target != modalBtn) return;
  closeModal();
});

const btnTheme = document.querySelector('.btn__theme');

const btnThemeIconToggle = function (e) {
  const btnLight = e.target.querySelector('.btn__light');
  const btnDark = e.target.querySelector('.btn__dark');

  btnLight.classList.toggle('active');
  btnDark.classList.toggle('active');

  e.target.style.backgroundColor = `var(--bg)`;
};

const themeToggle = function (e) {
  document.body.classList.toggle('dark-theme');

  state.theme === 'light' ? (state.theme = 'dark') : (state.theme = 'light');

  localStorage.setItem('state', JSON.stringify(state));
};

btnTheme.addEventListener('click', (e) => {
  btnThemeIconToggle(e);
  themeToggle();
});

const contributionGraph = async function (e) {
  const url = '/.netlify/functions/index';
  const dataStream = await fetch(url);
  const dataPromise = dataStream.json();
  const data = await dataPromise;

  console.log(data);

  const totalContributions =
    data.user.contributionsCollection.contributionCalendar.totalContributions;

  const contributionsHeader = document.querySelector(
    '.heat__contributions-header'
  );

  contributionsHeader.textContent = `${totalContributions} contributions `;
  const dataLength =
    data.user.contributionsCollection.contributionCalendar.weeks.length;

  const currentWeek =
    data.user.contributionsCollection.contributionCalendar.weeks[
      dataLength - 1
    ];

  const weekLength = currentWeek.contributionDays.length;

  const currentDay = currentWeek.contributionDays[weekLength - 1];

  const currentDate = new Date(currentDay.date);

  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

  const monthHeader = document.querySelector('.heat__month-header');
  monthHeader.textContent = currentMonth;

  let weekArr = [];

  const extractWeeks =
    data.user.contributionsCollection.contributionCalendar.weeks
      .slice(-5)
      .map((week) => week.contributionDays)
      .forEach((cday) => weekArr.push(...cday));

  const heatmapContainer = document.querySelector('.heatmap__container');
  heatmapContainer.innerHTML = '';

  weekArr.forEach((day) => {
    const contributionMonth = new Date(day.date).getMonth();
    const currentMonth = new Date().getMonth();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const markdown = `
    <div class="heat__box heat__${
      contributionMonth === currentMonth ? 'current' : 'past'
    }" data-contributions="${day.contributionCount}" data-date="${day.date}">
      <div class="heat__modal">
        <p>${day.contributionCount} contributions on ${new Intl.DateTimeFormat(
      'en-GB',
      options
    ).format(new Date(day.date))}</p>
      </div>
    </div>
    `;

    heatmapContainer.insertAdjacentHTML('beforeend', markdown);
  });
};

const graphColouring = async function () {
  await contributionGraph();

  const heatBox = document.querySelectorAll('.heat__box');

  heatBox.forEach((box) => {
    if (+box.dataset.contributions === 1) box.classList.add('heat__1');
    if (+box.dataset.contributions === 2) box.classList.add('heat__2');
    if (+box.dataset.contributions === 3) box.classList.add('heat__3');
    if (+box.dataset.contributions >= 4) box.classList.add('heat__4');
  });
};

graphColouring();

const asideGoo = document.querySelector('.aside__goo');
const asideHeatGoo = document.querySelector('.aside__heatmap-goo');
const asideGooContainer = document.querySelector('.aside__goo-container');
const asideContainer = document.querySelector('.aside__container');
const asideGooBox = document.querySelector('.aside__goo-box');
const githubLogo = document.querySelector('.goo__github');
const codepenLogo = document.querySelector('.goo__codepen');

asideGoo.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  asideContainer.classList.toggle('moveup');
  asideGooContainer.style.display = 'none';

  setTimeout(function () {
    asideGooContainer.style.display = 'flex';
    asideGooBox.classList.toggle('color__goo-box');
    asideGooContainer.classList.toggle('rotate__goo-up');
    asideGooContainer
      .querySelector('.aside__heatmap-goo--path')
      .classList.toggle('goo-fill--up');
  }, 500);

  setTimeout(function () {
    asideGooContainer.classList.toggle('top__goo-up');
    codepenLogo.style.display = `block`;
    githubLogo.style.display = `none`;
  }, 1000);

  if (!asideContainer.classList.contains('moveup')) {
    asideGooContainer.classList.toggle('rotate__goo-down');
    asideGooContainer
      .querySelector('.aside__heatmap-goo--path')
      .classList.toggle('goo-fill--down');

    setTimeout(function () {
      asideGooContainer.classList.toggle('rotate__goo-down');
      asideGooContainer.classList.toggle('bottom__goo-down');
    }, 500);

    setTimeout(function () {
      codepenLogo.style.display = `none`;
      githubLogo.style.display = `block`;
      asideGooContainer
        .querySelector('.aside__heatmap-goo--path')
        .classList.toggle('goo-fill--down');
      asideGooContainer.classList.toggle('bottom__goo-down');
    }, 1000);
  }
});

[btnGithub, asideBtnClose, blackout].forEach((el) => {
  el.addEventListener('click', (e) => {
    aside.classList.toggle('active');
    blackout.classList.toggle('active');
  });
});

const aboutAccordion = document.querySelector('.about__accordion');

aboutAccordion.addEventListener('click', function (e) {
  accordionHandler(e);
});

const accordionHandler = function (e) {
  if (e.target === aboutAccordion) return;

  accordionLeaf.forEach((leaf) => {
    leaf.classList.remove('active');
  });

  e.target.classList.add('active');
  accordionStateControl(e.target);
};

const contactSquares = document.querySelectorAll('.contact__square');

pageContact.addEventListener('click', function (e) {
  if (!e.target.classList.contains('contact__square')) return;

  if (e.target.parentNode.classList.contains('move')) {
    e.target.parentNode.classList.toggle('move');
    contactsStateControl(e.target);
    return;
  }

  contactSection.forEach((section) => {
    section.classList.remove('move');
  });

  e.target.parentNode.classList.toggle('move');

  contactsStateControl(e.target);
});

const copyButton = document.querySelector('.contact__holder-clip');
const copyButtonPseudo = window.getComputedStyle(copyButton, '::before');
const mailText = copyButtonPseudo.content;

const copyTextToClipBoard = function (text) {
  let slicedText = text.slice(1, text.length - 1);
  navigator.clipboard.writeText(slicedText);
};

copyButton.addEventListener('click', function (e) {
  copyTextToClipBoard(mailText);
});
