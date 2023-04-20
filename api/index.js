//variable global
const query = 'limit=100&page=1';

//api register
function getDataFromInputRegister() {
  const fullName = document.querySelector(".register-name");
  const email = document.querySelector(".register-email");
  const password = document.querySelector(".register-password");
  const address = document.querySelector(".register-address");
  const phone = document.querySelector(".register-phone");

  const dataRegister = {
    address: address.value,
    email: email.value,
    fullName: fullName.value,
    password: password.value,
    phone: phone.value,
  };
  localStorage.clear("food-token");
  callApiRegister(dataRegister);
}

async function callApiRegister(dataRegister) {
  try {
    const { data } = await axios.post(
      "https://food-api.huytx.com/api/v1/user/sign-up",
      dataRegister
    );
    localStorage.setItem("food-token", data.data.token);
    window.location.href = "/auth/login.html";
  } catch (e) {
    let objOfToast = {
      title: "error",
      message: e.response.data.message,
      duration: 3000
    }
    toastMessage(objOfToast)
    const register__error = document.querySelector(".register-error");
    register__error.innerHTML = e.response.data.message;
  }
}

//api login
function getDataFromInputLogin() {
  const email = document.querySelector(".login-email");
  const password = document.querySelector(".login-password");

  const dataLogin = {
    email: email.value,
    password: password.value,
  };
  localStorage.clear("food-token");
  callApiLogin(dataLogin);
}

async function callApiLogin(dataLogin) {
  try {
    const data = await axios.post(
      "https://food-api.huytx.com/api/v1/user/sign-in",
      dataLogin
    );
    localStorage.setItem("food-token", data.data.data.token);
    window.location.href = "/index.html";
  } catch (e) {
    console.log(e);
    let objOfToast = {
      title: "error",
      message: e.response.data.message,
      duration: 3000
    }
    toastMessage(objOfToast)
    const login__report = document.querySelector(".login-error");
    login__report.innerHTML = e.response.data.message;
    console.log(e);
  }
}

//api get user

async function getUser() {
  try {
    let token = localStorage.getItem("food-token");
    const data = await axios.get(
      "https://food-api.huytx.com/api/v1/user/profile",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data.data;

  } catch (e) {
    e.response.data.code === 401 && (window.location.href = "/auth/login.html");
  }
}

// api hoa qua
const cateLimit = 'limit=3&page=1';
async function getCateList(cateLimit) {
  try {
    const data = await axios.get(`https://food-api.huytx.com/api/v1/cate/list?${cateLimit}`);
    return data.data;
  } catch (e) {
    console.log(e)
  }
}

async function listCate() {
  const cates = await getCateList();
  const listTooltip = document.querySelector("#list-tooltip");
  await cates.data.map((cate, index) => {
    const newCate = document.createElement("li");
    newCate.className = "tab-item";
    if (index === 0) {
      newCate.classList.add("active");
    }
    newCate.innerHTML =
      '<button id="' + cate.cateId + '">' + cate.cateName + "</button>";

    listTooltip.appendChild(newCate);
  });
  await handleChangeCate();
  // Gọi listFood với ID danh mục đầu tiên theo mặc định
  listFood(cates.data[0].cateId);
}

listCate();
//////////////////////////////////////////////////////////////////////////////////

async function handleChangeCate() {
  const tabs = document.querySelectorAll(".tab-item");
  tabs.forEach((tab) => {
    tab.onclick = function () {
      const button = this.querySelector("button"); // Lấy button của mục đang được click
      const cateID = button.getAttribute("id"); // Lấy ID của mục đang được click
      listFood(cateID);
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      this.classList.add("active");
    };
  })
}

// api get food list
async function getListFood(query) {
  try {
    const data = await axios.get(`https://food-api.huytx.com/api/v1/food/list?${query}`);
    return data.data;
  } catch (e) {
    console.log(e);
  }
}

// Number of items to display per page
const ITEMS_PER_PAGE = 8;

async function listFood(cateID, currentPage = 1) {
  const foods = await getListFood(query);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const filteredFoods = foods.data.filter((food) => food.cateId === cateID);
  const paginatedFoods = filteredFoods.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);

  const foodList = document.querySelector(".menu-breakfast");
  foodList.innerHTML = ``;
  // foodList.classList.add('open');
  paginatedFoods.map((food, index) => {
    const foodItem = document.createElement("div");
    foodItem.className = "menu-breakfast__1";
    foodItem.innerHTML = `
    <img src="${food.images[0].imageUrl}" alt="HÌNH ẢNH" class="snack ">
    <div class="menu-breakfast__icon">
        <h6 class="name">${food.description}</h6>
        <p class="price" href="">${food.foodName}</p>
        <div class="sell-and-check">
    
            <span>${food.price}</span>
            <div class="icon-start">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
        </div>
        <div id="buy-amount">
            <button class="minus" onclick="handleMinusProduct(event)">
                <i class="fa-solid fa-minus"></i>
            </button>
            <input type="text" class="amount" value="1" oninput="handleInput(event)">
            <button class="plus" onclick="handlePlusProduct(event)">
                <i class="fa-thin fa-plus"></i>
            </button>
        </div>
        <div class="link-cart">
            <button id=${food.foodId} onclick="addFoodToCart(event)">ADD TO CART
                <i class="fa-sharp fa-solid fa-right-long"></i>
            </button>
            <div class="item-action">
                <span class="icon-like icon-liked">
                    <i class="icon-like-empty fa-regular fa-heart"></i>
                    <i class="icon-like-fill fa-solid fa-heart"></i>
                </span>
                <div class="icon-eyes">
                    <i class="fa-solid fa-eye "></i>
                </div>
            </div>
        </div>
    </div>
        `;
    foodList.appendChild(foodItem);
  });

  // open pseudo 

  // phân trang
  // Add pagination buttons
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerHTML = i;
    if (i === currentPage) {
      button.classList.add("active");
    }
    button.onclick = function () {
      listFood(cateID, i);
      // Set the active class to the clicked button
      const buttons = document.querySelectorAll(".pagination button");
      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      this.classList.add("active");
    };
    paginationContainer.appendChild(button);
  }
}

