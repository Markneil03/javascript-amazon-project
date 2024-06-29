import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {

  
    it('add an existing product to the cart', () =>{

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id:  '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
                quantity: 1,
                deliveryOptionId: '1',
            }]);
        });

        loadFromStorage();

        addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('3fdfe8d6-9a15-4979-b459-585b0d0545b9');
        expect(cart[0].quantity).toEqual(2);
    });

    it('add an new product to the cart', () =>{

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();

        addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('3fdfe8d6-9a15-4979-b459-585b0d0545b9');
        // expect(cart[0].quantity).toEqual(1);
    });
});