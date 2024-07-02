import {products} from "../data/products.js";
import {cart, addToCart, totalCart} from '../data/cart.js';
import { formatCurrency } from "./utils/money.js";
    let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}"">
            Add to Cart
          </button>
        </div>
    `;
});

// function totalCart(){
//   let totalQuantity = 0;
//   cart.forEach((cartItem) => {
//       totalQuantity += cartItem.quantity;
//   });

//   if (totalQuantity <= 99){
//     document.querySelector('.js-cart-quantity').innerHTML = `

//     ${totalQuantity}
     
// `;
//   }else{
//     document.querySelector('.js-cart-quantity').innerHTML = `

//   99+
     
// `;
//   }
 

// }

totalCart();
function quantityCart (addedElement){

  let productQty = 0;
  cart.forEach((item) => {
    
    productQty += item.quantity;
  });
  

  if (productQty <= 99){
    document.querySelector('.cart-quantity').innerHTML = productQty;
  }else{
    document.querySelector('.cart-quantity').innerHTML = `

  99+
     
`;
  }
//  document.querySelector('.cart-quantity').innerHTML = productQty;
   addedElement.classList.add('added-to-cart-visible');

   setTimeout(()=>{
     addedElement.classList.remove('added-to-cart-visible');
   }, 2000);
}



document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
.forEach((button)=> {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

     
     const addedElement = document.querySelector(`.js-added-to-cart-${productId}`);
      const selectedQty = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    
      
    // //adding to cart
      addToCart(productId, selectedQty);

    
    //   //updating webpage quantity
      quantityCart(addedElement);

    });



});


