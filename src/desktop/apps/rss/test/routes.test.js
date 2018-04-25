import Articles from '../../../collections/articles.coffee'
import Backbone from 'backbone'
import sinon from 'sinon'
const request = require('rewire')('superagent')
const routes = require('rewire')('../routes.js')

describe('Routes', () => {
  let req = {}
  let res = {}
  const published_at = new Date().toISOString()
  let results = [
    { id: 1, published_at },
    { id: 2, published_at },
    { id: 3, published_at },
  ]

  beforeEach(() => {
    Backbone.sync = sinon.stub()
    request.get = sinon.stub().returns({
      end: cb => {
        cb(null, {
          body: {
            html: '<blockquote class="twitter-tweet">',
          },
        })
      },
    })

    routes.__set__('sd', { ARTSY_EDITORIAL_CHANNEL: 'foo' })
    routes.__set__('request', request)

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
    it('renders the rss feed if #findArticlesWithEmbeds rejects', async () => {
      request.get = sinon.stub().returns({
        end: cb => {
          cb(new Error())
        },
      })
      routes.__set__('request', request)
      routes.news(req, res)
      await Backbone.sync.args[0][2].success({
        total: 16088,
        count: 3,
        results,
      })
      setTimeout(() => {
        res.render.args[0][0].should.containEql('news')
        res.render.args[0][1].articles.length.should.eql(3)
      }, 100)
    })

    it('renders the rss feed for news', async () => {
      routes.__set__(
        'findArticlesWithEmbeds',
        sinon.stub().returns(Promise.resolve(new Articles(results)))
      )

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

    it('Returns fetched oembed data if social_embed', async () => {
      section = {
        type: 'social_embed',
        url: 'https://twitter.com/artsy/status/978997552061272064',
      }

      const newSection = await routes.maybeFetchSocialEmbed(section)
      request.get.args[0][0].should.eql(
        'https://publish.twitter.com/oembed?url=https://twitter.com/artsy/status/978997552061272064'
      )
      newSection.url.should.eql('<blockquote class="twitter-tweet">')
      newSection.type.should.eql('social_embed')
    })

    it('Fetches from instagram', async () => {
      section = {
        type: 'social_embed',
        url: 'https://www.instagram.com/p/Bh-Az5_gaVB/?taken-by=artsy',
      }

      await routes.maybeFetchSocialEmbed(section)
      request.get.args[0][0].should.eql(
        'https://api.instagram.com/oembed?url=https://www.instagram.com/p/Bh-Az5_gaVB/?taken-by=artsy'
      )
    })
  })
})
