import 'jsdom-global/register'
import _ from 'underscore'
import sinon from 'sinon'
import Backbone from 'backbone'
import benv from 'benv'

const $ = require('jquery')(window)

describe('Classic Article', () => {
  let init
  let classic
  let rewires = []

  beforeEach((done) => {
    benv.setup(() => {
      benv.expose({
        $: benv.require('jquery'),
        jQuery: benv.require('jquery'),
      })
      Backbone.$ = window.$
      sinon.stub(Backbone, 'sync')

      classic = require('rewire')('../classic')
      rewires.push(classic.__set__('$', window.$))
      init = classic.init
      done()
    })
  })

  afterEach(() => {
    Backbone.sync.restore()
    benv.teardown()
    rewires.forEach((revert) => revert())
  })

  it('initializes ArticleView', () => {
    classic.__set__('sd', {
      ARTICLE: {
        title: 'Foo',
      },
    })
    const ArticleView = sinon.stub()
    classic.__set__('ArticleView', ArticleView)
    init()
    ArticleView.args[0][0].article.get('title').should.equal('Foo')
  })

  it('initializes GalleryInsightsView', () => {
    const GalleryInsightsView = sinon.stub()
    classic.__set__('ArticleView', sinon.stub())
    classic.__set__('GalleryInsightsView', GalleryInsightsView)
    init()
    GalleryInsightsView.callCount.should.equal(1)
  })

  it('initializes TeamChannelNavView', () => {
    classic.__set__('sd', {
      ARTICLE_CHANNEL: {
        type: 'team',
      },
    })
    const TeamChannelNavView = sinon.stub()
    classic.__set__('ArticleView', sinon.stub())
    classic.__set__('TeamChannelNavView', TeamChannelNavView)
    init()
    TeamChannelNavView.callCount.should.equal(1)
  })

  it('initializes ArticlesGridView', () => {
    classic.__set__('sd', {
      ARTICLE_CHANNEL: {
        type: 'team',
        id: '123',
        name: 'Team Channel',
      },
    })
    const ArticlesGridView = sinon.stub()
    classic.__set__('ArticleView', sinon.stub())
    classic.__set__('ArticlesGridView', ArticlesGridView)
    init()
    ArticlesGridView.callCount.should.equal(1)
    ArticlesGridView.args[0][0].header.should.equal('More from Team Channel')
    Backbone.sync.callCount.should.equal(1)
  })

  xit('sets up promoted content gallery', (done) => {
    classic.__set__('sd', {
      ARTICLE: {
        title: 'Foo',
        partner_ids: ['789'],
        channel_id: '123',
      },
      PC_ARTSY_CHANNEL: '123',
      PC_AUCTION_CHANNEL: null,
    })
    const data = {
      partner: {
        name: 'Lisson Gallery',
        type: 'Gallery',
        profile: {
          href: 'lisson-gallery',
          image: '',
        },
      },
    }
    classic.__set__('metaphysics', sinon.stub().resolves(data))
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

  xit('sets up promoted content auctions', (done) => {
    classic.__set__('sd', {
      ARTICLE: {
        title: 'Foo',
        auction_ids: ['789'],
        channel_id: '123',
      },
      PC_ARTSY_CHANNEL: null,
      PC_AUCTION_CHANNEL: '123',
    })
    const data = {
      sale: {
        name: 'Summer School',
        href: '/auction/summer-school',
        cover_image: '',
      },
    }
    classic.__set__('metaphysics', sinon.stub().resolves(data))
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
