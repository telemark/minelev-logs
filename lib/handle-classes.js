const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')
const logger = require('./logger')

module.exports = query => {
  return new Promise((resolve, reject) => {
    if (query.action === 'find') {
      logger('info', ['handle-classes', 'action', 'find', 'schoolId', query.id])
      logs.distinct('studentMainGroupName', {'schoolId': query.id}, (error, result) => {
        if (error) {
          logger('error', ['handle-classes', 'action', 'find', 'schoolId', query.id, error])
          return reject(error)
        } else {
          logger('info', ['handle-classes', 'action', 'find', 'schoolId', query.id, 'classes', result.length])
          return resolve(result)
        }
      })
    } else {
      logger('warn', ['handle-classes', 'action', 'unknown action', query.action])
      return resolve(query)
    }
  })
}
