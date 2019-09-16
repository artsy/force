express = require 'express'

app = module.exports = express()

app.all '/style-guide', (req, res) ->
  res.redirect 301, "https://palette.artsy.net/"

