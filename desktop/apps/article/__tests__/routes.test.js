import * as fixtures from 'desktop/test/helpers/fixtures.coffee'
import * as _ from 'underscore'
import { amp, classic, editorialSignup, index, subscribedToEditorial, __RewireAPI__ as RoutesRewireApi } from 'desktop/apps/article/routes'
import sinon from 'sinon'
import Article from 'desktop/models/article.coffee'
import Channel from 'desktop/models/channel.coffee'

describe('Article Routes', () => {
  let req
  let res
  let next
  let sailthruApiPost
  let sailthruApiGet

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
    RoutesRewireApi.__Rewire__('sd', {ARTSY_EDITORIAL_CHANNEL: '123'})
    sailthruApiPost = sinon.stub()
    sailthruApiGet = sinon.stub()
    RoutesRewireApi.__Rewire__('sailthru', { apiPost: sailthruApiPost, apiGet: sailthruApiGet })
  })

  afterEach(() => {
    RoutesRewireApi.__ResetDependency__('positronql')
    RoutesRewireApi.__ResetDependency__('sailthru')
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
      index(req, res, next)
        .then(() => {
          renderLayout.args[0][0].data.article.title.should.equal('Top Ten Booths')
          renderLayout.args[0][0].locals.assetPackage.should.equal('article')
          done()
        })
    })

    it('sets the correct jsonld', (done) => {
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
      index(req, res, next)
        .then(() => {
          renderLayout.args[0][0].data.jsonLD.should.containEql('Top Ten Booths at miart 2014')
          renderLayout.args[0][0].data.jsonLD.should.containEql('Fair Coverage')
          done()
        })
    })

    it('redirects to the main slug if an older slug is queried', (done) => {
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
      index(req, res, next)
        .then(() => {
          res.redirect.args[0][0].should.equal('/article/zoobar')
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
      Article.prototype.fetchWithRelated = sinon.stub().yieldsTo('success', data)
      RoutesRewireApi.__Rewire__('Article', Article)
      index(req, res, next)
        .then(() => {
          res.render.args[0][0].should.equal('article')
          done()
        })
    })

    it('fetches resources for a super article', () => {
      const article = {
        article: _.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '123',
          is_super_article: true
        })
      }
      const superSubArticles = {
        articles: [_.extend({}, fixtures.article, {
          slug: 'sub-article',
          channel_id: '123',
          is_super_sub_article: true
        })]
      }
      const positronql = sinon.stub()
      positronql
        .onCall(0).returns(Promise.resolve(article))
        .onCall(1).returns(Promise.resolve(superSubArticles))
      RoutesRewireApi.__Rewire__('positronql', positronql)
      const renderLayout = sinon.stub()
      RoutesRewireApi.__Rewire__('renderLayout', renderLayout)
      index(req, res, next)
        .then(() => {
          renderLayout.args[0][0].data.isSuper.should.be.true()
          renderLayout.args[0][0].data.superArticle.get('slug').should.equal('foobar')
          renderLayout.args[0][0].data.superSubArticles.length.should.equal(1)
          renderLayout.args[0][0].data.superSubArticles.first().get('slug').should.equal('sub-article')
        })
    })

    it('fetches resources for super sub articles', () => {
      const article = {
        article: _.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '123',
          is_super_sub_article: true
        })
      }
      const superArticle = {
        articles: [_.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '123',
          is_super_article: true,
          title: 'Super Article Title'
        })]
      }
      const superSubArticles = {
        articles: [_.extend({}, fixtures.article, {
          slug: 'sub-article',
          channel_id: '123',
          is_super_sub_article: true
        })]
      }
      const positronql = sinon.stub()
      positronql
        .onCall(0).returns(Promise.resolve(article))
        .onCall(1).returns(Promise.resolve(superArticle))
        .onCall(2).returns(Promise.resolve(superSubArticles))
      RoutesRewireApi.__Rewire__('positronql', positronql)
      const renderLayout = sinon.stub()
      RoutesRewireApi.__Rewire__('renderLayout', renderLayout)
      index(req, res, next)
      .then(() => {
        renderLayout.args[0][0].data.isSuper.should.be.true()
        renderLayout.args[0][0].data.superSubArticles.length.should.equal(1)
        renderLayout.args[0][0].data.superSubArticles.first().get('slug').should.equal('sub-article')
        renderLayout.args[0][0].data.superArticle.get('title').should.equal('Super Article Title')
      })
    })
  })

  describe('#classic', () => {
    it('renders a classic article', () => {
      const data = {
        article: new Article(_.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '456',
          sections: [],
          featured: true,
          published: true
        })),
        channel: new Channel({
          name: 'Foo'
        })
      }
      Article.prototype.fetchWithRelated = sinon.stub().yieldsTo('success', data)
      classic(req, res, next)
      res.render.args[0][1].article.get('slug').should.equal('foobar')
      res.render.args[0][1].channel.get('name').should.equal('Foo')
    })

    it('renders a ghosted article', () => {
      const data = {
        article: new Article(_.extend({}, fixtures.article, {
          slug: 'foobar',
          sections: [],
          featured: true,
          published: true
        }))
      }
      Article.prototype.fetchWithRelated = sinon.stub().yieldsTo('success', data)
      classic(req, res, next)
      res.render.args[0][1].article.get('slug').should.equal('foobar')
    })

    it('sets the correct jsonld', () => {
      const data = {
        article: new Article(_.extend({}, fixtures.article, {
          slug: 'foobar',
          sections: [],
          featured: true,
          published: true,
          channel_id: '456'
        }))
      }
      Article.prototype.fetchWithRelated = sinon.stub().yieldsTo('success', data)
      classic(req, res, next)
      res.locals.jsonLD.should.containEql('Top Ten Booths at miart 2014')
      res.locals.jsonLD.should.containEql('Fair Coverage')
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
          published: true,
          layout: 'standard'
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

    it('redirects to the main slug if an older slug is queried', (done) => {
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
      res.redirect.args[0][0].should.equal('/article/zoobar/amp')
      done()
    })

    it('sets the correct jsonld', (done) => {
      const data = {
        article: new Article(_.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '456',
          sections: [],
          featured: true,
          published: true,
          layout: 'standard'
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
      res.locals.jsonLD.should.containEql('Magazine')
      res.locals.jsonLD.should.containEql('Top Ten Booths at miart 2014')
      res.locals.jsonLD.should.containEql('Artsy Editorial')
      res.locals.jsonLD.should.containEql('"publisher":{"name":"Artsy","logo":{"url":"undefined/images/full_logo.png","height":103,"width":300}}')
      done()
    })
  })

  describe('#subscribedToEditorial', () => {
    it('resolves to false if there is no email', async () => {
      const subscribed = await subscribedToEditorial('')
      subscribed.should.equal(false)
    })

    it('resolves to true if a user is subscribed', async () => {
      sailthruApiGet.yields(
        null,
        {
          vars: { receive_editorial_email: true }
        }
      )
      const subscribed = await subscribedToEditorial('foo@test.com')
      subscribed.should.equal(true)
    })

    it('resolves to false if a user exists but is not subscribed', async () => {
      sailthruApiGet.yields(null, { vars: {} })
      const subscribed = await subscribedToEditorial('foo@test.com')
      subscribed.should.equal(false)
    })
  })

  describe('#editorialSignup', () => {
    it('adds a user and sends a welcome email', () => {
      req.body.email = 'foo@goo.net'
      editorialSignup(req, res, next)
      sailthruApiPost.args[0][1].id.should.equal('foo@goo.net')
      sailthruApiPost.args[0][2](null, { ok: true })
      sailthruApiPost.args[1][1].event.should.equal('editorial_welcome')
      sailthruApiPost.args[1][2](null, {})
      res.send.args[0][0].email.should.equal('foo@goo.net')
    })

    it('sends an error if user could not be created', () => {
      req.body.email = 'foo@goo.net'
      editorialSignup(req, res, next)
      sailthruApiPost.args[0][1].id.should.equal('foo@goo.net')
      sailthruApiPost.args[0][2]('error', { errormsg: 'Error' })
      res.status.args[0][0].should.equal(500)
    })

    it('sends an error if a welcome email cannot be sent', () => {
      req.body.email = 'foo@goo.net'
      editorialSignup(req, res, next)
      sailthruApiPost.args[0][1].id.should.equal('foo@goo.net')
      sailthruApiPost.args[0][2](null, { ok: true })
      sailthruApiPost.args[1][1].event.should.equal('editorial_welcome')
      sailthruApiPost.args[1][2]('error', {errormsg: 'Error'})
      res.status.args[0][0].should.equal(500)
    })
  })
})
