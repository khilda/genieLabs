const swiperParams = {
  moblie: {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 27,
    pagination: {
      enabled: true,
      el: ".swiper-pagination",
      type: "bullets",
    },
    breakpoints: {
      320: {},
      742: {},
      1440: {},
    },
  },
  tablet: {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 40,
    pagination: {
      enabled: true,
      el: ".swiper-pagination",
      type: "bullets",
    },
    breakpoints: {
      320: {},
      742: {},
      1440: {},
    },
  },
  desktop: {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 36,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {},
      742: {},
      1440: {},
    },
  },
};
const swiper = new Swiper("#cardSwiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 27,
  pagination: {
    enabled: true,
    el: ".swiper-pagination",
    type: "bullets",
  },
  breakpoints: {
    742: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 36,
      pagination: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
  },
});
document.querySelector(".gnb-btn").addEventListener("click", () => {
  const headerMenu = document.querySelector(".header-menu");
  if (headerMenu.classList.contains("is-show")) {
    headerMenu.classList.remove("is-show");
    document.body.removeAttribute("style");
  } else {
    headerMenu.classList.add("is-show");
    document.body.setAttribute("style", "overflow: hidden");
  }
});
