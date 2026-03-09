import { Page,expect } from "@playwright/test";

export class CheckoutCompeletPage{
    constructor(private page:Page){
        this.page=page
    }
async clickBackHome(){
    await this.page.locator('#back-to-products').click()
}
  
   completeHeader(){
    return this.page.locator('h2.complete-header')
  }

}