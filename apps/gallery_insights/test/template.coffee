jade = require 'jade'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Gallery Insights Form', ->
  describe 'for a logged in user', ->
    beforeEach ->
      @template = render('index')(
        sd: { CURRENT_USER: fabricate 'user' }
        asset: (->)
      )
    it 'displays their email address and name in input fields', ->
      @template.should.containEql 'Spaeth'
      @template.should.containEql 'Craig'
      @template.should.containEql 'craigspaeth@gmail.com'

  describe 'for a logged out user', ->
    beforeEach ->
      @template = render('index')(
        sd: { }
        asset: (->)
      )
    it 'displays empty inputs', ->
      @template.should.containEql '<input id="EMAIL" type="email" name="EMAIL" required value=""'
      @template.should.containEql '<input id="FNAME" type="text" name="FNAME" value=""'
      @template.should.containEql '<input id="LNAME" type="text" name="LNAME" value=""'
