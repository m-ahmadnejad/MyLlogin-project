import{Locator, Page} from '@playwright/test'

export class InventoryPage{
    constructor(private page:Page){
        this.page= page
    }

async addToCart(productName:string)
{
     const item = this.page.locator('.inventory_item').filter( {has: this.page.getByText(productName, {exact :true})})
     await item.getByRole('button', {name : 'Add to cart'}).click()
   
}
    cartBage():Locator{
    return  this.page.locator('.shopping_cart_badge')
}

async openCart(){
 await this.page.locator('#shopping_cart_container').click()
}
}