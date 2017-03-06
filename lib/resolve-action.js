'use strict'

module.exports = data => {
  const list = data.pathname.split('/').filter(line => line !== '')
  let result = {
    domain: 'frontpage',
    method: data.method,
    action: ''
  }
  if (list.includes('logs')) {
    result.domain = 'logs'
    if (data.method === 'GET') {
      result.action = 'find'
    } else if (data.method === 'PUT') {
      result.action = 'add'
    } else if (data.method === 'POST') {
      result.action = 'update'
    }
  } else if (list.includes('queue')) {
    result.domain = 'queue'
    if (data.method === 'GET') {
      result.action = 'find'
    } else if (data.method === 'PUT') {
      result.action = 'add'
    } else if (data.method === 'POST') {
      result.action = 'update'
    }
  } else if (list.includes('stats')) {
    result.domain = 'stats'
    if (data.method === 'GET') {
      result.action = 'find'
    } else if (data.method === 'PUT') {
      result.action = 'add'
    } else if (data.method === 'POST') {
      result.action = 'update'
    }
  }
  return result
}
