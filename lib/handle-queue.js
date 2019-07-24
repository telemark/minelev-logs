const { ObjectId } = require('mongodb')
const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async query => {
  const db = await mongo()
  const logs = db.collection(process.env.MONGODB_COLLECTION)
  if (query.action === 'next') {
    logger('info', ['handle-queue', 'action', 'next'])
    try {
      const documents = await logs.find({ isQueued: true }).sort({ timeStamp: 1 }).limit(1).toArray()
      logger('info', ['handle-queue', 'action', 'next', 'success', documents[0]._id || 'no documents in queue'])
      return documents[0]
    } catch (error) {
      logger('error', ['handle-queue', 'action', 'next', error])
      throw error
    }
  } else if (query.action === 'delete') {
    const id = ObjectId(query.id)
    logger('info', ['handle-queue', 'action', 'delete', 'id', query.id])
    try {
      const documents = await logs.updateOne({ _id: id }, { $set: { isQueued: false } })
      logger('info', ['handle-queue', 'action', 'delete', 'id', query.id, 'deleted'])
      return documents
    } catch (error) {
      logger('error', ['handle-queue', 'action', 'delete', 'id', query.id, error])
      throw error
    }
  } else if (query.action === 'count') {
    logger('info', ['handle-queue', 'action', 'count'])
    try {
      const count = await logs.countDocuments({ isQueued: true })
      logger('info', ['handle-queue', 'action', 'count', 'success', 'found', count])
      return { queue: count }
    } catch (error) {
      logger('error', ['handle-queue', 'action', 'count', error])
      throw error
    }
  } else {
    logger('warn', ['handle-queue', 'action', 'unknown action', query.action])
    return query
  }
}
