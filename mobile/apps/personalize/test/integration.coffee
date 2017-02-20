servers = require '../../../test/helpers/servers'
Browser = require 'zombie'

pageRendered = (window) ->
  return window.document.querySelector(".personalize-header")

opts = { headers: { 'test-loggedin': 'true' } }

xdescribe 'Personalize flow', ->

  before (done) ->
    servers.setup ->
      done()

  after ->
    servers.teardown()

  it 'should render the page and show the collector level selection', (done) ->
    browser = new Browser
    browser.maxWait = 30
    browser.visit 'http://localhost:5000/personalize/collect', opts, ->
      browser.wait pageRendered, ->
        browser.html().should.containEql 'Yes, I buy art'
        browser.html().should.containEql 'Interested in starting'
        browser.html().should.containEql 'Just looking and learning'
        done()

  it 'should display the follow artists search', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/personalize/artists', opts, ->
      browser.wait pageRendered, ->
        browser.html().should.containEql 'Enter an artists’ name here…'
        done()

  it 'should display the price range options', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/personalize/price_range', opts, ->
      browser.wait pageRendered, ->
        browser.html().should.containEql 'Under $500'
        # ...
        browser.html().should.containEql '$100,000+'
        done()
