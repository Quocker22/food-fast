


// thanh cuon header
window.onscroll = function () {
    var header = document.getElementById('ba');
    if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
        header.style.position = 'fixed';
        header.style.left = 0;
        header.style.right = 0;
        header.style.background = '#fff';
        header.style.zIndex = 999;
    } else {
        header.style.position = 'relative';
    }
}
// click mở menu
var menu = document.querySelector('.nav-menu')
function menus() {
    if (menu.style.display === "block") {
        menu.style.display = "none"
    } else {
        menu.style.display = "block"
    }
}
//  click tắt menu
var close = document.querySelector('.nav-menu');
function closes() {
    if (close.style.display === "block") {
        close.style.display = "none"
    } else {
        close.style.display = "block"
    }
}
//   click mở menu icon
var icon = document.querySelector('.sub-icon');
function iconMenu() {
    if (icon.style.display === "block") {
        icon.style.display = "none"
    } else {
        icon.style.display = "block"
        icon.style.transform = "translateY(0px)"

    }
}
//   list-menu
$(document).ready(function () {
    $('.menu-children').click(function () {
        $(this).next('.sub-menu').slideToggle(10);
    })
})
//   tên profite
getValue();
async function getValue() {
    let data = await getUser();

    const getName = document.querySelector('.profile')
    getName.innerHTML = data.data.fullName;
}

//amount product

const handleMinusProduct = (event) => {
    const parseBtn = event.target.parentElement.parentElement
    const inputAmount = parseBtn.querySelector("input")
    let amount = parseInt(inputAmount.value);
    let render = (amount) => {
        inputAmount.value = amount
    }
    if (amount > 1) {
        amount--
        render(amount)
    } else {
        render(1)
    }
}

const handlePlusProduct = (event) => {
    const parseBtn = event.target.parentElement.parentElement
    const inputAmount = parseBtn.querySelector("input")
    let amount = parseInt(inputAmount.value);
    let render = (amount) => {
        inputAmount.value = amount
    }
    console.log(amount);
    amount++
    console.log(amount);

    render(amount)
}

function handleInput(event) {
    let render = (amount) => {
        amountInput.value = amount
    }
    let amountInput = event.target
    let amountValue = amountInput.value
    amount = isNaN(amountValue) || amountValue < 1 ? 1 : amountValue
    amount = parseInt(amount)
    render(amount)
}
