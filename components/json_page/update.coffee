fs = require 'fs'
JSONPage = require './index'

name = 'contact'
fixture = require.resolve '../../apps/contact/test/fixture'

page = new JSONPage name: name
page.get (err, data) ->
  json = JSON.stringify data, null, 4
  fs.writeFileSync fixture, json
