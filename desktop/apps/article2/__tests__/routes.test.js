import * as fixtures from 'desktop/test/helpers/fixtures.coffee'
import sinon from 'sinon'
import { amp, index, __RewireAPI__ as RoutesRewireApi } from 'desktop/apps/article2/routes'
import * as _ from 'underscore'
import Article from 'desktop/models/article.coffee'
import Channel from 'desktop/models/channel.coffee'

describe('Article Routes', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {
      body: {},
      params: { slug: 'foobar' }
    }
    res = {
      app: { get: sinon.stub().returns('components') },
      locals: { sd: {} },
      render: sinon.stub(),
      send: sinon.stub(),
      redirect: sinon.stub()
    }
    next = sinon.stub()
  })

  afterEach(() => {
    RoutesRewireApi.__ResetDependency__('positronql')
  })

  describe('#index', () => {
    it('renders the index with the correct variables', (done) => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '123'
        })
      }
      RoutesRewireApi.__Rewire__(
        'positronql',
        sinon.stub().returns(Promise.resolve(data))
      )
      const renderReactLayout = sinon.stub()
      RoutesRewireApi.__Rewire__('renderReactLayout', renderReactLayout)
      RoutesRewireApi.__Rewire__('sd', {ARTSY_EDITORIAL_CHANNEL: '123'})
      index(req, res, next)
        .then(() => {
          renderReactLayout.args[0][0].data.article.title.should.equal('Top Ten Booths')
          renderReactLayout.args[0][0].locals.assetPackage.should.equal('article2')
          done()
        })
    })

    it('redirects to the correct slug if it does not match', (done) => {
      const data = {
        article: _.extend({}, fixtures.article, {
          slug: 'zoobar',
          channel_id: '123'
        })
      }
      RoutesRewireApi.__Rewire__(
        'positronql',
        sinon.stub().returns(Promise.resolve(data))
      )
      RoutesRewireApi.__Rewire__('sd', {ARTSY_EDITORIAL_CHANNEL: '123'})
      index(req, res, next)
        .then(() => {
          res.redirect.args[0][0].should.equal('/article2/zoobar')
          done()
        })
    })

    it('renders classic mode if article is not editorial', (done) => {
      const data = {
        article: new Article(_.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '456'
        })),
        channel: new Channel()
      }
      RoutesRewireApi.__Rewire__(
        'positronql',
        sinon.stub().returns(Promise.resolve(data))
      )
      RoutesRewireApi.__Rewire__('sd', {ARTSY_EDITORIAL_CHANNEL: '123'})
      Article.prototype.fetchWithRelated = sinon.stub().yieldsTo('success', data)
      RoutesRewireApi.__Rewire__('Article', Article)
      index(req, res, next)
        .then(() => {
          res.render.args[0][0].should.equal('article')
          done()
        })
    })
  })

  describe('#amp', () => {
    it('renders amp page', (done) => {
      const data = {
        article: new Article(_.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '456',
          sections: [],
          featured: true,
          published: true
        })),
        channel: new Channel()
      }
      RoutesRewireApi.__Rewire__(
        'positronql',
        sinon.stub().returns(Promise.resolve(data))
      )
      RoutesRewireApi.__Rewire__('sd', {ARTSY_EDITORIAL_CHANNEL: '123'})
      Article.prototype.fetchWithRelated = sinon.stub().yieldsTo('success', data)
      RoutesRewireApi.__Rewire__('Article', Article)
      amp(req, res, next)
      res.render.args[0][0].should.equal('amp_article')
      done()
    })

    it('skips if image/artwork sections exist (amp requires image dimensions)', (done) => {
      const data = {
        article: new Article(_.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '456',
          sections: [{
            type: 'image'
          }]
        })),
        channel: new Channel()
      }
      RoutesRewireApi.__Rewire__(
        'positronql',
        sinon.stub().returns(Promise.resolve(data))
      )
      Article.prototype.fetchWithRelated = sinon.stub().yieldsTo('success', data)
      RoutesRewireApi.__Rewire__('Article', Article)
      amp(req, res, next)
      next.callCount.should.equal(1)
      done()
    })

    it('skips if it isnt featured', (done) => {
      const data = {
        article: new Article(_.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '456',
          featured: false,
          sections: []
        })),
        channel: new Channel()
      }
      RoutesRewireApi.__Rewire__(
        'positronql',
        sinon.stub().returns(Promise.resolve(data))
      )
      Article.prototype.fetchWithRelated = sinon.stub().yieldsTo('success', data)
      RoutesRewireApi.__Rewire__('Article', Article)
      amp(req, res, next)
      next.callCount.should.equal(1)
      done()
    })

    it('redirects to the correct slug if it does not match', (done) => {
      const data = {
        article: new Article(_.extend({}, fixtures.article, {
          slug: 'zoobar',
          channel_id: '456',
          featured: true,
          sections: []
        })),
        channel: new Channel()
      }
      RoutesRewireApi.__Rewire__(
        'positronql',
        sinon.stub().returns(Promise.resolve(data))
      )
      Article.prototype.fetchWithRelated = sinon.stub().yieldsTo('success', data)
      RoutesRewireApi.__Rewire__('Article', Article)
      amp(req, res, next)
      res.redirect.args[0][0].should.equal('/article2/zoobar/amp')
      done()
    })
  })
})
