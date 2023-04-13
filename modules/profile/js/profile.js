const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var tabs = $$(".list-info__item");

tabs.forEach((tab) =>{
    tab.onclick = () => {
        const active = $(".list-info__item.active-profile")
        active.classList.remove("active-profile")
        tab.classList.add("active-profile")
    }
})

var cover = document.querySelector(".cover")
var theList = document.getElementById("list")
var list = window.getComputedStyle(theList)
function myFunction() {
    if (list.getPropertyValue("display") === "none") {
        theList.style.display = "block";
        cover.style.display = "block"
    } else {
        theList.style.display = "none"
        cover.style.display = "none"
    }
}