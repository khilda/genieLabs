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
document.querySelector("#gnbOpen").addEventListener("click", () => {
  document.querySelector(".header-menu").classList.add("is-show");
  document.body.setAttribute("style", "overflow: hidden");
});
document.querySelector("#gnbClose").addEventListener("click", () => {
  document.querySelector(".header-menu").classList.remove("is-show");
  document.body.removeAttribute("style");
});
