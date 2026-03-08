import { InventoryPage } from "../pages/Inventory"

export async function addItemAndOpenCart(InventoryPage,productName:string) {

    await InventoryPage.addToCart(productName)
    await InventoryPage.openCart()
}
export async function goToCheckoutStepOne(InventoryPage,cartPage,productName:string) {
    await addItemAndOpenCart(InventoryPage,productName)
    await cartPage.openCheckout()
 
}
export async function fillCheckoutInfoAndContinue(checkoutPage, first, last, postal) {
  await checkoutPage.checkoutInfo(first, last, postal)
  await checkoutPage.clickContinue()
}

