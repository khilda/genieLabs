// 메인메뉴
$(document).ready(function () {
  const $1dep = $(".header_nav>li>a");
  const $2dep = $(".header_nav>li>ul");
  // 초기화
  $(".header_nav").on("mouseleave", function (e) {
    $2dep.removeClass("on fix").addClass("off");
  });
  // hover event
  $1dep.on("mouseenter", function (e) {
    $2dep.removeClass("on fix").addClass("off");
    $(this).next().removeClass("off").addClass("on fix");
  });
});

/**
 * Scroll Event
 */
$(window).on("scroll", (evt) => {
  scrollHeader(evt);
});

/**
 * Header Scroll Toggle Class
 */
function scrollHeader(evt) {
  let scrollY = $(this).scrollTop();
  if (scrollY > 600) {
    $("header").addClass("is-scroll");
  } else {
    $("header").removeClass("is-scroll");
  }
}