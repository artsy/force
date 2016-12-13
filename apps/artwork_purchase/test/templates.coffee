_ = require 'underscore'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
artworkJSON = require './artwork_json.coffee'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
$ = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )
describe 'index', ->

  it 'renders correctly', ->
    html = render('index')
      artwork: artworkJSON
      asset: (->)
      sd: {}
    html.should.containEql '<body class="minimal-header body-artwork-purchase">'
    html.should.containEql 'id="purchase-page"'
    html.should.containEql  '<div id="main-layout-header-minimal-title"><a id="purchase-page-header-title" href="/artwork/foo-bar-id">Back To Artwork</a></div>'

describe 'main', ->
  beforeEach ->
    @html = render('main')
      artwork: artworkJSON
      asset: (->)
      sd: {}

  it 'renders', ->
    @html.should.containEql '<h2>How it works</h2>'
    @html.should.containEql 'Galerie Foo Bar will confirm availability and provide the final quote'
    @html.should.containEql '<h2>Shipping Address</h2>'
    @html.should.containEql '<h2>Message to Galerie Foo Bar</h2>'

  it 'renders address form', ->
    @html.should.containEql '<div class="artwork-purchase__address-inputs"><div class="artwork-purchase__input-full-width">'

  it 'renders message box', ->
    @html.should.containEql 'id="artwork-purchase-message"'

  it 'renders summary', ->
    @html.should.containEql '<div class="ap-summary">'

  it 'renders signup if no user', ->
    @html.should.containEql '<form class="ap-signup artwork-purchase__signup_form">'

  it 'does not render signup with user', ->
    user = fabricate 'user'
    user.isAdmin = sinon.stub()
    html = render('main')
      artwork: artworkJSON
      asset: (->)
      sd: {}
      user: user
    html.should.not.containEql '<form class="ap-signup artwork-purchase__signup_form">'

  it 'shows empty message form if no cached purchase is found', ->
    @html.should.containEql '<textarea name="message" type="text" id="artwork-purchase-message" class="bordered-input"></textarea>'

  it 'populates message form if cached purchase is found', ->
    user = fabricate 'user'
    user.isAdmin = sinon.stub()
    html = render('main')
      artwork: artworkJSON
      purchase:
        message: 'Foo Bar'
      asset: (->)
      sd: {}

    html.should.containEql '<textarea name="message" type="text" id="artwork-purchase-message" class="bordered-input">Foo Bar</textarea>'

describe 'address form', ->
  it 'prefills purchase data if available', ->
    html = render('address_form')
      purchase:
        name: 'Foo Bar'
        street1: '401 Broadway'
        street2: 'c/o Artsy'
        city: 'New York'
        state: 'NY'
        zip: '10013'
        country: 'USA'

    html.should.containEql 'input name="name" value="Foo Bar"'
    html.should.containEql 'input name="street1" value="401 Broadway"'
    html.should.containEql 'input name="street2" value="c/o Artsy"'
    html.should.containEql 'input name="city" value="New York"'
    html.should.containEql 'input name="state" value="NY"'
    html.should.containEql 'input name="zip" value="10013"'
    html.should.containEql 'input name="country" value="USA"'

  it 'otherwiser renders empty inputs', ->
    html = render('address_form') purchase: {}

    html.should.not.containEql 'value='

describe 'summary', ->
  it 'includes artwork data', ->
    html = render('summary') artwork: artworkJSON
    html.should.containEql "foo-bar.jpg"

    $html = $(html)
    $html.find('.ap-summary__artist').text().should.eql "John Doe"
    $html.find('.ap-summary__title').text().should.eql "Foo Bar"
    $html.find('.ap-summary__partner').text().should.eql "Offered by Galerie Foo Bar"
    $html.find('.ap-summary__price').text().should.containEql 'Price'
    $html.find('.ap-summary__price').text().should.containEql '€9,500'

  it 'includes copy', ->
    html = render('summary') artwork: artworkJSON
    $html = $(html)

    $html.find('.ap-summary__shipping').text().should.containEql 'Shipping'
    $html.find('.ap-summary__shipping').text().should.containEql 'Quoted by seller'

    $html.find('.ap-summary__tax').text().should.containEql 'Tax'
    $html.find('.ap-summary__tax').text().should.containEql 'Quoted by seller'

    $html.find('.ap-summary__total').text().should.containEql 'Total'
    $html.find('.ap-summary__total').text().should.containEql 'Quoted by seller'

    $html.find('.ap-summary button').text().should.eql 'Send Request'

  it 'excludes terms and conditions if logged in', ->
    html = render('summary') artwork: artworkJSON, user: {}

    html.should.not.containEql "You may cancel your purchase within 72 hours after receiving the gallery's quote."

  it 'includes terms and conditions if logged out', ->
    html = render('summary') artwork: artworkJSON
    $html = $(html)

    $html.find('.ap-summary__fine-print').text().should.containEql "By signing up, you agree to our Terms of Use and Privacy Policy."
    $html.find('.ap-summary__fine-print').html().should.containEql "/terms"
    $html.find('.ap-summary__fine-print').html().should.containEql "/privacy"

describe 'sign up', ->
  it 'renders form', ->
    html = render('signup') {}
    $html = $(html)
    $($html.find('label')[0]).text().should.eql 'Full Name'
    $($html.find('input')[0]).attr('placeholder').should.eql 'Full Name'

    $($html.find('label')[1]).text().should.eql 'Email'
    $($html.find('input')[1]).attr('placeholder').should.eql 'Email'

    $($html.find('label')[2]).text().should.eql 'Password'
    $($html.find('input')[2]).attr('placeholder').should.eql 'Password'


describe 'success', ->
  beforeEach ->
    @html = render('success')
      artwork: artworkJSON
      asset: (->)
      sd: {}

  it 'renders body', ->
    @html.should.containEql '<body class="body-artwork-purchase">'
    @html.should.containEql 'id="purchase-page"'

  it 'renders payoff', ->
    $html = $(@html)

    $html.find('.artwork-purchase__artwork-image').attr('src').should.eql 'foo-bar.jpg'
    $html.find('.ap-success__message').text().should.containEql 'Your request has been sent to Galerie Foo Bar'
    $html.find('h1').text().should.eql "What's next?"

    $($html.find('.ap-success__next-step-text .ap-success__step')[0]).text().should.eql 'Galerie Foo Bar will confirm availability'
    $($html.find('.ap-success__next-step-text .ap-success__step')[1]).text().should.eql 'Galerie Foo Bar will issue a quote'
    $($html.find('.ap-success__next-step-text .ap-success__step')[2]).text().should.eql 'You will review the quote and complete payment'
    $($html.find('.ap-success__next-step-text .ap-success__step')[3]).text().should.eql 'Galerie Foo Bar will ship the work to your address'

    $html.find('a.avant-garde-button-black').text().should.eql 'Back to Browsing'
    $html.find('a.avant-garde-button-black').attr('href').should.eql '/artwork/foo-bar-id'
