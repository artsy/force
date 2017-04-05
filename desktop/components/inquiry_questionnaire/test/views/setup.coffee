_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../models/current_user'
LoggedOutUser = require '../../../../models/logged_out_user'
Artwork = require '../../../../models/artwork'
ArtworkInquiry = require '../../../../models/artwork_inquiry'
State = require '../../../branching_state/index'
StepView = require '../../views/step'

module.exports = (cb) -> _.wrap cb, (cb) ->
  before (done) ->
    sinon.stub _, 'defer', (cb) -> cb()
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
    benv.teardown()

  beforeEach ->
    @currentUser = new CurrentUser fabricate 'user'
    @loggedOutUser = new LoggedOutUser fabricate 'user'
    @artwork = new Artwork fabricate 'artwork'
    @inquiry = new ArtworkInquiry
    @state = new State

  cb()
