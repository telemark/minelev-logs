const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async query => {
  const db = await mongo()
  const logs = db.collection(process.env.MONGODB_COLLECTION)
  if (query.action === 'find') {
    logger('info', ['handle-classes', 'action', 'find', 'schoolId', query.id])
    try {
      const result = await logs.distinct('studentMainGroupName', { schoolId: query.id }).toArray()
      logger('info', ['handle-classes', 'action', 'find', 'schoolId', query.id, 'classes', result.length])
      return result
    } catch (error) {
      logger('error', ['handle-classes', 'action', 'find', 'schoolId', query.id, error])
      throw error
    }
  } else {
    logger('warn', ['handle-classes', 'action', 'unknown action', query.action])
    return query
  }
}