// phần của tuấn 

async function nameCate() {
  const cates = await getCateList(cateLimit);
  const getNameFood = document.querySelector(".food-cate");
  await cates.data.map((cate, index) => {
    const getName = document.createElement("div");
    getName.className = "food-up";
    getName.innerHTML = `
            <img src="${cate.cateImage}" alt="HÌNH ẢNH" class="snack ">
                    <div class="food-item">
                        <span>
                            Organically Produce
                        </span>
                    </div> 
                    
                    <div class="food-comment-item">
                        <span>
                            ${cate.cateName}
                        </span>
                    </div>
                    <div class="shop-item">
                        <a href=""  class="food-shop-now">
                            <button>
                               Shop Now
                               <i class="fa-solid fa-right-long"></i>
                            </button>
                        </a>
                    </div>
      `;
    getNameFood.appendChild(getName)
  })

}
nameCate();

// list-menu2
const cate_2 = 'limit=1&page=1'
async function nameCate_2() {
  const cates_list = await getCateList(cate_2);
  const getNameFoods = document.querySelector(".organic-list-id");
  await cates_list.data.map((cate, index) => {
    const getNames = document.createElement("div");
    getNames.className = "img-organic";
    getNames.innerHTML = `
      <img src="${cate.cateImage}" alt="">
      <div class="organic-button">
           <div class="name-organic">
              <div class="name-list">
                  <h1>  ${cate.cateName}</h1>
                  <h2>100% Organic</h2>
              </div>
               <button class="organic-item">
                  <div class="organic-list">
                      <span class="shop-organic">s</span>
                      <span class="shop-organic">h</span>
                      <span class="shop-organic">o</span>
                      <span class="shop-organic">p</span>
                  </div>
                  <div class="organic-list_item">
                      <span class="shop-now">n</span>
                      <span class="shop-now">o</span>
                      <span class="shop-now">w</span>
                  </div>
                   <i class="fa-solid fa-arrow-right-long"></i>
               </button>
           </div>
      </div>
      `;
    getNameFoods.appendChild(getNames)
  })

}
nameCate_2();



// list-menu-cate
const limit = 'limit=6&page=1'
async function listCateFood() {
  const foods = await getListFood(limit);
  const getFoodList = document.querySelector(".navba-menu-list");  // lấy thẻ class chứa tát các thẻ
  await foods.data.map((food, index) => {  // chuyền food vào
      const getNameList = document.createElement("div"); // tạo thẻ div
      getNameList.className = "navba-menu"; // lấy thẻ cha các thẻ
      getNameList.innerHTML = `
      <a href="#" class="navba-list-menu">
      <div class="list-menu-img">
          <img src="${food.images[0].imageUrl}" alt="">  
      </div>
      <div class="list-menu-nav">
          <div class="list-h1">
              <span>${food.foodName}</span>
          </div>
           <div class="navba-menu-icon">
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i> 
           </div>
           <div class="list-money">
              <span>${food.price}</span>
           </div>
      </div>
  </a>
      `;
    getFoodList.appendChild(getNameList)
  })

}
listCateFood();

//call api add to cart
async function addFoodToCart(event) {
  const btn = event.target
  const icons = btn.parentElement
  const menu = icons.parentElement
  const buyAmount = menu.querySelector("#buy-amount")
  const amountInput = buyAmount.querySelector("input")
  const inputValue = parseInt(amountInput.value)
  const foodId = event.target.id;
  const data = {
    foodId: foodId,
    quantity: inputValue
  }
  amountInput.value = 1 
  await useAddToCart(data);
  await getQuatityProduct()
}

