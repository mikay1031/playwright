import { test, expect, chromium} from '@playwright/test'
import { getRandomNumbers, getRandomString } from '../../Utils/data-helpers'

//This is to display the Test Information of your test
test.describe('Tips & Tricks Section', () => {
    test('TestInfo Object', async ({ page }, TestInfo) => {
    await page.goto('https://www.example.com')
      //  console.log(TestInfo.expectedStatus)
      let newNumber = await getRandomNumbers()
      let newString = await getRandomString()

      console.log(newNumber)
      console.log(newString)
    })
// If you want to skip a test running from a certain browser because it is not yet supported try this
   test('Skip a browser', async ({page, browserName}) => {
    test.skip(browserName === 'chromium', 'Feature not ready in chrome browser')
    await page.goto('https://www.example.com')
    
   })
// If you want to skip a flaky/unstable/for refactoring test you can have this (the best practice)
    test('Fixme Annotation', async ({page, browserName}) => {
    test.fixme(browserName === 'chromium', 'Test is not stable, need revision')
    await page.goto('https://www.example.com')

// You can run failed test depending on no. of retries by having this command
// /npx playwright test --config=playwright.config.ts --project=Chromium --retries=3
})
    // Sample of Parameterized Test (array of test)
    const people = [`Cheche`, `Billy`, `Weng`, `Chazzy`, `Mikay`]
    for (const name of people) {
        test(`Running test for ${name}`, async ({page}) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type('#searchTerm', `${name}`)
          //  await page.waitForTimeout(3000)  >>> delay to see the action on headed mode
        })
    }

    // Multiple browser tabs inside 1 browser

    test('Multiple browser tabs inside 1 browser', async ({browser}) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto('http://zero.webappsecurity.com/index.html') 
        await page2.goto('https://app.identifi.com')
        await page3.goto('https://www.facebook.com')
        await page1.waitForTimeout(3000)

    })
})
