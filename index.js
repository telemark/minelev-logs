'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { send } = require('micro')
const resolveRequest = require('./lib/resolve-request')
const handleLogs = require('./lib/handle-logs')
const handleQueue = require('./lib/handle-queue')
const handleStats = require('./lib/handle-stats')

module.exports = async (request, response) => {
  const query = await resolveRequest(request)

  if (!query.isValid) {
    send(response, 401, query)
  } else {
    if (!query.action === 'frontpage') {
      response.setHeader('Access-Control-Allow-Origin', '*')
    }
    if (query.domain === 'logs') {
      const result = await handleLogs(query)
      send(response, 200, result)
    } else if (query.domain === 'queue') {
      const result = await handleQueue(query)
      send(response, 200, result)
    } else if (query.domain === 'stats') {
      send(response, 200, handleStats(query))
    } else {
      const readme = readFileSync('./README.md', 'utf-8')
      const html = marked(readme)
      send(response, 200, html)
    }
  }
}
