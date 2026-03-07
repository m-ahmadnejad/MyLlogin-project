import { LoginPage } from '../pages/loginpage'
import{test, expect} from '@playwright/test'


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
