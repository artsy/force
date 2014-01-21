jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Favorites and follows tab', ->
  describe 'on the following artists page', ->
    beforeEach ->
      @template = render('index')(
        sd: { type: 'artists', CURRENT_PATH: '/following/artists' }
      )

    it 'should contains three tabs for favorite artworks and followings', ->

      @template.should.include "Works"
      @template.should.include "Artists"
      @template.should.include "Categories"

    it 'should only hightlight the Artists tab ', ->

      @template.should.include '<a href="/following/artists" class="garamond-tab is-active">Artists</a>'
      @template.should.include '<a href="/following/genes" class="garamond-tab is-inactive">Categories</a>'
      @template.should.include '<a href="/favorites" class="garamond-tab is-inactive">Works</a>'
