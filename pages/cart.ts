import{Locator, Page} from '@playwright/test'
import { products } from '../data/testData'

export class CartPage{
    constructor(private page:Page){
        this.page=page
    }
     cartItem(productName:string):Locator{
        
        return this.page.locator('.cart_item').filter({has: this.page.getByText(productName)})
      
    }
    cartItemName(productName:string):Locator{
        return this.cartItem(productName).locator('.inventory_item_name')
    }

    async openCheckout(){
       await this.page.getByRole('button',{name :'Checkout'}).click()
    }

async removeItemfromCart(productName:string){
    const productContainer = await this.page.locator('.cart_item').filter({has:this.page.getByText(productName)})
    productContainer.getByRole('button',{name:'Remove'}).click()

}


}