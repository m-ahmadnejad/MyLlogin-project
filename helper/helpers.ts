
export async function addItemAndOpenCart(inventoryPage) {

    await inventoryPage.addToCart('Sauce Labs Backpack')
    await inventoryPage.cartopen()
}
export async function goToCheckoutStepOne(inventoryPage,cartPage) {
    await addItemAndOpenCart(inventoryPage)
    await cartPage.checkoutOpen()
 
}
export async function fillCheckoutInfoAndContinue(checkoutPage, first, last, postal) {
  await checkoutPage.checkoutInfo(first, last, postal)
  await checkoutPage.continueButton()
}

