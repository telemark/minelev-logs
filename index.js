'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { send } = require('micro')
const resolveRequest = require('./lib/resolve-request')

module.exports = async (request, response) => {
  const query = await resolveRequest(request)

  if (!query.action === 'frontpage') {
    response.setHeader('Access-Control-Allow-Origin', '*')
  }

  if (query.domain === 'logs') {
    send(response, 200, query)
  } else if (query.domain === 'queue') {
    send(response, 200, query)
  } else if (query.domain === 'stats') {
    send(response, 200, query)
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    const html = marked(readme)
    send(response, 200, html)
  }
}
