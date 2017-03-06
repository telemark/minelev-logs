'use strict'

module.exports = pathname => {
  const list = pathname.split('/').filter(line => line !== '')
  let result = {
    domain: 'frontpage',
    action: ''
  }
  if (list.includes('logs')) {
    result.domain = 'logs'
  } else if (list.includes('queue')) {
    result.domain = 'queue'
  } else if (list.includes('stats')) {
    result.domain = 'stats'
  }
  return result
}
