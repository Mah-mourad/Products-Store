let productsDiv = document.querySelector(".cards");
let noProducts = document.querySelector(".no-products");
// let productsInCart = localStorage.getItem('productsInCart')
// if(productsInCart){
//     let items =JSON.parse(productsInCart)

//     drawProducts(items)
// }

// function drawFavoritesProducts(allProducts = []){

//     if(JSON.parse(localStorage.getItem('productsFavorite')).length ===0){
//         noProducts.innerHTML = 'there is no items'
//     }
//     let products = JSON.parse(localStorage.getItem('productsFavorite')) || allProducts
//     let productUI = products.map((item) =>{
//         return `
//         <div class="card" style="width: 18rem;">
//                   <img src="${item.imgUrl}" class="card-img-top" alt="product">
//                   <div class="card-body">
//                     <h5 class="card-title">${item.title}</h5>
//                     <h5 class="card-title">Quantity: ${item.quantity}</h5>
//                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                     <div class="group d-flex align-items-center justify-content-between">
//                       <a href="" class="btn btn-success add-cart" onclick="removeFromFavorites(${item.id})">Remove from favorite</a>
//                     </div>
//                   </div>
//                 </div>
//         `
        
        
    
//     })
//     productsDiv.innerHTML = productUI.join('')
   
// }
// drawFavoritesProducts()

// function removeFromFavorites(id){
//     let productsFavorite = localStorage.getItem('productsFavorite')
//     if(productsFavorite){
//         let items = JSON.parse(productsFavorite)
//         let filterItems = items.filter((item)=> item.id !== id)
//         console.log(filterItems);
//         localStorage.setItem('productsFavorite', JSON.stringify(filterItems))
//         drawFavoritesProducts(filterItems)
//     }
// }


function drawFavoritesProducts(allProducts = []) {
  let products = JSON.parse(localStorage.getItem("productsFavorite")) || allProducts;

  if (products.length === 0) {
    noProducts.innerHTML = "There are no items...";
    productsDiv.innerHTML = ""; // Clear the favorites section
    return;
  }

  let productUI = products.map((item) => {
    return `
      <div class="card" style="width: 18rem;">
        <img src="${item.imgUrl}" class="card-img-top" alt="product">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h5 class="card-title">Quantity: ${item.quantity}</h5>
          <p class="card-text">Description: ${item.description}</p>
          <div class="group d-flex align-items-center justify-content-between">
            <a href="javascript:void(0)" class="btn btn-danger remove-favorite" onclick="removeFromFavorites(${item.id})">Remove from favorite</a>
          </div>
        </div>
      </div>
    `;
  });

  productsDiv.innerHTML = productUI.join("");
}

drawFavoritesProducts();

function removeFromFavorites(id) {
  // Get favorites from localStorage
  let productsFavorite = localStorage.getItem("productsFavorite");
  if (productsFavorite) {
    let favoriteItems = JSON.parse(productsFavorite);

    // Remove the item from favorites
    let filteredItems = favoriteItems.filter((item) => item.id !== id);
    localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));

    // Update the main products list to reflect the change in liked status
    let products = JSON.parse(localStorage.getItem("products"));
    products = products.map((item) => {
      if (item.id === id) {
        item.liked = false; // Set liked status to false
      }
      return item;
    });
    localStorage.setItem("products", JSON.stringify(products));

    // Redraw the favorites and main products
    drawFavoritesProducts(filteredItems);
    draw(products); // Redraw main product list to update heart color
  }
}
