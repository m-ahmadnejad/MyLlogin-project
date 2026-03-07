import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginpage'
import { inventoryPage } from '../pages/Inventory'
import { Cart } from '../pages/cart'
import { checkout } from '../pages/checkout'
import { CheckouStep2 } from '../pages/checkoutStep2'
import { CheckoutCompeletPage } from '../pages/checkout-complete'

type MyFixture={
    loginPage :LoginPage,
    inventoryPage : inventoryPage,
    cartPage: Cart,
    checkoutPage:checkout,
    checoutReviewPage :CheckouStep2,
    checoutCompletePage:CheckoutCompeletPage


}
export const test = base.extend<MyFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  inventoryPage :async({page},use)=>{
    await use(new inventoryPage(page))
  }
  ,
  cartPage : async({page},use)=>{
    await use(new Cart(page))
  },
  checkoutPage: async({page},use)=>{
    await use(new checkout(page))
  },
  checoutReviewPage: async({page},use)=>{
    await use(new CheckouStep2(page))
  },
  checoutCompletePage: async({page},use)=>{
    await use(new CheckoutCompeletPage(page))
  }

})

export { expect }