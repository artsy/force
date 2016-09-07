_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
rewire = require 'rewire'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
artists = require './artists_fixture.coffee'
CurrentUser = require '../../../../../models/current_user.coffee'

describe 'Client', ->

  describe 'display related artists rail', ->
    before (done) ->
      benv.setup =>
        benv.expose
          $: benv.require 'jquery'
          sd: { CLIENT:
            artists: artists
          }
        Backbone.$ = $
        @client = benv.requireWithJadeify require.resolve('../index'), ['artistsTemplate']
        $('body').html """
          <div class='js-artwork-artist-related-rail__content'>
            <div class='mgr-cells js-mgr-cells'>
            </div>
          </div>
        """
        done()

    after ->
      benv.teardown()

    it 'renders related artists template', ->
      @client()
      $('body').find('.artist-cell-item').length.should.equal 7

    it 'displays correct artist info', ->
      $('body').find('.artist-rail-cell__link').first().attr('href').should.equal '/artist/james-rosenquist'
      $('body').find('.artist-cell-item__artist-name').first().text().should.equal 'James Rosenquist'
      $('body').find('.artist-cell-item__followers').first().text().should.equal '106 works, 92 for sale'
