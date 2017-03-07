'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')

module.exports = query => {
  return new Promise((resolve, reject) => {
    if (query.action === 'total') {
      logs.count({}, (error, count) => {
        if (error) {
          reject(error)
        } else {
          resolve({total: count})
        }
      })
    } else if (query.action === 'schools') {
      logs.aggregate({'$group': {'_id': '$schoolName', 'total': {'$sum': 1}}})
        .sort({'total': -1}, (error, data) => {
          if (error) {
            reject(error)
          } else {
            resolve(data)
          }
        })
    } else if (query.action === 'categories') {
      logs.aggregate({'$group': {'_id': '$documentCategory', 'total': {'$sum': 1}}})
        .sort({'total': -1}, (error, data) => {
          if (error) {
            reject(error)
          } else {
            resolve(data)
          }
        })
    } else {
      resolve(query)
    }
  })
}
