const { ObjectId } = require('mongodb')
const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async query => {
  const db = await mongo()
  const logs = db.collection(process.env.MONGODB_COLLECTION)
  if (query.action === 'add') {
    logger('info', ['handle-logs', 'action', 'add'])
    const data = query.data
    data.isQueued = Object.prototype.hasOwnProperty.call(query.data, 'isQueued') ? query.data.isQueued : true
    try {
      const result = await logs.insertOne(data)
      logger('info', ['handle-logs', 'action', 'add', 'success'])
      return result
    } catch (error) {
      logger('error', ['handle-logs', 'action', 'add', error])
      throw error
    }
  } else if (query.action === 'delete') {
    const id = ObjectId(query.id)
    logger('info', ['handle-logs', 'action', 'delete', 'id', query.id])
    try {
      const result = await logs.deleteOne({ _id: id })
      logger('info', ['handle-logs', 'action', 'delete', 'success', 'id', query.id])
      return result
    } catch (error) {
      logger('error', ['handle-logs', 'action', 'delete', 'id', query.id, error])
      throw error
    }
  } else if (query.action === 'status') {
    const id = ObjectId(query.id)
    const status = {
      status: query.data.status,
      timeStamp: new Date().getTime()
    }
    logger('info', ['handle-logs', 'action', 'status', 'id', query.id])
    try {
      const result = await logs.updateOne({ _id: id }, { $push: { documentStatus: status } })
      logger('info', ['handle-logs', 'action', 'status', 'success', 'id', query.id])
      return result
    } catch (error) {
      logger('error', ['handle-logs', 'action', 'status', 'id', query.id, error])
      throw error
    }
  } else if (query.action === 'find') {
    const id = ObjectId(query.id)
    logger('info', ['handle-logs', 'action', 'find', 'id', query.id])
    try {
      const document = await logs.findOne({ _id: id })
      logger('info', ['handle-logs', 'action', 'find', 'success', 'id', query.id])
      return [document]
    } catch (error) {
      logger('error', ['handle-logs', 'action', 'find', 'id', query.id, error])
      throw error
    }
  } else if (query.action === 'search') {
    logger('info', ['handle-logs', 'action', 'search', 'data', query.data])
    try {
      const documents = await logs.find(query.data).sort({ timeStamp: -1 }).toArray()
      logger('info', ['handle-logs', 'action', 'search', 'data', documents.length, 'success'])
      return documents
    } catch (error) {
      logger('error', ['handle-logs', 'action', 'search', 'data', query.data, error])
      throw error
    }
  } else {
    logger('warn', ['handle-logs', 'action', 'unknown action', query.action])
    return query
  }
}
