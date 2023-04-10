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
// tab
document.querySelectorAll(".tab-container")?.forEach((tab) => {
  const tabButtons = Array.from(tab.querySelector(".tab-header").children);
  const tabItems = Array.from(tab.querySelector(".tab-content").children);
  tabButtons.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
      // init
      tabButtons.forEach((b) => b.classList.remove("is-active"));
      tabItems.forEach((t) => t.classList.remove("is-active"));
      // select click item
      e.target.classList.add("is-active");
      tabItems[idx]?.classList.add("is-active");
    });
  });
});
// comment
const commentItems = document.querySelectorAll(".cmt-container");
commentItems?.forEach((_cmt) => {
  const replycontainer = _cmt.nextElementSibling;
  // 답글보기
  _cmt.querySelector(".btn-ico.reply")?.addEventListener("click", (e) => {
    e.target.classList.toggle("is-active");
    replycontainer?.classList.toggle("is-show");
  });
  // 수정하기
  _cmt.querySelector(".btn-ico.mod")?.addEventListener("click", (e) => {
    _cmt.classList.add("is-edit");
    const cmtContent = _cmt.querySelector(".txt").innerText;
    _cmt.querySelector(".txt-edit").innerText = cmtContent;
  });
  // 답글모드에서 수정하기
  _cmt.querySelector(".btn-txt.mod")?.addEventListener("click", (e) => {
    _cmt.classList.add("is-edit");
    e.target.style.display = "none";
    const cmtContent = _cmt.querySelector(".txt").innerText;
    _cmt.querySelector(".txt-edit").innerText = cmtContent;
    if (e.target.previousElementSibling.classList.contains("regist")) {
      e.target.style.display = "none";
      e.target.previousElementSibling.removeAttribute("style");
    }
  });
  // 수정모드에서 저장하기
  _cmt.querySelector(".btn-txt.regist")?.addEventListener("click", (e) => {
    _cmt.classList.remove("is-edit");
    const cmtContent = _cmt.querySelector(".txt-edit").value;
    _cmt.querySelector(".txt").innerText = cmtContent;
    if (e.target.nextElementSibling.classList.contains("mod")) {
      e.target.style.display = "none";
      e.target.nextElementSibling.removeAttribute("style");
    }
  });
});

// custom select
const selectContainers = document.querySelectorAll(".select-container");
function deactivateAllSelect() {
  selectContainers.forEach((container) => {
    const selectBox = container.querySelector(".select-box");
    selectBox.classList.remove("active");
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".select-container")) {
    deactivateAllSelect();
  }
});
function initSelectBox(selectContainer) {
  const _box = selectContainer.querySelector(".select-box");
  const _options = selectContainer.querySelector(".select-options");
  const _slct = selectContainer.querySelector(".select");
  // default value
  _box.dataset.selected = _slct.selectedOptions[0].value;
  _box.textContent = _slct.selectedOptions[0].label;

  _options.innerHtml = ''

  // set options
  _slct.querySelectorAll("option").forEach((option) => {
    const _list = document.createElement("li");
    _list.dataset.value = option.value;
    _list.textContent = option.label;
    _list.classList.add("select-option");
    _options.appendChild(_list);
  });
}
selectContainers.forEach((container) => {
  initSelectBox(container);
  const selectOptions = container.querySelectorAll(".select-option");
  const selectBox = container.querySelector(".select-box");
  const selectHidden = container.querySelector(".select");
  container.addEventListener("click", (e) => {
    if (e.target === selectBox) {
      deactivateAllSelect();
      selectBox.classList.toggle("active");
    }
    selectOptions.forEach((option) => {
      if (e.target === option) {
        selectBox.textContent = option.textContent;
        selectBox.classList.remove("active");
        selectHidden.value = option.dataset.value;
        selectHidden.dispatchEvent(new Event("change"));
      }
    });
  });
  selectHidden.addEventListener("change", (e) => {
    console.log(e);
  });
});
