import { InventoryPage } from "../pages/Inventory"

export async function addItemAndOpenCart(inventoryPage,productName:string) {

    await inventoryPage.addToCart(productName)
    await inventoryPage.openCart()
}
export async function goToCheckoutStepOne(inventoryPage,cartPage,productName:string) {
    await addItemAndOpenCart(inventoryPage,productName)
    await cartPage.openCheckout()
 
}
export async function fillCheckoutInfoAndContinue(checkoutPage, first, last, postal) {
  await checkoutPage.checkoutInfo(first, last, postal)
  await checkoutPage.clickContinue()
}

