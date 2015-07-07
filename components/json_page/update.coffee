fs = require 'fs'
JSONPage = require './index'

name = 'how-auctions-work'
fixture = require.resolve '../../apps/how_auctions_work/test/fixture'

page = new JSONPage name: name
page.get (err, data) ->
  json = JSON.stringify data, null, 4
  fs.writeFileSync fixture, json
