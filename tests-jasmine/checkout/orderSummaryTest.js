 import { renderOrderSummary,  } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe('test suite: RenderOrderSummaryTest', () => {
    
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';



    beforeAll((done)=>{
        loadProducts(()=> {
            done();
        });
    }); 
        


    //hooks
    beforeEach(() =>{
   


        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div> 
        <div class="js-payment-summary"></div> 
        `;


        spyOn(localStorage, 'setItem');
     

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: productId1,
                quantity : 2,
                deliveryOptionId: '1',
             },
             {
                id: productId2,
                quantity : 1,
                deliveryOptionId: '2',
             }
             ]);
        });


        loadFromStorage();
     
        renderOrderSummary();
    });
    // check how the page looks
  
    it('displays the cart' , () => {
       
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        
     
       expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
       expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

           document.querySelector('.js-test-container').innerHTML = '';
    });

    //check how the page behave
    it('removes a product', () => {
       
        //deleting 
       document.querySelector(`.js-delete-link-${productId1}`).click();


       expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);


       expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
       expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

       //check the length of the cart is updated 
       expect(cart.length).toEqual(1);
       //check if the only left is product2 at first
       expect(cart[0].id).toEqual(productId2);

       document.querySelector('.js-test-container').innerHTML = '';
    });
});
