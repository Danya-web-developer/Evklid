(function () {
  const burger = document.querySelector('.header__burger');
  let crossburger = document.querySelector('.header__crossbtn')
  let menu = document.querySelector('.header__nav')
  let menuLinks = document.querySelectorAll('.header__link')
  let links = document.querySelectorAll('.work__tab-link')
  let tabs = document.querySelectorAll('.work__swipe')
  let openBtn = document.querySelector('.header__btnopen')
  let searchBtn = document.querySelector('.header__btn')
  let form = document.querySelector('.header__form')
  let closeBtn = document.querySelector('.header__btnclose')

  openBtn.addEventListener('click', (e) => {
    e.preventDefault()
    form.classList.add('active')
  })

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    form.classList.remove('active')
  })

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
  })

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active')
    document.body.classList.toggle('stop-scroll')
  });

  crossburger.addEventListener('click', () => {
    burger.classList.remove('active');
    menu.classList.remove('active')
    document.body.classList.remove('stop-scroll')
  })

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.classList.remove('active')
      document.body.classList.remove('stop-scroll')
    })
  })

  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.header').clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach((each) => {
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 1300);
      });
    });
  };
  scrollTo();

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      let path = e.currentTarget.dataset.path

      links.forEach(link => {
        link.classList.remove('work__tab-link--active')
      })
      e.currentTarget.classList.add('work__tab-link--active')

      tabs.forEach(tab => {
        tab.classList.remove('work__swipe--active')
        if (tab.dataset.target === path) {
          tab.classList.add('work__swipe--active')
        }
      })
    })
  })

  const swiper = new Swiper('.hero__swiper', {
    spaceBetween: 2,
    speed: 700,
    loop: true,
    pagination: {
      el: '.hero__pagination',
      type: 'bullets',
      clickable: true
    }
  })

  new Accordion('.accordion-container')

})()
