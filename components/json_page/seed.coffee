JSONPage = require './index'

name = 'in-the-media'
data = require '../../apps/press/test/fixtures/in_the_media'

page = new JSONPage name: name
page.set data, (err, response) ->
  console.log response
