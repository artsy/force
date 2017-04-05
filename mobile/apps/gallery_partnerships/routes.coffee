_       = require 'underscore'
request = require 'superagent'
{ APPLICATION_NAME } = require '../../config'

CONTENT_PATH = '/gallery-partnerships/content.json'

getJSON = (callback) ->
  request.get(
    "http://#{APPLICATION_NAME}.s3.amazonaws.com#{CONTENT_PATH}"
  ).end (err, res) ->
    return callback err if err
    try
      callback null, JSON.parse res.text
    catch e
      callback new Error "Invalid JSON " + e

module.exports.index = (req, res, next) ->
  getJSON (err, data) ->
    return next err if err
    res.render 'index', data


module.exports.mktoABTest = (req, res) ->
  a = '/gallery-partnerships?utm_medium=email&utm_source=marketo&utm_campaign=seo-for-galleries&utm_content=partnerships-a'
  b = 'http://pages.artsy.net/gallery-partnerships.html?utm_medium=email&utm_source=marketo&utm_campaign=seo-for-galleries&utm_content=partnerships-b'
  res.redirect if Boolean(_.random 1) then a else b

