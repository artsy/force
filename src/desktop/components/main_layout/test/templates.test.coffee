jade = require 'jade'
fs = require 'fs'
Profile = require '../../../models/profile'
{ fabricate } = require '@artsy/antigravity'
{ resolve } = require 'path'
sd = require('sharify').data

render = (template) ->
  filename = resolve __dirname, template
  jade.compile fs.readFileSync(filename), filename: filename

describe 'Main layout template', ->
  it 'includes the sharify script', ->
    render('../templates/index.jade')(
      sd: { BROWSER: {}, CURRENT_PATH: '/' }, sharify: { script: -> 'foobar' }, asset: ((p) -> p)
    ).should.containEql '/assets/analytics.js'

  it 'excludes analytics for headless browsers', ->
    render('../templates/index.jade')(
      sd: { BROWSER: { family: 'Other' }, CURRENT_PATH: '/' }
      sharify: { script: -> 'foobar' }
      asset: ((p) -> p)
    ).should.not.containEql '/assets/analytics.js'

  it 'renders user agent, user type, and lab features as a data attribute', ->
    html = render('../templates/index.jade')(
      sd: CURRENT_USER: { lab_features: ['microsite'], type: 'Admin' }
      asset: ((p) -> p)
      userAgent: 'foo'
    )
    html.should.containEql 'data-lab-features="microsite"'
    html.should.containEql 'data-useragent="foo"'
    html.should.containEql 'data-user-type="Admin"'

  it 'can render the page when CURRENT_USER is missing', ->
    render('../templates/index.jade')(
      sd: {}
      asset: ((p) -> p)
    ).should.containEql '<html'

  it 'can render the page when attrs are missing from CURRENT_USER', ->
    render('../templates/index.jade')(
      sd: CURRENT_USER: {}
      asset: ((p) -> p)
    ).should.containEql '<html'

  it 'Does not reCAPTCHA script if RECAPTCHA_KEY is missing', ->
    render('../templates/index.jade')(
      sd: {},
      asset: ((p) -> p)
    ).should.not.containEql 'id="google-recaptcha"'

  it 'Does not reCAPTCHA script if is EIGEN', ->
    render('../templates/index.jade')(
      sd: { EIGEN: true, RECAPTCHA_KEY: sd.RECAPTCHA_KEY },
      asset: ((p) -> p)
    ).should.not.containEql 'id="google-recaptcha"'

  it 'loads reCAPTCHA script if RECAPTCHA_KEY is present', ->
    render('../templates/index.jade')(
      sd: sd,
      asset: ((p) -> p)
    ).should.containEql 'id="google-recaptcha"'

describe 'Head template', ->
  describe 'IS_RESPONSIVE', ->
    it 'renders whether or not there is a user agent', ->
      render('../templates/head.jade')(sd: { IS_RESPONSIVE: true }, options: { marketo: true }, asset: (->))
