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
  const email = document.querySelector(".email__from");
  const password = document.querySelector(".password__from");

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
    const password__report = document.querySelector(".password__report");
    password__report.innerHTML = e.response.data.message;
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
    // console.log(data.data)
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
  // Gọi listFood với ID danh mục đầu tiên theo mặc định
  listFood(cates.data[0].cateId);
}
listCate();

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
      console.log(cateID);
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

async function listFood(cateID ) {
  const foods = await getListFood();
  const foodList = document.querySelector(".menu-breakfast");
  foodList.innerHTML = ``;
  // foodList.classList.add('open');
  await foods.data.map((food, index) => {
    if (food.cateId === cateID) {
      const foodItem = document.createElement("div");
      foodItem.className = "menu-breakfast__1";
      foodItem.innerHTML = `
                      <img src="${food.images[0].imageUrl}" alt="HÌNH ẢNH" class="snack ">
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
                              <a>ADD TO CART
                                  <i class="fa-sharp fa-solid fa-right-long"></i>
                              </a>
                              <div class="item-action">
                                  <span class="icon-like icon-liked">
                                      <i class="icon-like-empty fa-regular fa-heart"></i>
                                      <i class="icon-like-fill fa-solid fa-heart"></i>
                                  </span>
                                  <div class="icon-eyes ">
                                      <i class="fa-solid fa-eye "></i>
                                  </div>
                              </div>
                          </div>
                          `;
      foodList.appendChild(foodItem);
    }
  });
}
listFood();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI4YmYwZWZkOS1kODAxLTQ2YzctOThkMy0xNWEwNjM0M2M0MWMiLCJSb2xlIjoiTUVNQkVSIiwiZXhwIjoxNjc3NTEyMzc5fQ.61ixRdcPx6vGlRNnwH6tHZUfDW37ScDhxKuFcf7-KbU

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI4YmYwZWZkOS1kODAxLTQ2YzctOThkMy0xNWEwNjM0M2M0MWMiLCJSb2xlIjoiTUVNQkVSIiwiZXhwIjoxNjc3NDgwMzU5fQ.KOdw44Lr4a6Mf-tDvDjcg3_dQsmBxxE0QTYtLyj6Zfc"
// "foodId": "3754831b-2692-48c1-9a92-e3b16388c477",
// "foodName": "Lẩu bò",
// "images": [
//   {
//     "imageUrl": "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1600"
//   }
// ],
// "description": "Món ngon",
// "price": 10000,
// "cateId": "332bead9-ef84-4fcc-978f-e651a570b315",
// "cateName": "Rau củ",
// "createdAt": "2023-02-06T23:48:55.025717Z",
// "updatedAt": "2023-02-06T23:48:55.025717Z"
// },
// {
// "foodId": "f963da56-62e8-41c9-b156-ff85e885375c",
// "foodName": "Lẩu gà",
// "images": [
//   {
//     "imageUrl": "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1600"
//   }
// ],
// "description": "Món ngon",
// "price": 10000,
// "cateId": "332bead9-ef84-4fcc-978f-e651a570b315",
// "cateName": "Rau củ",
// "createdAt": "2023-02-06T23:57:08.043828Z",
// "updatedAt": "2023-02-06T23:57:08.043828Z"
// },
// {
// "foodId": "e18c9949-4778-4102-bd24-052e899b2e70",
// "foodName": "bánh Snack",
// "images": [
//   {
//     "imageUrl": "https://cf.shopee.vn/file/bdccb04d734b93b6fe5d5541c079710c"
//   }
// ],
// "description": "Món ngon",
// "price": 4990,
// "cateId": "3b543fe3-5090-4118-a43b-7ca5d1edd8db",
// "cateName": "Bánh mì",
// "createdAt": "2023-02-23T20:22:38.286618Z",
// "updatedAt": "2023-02-23T20:22:38.286618Z"
// }
// ]
// }


