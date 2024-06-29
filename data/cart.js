 
 export let cart;
 
//  if (!cart){
//    cart =  [{
//       id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//       quantity : 2,
//    },
//    {
//       id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//       quantity : 1,
//    }
//    ];
//  }

loadFromStorage();
 
export function loadFromStorage(){
   cart = JSON.parse(localStorage.getItem('cart')) === null ?  [{
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
    deliveryOptionId: '1',
 },
 {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    deliveryOptionId: '2',
 }
 ] : JSON.parse(localStorage.getItem('cart'));
}

function saveStorage(){
   localStorage.setItem('cart', JSON.stringify(cart));
}


export function removeFromCart(productID){
   const newCart = [];

   cart.forEach((cartItem) => {
      if (cartItem.id !== productID){
         newCart.push(cartItem);
      }
   });

   cart = newCart;

   saveStorage();
   totalQuantity();
   itemsPayment();
}

export function addToCart(productId , selectedQty){
   let matchItem;

   cart.forEach((item) => {

    
     if (productId === item.id){
       matchItem = item;
       
     }
   });

   const selectQty  = Number(selectedQty) === null ?  1 : 1;

   if (matchItem){
     matchItem.quantity += selectQty;

   }else{
     cart.push(
       {
        id:  productId,
         quantity: selectQty, 
         deliveryOptionId: '1',
       }
     );
   }

   saveStorage();



 }

 //total quantity checkout
 export function totalQuantity(){
   let totQty = 0;
   cart.forEach((cartItem) => {
       totQty += cartItem.quantity;
   });

   
   document.querySelector('.js-checkout-header-middle-section').innerHTML = `
    Checkout (<a class="return-to-home-link"
           href="amazon.html">${totQty} items</a>)
   `;


}

export function itemsPayment (){
  let totQty = 0;

  cart.forEach((cartItem) => {
      totQty += cartItem.quantity;
  });


  document.querySelector('.js-payment-summary-items').innerHTML = `Items (${totQty}): `;
}


//update quantity
 export function updateQty(updateQty, prodId){
  let matchItem;
  let qty;
  cart.forEach( (cartItem)=> {
      if (cartItem.id === prodId){
          matchItem = cartItem;
      }
});
// end update quantity


if (matchItem){
  matchItem.quantity += updateQty;
  qty = matchItem.quantity;
}



itemsPayment();
totalQuantity();
document.querySelector(`.quantity-label-${prodId}`).innerHTML = `${qty}`;
saveStorage();

return qty;
}





// function for updating delivery option
export function updateDeliveryOption (productId, deliveryOptionId){
  let matchItem;

  cart.forEach((item) => {

   
    if (productId === item.id){
      matchItem = item;
      
    }
  });

  matchItem.deliveryOptionId = deliveryOptionId;

  saveStorage();
}



