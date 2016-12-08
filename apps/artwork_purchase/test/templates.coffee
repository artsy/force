_ = require 'underscore'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
artworkJSON = require './artwork_json.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )
describe 'index', ->

  it 'renders the section title', ->
    html = render('index')
      artwork: artworkJSON
      asset: (->)
      sd: {}
    html.should.containEql '<body class="minimal-header body-artwork-purchase">'
    html.should.containEql 'id="purchase-page"'
    html.should.containEql  '<div id="main-layout-header-minimal-title"><a id="purchase-page-header-title" href="/artwork/ioam-yumako-cosmo-oil-on-canvas-2">Back To Artwork</a></div>'

describe 'main', ->
  beforeEach ->
    @html = render('index')
      artwork: artworkJSON
      bodyClass: 'foo-bar'
      asset: (->)
      sd: {}

  it 'renders', ->
    @html.should.containEql '<h2>How it works</h2>'
    @html.should.containEql 'Galerie Jacob Paulett will confirm availability and provide the final quote'
    @html.should.containEql '<h2>Shipping Address</h2>'
    @html.should.containEql '<h2>Message to Galerie Jacob Paulett</h2>'

  it 'renders address form', ->
    @html.should.containEql '<div class="artwork-purchase__address-inputs"><div class="artwork-purchase__input-full-width">'

  it 'renders message box', ->
    @html.should.containEql 'id="artwork-purchase-message"'

  it 'renders summary', ->
    @html.should.containEql '<div class="ap-summary">'

  it 'renders signup if no user', ->
    @html.should.containEql '<form class="ap-signup artwork-purchase__signup_form">'

  it 'renders signup if no user', ->
    html = render('index')
      artwork: artworkJSON
      bodyClass: 'foo-bar'
      asset: (->)
      sd: {}
      user: {}
    html.should.not.containEql '<form class="ap-signup artwork-purchase__signup_form">'

  it 'shows empty message form if no cached purchase is found', ->

  it 'popultes message form if cached purchase is found', ->


# describe 'signup', ->

#   it 'renders the section title', ->
#     html = render('section')
#       articles: new Articles([_.extend(fixtures.article, slug: 'foobar')])
#       crop: (url) -> url
#       moment: moment
#       sd: {}
#       asset: ->
#       section: new Section _.extend _.clone(fixtures.section),
#         title: 'Moo Bar'
#     html.should.containEql 'Moo Bar'



# describe 'success', ->

#   it 'renders the section title', ->
#     html = render('section')
#       articles: new Articles([_.extend(fixtures.article, slug: 'foobar')])
#       crop: (url) -> url
#       moment: moment
#       sd: {}
#       asset: ->
#       section: new Section _.extend _.clone(fixtures.section),
#         title: 'Moo Bar'
#     html.should.containEql 'Moo Bar'

# describe 'summary', ->
#   it 'renders the section title', ->

