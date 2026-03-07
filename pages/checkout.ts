import {Page} from '@playwright/test'

export class checkout{
    constructor(private page:Page){
        this.page =page
    }
async checkoutInfo(firstName:string,lastName:string,ZipCode:string){
    
    await this.page.locator('#first-name').fill(firstName)
    await this.page.locator('#last-name').fill(lastName)
    await this.page.locator('#postal-code').fill(ZipCode)
   
}
async continueButton(){
     await this.page.locator('#continue').click()
}
}