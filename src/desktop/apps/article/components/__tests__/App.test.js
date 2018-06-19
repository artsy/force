import 'jsdom-global/register'
import benv from 'benv'
import React from 'react'
import { mount } from 'enzyme'
import { data as sd } from 'sharify'
import sinon from 'sinon'
import rewire from 'rewire'

describe('<App />', () => {
  before(done => {
    benv.setup(() => {
      benv.expose({
        $: benv.require('jquery'),
        jQuery: benv.require('jquery'),
      })
      sd.APP_URL = 'http://artsy.net'
      sd.CURRENT_PATH =
        '/article/artsy-editorial-surprising-reason-men-women-selfies-differently'
      sd.CURRENT_USER = { id: '123' }
      done()
    })
  })

  after(() => {
    benv.teardown()
  })

  window.matchMedia = () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }
  }

  const ArticleLayoutRewire = rewire('../layouts/Article')
  const EditorialSignupView = sinon.stub()
  ArticleLayoutRewire.__set__('EditorialSignupView', EditorialSignupView)
  const ArticleLayout = ArticleLayoutRewire.default

  const AppRewire = rewire('../App')
  AppRewire.__set__('ArticleLayout', ArticleLayout)
  const App = AppRewire.default

  const { Article, Fixtures } = require('reaction/Components/Publishing')
  // TODO: Export News to Fixtures
  const {
    NewsArticle,
  } = require('reaction/Components/Publishing/Fixtures/Articles')

  it('renders a standard article', () => {
    const rendered = mount(
      <App article={Fixtures.StandardArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(1)
    rendered.html().should.containEql('StandardLayout')
  })

  it('renders a feature article', () => {
    const rendered = mount(
      <App article={Fixtures.FeatureArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(1)
    rendered.html().should.containEql('FeatureLayout')
  })

  it('renders a series article', () => {
    const rendered = mount(
      <App article={Fixtures.SeriesArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(0)
    rendered.html().should.containEql('Series')
  })

  it('renders a video article', () => {
    const rendered = mount(
      <App article={Fixtures.VideoArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(0)
    rendered.html().should.containEql('Video')
  })

  it('renders a news article', () => {
    const rendered = mount(<App article={NewsArticle} templates={{}} />)
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(0)
    rendered.html().should.containEql('News')
  })
})
