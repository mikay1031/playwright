import { test, expect} from '@playwright/test' 
import { LoginPage } from '../../page-objects/LoginPage'                          

test.describe('Login / Logout Flow', () => {
  let loginPage : LoginPage

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)

    await loginPage.visitLoginPage()

  })

  // Negative Scenario
  test('Valid Login and Logout ', async ({ page }) => {
    
    await loginPage.Login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

    //logout 
    await loginPage.Logout()
    await expect(page).toHaveURL('https://www.saucedemo.com/')

  })
  test('Invalid Login', async ({ page }) => {

    await loginPage.Login('invalid username','invalid password')
    await loginPage.AssertErrorMessage()

})

})
