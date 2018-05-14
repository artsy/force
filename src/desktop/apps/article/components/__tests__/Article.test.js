import 'jsdom-global/register'
import * as _ from 'underscore'
import benv from 'benv'
import React from 'react'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { data as sd } from 'sharify'
import { ContextProvider } from 'reaction/Components/Artsy'

describe('<Article />', () => {
  before(done => {
    benv.setup(() => {
      benv.expose({ $: benv.require('jquery'), jQuery: benv.require('jquery') })
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

  const rewire = require('rewire')('../layouts/Article')
  const ArticleLayout = rewire.default
  const InfiniteScrollArticle = require('desktop/apps/article/components/InfiniteScrollArticle')
    .default
  const { Article } = require('reaction/Components/Publishing')
  const SuperArticleView = sinon.stub()
  rewire.__set__('SuperArticleView', SuperArticleView)

  const getWrapper = props => {
    return mount(
      <ContextProvider currentUser={null}>
        <ArticleLayout {...props} />
      </ContextProvider>
    )
  }

  let props
  beforeEach(() => {
    props = {
      article: _.extend({}, fixtures.article, {
        layout: 'standard',
        vertical: {
          name: 'Art Market',
        },
        published_at: '2017-05-19T13:09:18.567Z',
        contributing_authors: [{ name: 'Kana' }],
      }),
      isSuper: false,
      templates: {},
    }
  })

  it('renders a standard article', () => {
    const rendered = getWrapper(props)

    rendered.find(InfiniteScrollArticle).length.should.equal(1)
    rendered.html().should.containEql('StandardLayout')
  })

  it('renders a feature article', () => {
    props.article.layout = 'feature'
    const rendered = getWrapper(props)

    rendered.find(InfiniteScrollArticle).length.should.equal(1)
    rendered.html().should.containEql('FeatureLayout')
  })

  it('renders a feature fullscreen article in a series', () => {
    props.article = _.extend({}, props.article, {
      layout: 'feature',
      hero_section: {
        type: 'fullscreen',
      },
      seriesArticle: {
        title: 'Series',
        slug: 'a-series',
        series: { description: '' },
      },
    })
    const rendered = getWrapper(props)

    rendered.find(InfiniteScrollArticle).length.should.equal(0)
    rendered.html().should.containEql('FeatureLayout')
  })

  it('renders a static article for super articles', () => {
    props.isSuper = true
    const rendered = getWrapper(props)

    rendered.find(Article).length.should.equal(1)
    rendered.find(InfiniteScrollArticle).length.should.equal(0)
  })

  it('renders Related Articles', () => {
    props.article = _.extend({}, props.article, {
      relatedArticlesPanel: [fixtures.article],
    })
    const rendered = getWrapper(props)

    const html = rendered.html()
    html.should.containEql('Related Stories')
    html.should.containEql('RelatedArticlesPanel')
  })

  it('it mounts backbone views for super articles', () => {
    props.templates = {
      SuperArticleFooter: 'sa-footer',
      SuperArticleHeader: 'sa-header',
    }
    props.superArticle = true
    const rendered = getWrapper(props)

    rendered.html().should.containEql('sa-footer')
    rendered.html().should.containEql('sa-header')
    SuperArticleView.called.should.be.true()
    SuperArticleView.args[0][0].article
      .get('title')
      .should.equal('Top Ten Booths')
  })

  it('renders a standard article with ads', () => {
    props.article = _.extend({}, props.article, {
      display: {
        name: 'Campaign 1',
        panel: {
          assets: [{ url: 'http://url.jpg' }],
          headline: 'Ad Headline',
          link: { url: 'http://link' },
        },
        canvas: {
          assets: [{ url: 'http://url.jpg' }],
          headline: 'Ad Headline',
          link: { url: 'http://link' },
          layout: 'standard',
        },
      },
    })
    const rendered = getWrapper(props)

    const html = rendered.html()
    html.should.containEql('DisplayPanel')
    html.should.containEql('class="Canvas')
    html.should.containEql('Campaign 1')
    html.should.containEql('Ad Headline')
  })

  // FIXME: DOES NOT TEST ANTHING
  xit('sets up follow buttons', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = mount(<ArticleLayout article={article} templates={{}} />)
    rendered.state().following.length.should.exist
  })
})
