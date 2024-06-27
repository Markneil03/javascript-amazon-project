 export let cart = JSON.parse(localStorage.getItem('cart')) === null ?  [{
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
}

export function addToCart(productId , selectedQty){
   let matchItem;

   cart.forEach((item) => {

    
     if (productId === item.id){
       matchItem = item;
       
     }
   });

   const selectQty  = Number(selectedQty);

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
   let totalQuantity = 0;
   cart.forEach((cartItem) => {
       totalQuantity += cartItem.quantity;
   });

   
   document.querySelector('.js-checkout-header-middle-section').innerHTML = `
    Checkout (<a class="return-to-home-link"
           href="amazon.html">${totalQuantity} items</a>)
   `;

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



saveStorage();
totalQuantity();
document.querySelector(`.quantity-label-${prodId}`).innerHTML = `${qty}`;
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



