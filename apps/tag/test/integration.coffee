{ startServer, closeServer } = require '../../../test/helpers/integration'
Browser = require 'zombie'

describe 'Tag page', ->

  before (done) -> startServer done

  after -> closeServer()

  xit 'shows the tag name', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/tag/cow', ->
      browser.wait ->
        browser.html().should.include 'Artwork related to “Cow”'
        done()