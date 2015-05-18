JSONPage = require './index'

name = 'jobs'
data = require '../../apps/jobs/test/fixture'

page = new JSONPage name: name
page.set data, (err, response) ->
  console.log response
