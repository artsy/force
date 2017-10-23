import 'jsdom-global/register'
import { init, __RewireAPI__ as RewireApi } from 'desktop/apps/article2/client/classic'
import sinon from 'sinon'
import Backbone from 'backbone'

describe('Classic Article', () => {
  before(() => {
    const $ = require('jquery')
    $.fn.waypoint = sinon.stub()
    global.$ = $
  })

  beforeEach(() => {
    Backbone.sync = sinon.stub()
  })

  afterEach(() => {
    Backbone.sync.reset()
  })

  it('initializes ArticleView', () => {
    RewireApi.__Rewire__('sd', {
      ARTICLE: {
        title: 'Foo'
      }
    })
    const ArticleView = sinon.stub()
    RewireApi.__Rewire__('ArticleView', ArticleView)
    init()
    ArticleView.args[0][0].article.get('title').should.equal('Foo')
  })

  it('initializes GalleryInsightsView', () => {
    const GalleryInsightsView = sinon.stub()
    RewireApi.__Rewire__('GalleryInsightsView', GalleryInsightsView)
    init()
    GalleryInsightsView.callCount.should.equal(1)
  })

  it('initializes TeamChannelNavView', () => {
    RewireApi.__Rewire__('sd', {
      ARTICLE_CHANNEL: {
        type: 'team'
      }
    })
    const TeamChannelNavView = sinon.stub()
    RewireApi.__Rewire__('TeamChannelNavView', TeamChannelNavView)
    init()
    TeamChannelNavView.callCount.should.equal(1)
  })

  it('initializes ArticlesGridView', () => {
    RewireApi.__Rewire__('sd', {
      ARTICLE_CHANNEL: {
        type: 'team',
        id: '123',
        name: 'Team Channel'
      }
    })
    const ArticlesGridView = sinon.stub()
    RewireApi.__Rewire__('ArticlesGridView', ArticlesGridView)
    init()
    ArticlesGridView.callCount.should.equal(1)
    ArticlesGridView.args[0][0].header.should.equal('More from Team Channel')
    Backbone.sync.callCount.should.equal(1)
  })
})
