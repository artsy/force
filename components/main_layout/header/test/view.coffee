HeaderView = require '../view'
benv = require 'benv'
Backbone = require 'backbone'
cheerio = require 'cheerio'

describe 'HeaderView', ->

  beforeEach ->
    benv.setup =>
      Backbone.$ = cheerio.load(document.documentElement.innerHTML) 
      benv.render '../template.jade', {}, =>
        console.log @
        @view = new HeaderView $window: { on: -> }

  it 'hides the welcome header on scroll', ->
    console.log @view