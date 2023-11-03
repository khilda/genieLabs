/**
 * Common Func
 */
document.addEventListener("DOMContentLoaded", () => {
  eventHeader();
  eventTopButton();
  eventQuickToggle();
  eventQuickScroll();
  eventSelect();
  eventTab();
  eventCardBookmark();
  eventCmt();
  eventLinkDialog();
});
/**
 * GNB Tablet, Mobile Open
 */
function eventHeader() {
  document.querySelector("#gnbOpen")?.addEventListener("click", () => {
    document.querySelector(".header").classList.add("is-show");
    document.body.setAttribute("style", "overflow: hidden");
  });
  document.querySelector("#gnbClose")?.addEventListener("click", () => {
    document.querySelector(".header").classList.remove("is-show");
    document.body.removeAttribute("style");
  });
  // theme
  document.querySelector("#toggleTheme")?.addEventListener("click", (e) => {
    e.target.classList.toggle("toggle");
    document.body.classList.toggle("dark-theme");
  });
  // (todo) gnb event 추가
  // desktop event
  document.querySelectorAll(".gnb-1dep").forEach((gnb1dep, idx, gnb1deps) => {
    gnb1dep.addEventListener("mouseenter", (e) => {
      if (window.innerWidth >= 1440) {
        gnb1deps.forEach((dep1) => {
          if (dep1 !== gnb1dep) dep1.classList.remove("is-active");
        });
        gnb1dep.classList.add("is-active");
      }
    });
    document.querySelector(".header").addEventListener("mouseleave", (e) => {
      if (window.innerWidth >= 1440) {
        gnb1deps.forEach((dep1) => dep1.classList.remove("is-active"));
      }
    });
  });
  // tablet, mobile event
  document.querySelectorAll(".gnb-1dep > .gnb-menu").forEach((gnbMenu) => {
    gnbMenu.addEventListener("click", (e) => {
      const gnb1dep = e.target.parentElement;

      document.querySelectorAll(".gnb-1dep").forEach((dep1) => {
        if (dep1 !== gnb1dep) dep1.classList.remove("is-active");
      });

      if (gnb1dep.classList.contains("is-active")) {
        gnb1dep.classList.remove("is-active");
      } else {
        gnb1dep.classList.add("is-active");
      }
    });
  });
  // //(todo) gnb event 추가
}

/**
 * TopButton
 */
function eventTopButton() {
  const _topBtn = document.querySelector(".top-btn");
  if (!_topBtn) return;

  _topBtn.addEventListener("click", (e) => {
    onScrollTo(0);
  });

  // 스크롤시에만 보여짐
  window.addEventListener("scroll", (e) => {
    let scrollY = window.scrollY;
    if (scrollY > 0) {
      _topBtn.setAttribute("style", "display:block");
    } else {
      _topBtn.removeAttribute("style");
    }
  });
}
/**
 * Quick Menu
 */
function eventQuickToggle() {
  const _quickContainer = document.querySelector(".quick-container");
  if (!_quickContainer) return;
  // quick menu open/close
  _quickContainer
    .querySelector(".quick-collapse")
    .addEventListener("click", (e) => {
      const _quickBtn = e.target;
      const btnH = _quickBtn.offsetHeight;
      const _quick = _quickContainer.querySelector(".quick");
      const h = _quick.offsetHeight + btnH / 2;
      if (_quickBtn.classList.contains("is-open")) {
        _quickBtn.classList.remove("is-open");
        _quickContainer.classList.remove("is-open");
        _quickContainer.style.cssText = `height: ${btnH}px`;
      } else {
        _quickBtn.classList.add("is-open");
        _quickContainer.classList.add("is-open");
        _quickContainer.style.cssText = `height: ${h}px`;
      }
    });
}
const quickSection = [];
function eventQuickScroll() {
  const _quickContainer = document.querySelector(".quick-container");
  if (!_quickContainer) return;
  // 클릭시 해당메뉴로 이동
  const quickLink = _quickContainer.querySelector(".quick-link");
  quickLink.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", (e) => {
      evtScrollY(e.target.dataset.id);
    });
    const section = document.getElementById(link.dataset.id);
    if (!section) return;
    quickSection.push(section);
  });
  let throttlingId;
  function throttling(func, timeout = 300) {
    if (throttlingId) return;
    throttlingId = setTimeout(() => {
      func();
      throttlingId = undefined;
    }, timeout);
  }

  // 스크롤시 해당 메뉴 활성화
  window.addEventListener("scroll", (e) => {
    throttling(eventQuickLinkActive);
  });
}

function eventQuickLinkActive() {
  const _quickContainer = document.querySelector(".quick-container");
  if (!_quickContainer) return;
  quickSection.forEach((section) => {
    const startPoint = section.offsetTop - 50;
    const endPoint = section.offsetTop + section.getBoundingClientRect().height;
    const scrollY = document.documentElement.scrollTop;
    const id = section.getAttribute("id");
    if (scrollY >= startPoint && scrollY <= endPoint) {
      _quickContainer
        .querySelector(`[data-id="${id}"]`)
        .classList.add("is-active");
    } else {
      _quickContainer
        .querySelector(`[data-id="${id}"]`)
        .classList.remove("is-active");
    }
  });
}
/**
 * 공통 Component
 */
