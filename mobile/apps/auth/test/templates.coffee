jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
cheerio = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(fs.readFileSync(filename), filename: filename)

describe 'Sign up page template', ->
  it 'hides log-in/sign-up header and footer', ->
    render('signup')(sd: { AP: {} }, asset: (->))
      .should.not.containEql 'login-signup'

describe 'Sign up with email template', ->
  it 'hides log-in/sign-up header and footer', ->
    render('signup_email')(sd: { AP: {} }, asset: (->))
      .should.not.containEql 'login-signup'

describe 'Log in page template', ->
  it 'hides log-in/sign-up header and footer', ->
    render('login')(sd: { AP: {} }, asset: (->))
      .should.not.containEql 'login-signup'

  it 'passes the redirectTo param to the signup link', ->
    html = render('login')({redirectTo: '/auction-registration', sd: { AP: {} }, asset: (->)})
    html.should.containEql '/auction-registration'

describe 'Sign up with a call to action', ->
  it 'renders register-for-auction copy', ->
    render('call_to_action')({ action: 'register-for-auction', sd: { AP: {}, CURRENT_PATH: '/sign_up' }, asset: (->) }).should.containEql 'To bid in this auction'

  it 'renders auction-results copy', ->
    render('call_to_action')({ action: 'auction-results', sd: { AP: {}, CURRENT_PATH: '/sign_up' }, asset: (->) }).should.containEql 'To view auction results'

  it 'renders artwork-save copy', ->
    render('call_to_action')(
      { action: 'artwork-save', sd: { AP: {}, CURRENT_PATH: '/sign_up' }, asset: (->) }
    ).should.containEql 'To save artworks you'

  it 'displays correct tab and form', ->
    html = render('call_to_action')(
      action: 'artwork-save'
      redirectTo: 'artsy.net/artwork/some-artwork'
      sd: { AP: {}, CURRENT_PATH: '/sign_up' }
      asset: (->)
    )

    $ = cheerio.load(html)
    $('.auth-page-cta__signup-tab').attr('class').should.containEql 'auth-call-to-action-tabs-active'
    $('#auth-call-to-action-forms li').first().hasClass('auth-call-to-action-form-active').should.be.ok

  it 'contains href when action and redirectTo are present', ->
    html = render('call_to_action')(
      action: 'artwork-save'
      redirectTo: 'artsy.net/artwork/some-artwork'
      sd:
        AP: { signupPagePath: '/sign_up' }
        CURRENT_PATH: '/sign_up'
        asset: (->)
    )

    $ = cheerio.load(html)
    $('.auth-page-cta__signup-tab').attr('href').should.equal '/sign_up?action=artwork-save&redirect-to=artsy.net/artwork/some-artwork'

describe 'Log in with call to action', ->
  it 'displays correct tab and form', ->
    html = render('call_to_action')(
      action: 'artwork-save'
      redirectTo: 'artsy.net/artwork/some-artwork'
      sd: { AP: {}, CURRENT_PATH: '/log_in' }
      asset: (->)
    )

    $ = cheerio.load(html)
    $('.auth-page-cta__login-tab').attr('class').should.containEql 'auth-call-to-action-tabs-active'
    $('#auth-call-to-action-forms li').last().hasClass('auth-call-to-action-form-active').should.be.ok

  it 'contains href when action and redirectTo are present', ->
    @html = render('call_to_action')(
      action: 'artwork-save'
      redirectTo: 'artsy.net/artwork/some-artwork'
      sd:
        AP: { loginPagePath: '/log_in' }
        CURRENT_PATH: '/log_in'
      asset: (->)
    )

    $ = cheerio.load(@html)
    $('.auth-page-cta__login-tab').attr('href').should.equal '/log_in?action=artwork-save&redirect-to=artsy.net/artwork/some-artwork'
