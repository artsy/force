benv = require 'benv'
Backbone = require 'backbone'
PartnerApplicationRouter = require '../../client/router'

describe 'PartnerApplicationRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  describe '#maybeSetDefaultWebReferrer', ->
    beforeEach ->
      @router = new PartnerApplicationRouter

    it 'sets the default if it does not exist yet', ->
      @router.maybeSetDefaultWebReferrer()
      @router.form.get('00NC0000005RNfN').should.equal 'default'

    it 'does not set if it is already present', ->
      @router.form.set '00NC0000005RNfN', 'inline'
      @router.maybeSetDefaultWebReferrer()
      @router.form.get('00NC0000005RNfN').should.equal 'inline'
