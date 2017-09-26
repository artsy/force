import * as fixtures from 'desktop/test/helpers/fixtures.coffee'
import sinon from 'sinon'
import { amp, editorialSignup, index, subscribedToEditorial, __RewireAPI__ as RoutesRewireApi } from 'desktop/apps/article2/routes'
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
      redirect: sinon.stub(),
      status: sinon.stub().returns({ send: sinon.stub() })
    }
    next = sinon.stub()
  })

  afterEach(() => {
    RoutesRewireApi.__ResetDependency__('positronql')
  })

  describe('#index', () => {
    it('renders the index with the correct data', (done) => {
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
      const renderLayout = sinon.stub()
      RoutesRewireApi.__Rewire__('renderLayout', renderLayout)
      RoutesRewireApi.__Rewire__('sd', {ARTSY_EDITORIAL_CHANNEL: '123'})
      index(req, res, next)
        .then(() => {
          renderLayout.args[0][0].data.article.title.should.equal('Top Ten Booths')
          renderLayout.args[0][0].locals.assetPackage.should.equal('article2')
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

    describe('#subscribedToEditorial', () => {
      it('resolves to false if there is no email', async () => {
        const subscribed = await subscribedToEditorial('')
        subscribed.should.equal(false)
      })

      it('resolves to true if a user is subscribed', async () => {
        RoutesRewireApi.__Rewire__('sailthru', {
          apiGet: sinon.stub().yields(
            null,
            {
              vars: { receive_editorial_email: true }
            }
          )
        })
        const subscribed = await subscribedToEditorial('foo@test.com')
        subscribed.should.equal(true)
        RoutesRewireApi.__ResetDependency__('sailthru')
      })

      it('resolves to false if a user exists but is not subscribed', async () => {
        RoutesRewireApi.__Rewire__('sailthru', {
          apiGet: sinon.stub().yields(null, { vars: {} })
        })
        const subscribed = await subscribedToEditorial('foo@test.com')
        subscribed.should.equal(false)
        RoutesRewireApi.__ResetDependency__('sailthru')
      })
    })
  })

  describe('#editorialSignup', () => {
    it('adds a user and sends a welcome email', () => {
      const apiPost = sinon.stub()
      RoutesRewireApi.__Rewire__('sailthru', { apiPost })
      req.body.email = 'foo@goo.net'
      editorialSignup(req, res, next)
      apiPost.args[0][1].id.should.equal('foo@goo.net')
      apiPost.args[0][2](null, { ok: true })
      apiPost.args[1][1].event.should.equal('editorial_welcome')
      apiPost.args[1][2](null, {})
      res.send.args[0][0].email.should.equal('foo@goo.net')
    })

    it('sends an error if user could not be created', () => {
      const apiPost = sinon.stub()
      RoutesRewireApi.__Rewire__('sailthru', { apiPost })
      req.body.email = 'foo@goo.net'
      editorialSignup(req, res, next)
      apiPost.args[0][1].id.should.equal('foo@goo.net')
      apiPost.args[0][2]('error', { errormsg: 'Error' })
      res.status.args[0][0].should.equal(500)
    })

    it('sends an error if a welcome email cannot be sent', () => {
      const apiPost = sinon.stub()
      RoutesRewireApi.__Rewire__('sailthru', { apiPost })
      req.body.email = 'foo@goo.net'
      editorialSignup(req, res, next)
      apiPost.args[0][1].id.should.equal('foo@goo.net')
      apiPost.args[0][2](null, { ok: true })
      apiPost.args[1][1].event.should.equal('editorial_welcome')
      apiPost.args[1][2]('error', {errormsg: 'Error'})
      res.status.args[0][0].should.equal(500)
    })
  })
})
