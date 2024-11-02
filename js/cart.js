let productsDiv = document.querySelector(".cards");
let noProducts = document.querySelector(".no-products");
function drawProducts(allProducts = []){

    if(JSON.parse(localStorage.getItem('productsInCart')).length === 0){
        noProducts.innerHTML = 'there is no items...'
    }
    let products = JSON.parse(localStorage.getItem('productsInCart')) || allProducts
    let productUI = products.map((item) =>{
        return `
        <div class="card" style="width: 18rem;">
                  <img src="${item.imgUrl}" class="card-img-top" alt="product">
                  <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <h5 class="card-title">Quantity: ${item.quantity}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div class="group d-flex align-items-center justify-content-between">
                      <a href="" class="btn btn-danger add-cart" onclick= "removeFromCart(${item.id})">Remove from cart</a>
                    </div>
                  </div>
                </div>
        `
        
        
    
    })
    productsDiv.innerHTML = productUI.join('')
}
drawProducts()

function removeFromCart(id){
    let productsInCart = localStorage.getItem('productsInCart')
    if(productsInCart){
        let items = JSON.parse(productsInCart)
        let filterItems = items.filter((item)=> item.id !== id)
        console.log(filterItems);
        localStorage.setItem('productsInCart', JSON.stringify(filterItems))
        drawProducts(filterItems)
    }
}
