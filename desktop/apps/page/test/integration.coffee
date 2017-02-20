{ startServer, closeServer } = require '../../../test/helpers/integration'
Browser = require 'zombie'

xdescribe 'Static page', ->

  before (done) -> startServer done

  after -> closeServer()

  xit 'shows the page contents', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/terms', ->
      browser.wait ->
        browser.html().should.containEql 'This <em>page</em> is awesome!'
        done()

  xit 'shows the jobs page contents', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/job/terms', ->
      browser.wait ->
        browser.html().should.containEql 'This <em>page</em> is awesome!'
        done()
