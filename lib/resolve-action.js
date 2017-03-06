'use strict'

module.exports = pathname => {
  const list = pathname.split('/').filter(line => line !== '')
  let action = 'frontpage'
  if (list.includes('logs')) {
    action = 'logs'
  } else if (list.includes('queue')) {
    action = 'queue'
  } else if (list.includes('stats')) {
    action = 'stats'
  }
  return action
}
