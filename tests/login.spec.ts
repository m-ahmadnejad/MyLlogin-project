import { LoginPage } from '../pages/loginpage'
import{test, expect} from '@playwright/test'
import { inventoryPage } from '../pages/Inventory'
import { Cart } from '../pages/cart'
import { checkout } from '../pages/checkout'
import { CheckouStep2 } from '../pages/checkoutStep2'
import { CheckoutCompeletPage } from '../pages/checkout-complete'
test.beforeEach(async({page})=>{
    const loginpage= new LoginPage(page)
    await loginpage.goto()
})
test('successfull login ', async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.login('standard_user','secret_sauce')
    await expect(page.locator('text=Products')).toBeVisible()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})
test('unsuccessfull login', async({page})=>{
    const loginpage =new LoginPage(page)
    await loginpage.login('test','test')
    await expect( loginpage.getError()).toBeVisible()
    await expect(loginpage.getError()).toContainText('Epic')
})
test('add item to cart', async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.login('standard_user','secret_sauce')
    const inventorupage= new inventoryPage(page)
    await inventorupage.addToCart('Sauce Labs Backpack')
})
test('verfying shopping cart item', async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.login('standard_user','secret_sauce')
    const inventorupage= new inventoryPage(page)
    await inventorupage.addToCart('Sauce Labs Backpack')
    await inventorupage.cartopen()
    const shoppingCart= new Cart(page)
    await expect(shoppingCart.cartItem('Sauce Labs Backpack')).toBeVisible()
    await expect(inventorupage.cartBage()).toHaveText('1')
})

test('checkout process',async({page})=>{
    
    const loginPage = new LoginPage(page)
    await loginPage.login('standard_user','secret_sauce')
    const inventorupage= new inventoryPage(page)
    await inventorupage.addToCart('Sauce Labs Backpack')
    await inventorupage.cartopen()
    const shoppingCart= new Cart(page)

    await shoppingCart.checkoutOpen()

    const Info= new checkout(page)
    await Info.checkoutInfo('mojgan','Ahmad','123')
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
})
test.only('checkout review', async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.login('standard_user','secret_sauce')
    const inventorupage= new inventoryPage(page)
    await inventorupage.addToCart('Sauce Labs Backpack')
    await inventorupage.cartopen()
    const shoppingCart= new Cart(page)

    await shoppingCart.checkoutOpen()

    const Info= new checkout(page)
    await Info.checkoutInfo('Mojgan','test','123')
    const checkoutReview= new CheckouStep2(page)
    const overview =  await checkoutReview.CheckoutOverview('Sauce Labs Backpack')
    console.log('overview',overview)
    expect(overview.name).toBe('Sauce Labs Backpack');
    expect(overview.qty).toBe('1');
    expect(overview.price).toBe('$29.99');

    const summery = await checkoutReview.summaryInfo()
     expect(summery.itemToral).toBeCloseTo(29.99,2)
    expect(summery.tax).toBeCloseTo(2.40,2)
    expect(summery.total).toBeCloseTo(32.39,2)

    await checkoutReview.checkoutFinish()
    const compeletPage = new CheckoutCompeletPage(page)
    
    await expect(page.locator('h2.complete-header')).toHaveText('Thank you for your order!')
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
    compeletPage.BackHome()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page.getByText('Products')).toBeVisible()
    const CartBage = inventorupage.cartBage()
    await expect(CartBage).toHaveCount(0)

    
  


})
