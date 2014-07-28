{ startServer, closeServer } = require '../../../test/helpers/integration'
Browser = require 'zombie'

describe 'Static page', ->

  before (done) -> startServer done

  after -> closeServer()

  it 'shows the page contents', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/terms', ->
      browser.wait ->
        browser.html().should.containEql 'This <em>page</em> is awesome!'
        done()

  it 'shows the jobs page contents', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/job/terms', ->
      browser.wait ->
        browser.html().should.containEql 'This <em>page</em> is awesome!'
        done()
