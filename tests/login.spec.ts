import { LoginPage } from '../pages/loginpage'
import{test, expect} from '@playwright/test'
import { validUsers, invalidUsers} from '../data/loginData'

validUsers.forEach((user)=>{
test(`valid login for ${user.username}`, async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.login(user.username,user.password)
    await expect(page.locator('text=Products')).toBeVisible()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})
})
invalidUsers.forEach((user)=>{
test(`invalid login for ${user.username}`, async({page})=>{
    const loginpage =new LoginPage(page)
    await loginpage.login(user.username,user.password)
    await expect( loginpage.getError()).toBeVisible()
    await expect(loginpage.getError()).toContainText(user.error);
    
})
})

