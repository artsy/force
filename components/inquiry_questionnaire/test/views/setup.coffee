_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../models/current_user'
LoggedOutUser = require '../../../../models/logged_out_user'
Artwork = require '../../../../models/artwork'
State = require '../../../branching_state/index.coffee'

module.exports = (cb) -> _.wrap cb, (cb) ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @currentUser = new CurrentUser fabricate 'user'
    @loggedOutUser = new LoggedOutUser fabricate 'user'
    @artwork = new Artwork fabricate 'artwork'
    @state = new State

  cb()
