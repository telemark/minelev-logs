const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')
const logger = require('./logger')

module.exports = query => {
  return new Promise((resolve, reject) => {
    if (query.action === 'add') {
      logger('info', ['handle-logs', 'action', 'add'])
      const data = query.data
      data.isQueued = query.data.hasOwnProperty('isQueued') ? query.data.isQueued : true
      logs.save(data, (error, result) => {
        if (error) {
          logger('error', ['handle-logs', 'action', 'add', error])
          return reject(error)
        } else {
          logger('info', ['handle-logs', 'action', 'add', 'success'])
          return resolve(result)
        }
      })
    } else if (query.action === 'delete') {
      const id = mongojs.ObjectId(query.id)
      logger('info', ['handle-logs', 'action', 'delete', 'id', query.id])
      logs.remove({ '_id': id }, true, (error, data) => {
        if (error) {
          logger('error', ['handle-logs', 'action', 'delete', 'id', query.id, error])
          return reject(error)
        } else {
          logger('info', ['handle-logs', 'action', 'delete', 'success', 'id', query.id])
          return resolve(data)
        }
      })
    } else if (query.action === 'status') {
      const id = mongojs.ObjectId(query.id)
      const status = {
        status: query.data.status,
        timeStamp: new Date().getTime()
      }
      logger('info', ['handle-logs', 'action', 'status', 'id', query.id])
      logs.update({ '_id': id }, { '$push': { documentStatus: status } }, (error, data) => {
        if (error) {
          logger('error', ['handle-logs', 'action', 'status', 'id', query.id, error])
          return reject(error)
        } else {
          logger('info', ['handle-logs', 'action', 'status', 'success', 'id', query.id])
          return resolve(data)
        }
      })
    } else if (query.action === 'find') {
      const id = mongojs.ObjectId(query.id)
      logger('info', ['handle-logs', 'action', 'find', 'id', query.id])
      logs.find({ _id: id }, (error, documents) => {
        if (error) {
          logger('error', ['handle-logs', 'action', 'find', 'id', query.id, error])
          return reject(error)
        } else {
          logger('info', ['handle-logs', 'action', 'find', 'success', 'id', query.id])
          return resolve(documents)
        }
      })
    } else if (query.action === 'search') {
      logger('info', ['handle-logs', 'action', 'search', 'data', query.data])
      logs.find(query.data).sort({ timeStamp: -1 }, (error, documents) => {
        if (error) {
          logger('error', ['handle-logs', 'action', 'search', 'data', query.data, error])
          return reject(error)
        } else {
          logger('info', ['handle-logs', 'action', 'search', 'data', query.data, 'success'])
          return resolve(documents)
        }
      })
    } else {
      logger('warn', ['handle-logs', 'action', 'unknown action', query.action])
      return resolve(query)
    }
  })
}
