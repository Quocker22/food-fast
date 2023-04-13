var dialog = document.getElementById('dialog');

var dialog = document.getElementById('dialog');
window.onclick = function(event) {
    if (event.target == dialog) {
        dialog.style.display = "none";
}
}

//select have product or no product

function checkCartProduct() {
document.querySelector('.cart').style.right = "0";
const list = document.querySelector(".list");
const noContent = document.querySelector(".noContent");
const cartNotice = document.querySelector(".cart-notice");


if(cartNotice.innerHTML === "0") {
    list.style.display = "none";
    noContent.style.display = "block";
} else {
    list.style.display = "block";
    noContent.style.display = "none";
}
}

//show dilog & add a list cart & remove alist cart & cart total
var dialog = document.getElementById('dialog');
function myfuction(event) {
//show dilog

dialog.showModal();

//add a list cart
const btn = event.target;
const btnParent = btn.parentElement;
const btnParent2 = btnParent.parentElement;
const product = btnParent2.parentElement;
const productImg = product.querySelector("img").src;
const productName = product.querySelector("p").innerText;

var productPrice = product.querySelector(".sell-and-check").innerText;
addcart(productPrice,productImg,productName);

//Cart total
cartTotal();

//Delete cart
hideCart()

//QuantityProduct
quantityProduct()

//Product name
document.querySelector("dialog p").innerHTML = productName;
}

//close dialog
function closeDiaLog() {
dialog.close();
}

//Cart total
function cartTotal() {
var cartItems = document.querySelectorAll("tbody tr");
var totalProductPrice = 0;
for(let i = 0; i < cartItems.length; i++) {
    var productPrice = (cartItems[i].querySelector("span").innerHTML) * 1;
   
    totalProductPrice += productPrice;
    
}
var cartTotale = document.querySelector(".price-total span");
cartTotale.innerHTML = totalProductPrice.toLocaleString('de-DE');
}

//Delete cart
function hideCart() {
var cartItems = document.querySelectorAll("tbody tr");
for(let i = 0; i < cartItems.length; i++) {
    var delemeButtons = document.querySelectorAll(".cart-delete");
    delemeButtons[i].addEventListener("click", function(event) {
        var delemeButton = event.target;
        var cartItem = delemeButton.parentElement.parentElement;
        cartItem.remove();
        cartTotal();
        quantityProduct()
    })
}

}

//Add cart
function addcart(productPrice,productImg,productName) {
const addTr = document.createElement("tr");
const trContent = '<td style="display: flex;align-items: center;"><img width="70px" style="margin-right: 5px;" src="'+productImg+'" alt="">'+productName+'</td><td style = "text-align: center"><p><span>'+productPrice+'</span><sup>đ</sup></p></td><td style="cursor: pointer;"><span class="cart-delete" style="padding: 5px">Xóa</span></td>';
addTr.innerHTML = trContent;
const cartTable = document.querySelector("tbody");
cartTable.append(addTr);
}

//quantity product
function quantityProduct() {
var quantityProduct = document.querySelector(".cart-notice");
var cartItems = document.querySelectorAll("tbody tr");
quantityProduct.innerHTML = cartItems.length;
}

//đóng và mở list product
// var cartBtn = document.querySelector()
