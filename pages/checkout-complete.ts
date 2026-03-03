import { Page,expect } from "@playwright/test";

export class CheckoutCompeletPage{
    constructor(private page:Page){
        this.page=page
    }
async BackHome(){
    await this.page.locator('#back-to-products').click()
}

}