let userInfo = document.querySelector("#user-info")
let links = document.querySelector(".links")
let userDom = document.querySelector("#user")
let logout = document.querySelector("#logout")
let username = localStorage.getItem("userName")
let addToCart = document.querySelectorAll(".add-cart");
let badge = document.querySelector(".badge");
let cartt = document.querySelector(".cartt");
let article = document.querySelector(".article");
let productsDiv = document.querySelector(".cards");
let articleDiv = document.querySelector(".articleDiv");
// let products = productsDD
let searchInp = document.querySelector("#search");

if(username){
    links.remove()
    userInfo.style.display = 'flex'
    userDom.innerHTML = username
}
function checkLogUser(){
    if(localStorage.getItem("userName")){
        let choosenItem = products.find((item)=> item.id === id)
        articleDiv.innerHTML +=`<p>${choosenItem.title}</p>` 
        let cartItems = document.querySelectorAll(".articleDiv p");
        badge.innerHTML = cartItems.length    
    }else{
        window.location = "login.html"
    }
}

////////////////////////////////////////////////////////
let products = JSON.parse(localStorage.getItem("products")) || [
    /* Define your default products here if none exist in localStorage */
  ];
  
  // Initial draw of products from localStorage or default list
  let draw;
  (draw = function (products = []) {
    let productUI = products.map((item) => {
      return `
        <div class="card" style="width: 18rem;">
          <img src="${item.imgUrl}" class="card-img-top" alt="product">
          <div class="card-body">
            <h5 class="card-title" onclick="saveItemData(${item.id})">${item.title}</h5>
            <p class="card-text">Price: ${item.Price}</p>
            <div class="group d-flex align-items-center justify-content-between">
              <h5 class="btn btn-success add-cart" onclick="addTooCart(${item.id})">Add to cart</h5>
              <i class="fa-solid fa-heart heart fs-4 px-4" style="color: ${
                item.liked ? "red" : ""
              }" onclick="addToFavorite(${item.id})"></i>
            </div>
          </div>
        </div>
      `;
    });
    productsDiv.innerHTML = productUI.join("");
  })(products);
  
  function getUniqueArr(arr, filterType) {
    let unique = arr
      .map((item) => item[filterType])
      .map((item, i, final) => final.indexOf(item) === i && i)
      .filter((item) => arr[item])
      .map((item) => arr[item]);
    return unique;
  }
  
  function addToFavorite(id) {
    let favItems = localStorage.getItem("productsFavorite")
      ? JSON.parse(localStorage.getItem("productsFavorite"))
      : [];
  
    if (localStorage.getItem("userName")) {
      // Find the item and toggle its liked status
      let choosenItem = products.find((item) => item.id === id);
      choosenItem.liked = !choosenItem.liked;
  
      // Update favorites based on the liked status
      if (choosenItem.liked) {
        favItems = [...favItems, choosenItem];
      } else {
        favItems = favItems.filter((item) => item.id !== id);
      }
  
      // Ensure no duplicates in favorites
      let uniqueFavItems = getUniqueArr(favItems, "id");
      localStorage.setItem("productsFavorite", JSON.stringify(uniqueFavItems));
  
      // Update the products array in localStorage to keep the liked state
      products = products.map((item) => {
        if (item.id === choosenItem.id) {
          item.liked = choosenItem.liked;
        }
        return item;
      });
  
      localStorage.setItem("products", JSON.stringify(products));
  
      // Redraw the UI with updated products array
      draw(products);
    } else {
      window.location = "login.html";
    }
  }
  



////////////////////////////////////////////////////




let addedItem = localStorage.getItem('productsInCart')
 ? JSON.parse(localStorage.getItem('productsInCart'))
 : [];
 let count = 1
if(addedItem){
    addedItem.map(item =>{
        articleDiv.innerHTML +=`<p>${count}- ${item.title}</p>`
        count++
    })
    badge.innerHTML = addedItem.length 
}

