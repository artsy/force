import 'jsdom-global/register'
import _ from 'underscore'
import sinon from 'sinon'
import Backbone from 'backbone'
import benv from 'benv'

const $ = require('jquery')(window)

describe('Classic Article', () => {
  let init
  let RewireApi

  beforeEach((done) => {
    benv.setup(() => {
      benv.expose({
        $: benv.require('jquery'),
        jQuery: benv.require('jquery')
      })
      Backbone.$ = window.$
      sinon.stub(Backbone, 'sync')

      const classic = require('desktop/apps/article2/client/classic')
      init = classic.init
      RewireApi = classic.__RewireAPI__
      RewireApi.__Rewire__('$', window.$)
      done()
    })
  })

  afterEach(() => {
    Backbone.sync.restore()
    benv.teardown()
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

  it('sets up promoted content gallery', (done) => {
    RewireApi.__Rewire__('sd', {
      ARTICLE: {
        title: 'Foo',
        partner_ids: ['789'],
        channel_id: '123'
      },
      PC_ARTSY_CHANNEL: '123',
      PC_AUCTION_CHANNEL: null
    })
    const data = {
      partner: {
        name: 'Lisson Gallery',
        type: 'Gallery',
        profile: {
          href: 'lisson-gallery',
          image: ''
        }
      }
    }
    RewireApi.__Rewire__('metaphysics', sinon.stub().resolves(data))
    $('body').html('<div id="articles-show"></div>')
    init()
    _.defer(() => {
      const html = $('#articles-show').html()
      html.should.containEql('Promoted Content')
      html.should.containEql('Lisson Gallery')
      html.should.containEql('Explore Gallery')
      done()
    })
  })

  it('sets up promoted content auctions', (done) => {
    RewireApi.__Rewire__('sd', {
      ARTICLE: {
        title: 'Foo',
        auction_ids: ['789'],
        channel_id: '123'
      },
      PC_ARTSY_CHANNEL: null,
      PC_AUCTION_CHANNEL: '123'
    })
    const data = {
      sale: {
        name: 'Summer School',
        href: '/auction/summer-school',
        cover_image: ''
      }
    }
    RewireApi.__Rewire__('metaphysics', sinon.stub().resolves(data))
    $('body').html('<div id="articles-show"></div>')
    init()
    _.defer(() => {
      const html = $('#articles-show').html()
      html.should.containEql('Promoted Content')
      html.should.containEql('Summer School')
      html.should.containEql('Explore Auction')
      done()
    })
  })
})
