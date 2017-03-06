'use strict'

const { parse } = require('url')
const { json } = require('micro')
const resolveAction = require('./resolve-action')

module.exports = request => {
  return new Promise(async (resolve, reject) => {
    const {pathname, query} = await parse(request.url, true)
    const data = ['POST', 'PUT'].includes(request.method) ? await json(request) : query

    const result = {
      isValid: true,
      data: data
    }

    const action = resolveAction({pathname: pathname, method: request.method})

    resolve(Object.assign(result, action))
  })
}
