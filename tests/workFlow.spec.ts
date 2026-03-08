import {test, expect} from '../Fixture/fixtures.ts'
import { invalidUsers } from '../data/loginData.ts';
import { products,checkoutUsers,InvalidCheckout } from '../data/testData.ts';
import { addItemAndOpenCart, fillCheckoutInfoAndContinue, goToCheckoutStepOne} from '../helper/helpers.ts';
import { InventoryPage } from '../pages/Inventory.ts';
test.beforeEach(async({page})=>{
  await page.goto('https://www.saucedemo.com/inventory.html')
  await expect(page).toHaveURL(/inventory\.html/)
})
test.use({ storageState: 'playwright/.auth/user.json' });
test.describe('Cart', ()=>{
test('add item to cart', async({page, inventoryPage})=>{
      console.log('URL after goto:', page.url());
      await inventoryPage.addToCart(products.backpack)
})
test('verfying shopping cart item', async({page, inventoryPage,cartPage})=>{
    await addItemAndOpenCart(inventoryPage,products.backpack)
    await expect(cartPage.cartItem(products.backpack)).toBeVisible()
    await expect(inventoryPage.cartBadge()).toHaveText('1')
})
test('remove item from inventory page', async ({page,inventoryPage,cartPage})=>{
    await inventoryPage.addToCart(products.backpack)
    await expect(inventoryPage.cartBadge()).toHaveText('1')
    await inventoryPage.removeFromInventory(products.backpack)
    const wrapper = page.locator('.inventory_item').filter({has:page.getByText(products.backpack, {exact:true})})
    await expect(wrapper.getByRole('button', {name : 'Add to cart'})).toBeVisible()
    await expect(inventoryPage.cartBadge()).toHaveCount(0)
})
test('remove item from cart', async({page,inventoryPage,cartPage})=>{
    await addItemAndOpenCart(inventoryPage,products.backpack)
    await expect(inventoryPage.cartBadge()).toHaveText('1')
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    await cartPage.removeItemfromCart(products.backpack)
    const wrapper = page.locator('.cart_item').filter({has:page.getByText(products.backpack, {exact:true})})
    await expect(wrapper.getByRole('button', {name : 'Remove'})).not.toBeVisible()
    await expect(wrapper).toHaveCount(0)
})
})
test.describe('Checkout', () => {
test('checkout process',async({page,inventoryPage,cartPage,checkoutPage})=>{
    await goToCheckoutStepOne(inventoryPage,cartPage,products.backpack)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    await fillCheckoutInfoAndContinue(checkoutPage,checkoutUsers.validUser.firstName,checkoutUsers.validUser.lastName,checkoutUsers.validUser.postalCode)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
})
test('checkout review', async({page,inventoryPage,cartPage,checkoutPage,checoutReviewPage})=>{
    await goToCheckoutStepOne(inventoryPage,cartPage,products.backpack)
    await fillCheckoutInfoAndContinue(checkoutPage,checkoutUsers.validUser.firstName,checkoutUsers.validUser.lastName,checkoutUsers.validUser.postalCode)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    const overview =  await checoutReviewPage.checkoutOverview('Sauce Labs Backpack')
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
    await goToCheckoutStepOne(inventoryPage,cartPage,products.backpack)
    await fillCheckoutInfoAndContinue(checkoutPage,checkoutUsers.validUser.firstName,checkoutUsers.validUser.lastName,checkoutUsers.validUser.postalCode)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    const overview =  await checoutReviewPage.checkoutOverview('Sauce Labs Backpack')
    await checoutReviewPage.clickFinish()
    await expect(page.locator('h2.complete-header')).toHaveText('Thank you for your order!')
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
    await checoutCompletePage.clickBackHome()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page.getByText('Products')).toBeVisible()
    const CartBage = inventoryPage.cartBadge()
    await expect(CartBage).toHaveCount(0)
    })
})

test.describe('Checkout validation', () => {
        InvalidCheckout.forEach((data)=>{
        test(`checkout with invalid data ${data.title}`,async({page,inventoryPage,cartPage,checkoutPage})=>{
             await goToCheckoutStepOne(inventoryPage,cartPage,products.backpack)
             await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
             await fillCheckoutInfoAndContinue(checkoutPage,data.firstName,data.lastName,data.postalCode)
             await expect(page.locator('#continue')).toBeVisible()
             await expect(page.locator('#continue')).toBeEnabled()
             await expect(await checkoutPage.errorMessage()).toContainText(data.getError)
             console.log('Error',data.getError)
             await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        })
    })
})

  