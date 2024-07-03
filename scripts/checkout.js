import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/products.js";
//import '../data/cart-class.js';
// import '../data/backend-practice.js';
//rendering all the code.

Promise.all([
    loadProductFetch,
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    }),

]).then(()=>{
    //rendering the order summary
    renderOrderSummary();

    //rendering the payment summary
    renderPaymentSummary();
});

// new Promise((resolve)=>{

//    loadProducts(()=>{
//     resolve();
//    });


// }).then(()=>{
    
//     return new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//     });


// }).then(()=>{
//         //rendering the order summary
//  renderOrderSummary();

//  //rendering the payment summary
//  renderPaymentSummary();
// });

// loadProducts(()=>{

//     loadCart(()=>{
//         //rendering the order summary
//  renderOrderSummary();

//  //rendering the payment summary
//  renderPaymentSummary();
//     });


// });
