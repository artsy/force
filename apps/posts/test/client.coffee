_               = require 'underscore'
Backbone        = require 'backbone'
benv            = require 'benv'
sinon           = require 'sinon'
sd              = require('sharify').data
FeedItem        = require '../../../components/feed/models/feed_item.coffee'
FeedItems       = require '../../../components/feed/collections/feed_items.coffee'
{ fabricate }   = require 'antigravity'
{ resolve }     = require 'path'
PostsView       = benv.requireWithJadeify(resolve(__dirname, '../client/index.coffee'), [])

describe 'Posts', ->

  before (done) ->
    benv.setup =>
      sd.ARTSY_URL = 'localhost:3003'
      sd.ASSET_PATH = 'assets/'
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      Backbone.$ = $

      PostsView.__set__ 'PoplockitFeed', benv.requireWithJadeify resolve(__dirname, '../../../components/feed/client/poplockit_feed.coffee'), []
      popLockIt = PostsView.__get__ 'PoplockitFeed'
      popLockIt.__set__ 'FeedView', benv.requireWithJadeify resolve(__dirname, '../../../components/feed/client/feed.coffee'), ['feedItemsTemplate', 'feedItemsContainerTemplate']
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  beforeEach ->
    @post = new FeedItem fabricate('post', _type: 'Post')
    @view = new PostsView
      el: $("<div id='posts-page'>
        <div class='feed'></div>
        </div>")
      model: @post
      tab: 'featured'

  describe '#initialize', ->

    xit 'renders posts', ->
      Backbone.sync.args[0][2].success @post
