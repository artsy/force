_                 = require 'underscore'
benv              = require 'benv'
sinon             = require 'sinon'
Backbone          = require 'backbone'
Artist            = require '../../../../models/artist.coffee'
PersonalizeState  = require '../../client/state'
CurrentUser       = require '../../../../models/current_user.coffee'
{ Following }     = require '../../../../components/follow_button/index.coffee'
{ resolve }       = require 'path'
{ fabricate }     = require 'antigravity'
Followable        = benv.requireWithJadeify resolve(__dirname, '../../client/mixins/followable'), ['followedTemplate']

class TestView extends Backbone.View
  _.extend @prototype, Followable

  initialize: (options) ->
    { @state, @user } = options

    @following = new Following

    @initializeFollowable()

  render: ->
    @$el.html '<div id="personalize-followed"></div><a class="personalize-skip">Skip</a>'
    this

describe 'Followable', ->
  before (done) ->
    benv.setup ->
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @state  = new PersonalizeState
    @user   = new CurrentUser fabricate 'user'
    @view   = new TestView(state: @state, user: @user)

    @view.render()

    @view.$searchInput = $('<input>')

  afterEach ->
    Backbone.sync.restore()

  describe '#follow', ->
    beforeEach ->
      @artist = new Artist fabricate 'artist'

    it 'sets the skip label (once)', ->
      skipSpy = sinon.spy @view, 'setSkipLabel'
      @view.follow({}, @artist)
      skipSpy.called.should.be.ok
      @view.follow({}, @artist)
      skipSpy.callCount.should.equal 1

    it 'follows the artist', ->
      @view.follow($.Event('click'), @artist)
      @view.following.at(0).get('artist').id.should.equal @artist.id
      @view.followed.at(0).id.should.equal @artist.id

  describe '#unfollow', ->
    it 'unfollows the artist', ->
      artist            = new Artist fabricate 'artist'
      e                 = $.Event('click')
      e.currentTarget   = $('<a></a>').data('id', artist.id)
      @view.follow e, artist
      @view.followed.length.should.equal 1
      @view.following.length.should.equal 1

      @view.unfollow e
      @view.followed.length.should.equal 0
      @view.following.length.should.equal 0

  describe '#setSkipLabel', ->
    it 'sets the label to "next" if we are not quite done; "Done" if we are almost done', ->
      $button = @view.$('.personalize-skip')
      $button.text().should.equal 'Skip'
      @view.state.almostDone().should.not.be.ok
      @view.setSkipLabel()
      $button.text().should.equal 'Next'
      @view._labelSet.should.be.ok
      @view.state.setStep(_.last(@view.state.get('steps')))
      @view.state.almostDone().should.be.ok
      @view.setSkipLabel()
      $button.text().should.equal 'Done'

  describe '#renderFollowed', ->
    it 'renders artists when you follow them', ->
      @view.followed.add fabricate 'artist'
      @view.$('.pfa-name').text().should.equal @view.followed.at(0).get('name')
