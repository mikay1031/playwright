import { test, expect } from '@playwright/test'

test.describe('Filter Products', () => {
    // Before Hook
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/')
      await page.type('#user-name',  'standard_user')
      await page.type('#password', 'secret_sauce')
      await page.click('#login-button')
  
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })
  
    test('Filter Product by A to Z', async ({ page }) => {
     await page.selectOption('.product_sort_container','az')

     await expect(page.locator('#item_4_title_link')).toHaveCount(1)

    })
    test('Filter Product by Z to A ', async ({ page }) => {
        await page.selectOption('.product_sort_container','za')
   
        await expect(page.locator('#item_3_title_link')).toHaveCount(1)
   
       })
       test('Filter Product by Low price to High Price ', async ({ page }) => {
        await page.selectOption('.product_sort_container','lohi')
   
        await expect(page.locator('#item_2_title_link')).toHaveCount(1)
   
       })
       test('Filter Product by High Price to Low Price ', async ({ page }) => {
        await page.selectOption('.product_sort_container','hilo')
   
        await expect(page.locator('#item_5_title_link')).toHaveCount(1)
   
       })

})
    