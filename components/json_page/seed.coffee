JSONPage = require './index'

name = 'about'
data = require '../../apps/about/test/fixture/content'

page = new JSONPage name: name
page.set data, (err, response) ->
  console.log response
