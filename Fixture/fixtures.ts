import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginpage'
import { InventoryPage } from '../pages/Inventory'
import { CartPage } from '../pages/cart'
import { CheckoutPage } from '../pages/checkout'
import { CheckoutStepTwoPage } from '../pages/checkoutStep2'
import { CheckoutCompeletPage } from '../pages/checkout-complete'
type MyFixture={
    loginPage :LoginPage,
    inventoryPage : InventoryPage,
    cartPage: CartPage,
    checkoutPage:CheckoutPage,
    checoutReviewPage :CheckoutStepTwoPage,
    checoutCompletePage:CheckoutCompeletPage
}
export const test = base.extend<MyFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  inventoryPage :async({page},use)=>{
    await use(new InventoryPage(page))
  }
  ,
  cartPage : async({page},use)=>{
    await use(new CartPage(page))
  },
  checkoutPage: async({page},use)=>{
    await use(new CheckoutPage(page))
  },
  checoutReviewPage: async({page},use)=>{
    await use(new CheckoutStepTwoPage(page))
  },
  checoutCompletePage: async({page},use)=>{
    await use(new CheckoutCompeletPage(page))
  }
})
export { expect }