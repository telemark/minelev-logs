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
      result.action = 'status'
      result.id = list[1]
    }
  } else if (list.includes('queue')) {
    result.domain = 'queue'
    if (data.method === 'GET') {
      if (list.includes('next')) {
        result.action = 'next'
      } else if (list.includes('count')) {
        result.action = 'count'
      }
    } else if (data.method === 'DELETE') {
      result.action = 'delete'
      result.id = list[1]
    }
  } else if (list.includes('stats')) {
    result.domain = 'stats'
    if (list.includes('total')) {
      result.action = 'total'
    } else if (list.includes('schools')) {
      result.action = 'schools'
    } else if (list.includes('categories')) {
      result.action = 'categories'
    }
  }
  return result
}
