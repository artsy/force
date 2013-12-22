{ startServer, closeServer } = require '../../../test/helpers/integration'
Browser = require 'zombie'

describe 'Main layout template', ->

  before (done) -> startServer done

  after -> closeServer()

  it 'includes the sharify data', ->
    new Browser().visit 'http://localhost:5000', ->
      browser.wait ->
        browser.html().should.include '__sharifyData = {"JS_EXT":".js"'
        done()