//api get list order
function listOrder(event) {
  const foodId = event.target.id;
  const data = {
    foodId: foodId,
    quantity: 1
  }
  useAddToCart(data);
}

async function useAddToCart(data) {
  let token = localStorage.getItem("food-token");
  try {
    await axios({
      method: 'post',
      url: 'https://food-api.huytx.com/api/v1/order/add-to-cart',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    let objOfToast = {
      title: "success",
      message: "Đã thêm sản phẩm",
      duration: 3000
    }
    toastMessage(objOfToast)
    listShoppingCart();
  } catch (error) {
    let objOfToast = {
      title: "error",
      message: error,
      duration: 3000
    }
    toastMessage(objOfToast)
  }
}

async function getShoppingCart() {
  let token = localStorage.getItem("food-token");
  try {
    const data = await axios({
      method: 'get',
      url: 'https://food-api.huytx.com/api/v1/order/shopping-cart',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data.data;
  } catch (e) {
    console.log(e)
  }
}


function checkCartProduct() {
  document.querySelector('.cart').style.right = "0";
  const list = document.querySelector(".list");
  const noContent = document.querySelector(".noContent");
  const cartNotice = document.querySelector(".cart-notice");


  if (cartNotice.innerHTML === "0") {
      list.style.display = "none";
      noContent.style.display = "block";
  } else {
      listShoppingCart();
      list.style.display = "block";
      noContent.style.display = "none";
  }
}

async function listShoppingCart() {
  const shoppings = await getShoppingCart();
  const listShop = document.querySelector('tbody');
  listShop.innerHTML='';
  shoppings.data.items.map((food, index) => {
    const shopFood = document.createElement('tr');
    shopFood.innerHTML = `
        <td style="display: flex; align-items: center">
        <img
          width="70px"
          style="margin-right: 5px"
          src="${food.images[0].imageUrl}"
          alt="">${food.foodName}
      </td>
      <td style="text-align: center">
        <p>
        <span>${food.price}</span>
        <sup>đ</sup>
        </p>
      </td>
      <td style="cursor: pointer">
      <span class="cart-delete">Xóa</span>
      </td>;
      `
    listShop.append(shopFood)
  });
}

//toast message
function toastMessage({ title, message, duration }) {
  const main = document.getElementById('toast');
  const toast = document.createElement("div");

  const icons = {
    Success: 'fa-sharp fa-regular fa-circle-check',
    Error: 'fas fa-exclamation-circle'
  }
  toast.classList.add('toast', `toast--${title}`)
  // toast.classList.add('toast',`toast--${title}`)
  toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${(duration / 1000).toFixed(2)}s forwards`;
  toast.innerHTML = `
  <div class="toast__icon">
      <i class="${icons[title]}"></i>
  </div>
  <div class="toast__body">
      <h3 class="toast__title">${title}</h3>
      <p class="toast__msg">
          ${message}
      </p>
  </div>
  <div class="toast__close">
      <i class="fa-solid fa-xmark"></i>
  </div>`
  main.appendChild(toast);
  setTimeout(function () {
    main.removeChild(toast)
  }, (duration + 1000))

  toast.onclick = function (e) {
    console.log(e.target);
    if (e.target.closest('.toast__close')) {
      main.removeChild(toast)
    }
    console.log(e.target.closest('toast__close'));
    clearTimeout(autoRemoveId)
  }
}

//show quatity product to cart
getQuatityProduct()
async function getQuatityProduct() {
  let token = localStorage.getItem("food-token");
  try {
    const { data } = await axios({
      method: 'get',
      url: 'https://food-api.huytx.com/api/v1/order/count/shopping-cart',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    //display quatity product to cart
    const cartNotice = document.querySelector(".cart-notice")
    if (data.data.total < 100) {
      cartNotice.textContent = data.data.total
    } else {
      cartNotice.textContent = "99+"
    }

  } catch (e) {
    console.log(e)
  }
}


// list order 

async function listOrderMenu() {
  const shiping = await getShoppingCart();
  const listOrderProduct = document.querySelector('.box-order');
  shiping.data.items.map((food) => {
    const listProduct = document.createElement('div');
    listProduct.className = "shipping"
    listProduct.innerHTML = `
    <div class="cart-car">
    <i class="fa-solid fa-truck-fast"></i>
    <span>Đơn hàng đang xuất kho</span>
  </div>

  <div class="information-order">
      <div class="img-and-name">
          <img src="${food.images[0].imageUrl}" alt="">
          <span>${food.foodName}</span>
          <span>Số lượng :${food.quantity}</span>
      </div>

      <div class="price">${food.price}Đ</div>
      
  </div>

  <div class="count-btn">
    <span class="color-count">Tổng tiền: <span>${food.price}</span>đ</span>
    <div class="two-btn">
      <a href="#"><button>Mua lại</button></a>
      <a href="#"><button>Chi tiết</button></a>
    </div>
  </div>
      `
      listOrderProduct.append(listProduct)
  });
}
listOrderMenu()