const any = document.querySelector.bind(document);
const many = document.querySelectorAll.bind(document);

const as = many(".information");
const bs = many(".title-information");

as.forEach((a ,index) => {
  const b = bs[index];

  a.onclick = function () {

    any(".information.active-profile").classList.remove("active-profile");
    any(".title-information.open").classList.remove("open");

    this.classList.add("active-profile");
    b.classList.add("open");

  };
});


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");

// SonDN fixed - Active size wrong size on first load.
// Original post: https://www.facebook.com/groups/649972919142215/?multi_permalinks=1175881616551340
requestIdleCallback(function () {
  line.style.left = tabActive.offsetLeft + "px";
  line.style.width = tabActive.offsetWidth + "px";
});

tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    this.classList.add("active");
    pane.classList.add("active");
  };
});
