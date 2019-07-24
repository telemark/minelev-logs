const { parse } = require('url')
const resolveAction = require('./resolve-action')
const verifyJwt = require('./verify-jwt')

module.exports = request => {
  return new Promise(async (resolve, reject) => {
    const { pathname } = await parse(request.url, true)
    const data = ['POST', 'PUT'].includes(request.method) ? request.body : request.query
    const verified = await verifyJwt(request)
    const action = resolveAction({ pathname: pathname, method: request.method })

    resolve(Object.assign({}, verified, { data: data }, action))
  })
}
