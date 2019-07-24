const resolveRequest = require('./lib/resolve-request')
const handleLogs = require('./lib/handle-logs')
const handleQueue = require('./lib/handle-queue')
const handleClasses = require('./lib/handle-classes')

module.exports = async (request, response) => {
  const query = await resolveRequest(request)

  if (!query.isValid && query.domain !== 'frontpage') {
    response.status(401)
    response.json(query)
  } else {
    response.setHeader('Access-Control-Allow-Origin', '*')
    try {
      let result = {}
      if (query.domain === 'logs') {
        result = await handleLogs(query)
      } else if (query.domain === 'queue') {
        result = await handleQueue(query)
      } else if (query.domain === 'classes') {
        result = await handleClasses(query)
      }
      response.json(result)
    } catch (error) {
      console.error(error)
      response.status(500)
      response.send(error)
    }
  }
}
