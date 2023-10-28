// 메인메뉴
$(document).ready(function () {
  const $header = $("header");
  const $1dep = $(".header_nav>li>a");
  const $2dep = $(".header_nav>li>ul");
  // 초기화
  $(".header_nav").on("mouseleave", function (e) {
    $2dep.removeClass("on fix").addClass("off");
  });
  // header event
  $1dep.on("click mouseenter", function (e) {
    const $header = $("header");
    const $subMenu = $(this).next();
    const $siblings = $(this).parent("li").siblings("li").children("ul");

    // tablet&mobile일때 mouseEnter 이벤트 해제
    if (e.type === "mouseenter" && $header.hasClass("is-open")) return;

    if ($header.hasClass("is-open")) {
      // click
      $siblings.removeClass("on fix").addClass("off");
      if ($subMenu.hasClass("off")) {
        $subMenu.removeClass("off").addClass("on fix");
      } else {
        $subMenu.removeClass("on fix").addClass("off");
      }
    } else {
      // mouseenter
      $2dep.removeClass("on fix").addClass("off");
      $subMenu.removeClass("off").addClass("on fix");
    }
  });

  // mobile menu
  $(".openCloseMenu").on("click", function (e) {
    if ($header.hasClass("is-open")) {
      $header.removeClass("is-open");
      $("body").removeAttr("style");
    } else {
      $header.addClass("is-open");
      $("body").attr("style", "overflow:hidden");
    }
  });
});

/**
 * window Event
 */
$(window).on({
  scroll: function (e) {
    let scrollY = $(this).scrollTop();
    if (scrollY > 600) {
      $("header").addClass("is-scroll");
    } else {
      $("header").removeClass("is-scroll");
    }
  },
  resize: function (e) {
    if (window.innerWidth >= 1440) {
      $("header").removeClass("is-open");
    }
  },
});
