const visitSwiper = new Swiper('.visit-swiper', {
    // Optional parameters
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 150,
    speed: 500,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false, // отключаем стандартную паузу
      },

    pagination: {
        el: '.visit-swiper_pagination',
        dynamicBullets: true,
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

const visitSwiperEl = document.querySelector('.visit-swiper');
if (visitSwiperEl) {
  let defaultDelay = 3000;
  let hoverDelay = 5000;

  visitSwiperEl.addEventListener('mouseenter', () => {
    visitSwiper.autoplay.stop();
    visitSwiper.params.autoplay.delay = hoverDelay;
    visitSwiper.autoplay.start();
  });

  visitSwiperEl.addEventListener('mouseleave', () => {
    visitSwiper.autoplay.stop();
    visitSwiper.params.autoplay.delay = defaultDelay;
    visitSwiper.autoplay.start();
  });
}

if (document.querySelector('.cases-swiper')) {
  new Swiper('.cases-swiper', {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: false,
    navigation: {
      nextEl: '.cases-swiper .swiper-button-next',
      prevEl: '.cases-swiper .swiper-button-prev',
    },
    pagination: {
      el: '.cases-swiper .swiper-pagination',
      clickable: true,
    },
    allowTouchMove: true,
    simulateTouch: false,
    grabCursor: false,
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',

    slideActiveClass: 'case-slide-active',
    slideVisibleClass: 'case-slide-visible',
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    on: {
      slideChangeTransitionEnd: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('case-slide-active')) {
            slide.style.opacity = '0.5';
          } else {
            slide.style.opacity = '1';
          }
        });
      },
      init: function() {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('case-slide-active')) {
            slide.style.opacity = '0.5';
          } else {
            slide.style.opacity = '1';
          }
        });
      }
    }
  });
}