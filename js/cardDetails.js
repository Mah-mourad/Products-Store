let products = JSON.parse(localStorage.getItem("products"))
let productId = localStorage.getItem("productId")
let product = document.querySelector(".product")
let productDetails = products.find((item) => item.id == productId)
console.log(productDetails);
product.innerHTML = 
`
    <img src="${productDetails.imgUrl}" alt="">
        <div class="product-details">
            <h2>${productDetails.title}</h2>
            <h3>price: ${productDetails.Price}</h3>
            <h3>Description: ${productDetails.description}</h3>
         </div>
`