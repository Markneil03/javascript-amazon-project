class Cart {

    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;

        this.#loadFromStorage();
      
    }

    #loadFromStorage (){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) === null ?  [{
         id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
         quantity : 2,
         deliveryOptionId: '1',
      },
      {
         id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
         quantity : 1,
         deliveryOptionId: '2',
      }
      ] : JSON.parse(localStorage.getItem(this.#localStorageKey));
     }

      
     saveStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
        }
    
        addToCart(productId , selectedQty){
        let matchItem;
    
        this.cartItems.forEach((item) => {
    
            
            if (productId === item.id){
            matchItem = item;
            
            }
        });
    
    
    
    
        if (matchItem){
            matchItem.quantity += selectedQty;
    
        }else{
            this.cartItems.push(
            {
                id:  productId,
                quantity: selectedQty, 
                deliveryOptionId: '1',
            }
            );
        }
    
        this.saveStorage();
        }
        removeFromCart(productID){
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.id !== productID){
                newCart.push(cartItem);
            }
        });
    
        this.cartItems = newCart;
    
        this.saveStorage();
        window.load = function(){  this.totalQuantity();};
        window.load = function(){   this.itemsPayment();};
        }
    
         totalQuantity(){
            let totQty = 0;
             this.cartItems.forEach((cartItem) => {
                 totQty += cartItem.quantity;
             });
             
             
             document.querySelector('.js-checkout-header-middle-section').innerHTML = `
              Checkout (<a class="return-to-home-link"
                     href="amazon.html">${totQty} items</a>)
             `;
          
          
          }
          
          itemsPayment (){
            let totQty = 0;
          
            this.cartItems.forEach((cartItem) => {
                totQty += cartItem.quantity;
            });
          
          
            document.querySelector('.js-payment-summary-items').innerHTML = `Items (${totQty}): `;
          }
    
         updateQty(updateQty, prodId){
            let matchItem;
            let qty;
            this.cartItems.forEach( (cartItem)=> {
                if (cartItem.id === prodId){
                    matchItem = cartItem;
                }
          });
          
          
          if (matchItem){
            matchItem.quantity += updateQty;
            qty = matchItem.quantity;
          }
          
          
          
          this.itemsPayment();
          this.totalQuantity();
          document.querySelector(`.quantity-label-${prodId}`).innerHTML = `${qty}`;
          this.saveStorage();
          
          return qty;
          }
    
           updateDeliveryOption (productId, deliveryOptionId){
            let matchItem;
          
           this.cartItems.cart.forEach((item) => {
          
             
              if (productId === item.id){
                matchItem = item;
                
              }
            });
          
            matchItem.deliveryOptionId = deliveryOptionId;
          
            this.saveStorage();
          }
    
        totalCart(){
        let totalQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            totalQuantity += cartItem.quantity;
        });
        
        if (totalQuantity <= 99){
            document.querySelector('.js-cart-quantity').innerHTML = `${totalQuantity}`;
        }else{
            document.querySelector('.js-cart-quantity').innerHTML = `99+`;
        }
        
        }
          
}

// function Cart(this.localStorageKey){
//     const cart = {
        
    
    
    
         
//     };
    

//     return cart;
// }
 
// const cart = new Cart('cart-oop');
// const businessCart = new Cart('cart-business');
 


 
//  console.log(cart);
//  console.log(businessCart);



 
 
