fs = require 'fs'
jade = require 'jade'
path = require 'path'
benv = require 'benv'

render = (templateName) ->
  filename = path.resolve __dirname, "#{templateName}.jade"
  jade.compile fs.readFileSync(filename), filename: filename

describe 'Share mixin', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        sd:
          APP_URL: 'http://artsy.net'
          CURRENT_PATH: '/artist/andy-warhol'

      done()

  after ->
    benv.teardown()

  beforeEach ->
    @$case1 = $ render('mixin')()
      .find('#case-1')

  afterEach ->
    @$case1.remove()

  it 'renders the appropriate link for sharing on Facebook', ->
    @$case1.find('.share-to-facebook').length
      .should.equal 1

    @$case1.find('.share-to-facebook').attr 'href'
      .should.equal 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol'

  it 'renders the appropriate link for sharing on Twitter', ->
    @$case1.find '.share-to-twitter'
      .should.have.lengthOf 1

    @$case1.find('.share-to-twitter').attr 'href'
      .should.equal 'https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol&text=Andy Warhol on Artsy&url=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol&via=artsy'
