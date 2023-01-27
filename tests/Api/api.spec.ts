import {test, expect} from '@playwright/test'


test.describe.parallel('API Testing', () => {
   const baseUrl = "https://reqres.in/api"

   test('Assert Response Status - Success', async ({ request }) => {
   const response = await request.get(`${baseUrl}`+'/users/4')
   expect (response.status()).toBe(200)

   const responseBody = JSON.parse(await response.text())
   //console.log(responseBody)

   })
   test('Assert Response Status - Invalid Endpoint', async ({ request }) => {
    const response = await request.get(baseUrl+'/users/non-existing endpoint')
    expect (response.status()).toBe(404)
 
    })

   test('GET Request - Get User Detail', async ({ request }) => {
    const response = await request.get(baseUrl+'/users/1')
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.email).toBeTruthy()
    expect(responseBody.data.first_name).toBe('George')

        })
   test('POST Request - Create New User', async ({ request }) => {
    const response = await request.post(baseUrl+'/users', {
        data: {
            id: 1000,
        },
    })
     const responseBody = JSON.parse(await response.text())
     expect (responseBody.id).toBe(1000)
     expect (responseBody.createdAt).toBeTruthy()
    // console.log(responseBody)
  })
  test('POST Request - Login Success', async ({ request }) => {
    const response = await request.post(baseUrl+'/login', {
         data: {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
        },
    })
     const responseBody = JSON.parse(await response.text())
     expect(response.status()).toBe(200)
     expect(responseBody.token).toBe('QpwL5tke4Pnpja7X4')

  })
  test('POST Request - Login Failed', async ({ request }) => {
    const response = await request.post(baseUrl+'/login', {
         data: {
            email: 'peter@klaven',
     
        },
    })
     const responseBody = JSON.parse(await response.text())
     expect(response.status()).toBe(400)
     expect(responseBody.error).toBe('Missing password')
   

  })
  test('PUT Request - Update User', async ({ request }) => {
    const response = await request.put(baseUrl+'/users/2', {
         data: {
            name: "cheche",
            job:  "president"
         
        },
    })
     const responseBody = JSON.parse(await response.text())
     expect(response.status()).toBe(200)
     expect(responseBody.name).toBe('cheche')
     expect(responseBody.job).toBe('president')
     expect(responseBody.updatedAt).toBeTruthy()
   

  })
  test('DELETE Request - Delete User', async ({ request }) => {
    const response = await request.delete(baseUrl+'/users/2')
    expect(response.status()).toBe(204)
})
})