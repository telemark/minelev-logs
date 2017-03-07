'use strict'

module.exports = {
  DB: process.env.DB || 'mongodb://localhost/louie',
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go'
}
