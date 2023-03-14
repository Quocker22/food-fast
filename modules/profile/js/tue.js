const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var tabs = $$(".list-info__item");


for(let i = 0; i < tabs.length; i++) {
    
    tabs[i].onclick = function() {
        var tab = $(".list-info__item.active-profile")
        tab.classList.remove("active-profile")
        tabs[i].classList.add("active-profile")
    }
    
}

// const menus = $$(".handle-right");

// tabs.forEach((tab, index) => {
//     tab.onclick = function () {
//         const menu = menus[index]
//         console.log(menu);

//         $('.list-info__item.active-profile').classList.remove('active-profile')
//         $('.handle-right.open').classList.remove('open')

//         this.classList.add('active-profile')
//         menu.classList.add('open')
//     }
// })


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