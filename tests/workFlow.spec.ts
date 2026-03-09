import {test, expect} from '../Fixture/fixtures.ts'
import { products,checkoutUsers,InvalidCheckout } from '../data/testData.ts';
import { addItemAndOpenCart, fillCheckoutInfoAndContinue, goToCheckoutStepOne} from '../helper/helpers.ts';

test.use({ storageState: 'playwright/.auth/user.json' });
test.describe('Cart', ()=>{
test.beforeEach(async({page})=>{
  await page.goto('https://www.saucedemo.com/inventory.html')
  await expect(page).toHaveURL(/inventory\.html/)
})
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
    await inventoryPage.removeFromInventoryClick(products.backpack)
    await expect(inventoryPage.addToCartButton(products.backpack)).toBeVisible()
    await expect(inventoryPage.cartBadge()).toHaveCount(0)
})
test('remove item from cart', async({page,inventoryPage,cartPage})=>{
    await addItemAndOpenCart(inventoryPage,products.backpack)
    await expect(inventoryPage.cartBadge()).toHaveText('1')
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    await cartPage.removeItemfromCart(products.backpack)
    await expect(cartPage.cartItem(products.backpack)).not.toBeVisible()
    await expect(cartPage.cartItem(products.backpack)).toHaveCount(0)
    await expect(inventoryPage.cartBadge()).toHaveCount(0)
})
})
test.describe('Checkout', () => {
test.beforeEach(async({page})=>{
  await page.goto('https://www.saucedemo.com/inventory.html')
  await expect(page).toHaveURL(/inventory\.html/)
})
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
    const overview =  await checoutReviewPage.checkoutOverview(products.backpack)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    console.log('overview',overview)
    expect(overview.name).toBe(products.backpack);
    expect(overview.qty).toBe('1');
    expect(overview.price).toBe('$29.99');
    const summery = await checoutReviewPage.summaryInfo()
    expect(summery.itemToral).toBeCloseTo(29.99,2)
    expect(summery.tax).toBeCloseTo(2.40,2)
    expect(summery.total).toBeCloseTo(32.39,2)
   
})
    test('user can place order successfully', async({page,inventoryPage,cartPage,checkoutPage,checoutReviewPage, checoutCompletePage})=>{
    await goToCheckoutStepOne(inventoryPage,cartPage,products.backpack)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    await fillCheckoutInfoAndContinue(checkoutPage,checkoutUsers.validUser.firstName,checkoutUsers.validUser.lastName,checkoutUsers.validUser.postalCode)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    const overview =  await checoutReviewPage.checkoutOverview(products.backpack)
    expect(overview.name).toBe(products.backpack)
    expect(overview.qty).toBe('1')
    expect(overview.price).toBe('$29.99')
    const summery = await checoutReviewPage.summaryInfo()
    expect(summery.itemToral).toBeCloseTo(29.99, 2)
    expect(summery.tax).toBeCloseTo(2.40, 2)
    expect(summery.total).toBeCloseTo(32.39, 2)
    await checoutReviewPage.clickFinish()
    await expect(checoutCompletePage.completeHeader()).toHaveText('Thank you for your order!')
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
    await checoutCompletePage.clickBackHome()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page.getByText('Products')).toBeVisible()
    await expect(inventoryPage.cartBadge()).toHaveCount(0)
    })
})

test.describe('Checkout validation', () => {
test.beforeEach(async({page})=>{
  await page.goto('https://www.saucedemo.com/inventory.html')
  await expect(page).toHaveURL(/inventory\.html/)
})
        InvalidCheckout.forEach((data)=>{
        test(`checkout with invalid data ${data.title}`,async({page,inventoryPage,cartPage,checkoutPage})=>{
             await goToCheckoutStepOne(inventoryPage,cartPage,products.backpack)
             await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
             await fillCheckoutInfoAndContinue(checkoutPage,data.firstName,data.lastName,data.postalCode)
             await expect(checkoutPage.continueButton()).toBeVisible()
             await expect(checkoutPage.continueButton()).toBeEnabled()
             await expect(checkoutPage.errorMessage()).toContainText(data.getError)
             console.log('Error',data.getError)
             await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        })
    })
})

  