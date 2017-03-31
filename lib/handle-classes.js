'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')

module.exports = query => {
  return new Promise((resolve, reject) => {
    if (query.action === 'find') {
      logs.distinct('studentMainGroupName', {'schoolId': query.id}, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    } else {
      resolve(query)
    }
  })
}
