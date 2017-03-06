'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')

module.exports = query => {
  return new Promise((resolve, reject) => {
    if (query.action === 'next') {
      logs.find({isQueued: true}).sort({timeStamp: 1}).limit(1, (error, document) => {
        if (error) {
          reject(error)
        } else {
          resolve(document)
        }
      })
    } else if (query.action === 'delete') {
      const id = mongojs.ObjectId(query.id)
      logs.update({'_id': id}, {isQueued: false}, (error, documents) => {
        if (error) {
          reject(error)
        } else {
          resolve(documents)
        }
      })
    } else if (query.action === 'count') {
      logs.count({isQueued: true}, (error, count) => {
        if (error) {
          reject(error)
        } else {
          resolve({queue: count})
        }
      })
    } else {
      resolve(query)
    }
  })
}
