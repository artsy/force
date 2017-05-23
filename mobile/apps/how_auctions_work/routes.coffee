request = require 'superagent'
sd = require('sharify').data

module.exports.index = (req, res) ->
  url = "#{sd.APP_URL}/how-auctions-work/data"
  request
    .get(url)
    .end (err, data) ->
      res.locals.sd.HOW_AUCTIONS_WORK = data.body
      res.render 'index'
