'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = request => {
  return new Promise((resolve, reject) => {
    const bearerToken = request.headers.authorization
    if (bearerToken) {
      const token = bearerToken.replace('Bearer ', '')
      jwt.verify(token, config.JWT_SECRET, (error, decoded) => {
        if (error) {
          resolve({isValid: false, error: JSON.stringify(error)})
        } else {
          resolve({isValid: true})
        }
      })
    } else {
      resolve({isValid: false})
    }
  })
}