// scroll
function onScrollTo(y = 0) {
  window.scroll({ top: y, behavior: "smooth" });
}
function evtScrollY(id) {
  const target = document.getElementById(id);
  const y = target?.offsetTop ?? 0;
  onScrollTo(y);
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

/**
 * Dialog
 * @param {String} msg : Dialog에 노출할 텍스트
 * @param {Function} callback  : 버튼 클릭이후 실행할 함수
 */
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

/**
 * 페이지 공통 모듈
 */
// card Bookmark
function eventCardBookmark() {
  document.querySelectorAll(".btn-bookmark")?.forEach((boomark) => {
    boomark.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("is-active")) {
        e.target.classList.remove("is-active");
        alertOpen("저장이 취소되었습니다.");
      } else {
        e.target.classList.add("is-active");
        alertOpen(
          "API 저장이 완료되었습니다.<br> 저장한 API는 DeveloperConsole 메뉴에서 확인할 수 있습니다."
        );
      }
    });
  });
}
// 댓글
function eventCmt() {
  // 댓글 input이벤트
  const _cmtEdit = document.querySelector(".comment-edit");
  _cmtEdit?.querySelector(".comment-ipt").addEventListener("input", (e) => {
    if (e.target.value.length) {
      e.target.nextElementSibling
        .querySelector(".btn")
        .removeAttribute("disabled");
    }
  });
  // comment Item 동적이벤트 할당
  const _cmtLists = document.querySelectorAll(".comment-list");
  _cmtLists?.forEach((_cmtList) => {
    _cmtList.addEventListener("click", (e) => {
      const _target = e.target;
      const _cmtContainer = e.target.closest(".cmt-container");
      // 답글보기
      if (_target.classList.contains("reply")) {
        console.log("답글보기");
        _target.classList.toggle("is-active");
        const _replyContainer = _cmtContainer?.nextElementSibling;
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
      // 수정모드에서 삭제하기
      if (_target.classList.value === "btn-txt del") {
        console.log("수정모드에서 삭제하기");
        confirmOpen("삭제하시겠습니까?", (result) => {
          console.log(result);
        });
        _cmtContainer.classList.remove("is-edit");
      }
      // 답글모드에서 댓글달기
      if (_target.classList.contains("rereply")) {
        console.log("답글모드에서 댓글달기", _target);
        const _replyContainer = _cmtContainer.closest(".reply-container");
        const _replyIpt = _replyContainer.querySelector(".cmt-ipt");
        const _auth = _cmtContainer
          .querySelector(".cmt-header")
          .querySelector(".auth");
        _replyIpt.value = `@${_auth.innerText} `;
        _replyIpt.focus();
        onChangeReplyIpt(_replyIpt);
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
      // 답글모드에서 취소하기
      if (_target.classList.value === "btn cancel") {
        console.log("답글모드에서 취소하기");
        _target.closest(".btn-container").previousElementSibling.value = "";
        _target.setAttribute("disabled", "true");
        _target.nextElementSibling.setAttribute("disabled", "true");
      }
    });
    _cmtList.addEventListener("input", (e) => onChangeReplyIpt(e.target));
    // 답글쓰기 input
    function onChangeReplyIpt(target) {
      const _replyWriteBtn = target.nextElementSibling;
      if (target.classList.value === "ipt cmt-ipt") {
        if (target.value.length) {
          _replyWriteBtn
            .querySelectorAll(".btn")
            .forEach((btn) => btn.removeAttribute("disabled"));
        }
      }
    }
  });
}
// 링크이동
function eventLinkDialog() {
  // badge Link
  document
    .querySelectorAll(".badge-link > .badge[data-url]")
    .forEach((badge) => {
      badge?.addEventListener("click", (e) => {
        confirmOpen(
          "GenieLabs의 해당 API 상세 화면으로 이동합니다. <br> 계속하시겠습니까?",
          (result) => {
            console.log(result, e.target.dataset.url);
          }
        );
      });
    });
}
/**
 *
 * @param {Object} params
 */
function eventLinkTo(params) {
  const { className = "", msg = "", isConfirm = true, callback } = params;
  // 데모 바로가기
  const target = `${className}[data-url]`;
  document.querySelectorAll(target).forEach((btn) => {
    btn?.addEventListener("click", (e) => {
      if (isConfirm) {
        confirmOpen(msg, (result) => {
          if (callback) callback(result, e.target);
        });
      } else {
        alertOpen(msg, (result) => {
          if (callback) callback(result, e.target);
        });
      }
    });
  });
}
/**
 * AS-IS FileDownload
 */
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
