
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
      deleteCart()
      
      //QuantityProduct
      quantityProduct()
    
      //Product name
        document.querySelector("dialog p").innerHTML = productName;
    }
    
    //close dialog
    function myFuctionCloseDialog() {
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
    function deleteCart() {
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
        const trContent = '<td style="display: flex;align-items: center;"><img width="70px" style="margin-right: 5px;" src="'+productImg+'" alt="">'+productName+'</td><td style = "text-align: center"><p><span>'+productPrice+'</span><sup>đ</sup></p></td><td style="cursor: pointer;"><span class="cart-delete">Xóa</span></td>';
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


             // thanh cuon header
             window.onscroll = function(){
            var header =document.getElementById('ba');
            if (document.documentElement.scrollTop > 100 || document.body.scrollTop >100){
            header.style.position ='fixed';
            header.style.left = 0;
            header.style.right = 0;
            header.style.background  ='#fff';
            header.style.zIndex = 999;
        } else {
            header.style.position ='relative';
        }
    }
    // click mở menu
     var menu = document.querySelector('.nav-menu')
     function menus(){
        if(menu.style.display === "block"){
            menu.style.display = "none"
        } else {
            menu.style.display = "block"
        }
     }
    //  click tắt menu
      var close = document.querySelector('.nav-menu');
      function closes(){
        if (close.style.display === "block"){
            close.style.display ="none"
        } else {
            close.style.display = "block"
        }
      }
    //   click mở menu icon
      var icon = document.querySelector('.sub-icon');
      function iconMenu(){
        if (icon.style.display === "block"){
            icon.style.display = "none"            
        } else {
            icon.style.display = "block"
            icon.style.transform = "translateY(0px)"
           
        }
      }
    //   list-menu
      $(document).ready(function(){
        $('.menu-children').click(function(){
            $(this).next('.sub-menu').slideToggle(10);
        })
      })
    //   tên profite
      getValue();
      async function getValue(){
      let data = await getUser();

      const getName = document.querySelector('.profile')
      getName.innerHTML = data.data.fullName;
    }   
  
