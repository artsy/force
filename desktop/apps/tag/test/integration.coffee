{ startServer, closeServer } = require '../../../test/helpers/integration'
Browser = require 'zombie'

xdescribe 'Tag page', ->

  before (done) -> startServer done

  after -> closeServer()

  it 'shows the tag name', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/tag/cow', ->
      browser.wait ->
        browser.html().should.containEql 'Artwork related to “Cow”'
        done()
