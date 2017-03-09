'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')

module.exports = query => {
  return new Promise((resolve, reject) => {
    if (query.action === 'add') {
      const data = query.data
      data.isQueued = true
      logs.save(data, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    } else if (query.action === 'status') {
      const id = mongojs.ObjectId(query.id)
      const status = {
        status: query.data.status,
        timeStamp: new Date().getTime()
      }
      logs.update({'_id': id}, {'$push': {documentStatus: status}}, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    } else if (query.action === 'find') {
      const id = mongojs.ObjectId(query.id)
      logs.find({_id: id}, (error, documents) => {
        if (error) {
          reject(error)
        } else {
          resolve(documents)
        }
      })
    } else if (query.action === 'search') {
      logs.find(query.data).sort({timeStamp: -1}, (error, documents) => {
        if (error) {
          reject(error)
        } else {
          resolve(documents)
        }
      })
    } else {
      resolve(query)
    }
  })
}
