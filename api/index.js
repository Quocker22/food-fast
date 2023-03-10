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
    const { data } = await axios.post(
      "https://food-api.huytx.com/api/v1/user/sign-in",
      dataLogin
    );
    localStorage.setItem("food-token", data.data.token);
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
    e.response.data.code === 401 && (window.location.href = "/auth/login.html");
  }
}

// api hoa qua

async function getCateList() {
  try {
    const data = await axios.get("https://food-api.huytx.com/api/v1/cate/list");
    return data.data;
  } catch (e) {
    console.log(e);
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
  // G???i listFood v???i ID danh m???c ?????u ti??n theo m???c ?????nh
  listFood(cates.data[0].cateId);
}
listCate();

async function handleChangeCate() {
  const tabs = document.querySelectorAll(".tab-item");
  tabs.forEach((tab) => {
    tab.onclick = function () {
      const button = this.querySelector("button"); // L???y button c???a m???c ??ang ???????c click
      const cateID = button.getAttribute("id"); // L???y ID c???a m???c ??ang ???????c click
        listFood(cateID);
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
        this.classList.add("active");
    };
  })
}





    



// api get food list
async function getListFood() {
  try {
    const data = await axios.get("https://food-api.huytx.com/api/v1/food/list");
    return data.data;
  } catch (e) {
    console.log(e);
  }
}

// Number of items to display per page
const ITEMS_PER_PAGE = 8;

async function listFood(cateID, currentPage = 1) {
  const foods = await getListFood();
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
        <img src="${food.images[0].imageUrl}" alt="H??NH ???NH" class="snack ">
        <div class="menu-breakfast__icon">
          <h6 class="name">${food.description}</h6>
          <a class="price" href="">${food.foodName}</a>
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
            <button>ADD TO CART
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





// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI4YmYwZWZkOS1kODAxLTQ2YzctOThkMy0xNWEwNjM0M2M0MWMiLCJSb2xlIjoiTUVNQkVSIiwiZXhwIjoxNjc3NTEyMzc5fQ.61ixRdcPx6vGlRNnwH6tHZUfDW37ScDhxKuFcf7-KbU

// ph???n c???a tu???n 

async function nameCate() {
  const cates = await getCateList();
  const getNameFood = document.querySelector(".food-cate");
  await cates.data.map((cate, index) => {
      const getName = document.createElement("div");
      getName.className = "food-up";
      getName.innerHTML = `
            <img src="${cate.cateImage}" alt="H??NH ???NH" class="snack ">
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


