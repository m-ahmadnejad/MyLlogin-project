import{Locator, Page} from '@playwright/test'
export class InventoryPage{
    constructor(private page:Page){
        this.page= page
    }
    productContainer(productName:string){
      return  this.page.locator('.inventory_item').filter({has: this.page.getByText(productName, {exact:true})})
    
    }
    async addToCart(productName:string)
    {
     await this.addToCartButton(productName).click()
    }

     addToCartButton(productName:string)
    {
     return this.productContainer(productName).getByRole('button',{name:'Add to cart'})
    }
    cartBadge():Locator{
     return  this.page.locator('.shopping_cart_badge')
    }
    async openCart(){
     await this.page.locator('#shopping_cart_container').click()
    }

    async removeFromInventoryClick(productName:string){

     await this.productContainer(productName).getByRole('button',{name:'Remove'}).click()
    }


}
