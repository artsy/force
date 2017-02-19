servers = require '../../../test/helpers/servers'
Browser = require 'zombie'
{ fabricate } = require 'antigravity'

describe 'Partner Profile page', ->

  before (done) ->
    servers.setup -> done()

  after ->
    servers.teardown()

  it 'shows the index page', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/gagosian-gallery', ->
      browser.wait ->
        browser.html().should.containEql 'Gagosian Gallery'
        browser.html().should.containEql 'All Shows'
        done()

  it 'shows the index page at /overview', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/gagosian-gallery/overview', ->
      browser.wait ->
        browser.html().should.containEql 'Gagosian Gallery'
        browser.html().should.containEql 'All Shows'
        done()

  it 'shows the list of shows', (done) ->

    browser = new Browser
    browser.visit 'http://localhost:5000/gagosian-gallery/shows', ->
      browser.wait ->
        browser.html().should.containEql 'Upcoming Shows'
        browser.text().should.containEql fabricate('show').name
        done()

  it 'shows partner articles', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/gagosian-gallery/articles', ->
      browser.wait ->
        browser.html().should.containEql 'Articles'
        done()

  it 'shows partner contact information', (done) ->
    browser = new Browser
    browser.visit 'http://localhost:5000/gagosian-gallery/contact', ->
      browser.wait ->
        browser.html().should.containEql 'Contact'
        browser.html().should.containEql 'New York'
        done()

  describe 'Institution Partner Profile page', ->

    xit 'shows permanent works', (done) ->
      browser = new Browser
      browser.visit 'http://localhost:5000/lacma/collection', ->
        browser.wait ->
          browser.html().should.containEql 'Works'
          done()

    xit 'shows for sale works', (done) ->
      browser = new Browser
      browser.visit 'http://localhost:5000/lacma/shop', ->
        browser.wait ->
          browser.html().should.containEql 'Shop'
          done()
