fs = require 'fs'
JSONPage = require './index'

name = 'about'
fixture = require.resolve '../../apps/about/test/fixture/content'

page = new JSONPage name: name
page.get (err, data) ->
  json = JSON.stringify data, null, 4
  fs.writeFileSync fixture, json
