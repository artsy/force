servers = require '../../../test/helpers/servers'
Browser = require 'zombie'
sinon = require 'sinon'

xdescribe 'Fair page', ->

  before (done) ->
    servers.setup -> done()

  after ->
    servers.teardown()

  it 'shows the fair info, and featured content', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/thearmoryshow', ->
      browser.wait ->
        browser.html().should.containEql 'Armory Show 2013'
        done()

  it 'shows the index page at /overview', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/thearmoryshow/overview', ->
      browser.wait ->
        browser.html().should.containEql 'Armory Show 2013'
        done()

  it 'shows partner articles', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/thearmoryshow/articles', ->
      browser.wait ->
        browser.html().should.containEql 'Armory Show 2013'
        browser.html().should.containEql 'Articles'
        done()

  it 'shows feed of booths', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/thearmoryshow/browse/booths', ->
      browser.wait ->
        browser.html().should.containEql 'Gagosian Gallery'
        browser.html().should.containEql 'Dock 4'
        browser.html().should.containEql 'Skull</em>, 1999'
        done()
