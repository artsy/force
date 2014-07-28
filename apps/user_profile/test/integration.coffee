{ startServer, closeServer } = require '../../../test/helpers/integration'
Browser = require 'zombie'

describe 'Profile pages', ->

  before (done) -> startServer done

  after -> closeServer()

  it 'renders the profile page', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/alessandra', ->
      browser.wait ->
        browser.html().should.containEql 'Craig Spaeth'
        browser.html().should.not.containEql 'undefined'
        done()

  # TODO: 404 is not a shortcut. This should also be a project-level integration test
  # because it deals with the integration of two apps profile & shortcuts.
  xit 'redirects to a shortcut on 404', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/404', ->
      browser.wait ->
        # renders the terms page
        browser.html().should.containEql 'This <em>page</em> is awesome!'
        done()
