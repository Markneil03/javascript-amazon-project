import {cart, removeFromCart,  updateQty, updateDeliveryOption, itemsPayment, totalQuantity} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';


// function for re renning all the code
export function renderOrderSummary(){

 
    let cartHTML = '';

cart.forEach((cartItem) => {

    const productId = cartItem.id;
  
  const addedCarts = getProduct(productId);


    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
   
    const today = dayjs();

    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM D');



cartHTML += `
    <div class="cart-item-container 
    js-cart-item-container
    js-cart-item-container-${addedCarts.id}">
    <div class="delivery-date">
        Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${addedCarts.image}">

        <div class="cart-item-details">
        <div class="product-name">
          ${addedCarts.name}
        </div>
        <div class="product-price">
            $${formatCurrency(addedCarts.priceCents)}
        </div>
        <div class="product-quantity
                    js-product-quantity-${addedCarts.id}
        ">
            <span>
            Quantity: <span class="quantity-label-${addedCarts.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity js-qty-${addedCarts.id}" data-product-id="${addedCarts.id}">
            Update
            </span>
        <input type="numbers" class="quantity-input js-quantity-input-${addedCarts.id}"></input>
        <span class="link-primary save-quantity-link js-save-quantity-link-${addedCarts.id}" data-product-id="${addedCarts.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity js-delete-link-${addedCarts.id}"
            data-product-id="${addedCarts.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(addedCarts.id, cartItem)}
        </div>
    </div>
    </div>
    `;
});

document.querySelector('.js-order-summary').innerHTML = cartHTML;
window.onload = function(){
    totalQuantity();
}



document.querySelectorAll('.js-delete-quantity').forEach((link) => {
    link.addEventListener('click', () => {
         const prodId = link.dataset.productId;

        

       
        //removing on cart array
       
       removeFromCart(prodId);
       renderPaymentSummary();

        //removing on webpage interface
        document.querySelector(`.js-cart-item-container-${prodId}`).remove();
    });
});




//checkout total
document.querySelectorAll('.js-update-quantity').forEach((updateButton) => {
    updateButton.addEventListener( "click", () => {
       const updateProdId = updateButton.dataset.productId;

    
       const container = document.querySelector(`.js-cart-item-container-${updateProdId}`);

        container.classList.add('is-editing-quantity');


        const container2 = document.querySelector(`.js-qty-${updateProdId}`);

        container2.classList.add('is-editing-quantity-disappear');

      const saveQtyButton = document.querySelector(`.js-save-quantity-link-${updateProdId}`);

      const inputElement = document.querySelector(`.js-quantity-input-${updateProdId}`);

      inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter'){
           
         

            const toUpdateQty = Number(document.querySelector(`.js-quantity-input-${updateProdId}`).value);
            
          
    
    
    
            if (toUpdateQty){
               if (toUpdateQty <= 0 || toUpdateQty >= 1000){
                alert('Entered is less than 0 or more than 1000 Please Enter between 0-1000');
               }else{
                updateQty(toUpdateQty, updateProdId);
               }
            }else{
                alert('Entered is Not A number');
            }

            
        }   
      });

     saveQty(saveQtyButton);

     
    });
});

// changing the delivery option
document.querySelectorAll('.js-delivery-option')
.forEach( (element) => {
    element.addEventListener('click' ,() => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
        });
});


}



//functions displaying the delivery options
function deliveryOptionsHTML (matchingProdId, cartItem){

    let html = '';



    deliveryOptions.forEach((deliveryOption) => {

        const today = dayjs();

        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    
        const dateString = deliveryDate.format('dddd, MMMM D');


    
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;
 
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
     html +=   
     `
             <div class="delivery-option js-delivery-option" data-product-id= "${matchingProdId}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'Checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProdId}">
                <div>
                <div class="delivery-option-date">
                   ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
        `;
    });

   
    return html;
   
}



// function for saving the entered quantity
function saveQty(saveBtn){
    saveBtn.addEventListener('click', () => {
         
        const prodId = saveBtn.dataset.productId;

        const toUpdateQty = Number(document.querySelector(`.js-quantity-input-${prodId}`).value);
        
      



        if (toUpdateQty){
           if (toUpdateQty <= 0 || toUpdateQty >= 1000){
            alert('Entered is less than 0 or more than 1000 Please Enter between 0-1000');
           }else{
            updateQty(toUpdateQty, prodId);
            renderPaymentSummary();

           }
        }else{
            alert('Entered is Not A number');
        }

       
      });
}





