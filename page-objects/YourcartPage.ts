import {expect, Locator, Page} from '@playwright/test'

export class YourcartPage {
  //Define selectors
  readonly page: Page
  readonly cartIcon: Locator
  readonly continueShoppingBtn: Locator
  readonly checkOutBtn: Locator
  readonly continueBtn: Locator
  readonly cancelBtn: Locator
  readonly finishBtn: Locator


  //Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page
    this.cartIcon = page.locator('#shopping_cart_container')
    this.continueShoppingBtn = page.locator('#continue-shopping')
    this.checkOutBtn = page.locator('button[data-test="checkout"]')
    this.continueBtn = page.locator('#continue')
    this.cancelBtn = page.locator('#cancel')
    this.finishBtn = page.locator('#finish')

  }
  //Define inventory page methods
  async gotoCart () {
    await this.cartIcon.click()

  }
  async continueShopping () {
    await this.continueShoppingBtn.click()

  }
  async checkOut () {
    await this.checkOutBtn.click()

  }
  async continue () {
    await this.continueBtn.click()

  }
  async cancelCheckout () {
    await this.cancelBtn.click()

  }
  async finishCheckout () {
    await this.finishBtn.click()

  }
}