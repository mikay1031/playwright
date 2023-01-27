import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { InventoryPage } from '../../page-objects/InventoryPage'

test.describe('Add/Remove to Cart', () => {
  let loginPage : LoginPage
  let inventoryPage: InventoryPage

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)

    await loginPage.visitLoginPage()
    await loginPage.Login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

  })

  
    test('Adding Item to cart', async ({ page }) => {

     await inventoryPage.AddToCart()
     await expect(page.locator('button[data-test="remove-sauce-labs-backpack"]')).toBeVisible()

     // Remove Item from Cart
     await inventoryPage.RemoveFromCart()
     await expect(page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible()


    })
    test('Should append items on cart', async ({ page }) => {
        await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]')
   
        await expect(page.locator('button[data-test="remove-sauce-labs-backpack"]')).toBeVisible()
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
   
        // Should remove count of Item from Cart
   
        await page.click('button[data-test="remove-sauce-labs-backpack"]')
   
        await expect(page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible()
        await expect(page.locator('#shopping_cart_container')).toBeVisible()
   
       })
})