import{Locator, Page,expect} from '@playwright/test'

export class CheckouStep2{
    constructor(private page:Page){
        this.page =page
    }

    async CheckoutOverview(productName:string){
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);    //1
    const wrapItem = this.page.locator('.cart_item').filter({ hasText: productName })
    console.log('*****wrapItem:',wrapItem)
    await expect(wrapItem, `Item "${productName}" should exist on overview page`).toHaveCount(1);//1
    //console.log( await wrapItem.locator('.inventory_item_name').textContent());
    
    const name = (await wrapItem.locator('.inventory_item_name').textContent())?.trim();
    console.log('name', name)
    const qty = (await wrapItem.locator('.cart_quantity').textContent())?.trim();
    const price = (await wrapItem.locator('.inventory_item_price').textContent())?.trim();

    return { name, qty, price };
  }

  async summaryInfo(){
    const rawitemTotal=await this.page.locator('.summary_info').locator('.summary_subtotal_label').textContent()
    console.log('RawitemToral', rawitemTotal)
    const itemTotal =  Number((rawitemTotal??'').replace(/[^0-9.]/g,''))
    console.log('itemTotal',itemTotal)
    const Rawtax= await this.page.locator('.summary_info').locator('.summary_tax_label').textContent()
    console.log('Rawtax', Rawtax)
    const tax =  Number((Rawtax??'').replace(/[^0-9.]/g,''))
    console.log('tax',tax)
    const RawTotal=await this.page.locator('.summary_info').locator('.summary_total_label').textContent()
    console.log('Rawtotal', RawTotal)
     const Total =   Number((RawTotal??'').replace(/[^0-9.]/g,''))
    return{itemToral:itemTotal,tax:tax,total:Total}

  }
  async checkoutFinish(){

    await this.page.locator('#finish').click()
  }
    
} 