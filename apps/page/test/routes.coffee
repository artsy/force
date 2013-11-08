{ startServer, closeServer } = require '../../../test/helpers/integration'
Browser = require 'zombie'

describe 'Static page', ->
  
  before (done) -> startServer done
  
  after -> closeServer()
  
  it 'shows the page contents', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/terms', ->
      browser.wait ->
        browser.html().should.include 'This <em>page</em> is awesome!'
        done()