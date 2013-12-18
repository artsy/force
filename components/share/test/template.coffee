_     = require 'underscore'
jade  = require 'jade'
path  = require 'path'
fs    = require 'fs'
benv  = require 'benv'

render = (templateName) ->
  filename = path.resolve __dirname, "#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Share template', ->
  before (done) ->
    benv.setup =>
      benv.expose {
        $: require 'components-jquery'
        sd: {
          ARTSY_URL: 'http://artsy.net'
          CURRENT_PATH: '/artist/andy-warhol'
        }
      }
      done()

  beforeEach -> @$template = $(render('test')()).find('#case-1')
  afterEach  -> @$template.remove()

  it 'renders the appropriate link for sharing on Facebook', ->
    @$template.find('.share-to-facebook').length.should.equal 1
    @$template.find('.share-to-facebook').attr('href').should.equal 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol'

  it 'renders the appropriate link for sharing on Twitter', ->
    @$template.find('.share-to-twitter').length.should.equal 1
    @$template.find('.share-to-twitter').attr('href').should.equal 'https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol&text=Andy Warhol on Artsy&url=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol'

  it 'renders the appropriate link for sharing on Pinterest', ->
    @$template.find('.share-to-pinterest').length.should.equal 1
    @$template.find('.share-to-pinterest').attr('href').should.equal 'https://pinterest.com/pin/create/button/?url=http%3A%2F%2Fartsy.net%2Fartist%2Fandy-warhol&media=warhol.jpg&description=Andy Warhol on Artsy'