// let allItems = []
function addTooCart(id){
    // let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')): [];
    if(localStorage.getItem("userName")){
        let choosenItem = products.find((item)=> item.id === id)
        let isProductInCart = addedItem.some(i => i.id === choosenItem.id)
        if(isProductInCart){
            addedItem = addedItem.map(p => {
               if(p.id === choosenItem.id){
                p.quantity += 1
               } 
               return p
            })
        }else{
            addedItem.push(choosenItem)
            // console.log("a", addedItem);
            
        }
        articleDiv.innerHTML = ''
        addedItem.forEach(item => {
        articleDiv.innerHTML +=`<p>${item.title} ${item.quantity}</p>` 

        })
        // addedItem = [...addedItem, choosenItem]
        // let uniqueProduct = getUniqueArr(addedItem, "id")
        localStorage.setItem('productsInCart', JSON.stringify(addedItem))
        let cartItems = document.querySelectorAll(".articleDiv p");
        badge.innerHTML = cartItems.length    
    }else{
        window.location = "login.html"
    }
}


cartt.addEventListener("click", openCard)

function openCard(){
    if(articleDiv.innerHTML != ''){
        if(article.style.display == 'block'){
            article.style.display = 'none'
        }else{
            article.style.display = 'block'
        }
    }
}

function saveItemData(id){
    localStorage.setItem("productId", id)
    window.location = "cardDetails.html"
}

searchInp.addEventListener("keyup", function(e){
    // if(e.keyCode === 13){
        search(e.target.value, JSON.parse(localStorage.getItem('products')))
        // }
        if(e.target.value.trim() === ''){
            draw(JSON.parse(localStorage.getItem('products')))
        }
    })
    
    function search(title, arr){
        // for(let i =0; i< arr.length; i++){
            //     if(arr[i].title === title){
                //         console.log(arr[i]);      
                //     }
                // }
                let myarr = arr.filter(item => item.title.indexOf(title) !== -1 )
                draw(myarr)
                
            }
            
            
    function getUniqueArr(arr, filterType){
        let uniqe = arr.map(item => item[filterType]).map((item, i, final) => final.indexOf(item) === i && i).filter(item => arr[item]).map(item => arr[item])
        return uniqe;
        
    }


// let favItem = [];
// function addToFavorite(id){
//     let favItem = localStorage.getItem('productsFavorite') ? JSON.parse(localStorage.getItem('productsFavorite')): [];
//     if(localStorage.getItem("userName")){
//         let choosenItem = products.find((item)=> item.id === id)
//         choosenItem.liked = true
//         favItem = [...favItem, choosenItem]
//         let uniqueProduct = getUniqueArr(favItem, "id")
//         localStorage.setItem('productsFavorite', JSON.stringify(uniqueProduct))
//         products.map((item) => {
//             if(item.id === choosenItem.id){
//                 item.liked = true
//             }
//         });
//         localStorage.setItem("products", JSON.stringify(products))
//         draw(products) 
//     }else{
//         window.location = "login.html"
//     }
// }






// function AddToCart(){
//     let counter = 0
    // for (let i = 0; i < counter.length; i++) {
    //     badge = counter[i] + "<br>";
        // counter++
    //   }
    // badge.innerHTML = counter + 1
    // counter++
// }


// window.addEventListener("load",()=>{
//     const loader = document.querySelector(".loader")

//     loader.classList.add("loader-hidden")
//     loader.addEventListener("transitionend", ()=>{
//         document.body.removeChild("loader")
//     })
// })

// myUser.innerHTML = `
//      <div class="collapse navbar-collapse me-auto" id="mynavbar">
//                 <ul class="navbar-nav">
//                   <li class="nav-item">
//                     <a id="mynavbar myUser" class="nav-link text-uppercase" href="login.html">${user}</a>
//                   </li>
//                   <li class="nav-item">
//                     <a id="mynavbar" class="nav-link text-uppercase" href="register.html">logout</a>
//                   </li>
//                 </ul>
//             </div>
// `

// console.log(username);
// let fff = document.querySelector("#fff")
// const SHOPPING_API ="https://api.escuelajs.co/api/v1/products"


// fetch(SHOPPING_API).then(res => res.json()).then(data =>{
//     if(!data.length) return alert(`No coordinates found for ${cityName}`) 
//         const {name, lat, lon} = data[0]
//     getWeatherDetails(name, lat, lon)
 
// console.log(data[1]);
// console.log(data[1].title);
// console.log(data[1].images[1]);
// fff.innerHTML =data[1].category.image

// }).catch(() =>{
//     alert("An error occurred")
// })


