$ = require 'cheerio'
_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../models/current_user'
template = require('jade').compileFile(require.resolve '../templates/index.jade')
fixture = require './fixture/content.json'
resizer = require '../../../components/resizer'
data = _.extend {}, asset: (->), sd: {}, fixture, resizer, nav: {}, stitch: { components: { NavBar: -> }}

render = (moreData) ->
  template _.extend {}, data, moreData

describe 'About templates', ->
  describe 'iPhone App block on About page', ->
    it 'displays iPhone app section header', ->
      $(render()).find('#the-art-world-online').html()
        .should.containEql 'The Artsy iPhone App'
      
    it 'displays iPhone app section blurb', ->
      $(render()).find('#the-art-world-online').html()
        .should.containEql 'Our iPhone app allows you to browse, save, learn about, and collect from your phone. It also serves as a personalized, on-the-ground guide to any art fair we feature on Artsy.'

    it 'does not display the text me a download link to the iPhone app', ->
      $(render()).find('#the-art-world-online').html()
        .should.not.containEql 'Text me a download link'

  describe 'logged out', ->
    it 'displays the sign up CTA', ->
      $(render()).find('#the-art-world-online').html()
        .should.containEql 'Sign up to save'

  describe 'logged in', ->
    beforeEach ->
      @user = new CurrentUser fabricate 'user'

    it 'hides the sign up CTA', ->
      $(render user: @user).find('#the-art-world-online').html()
        .should.not.containEql 'Sign up to save'
