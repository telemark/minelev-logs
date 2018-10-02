const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')
const logger = require('./logger')

module.exports = query => {
  return new Promise((resolve, reject) => {
    if (query.action === 'next') {
      logger('info', ['handle-queue', 'action', 'next'])
      logs.find({ isQueued: true }).sort({ timeStamp: 1 }).limit(1, (error, document) => {
        if (error) {
          logger('error', ['handle-queue', 'action', 'next', error])
          reject(error)
        } else {
          logger('info', ['handle-queue', 'action', 'next', 'success', document._id || 'no documents in queue'])
          resolve(document)
        }
      })
    } else if (query.action === 'delete') {
      const id = mongojs.ObjectId(query.id)
      logger('info', ['handle-queue', 'action', 'delete', 'id', query.id])
      logs.update({ '_id': id }, { '$set': { isQueued: false } }, (error, documents) => {
        if (error) {
          logger('error', ['handle-queue', 'action', 'delete', 'id', query.id, error])
          reject(error)
        } else {
          logger('info', ['handle-queue', 'action', 'delete', 'id', query.id, 'deleted'])
          resolve(documents)
        }
      })
    } else if (query.action === 'count') {
      logger('info', ['handle-queue', 'action', 'count'])
      logs.count({ isQueued: true }, (error, count) => {
        if (error) {
          logger('error', ['handle-queue', 'action', 'count', error])
          reject(error)
        } else {
          logger('info', ['handle-queue', 'action', 'count', 'success', 'found', count])
          resolve({ queue: count })
        }
      })
    } else {
      logger('warn', ['handle-queue', 'action', 'unknown action', query.action])
      resolve(query)
    }
  })
}
