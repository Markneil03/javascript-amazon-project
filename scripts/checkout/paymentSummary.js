import {cart, itemsPayment} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import { addOrder } from '../../data/order.js';
export function renderPaymentSummary(){
    
    let productPriceCents = 0;
    let shippingPriceCents = 0;
   cart.forEach((cartItem) => {
  
    //adding the total of product
     const product = getProduct(cartItem.id);

     productPriceCents += product.priceCents * cartItem.quantity; 


     //adding the total of shipping
     const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

     shippingPriceCents += deliveryOption.priceCents;
   });

   const totalItemCents = productPriceCents + shippingPriceCents;

   

   const tax = 0.1;

   const estimatedTax = totalItemCents * tax;

   const totalCents = totalItemCents + estimatedTax;
   


   const paymentSummaryHTML = `
     
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-summary-items">Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalItemCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
      
   `;

   const paymentSummaryElement = document.querySelector('.js-payment-summary');

   paymentSummaryElement.innerHTML = paymentSummaryHTML;


   itemsPayment();

   document.querySelector('.js-place-order')
   .addEventListener('click', async () => {

    try{
      const response =  await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          cart : cart
        }),
      });

      const order = await response.json();
   
      addOrder(order);
    }catch(error){
      console.log('Unexpected Error. Try again later');
        }

  window.location.href = '/orders.html';
  
   });

}