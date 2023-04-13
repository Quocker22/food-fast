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
    const login__report = document.querySelector(".login-error");
    login__report.innerHTML = e.response.data.message;
    console.log(e.response);
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
    // e.response.data.code === 401 && (window.location.href = "/auth/login.html");
  }
}

// api hoa qua
const cateLimit = 'limit=3&page=1';
async function getCateList(cateLimit) {
  try {
    const data = await axios.get(`https://food-api.huytx.com/api/v1/cate/list?${cateLimit}`);
    return data.data;
  }catch (e) {
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
          <div class="link-cart">
            <button id=${food.foodId} onclick="myfuction(event)" >ADD TO CART
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
  await cates_list .data.map((cate, index) => {
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
const  limit = 'limit=6&page=1'
async function listCateFood() {
  const foods = await getListFood(limit);
  const getFoodList = document.querySelector(".navba-menu-list");  // lấy thẻ class chứa tát các thẻ
  await foods.data.map((food, index) => {  // chuyền food vào
      const getNameList = document.createElement("div"); // thấy thẻ div
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






