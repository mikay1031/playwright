import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { YourcartPage } from '../../page-objects/YourcartPage'


test.describe('All about cart page', () => {
  let loginPage : LoginPage
  let yourcartPage: YourcartPage
  
  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    yourcartPage = new YourcartPage(page)

    await loginPage.visitLoginPage()
    await loginPage.Login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

  })
  
    test('Navigate to cart page', async ({ page }) => {
      await yourcartPage.gotoCart()
     //await page.click('#shopping_cart_container')

     await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')

    })

    test('Navigate to homepage', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/cart.html')
        await yourcartPage.continueShopping()
         
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
   
       })
        test('Checkout an Item in cart', async ({ page }) => {
        await page.click('#add-to-cart-sauce-labs-fleece-jacket')
        await yourcartPage.gotoCart()
       
        await expect(page.locator('.cart_quantity')).toContainText('1')

       //process checkout step1
         await yourcartPage.checkOut()
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        await page.type('#first-name','My First Name')
        await page.type('#last-name','My Last Name')
        await page.type('#postal-code','0123456')
        await yourcartPage.continue()


        //process checkout step2
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await expect(page.locator('#item_5_title_link')).toBeVisible()

        //complete order
        await yourcartPage.finishCheckout()
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
        
        const successOrderMessage = await page.locator('h2')
        await expect(successOrderMessage).toContainText('THANK YOU FOR YOUR ORDER')
        
   
       })
       test('Cancel checkout', async ({ page }) => {
        await page.click('#add-to-cart-sauce-labs-fleece-jacket')
        await page.click('#shopping_cart_container')
        await expect(page.locator('.cart_quantity')).toContainText('1')

       //process cancel checkout
        await yourcartPage.checkOut()
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        await yourcartPage.cancelCheckout()

        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
      
       // remove the item from cart
       await page.click('#remove-sauce-labs-fleece-jacket')
       await expect(page.locator('.cart_quantity')).not.toBeVisible()
       })
  
       test('Continue Shopping', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/cart.html')
        await yourcartPage.continueShopping()
   
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
       })
})
  