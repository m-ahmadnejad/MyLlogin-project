//import { LoginPage } from '../pages/loginpage'

import {test, expect} from '../Fixture/fixtures.ts'
import { products,checkoutUsers } from '../data/testData.ts';
//import { inventoryPage } from '../pages/Inventory.ts'
//import { Cart } from '../pages/cart'
//import { checkout } from '../pages/checkout'
//import { CheckouStep2 } from '../pages/checkoutStep2'
//import { CheckoutCompeletPage } from '../pages/checkout-complete'
import { addItemAndOpenCart, fillCheckoutInfoAndContinue, goToCheckoutStepOne} from '../helper/helpers.ts';

test.beforeEach(async({page})=>{
  await page.goto('https://www.saucedemo.com/inventory.html')
  await expect(page).toHaveURL(/inventory\.html/)
})


test.use({ storageState: 'playwright/.auth/user.json' });
test.describe('Cart', ()=>{
test('add item to cart', async({page, inventoryPage})=>{
    //const loginPage = new LoginPage(page)
    //await loginPage.login('standard_user','secret_sauce')
      //await page.goto('https://www.saucedemo.com/inventory.html'); // important
      console.log('URL after goto:', page.url());
     // await expect(page).toHaveURL(/inventory\.html/);
      //const inventorupage= new inventoryPage(page)
      await inventoryPage.addToCart('Sauce Labs Backpack')
})
test('verfying shopping cart item', async({page, inventoryPage,cartPage})=>{
    //await page.goto('https://www.saucedemo.com/inventory.html'); // important
    //const inventorupage= new inventoryPage(page)
    //await inventoryPage.addToCart('Sauce Labs Backpack')
    //await inventoryPage.cartopen()
    await addItemAndOpenCart(inventoryPage)
    //const shoppingCart= new Cart(page)
    await expect(cartPage.cartItem(products.backpack)).toBeVisible()
    await expect(inventoryPage.cartBage()).toHaveText('1')
})
})
test.describe('Checkout', () => {
test('checkout process',async({page,inventoryPage,cartPage,checkoutPage})=>{
    //await page.goto('https://www.saucedemo.com/inventory.html'); // important
   // const inventorupage= new inventoryPage(page)
    // inventoryPage.addToCart('Sauce Labs Backpack')
    //await inventoryPage.cartopen()
   // const shoppingCart= new Cart(page)
   // await addItemAndOpenCart(inventoryPage)
   // await cartPage.checkoutOpen()
    //const Info= new checkout(page)
    //await checkoutPage.checkoutInfo('mojgan','Ahmad','123')
    await goToCheckoutStepOne(inventoryPage,cartPage)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    await fillCheckoutInfoAndContinue(checkoutPage,'Mojgan','test','123')
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    //await checkoutPage.continueButton()
})
test('checkout review', async({page,inventoryPage,cartPage,checkoutPage,checoutReviewPage})=>{
    //await page.goto('https://www.saucedemo.com/inventory.html'); // important
    //const inventorupage= new inventoryPage(page)
    //await inventoryPage.addToCart('Sauce Labs Backpack')
    //await inventoryPage.cartopen()
    //const shoppingCart= new Cart(page)
    await goToCheckoutStepOne(inventoryPage,cartPage)
    //await cartPage.checkoutOpen()
    //const Info= new checkout(page)
    //await checkoutPage.checkoutInfo('Mojgan','test','123')
    //await checkoutPage.continueButton()
    await fillCheckoutInfoAndContinue(checkoutPage,checkoutUsers.validUser.firstName,checkoutUsers.validUser.lastName,checkoutUsers.validUser.postalCode)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    //const checkoutReview= new CheckouStep2(page)
    const overview =  await checoutReviewPage.CheckoutOverview('Sauce Labs Backpack')
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    console.log('overview',overview)
    expect(overview.name).toBe('Sauce Labs Backpack');
    expect(overview.qty).toBe('1');
    expect(overview.price).toBe('$29.99');
    const summery = await checoutReviewPage.summaryInfo()
    expect(summery.itemToral).toBeCloseTo(29.99,2)
    expect(summery.tax).toBeCloseTo(2.40,2)
    expect(summery.total).toBeCloseTo(32.39,2)
   
})
    test('back to home after placing order', async({page,inventoryPage,cartPage,checkoutPage,checoutReviewPage, checoutCompletePage})=>{
    //await page.goto('https://www.saucedemo.com/inventory.html'); // important
    //const inventorupage= new inventoryPage(page)
   // await inventoryPage.addToCart('Sauce Labs Backpack')
   // await inventoryPage.cartopen()
     await goToCheckoutStepOne(inventoryPage,cartPage)
//  const shoppingCart= new Cart(page)
    //await cartPage.checkoutOpen()
    //const Info= new checkout(page)
    //await checkoutPage.checkoutInfo('Mojgan','test','123')
    //checkoutPage.continueButton()
    await fillCheckoutInfoAndContinue(checkoutPage,checkoutUsers.validUser.firstName,checkoutUsers.validUser.lastName,checkoutUsers.validUser.postalCode)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    //const checkoutReview= new CheckouStep2(page)
    const overview =  await checoutReviewPage.CheckoutOverview('Sauce Labs Backpack')
    //const compeletPage = new CheckoutCompeletPage(page)
    await checoutReviewPage.checkoutFinish()
    await expect(page.locator('h2.complete-header')).toHaveText('Thank you for your order!')
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
    await checoutCompletePage.BackHome()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page.getByText('Products')).toBeVisible()
    const CartBage = inventoryPage.cartBage()
    await expect(CartBage).toHaveCount(0)
    })

})

