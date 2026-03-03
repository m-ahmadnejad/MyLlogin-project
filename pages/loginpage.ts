import{Locator, Page} from '@playwright/test'

export class LoginPage{
    private page:Page
    constructor(page:Page){
        this.page=page
    }

async goto(){
 await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
  }   

async login(Username:string,password:string){
    await this.page.getByPlaceholder('Username').fill(Username)
    await this.page.locator('#password').fill(password)
    await this.page.locator('#login-button').click()
    }

  getError(): Locator {
    return this.page.locator('h3[data-test="error"]');
  }
}
