import{Locator, Page} from '@playwright/test'

export class Cart{
    constructor(private page:Page){
        this.page=page
    }
     cartItem(productName:string):Locator{
        
        return this.page.locator('.cart_item').filter({has: this.page.getByText(productName)})
      
    }
    cartItemName(productName:string):Locator{
        return this.cartItem(productName).locator('.inventory_item_name')
    }

    async checkoutOpen(){
       await this.page.getByRole('button',{name :'Checkout'}).click()
    }
}