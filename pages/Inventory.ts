import{Locator, Page} from '@playwright/test'

export class inventoryPage{
    constructor(private page:Page){
        this.page= page
    }

async addToCart(productName:string)
{
     const item = this.page.locator('.inventory_item').filter( {has: this.page.getByText(productName, {exact :true})})
     await item.getByRole('button', {name : 'Add to cart'}).click()
   
}
 async RemoveInventory(productName:string){
        const productContainer= this.page.locator('.inventory_item').filter({has: this.page.getByText(productName, {exact:true})})
        //console.log( 'product:', await nameProduct.textContent())
        await productContainer.getByRole('button', {name : 'Remove'}).click()
    }
async RemoveItemfromCart(productName:string){
    const productContainer = await this.page.locator('.cart_item').filter({has:this.page.getByText(productName)})
    productContainer.getByRole('button',{name:'Remove'}).click()

}

cartBage():Locator{
    return  this.page.locator('.shopping_cart_badge')
}

async cartopen(){
 await this.page.locator('#shopping_cart_container').click()
}
}