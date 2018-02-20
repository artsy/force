request = require 'superagent'
{ APP_URL } = require('sharify').data

module.exports.index = (req, res) ->
  url = "#{APP_URL}/contact/data"
  request
    .get(url)
    .end (err, data) ->
      res.render 'template', data: data.body
