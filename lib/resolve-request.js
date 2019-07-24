const resolveAction = require('./resolve-action')
const verifyJwt = require('./verify-jwt')

module.exports = async request => {
  const data = ['POST', 'PUT'].includes(request.method) ? request.body : request.query
  const verified = await verifyJwt(request)
  const action = resolveAction({ pathname: request.url, method: request.method })

  return Object.assign({}, verified, { data: data }, action)
}
