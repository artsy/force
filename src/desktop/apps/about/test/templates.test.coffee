$ = require 'cheerio'
_ = require 'underscore'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
template = require('pug').compileFile(require.resolve '../templates/index.pug')
fixture = require './fixture/content.json'
resizer = require '../../../components/resizer'
data = _.extend {}, asset: (->), sd: {}, fixture, resizer, nav: {}, stitch: { components: { NavBar: -> }}

render = (moreData) ->
  template _.extend {}, data, moreData

describe 'About templates', ->
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
