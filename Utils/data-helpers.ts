const crypto = require('crypto')    //crypto package default of nodejs environment

export async function getRandomNumbers() {
    return Math.floor(Math.random() * 10000 + 1)
  
  }
  export async function getRandomString() {
    return crypto.randomBytes(5).toString('hex')
  }