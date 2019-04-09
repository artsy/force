jade = require 'jade'
path = require 'path'
fs = require 'fs'
cheerio = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe "Auth Templates", ->
  describe "forgot", ->
    it "renders the forgot password form", ->
      template = render('forgot')()
      $ = cheerio.load template
      $('#auth-submit').text().should.containEql 'Send me reset instructions'
      $('.auth-toggle').text().should.containEql 'I remember it!'
      $('.auth-mode-toggle').text().should.containEql 'Don’t have an account?'

    it "populates the email field", ->
      email = 'user@example.com'
      template = render('forgot')(
        email: email
      )
      $ = cheerio.load template
      $('input[name="email"]').val().should.containEql email

  describe "set password", ->
    it "renders a modified version of the forgot password form", ->
      template = render('forgot')(
        setPassword: true
      )
      $ = cheerio.load template
      $('#auth-submit').text().should.containEql 'Submit'
      $('.auth-toggle').length.should.equal(0)
      $('.auth-mode-toggle').length.should.equal(0)
      $('.auth-form p').text().should.containEql 'Get a unique link sent to your email and finish creating your account.'
