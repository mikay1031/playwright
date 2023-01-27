import {expect, Locator, Page} from '@playwright/test'

export class LoginPage {
  //Define selectors
  readonly page: Page
  readonly userNameInput: Locator
  readonly passwordInput: Locator
  readonly loginBtn: Locator
  readonly errorMessage: Locator
  readonly menuBar: Locator
  readonly logoutBtn: Locator


  //Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page
    this.userNameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.loginBtn = page.locator('#login-button')
    this.errorMessage = page.locator('h3[data-test="error"]')
    this.menuBar = page.locator('#react-burger-menu-btn')
    this.logoutBtn = page.locator('text=Logout')

  }
  //Define login page methods
  async visitLoginPage() {
    await this.page.goto('https://www.saucedemo.com/')

  }
  async Login(username: string, password: string) {
    await this.userNameInput.type(username)
    await this.passwordInput.type(password)
    await this.loginBtn.click()


  }
  async AssertErrorMessage() {
   await expect(this.errorMessage).toContainText(
    'Epic sadface: Username and password do not match any user in this')
    

  }
  async Logout() {
    await this.menuBar.click()
    await this.logoutBtn.click()
   
 
   }
}
