url = require 'url'

module.exports = (path) -> (req, res) ->
  queryString = url.parse(req.url).search or ''
  res.redirect 301, path + queryString
