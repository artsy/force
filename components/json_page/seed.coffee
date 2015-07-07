JSONPage = require './index'

name = 'how-auctions-work'
data = require '../../apps/how_auctions_work/test/fixture'

page = new JSONPage name: name
page.set data, (err, response) ->
  console.log response
