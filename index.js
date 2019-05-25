const { send } = require('micro')
const resolveRequest = require('./lib/resolve-request')
const handleLogs = require('./lib/handle-logs')
const handleQueue = require('./lib/handle-queue')
const handleClasses = require('./lib/handle-classes')

module.exports = async (request, response) => {
  const query = await resolveRequest(request)

  if (!query.isValid && query.domain !== 'frontpage') {
    send(response, 401, query)
  } else {
    if (!query.domain === 'frontpage') {
      response.setHeader('Access-Control-Allow-Origin', '*')
    }
    try {
      if (query.domain === 'logs') {
        const result = await handleLogs(query)
        send(response, 200, result)
      } else if (query.domain === 'queue') {
        const result = await handleQueue(query)
        send(response, 200, result)
      } else if (query.domain === 'classes') {
        const result = await handleClasses(query)
        send(response, 200, result)
      }
    } catch (error) {
      console.error(error)
      send(response, 500, error)
    }
  }
}
