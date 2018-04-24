import Articles from '../../../collections/articles.coffee'
import Backbone from 'backbone'
import sinon from 'sinon'
const routes = require('rewire')('../routes.js')

describe('Routes', () => {
  let req = {}
  let res = {}
  let results = [
    { id: 1, published_at: new Date().toISOString() },
    { id: 2, published_at: new Date().toISOString() },
    { id: 3, published_at: new Date().toISOString() },
  ]
  routes.__set__('sd', { ARTSY_EDITORIAL_CHANNEL: 'foo' })

  beforeEach(() => {
    Backbone.sync = sinon.stub()

    req = {}
    res = {
      render: sinon.stub(),
      set: sinon.stub(),
    }
  })

  describe('#partnerUpdates', () => {
    it('renders articles', () => {
      routes.partnerUpdates(req, res)
      Backbone.sync.args[0][2].success({
        total: 16088,
        count: 2,
        results,
      })
      res.render.args[0][0].should.containEql('partner_updates')
      res.render.args[0][1].articles.length.should.eql(3)
    })
  })

  describe('#news', () => {
    beforeEach(() => {
      routes.__set__(
        'findArticlesWithEmbeds',
        sinon.stub().returns(Promise.resolve(new Articles(results)))
      )
    })

    it('renders the rss feed for news', async () => {
      routes.news(req, res)
      await Backbone.sync.args[0][2].success({
        total: 16088,
        count: 3,
        results,
      })
      res.render.args[0][0].should.containEql('news')
      res.render.args[0][1].articles.length.should.eql(3)
    })
  })

  describe('#maybeFetchSocialEmbed', () => {
    let section = {}

    it('Returns the section if not social_embed', async () => {
      section.type = 'text'
      const newSection = await routes.maybeFetchSocialEmbed(section)
      newSection.type.should.eql('text')
    })

    it('Returns fetched section url if social_embed', async () => {
      section = {
        type: 'social_embed',
        url: 'https://twitter.com/artsy/status/978997552061272064',
      }
      const newSection = await routes.maybeFetchSocialEmbed(section)
      newSection.type.should.eql('social_embed')
      newSection.url.should.containEql('<blockquote class="twitter-tweet">')
    })
  })
})