test.describe('Checkout validation', () => {
      test('unsuccefull checkout inforation "empty firstName"', async({page,inventoryPage,cartPage,checkoutPage,checoutCompletePage,checoutReviewPage})=>{
   // await page.goto('https://www.saucedemo.com/inventory.html'); // important
    //const inventorupage= new inventoryPage(page)
    //await inventoryPage.addToCart('Sauce Labs Backpack')
    //await inventoryPage.cartopen()
    //const shoppingCart= new Cart(page)
    //await cartPage.checkoutOpen()
    await goToCheckoutStepOne(inventoryPage,cartPage)
    //const Info= new checkout(page)
    //await checkoutPage.checkoutInfo('','Ahmad','123')
    await fillCheckoutInfoAndContinue(checkoutPage,checkoutUsers.emptyFirstName.firstName,checkoutUsers.emptyFirstName.lastName,checkoutUsers.emptyFirstName.postalCode)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    console.log('URL',page.url())
    await expect(page.locator('#continue')).toBeVisible()
    await expect(page.locator('#continue')).toBeEnabled()
    await checkoutPage.continueButton()
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
   })

    test('unsuccefull checkout inforation "empty LastName"', async({page,inventoryPage,cartPage,checkoutPage,checoutCompletePage,checoutReviewPage})=>{
    //await page.goto('https://www.saucedemo.com/inventory.html'); // important
    //const inventorupage= new inventoryPage(page)
    //await inventoryPage.addToCart('Sauce Labs Backpack')
    //await inventoryPage.cartopen()
    //const shoppingCart= new Cart(page)
    //await cartPage.checkoutOpen()
    await goToCheckoutStepOne(inventoryPage,cartPage)
    //const Info= new checkout(page)
    //await checkoutPage.checkoutInfo('Mojgan','','123')
    console.log('URL',page.url())
    await fillCheckoutInfoAndContinue(checkoutPage,checkoutUsers.emptyLastName.firstName,checkoutUsers.emptyLastName.lastName,checkoutUsers.emptyLastName.postalCode)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    await expect(page.locator('#continue')).toBeVisible()
    await expect(page.locator('#continue')).toBeEnabled()
    await checkoutPage.continueButton()
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
   })
    test('unsuccefull checkout inforation "empty postal code"', async({page,inventoryPage,cartPage,checkoutPage,checoutCompletePage,checoutReviewPage})=>{
    //await page.goto('https://www.saucedemo.com/inventory.html'); // important
    //const inventorupage= new inventoryPage(page)
    //await inventoryPage.addToCart('Sauce Labs Backpack')
    //await inventoryPage.cartopen()
    //const shoppingCart= new Cart(page)
    //await cartPage.checkoutOpen()
     await goToCheckoutStepOne(inventoryPage,cartPage)
    //const Info= new checkout(page)
   // await checkoutPage.checkoutInfo('Mojgan','Ahmad','')
    await fillCheckoutInfoAndContinue(checkoutPage,checkoutUsers.emptyPostalCode.firstName,checkoutUsers.emptyPostalCode.lastName,checkoutUsers.emptyPostalCode.postalCode)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    console.log('URL',page.url())
    await expect(page.locator('#continue')).toBeVisible()
    await expect(page.locator('#continue')).toBeEnabled()
    await checkoutPage.continueButton()
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
   })

})
  