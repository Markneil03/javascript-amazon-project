import { formatCurrency } from "../../scripts/utils/money.js";

//test suite
describe('test suite: formatCurrency' , () => {

    //test 1
    it('converts centes into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    }); 

    //test 2
    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

     //test 2
     it('round up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});