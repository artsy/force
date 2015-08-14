JSONPage = require './index'

name = 'contact'
data = require '../../apps/contact/test/fixture'

page = new JSONPage name: name
page.set data, (err, response) ->
  console.log response
