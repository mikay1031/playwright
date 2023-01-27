import {expect, Locator, Page} from '@playwright/test'

export class InventoryPage {
  //Define selectors
  readonly page: Page
  readonly addToCart: Locator
  readonly removeFromCart: Locator
  readonly cartIcon : Locator
  readonly cartCount: Locator



  //Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page
    this.addToCart = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]')
    this.removeFromCart = page.locator('button[data-test="remove-sauce-labs-backpack"]')
    this.cartIcon = page.locator('#shopping_cart_container')
    this.cartCount = page.locator('.shopping_cart_badge')
 
  }
  //Define inventory page methods
  async AddToCart () {
    await this.addToCart.click()

  }
  async RemoveFromCart () {
    await this.removeFromCart.click()

  }
}