servers = require '../../../test/helpers/servers'
Browser = require 'zombie'

describe 'Dev blank page page', ->

  before (done) ->
    servers.setup -> done()

  after ->
    servers.teardown()

  it 'hosts a blank page that native apps can use for caching', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/dev/blank', ->
      browser.wait ->
        browser.html().should.containEql '<main></main>'
        done()
