{ startServer, closeServer } = require '../../../test/helpers/integration'
Browser = require 'zombie'

describe 'Profile pages', ->

  before (done) -> startServer done

  after -> closeServer()

  it 'renders the profile page', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/alessandra', ->
      browser.wait ->
        browser.html().should.include 'Craig Spaeth'
        browser.html().should.not.include 'undefined'
        done()

  it 'redirects to a shortcut on 404', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/404', ->
      browser.wait ->
        # renders the terms page
        browser.html().should.include 'This <em>page</em> is awesome!'
        done()
