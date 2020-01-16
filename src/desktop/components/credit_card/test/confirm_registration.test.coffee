_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Auction = require '../../../models/auction'
CurrentUser = require '../../../models/current_user'
{ resolve } = require 'path'

describe 'ConfirmRegistration', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      ConfirmRegistration = benv.requireWithJadeify(
        resolve(__dirname, '../client/confirm_registration'),
        ['template']
      )
      for method in ['initialize', 'isLoading', 'isLoaded', 'updatePosition']
        sinon.stub ConfirmRegistration.prototype, method
      @view = new ConfirmRegistration
        el: $ """
          <div>
            <div class='credit-card-unqualified-msg'>
              Warning, you are not qualified!
            </div>
          </div>
        """
      @view.auction = new Auction fabricate 'sale', id: 'foo-bar-auction'
      @view.user = new CurrentUser fabricate 'user'
      done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  xdescribe '#postRender', ->

    it 'shows the unqualified bidder warning if the bidder for the auction
        is `qualified_for_bidding` false', ->
      @view.postRender()
      _.last(Backbone.sync.args)[2].success [{
        id: 'foo'
        sale: fabricate('sale', id: 'foo-bar-auction')
      }]
      _.last(Backbone.sync.args)[2].success {
        id: 'foo'
        sale: fabricate('sale', id: 'foo-bar-auction')
        qualified_for_bidding: false
      }
      @view.$('.credit-card-unqualified-msg').is(':visible')
        .should.be.ok()

