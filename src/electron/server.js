const express = require('express')
const Http = require('http')
const { join } = require('path')

const expressApp = express()
const http = Http.Server(expressApp)

expressApp.use(express.static(join(__dirname, '../../dist')))
expressApp.use(express.json())

expressApp.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../../dist/index.html'))
})

expressApp.post('/opts', (req, res) => {
  const { oot } = req.body
  global.win.setAlwaysOnTop(oot === 'true')
  res.sendStatus(200)
})

exports.http = http
