/**
 * Common Func
 */
document.querySelector("#gnbOpen")?.addEventListener("click", () => {
  document.querySelector(".header-menu").classList.add("is-show");
  document.body.setAttribute("style", "overflow: hidden");
});
document.querySelector("#gnbClose")?.addEventListener("click", () => {
  document.querySelector(".header-menu").classList.remove("is-show");
  document.body.removeAttribute("style");
});
// theme
document.querySelector("#toggleTheme")?.addEventListener("click", (e) => {
  e.target.classList.toggle("toggle");
  document.body.classList.toggle("dark-theme");
});
// card Bookmark
document.querySelectorAll(".card-bookmark")?.forEach((boomark) => {
  boomark.addEventListener("click", (e) => {
    e.stopPropagation();
    e.target.classList.toggle("is-active");
  });
});
