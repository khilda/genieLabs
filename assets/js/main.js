/**
 * Common Func
 */
document.addEventListener("DOMContentLoaded", () => {
  eventHeader();
  eventCardBookmark();
  eventTab();
  eventCmt();
  eventSelect();
});
function eventHeader() {
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
}
// card Bookmark
function eventCardBookmark() {
  document.querySelectorAll(".card-bookmark")?.forEach((boomark) => {
    boomark.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("is-active")) {
        e.target.classList.remove("is-active");
        alertOpen("저장이 취소되었습니다.");
      } else {
        e.target.classList.add("is-active");
        alertOpen(
          "샘플저장이 완료되었습니다.<br> 저장한 샘플은 My Ground 메뉴에서 확인할 수 있습니다."
        );
      }
    });
  });
}
// tab
function eventTab() {
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
}
// custom select
function eventSelect() {
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

    _options.innerHtml = "";

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
    if (container.classList.contains("is-disabled")) return;
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
}
// alert
function alertOpen(msg, callback) {
  Swal.fire({
    html: msg,
    icon: "info",
    showCloseButton: true,
    confirmButtonText: "확인",
    allowOutsideClick: false, // dimmed 클릭시 close block
  }).then((result) => {
    if (callback) {
      callback(result);
    }
  });
}
function confirmOpen(msg, callback) {
  Swal.fire({
    html: msg,
    icon: "success",
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    allowOutsideClick: false, // dimmed 클릭시 close block
  }).then((result) => {
    if (callback) {
      callback(result);
    }
  });
}
function eventCmt() {
  // comment
  const _cmtLists = document.querySelectorAll(".comment-list");
  _cmtLists.forEach((_cmtList) => {
    _cmtList.addEventListener("click", (e) => {
      const _target = e.target;
      const _cmtContainer = e.target.closest(".cmt-container");
      const _replyContainer = _cmtContainer?.nextElementSibling;
      // 답글보기
      if (_target.classList.contains("reply")) {
        console.log("답글보기");
        _target.classList.toggle("is-active");
        _replyContainer?.classList.toggle("is-show");
      }
      // 수정하기
      if (_target.classList.value === "btn-ico mod") {
        console.log("수정하기");
        _cmtContainer.classList.add("is-edit");
        const cmtContent = _cmtContainer.querySelector(".txt").innerText;
        _cmtContainer.querySelector(".txt-edit").innerText = cmtContent;
      }
      // 삭제하기
      if (_target.classList.contains("del")) {
        console.log("삭제하기");
        confirmOpen("삭제하시겠습니까?", (result) => {
          console.log(result);
        });
      }
      // 답글모드에서 수정하기
      if (_target.classList.value === "btn-txt mod") {
        console.log("답글모드에서 수정하기");
        _cmtContainer.classList.add("is-edit");
        _target.style.display = "none";
        const cmtContent = _cmtContainer.querySelector(".txt").innerText;
        _cmtContainer.querySelector(".txt-edit").innerText = cmtContent;
        if (_target.previousElementSibling.classList.contains("regist")) {
          _target.style.display = "none";
          _target.previousElementSibling.removeAttribute("style");
        }
      }
      // 수정모드에서 저장하기
      if (_target.classList.value === "btn-txt regist") {
        console.log("수정모드에서 저장하기");
        _cmtContainer.classList.remove("is-edit");
        const cmtContent = _cmtContainer.querySelector(".txt-edit").value;
        _cmtContainer.querySelector(".txt").innerText = cmtContent;
        if (_target.nextElementSibling.classList.contains("mod")) {
          _target.style.display = "none";
          _target.nextElementSibling.removeAttribute("style");
        }
      }
    });
  });
}

// 파일 다운로드
function downloadFile(el) {
  $.fileDownload({
    successCallback: function () {
      // $(document).block(false);
    },
    failCallback: function (responseHtml, url, error) {
      console.error(responseHtml);
      $(document).block(false);
      alertOpen("파일 다운로드 중 오류가 발생하였습니다.", (result) => {
        // $(document).block(false);
      });
    },
  });
}
