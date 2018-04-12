import 'jsdom-global/register'
import _ from 'underscore'
import benv from 'benv'
import moment from 'moment'
import sinon from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { data as sd } from 'sharify'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import { UnitCanvasImage } from 'reaction/Components/Publishing/Fixtures/Components'
import { NewsArticle } from 'reaction/Components/Publishing/Fixtures/Articles'

describe('<InfiniteScrollNewsArticle />', () => {
  let props
  let article
  let nextArticle

  before((done) => {
    benv.setup(() => {
      benv.expose({ $: benv.require('jquery'), jQuery: benv.require('jquery') })
      sd.APP_URL = 'http://artsy.net'
      sd.CURRENT_PATH =
        '/news/artsy-editorial-surprising-reason-men-women-selfies-differently'
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

  let rewire = require('rewire')('../InfiniteScrollNewsArticle.tsx')
  let { InfiniteScrollNewsArticle } = rewire
  const { RelatedArticlesCanvas } = require('reaction/Components/Publishing')
  const {
    DisplayCanvas,
  } = require('reaction/Components/Publishing/Display/Canvas')

  beforeEach(() => {
    window.history.replaceState = sinon.stub()
    article = _.extend(
      {
        slug: 'news-article',
        isTruncated: false,
      },
      NewsArticle
    )
    nextArticle = {
      layout: 'news',
      id: '456',
      slug: 'next-news-article',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    }

    props = {
      article,
      articles: [article],
      marginTop: '50px',
      isMobile: false,
    }
  })

  afterEach(() => {
    window.history.replaceState.reset()
  })

  it('fetches more articles at the end of the page', async () => {
    const data = {
      articles: [
        _.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '123',
          id: '678',
        }),
      ],
    }
    rewire.__set__('positronql', sinon.stub().returns(Promise.resolve(data)))
    const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
    await rendered.instance().fetchNextArticles()
    rendered.update()
    rendered
      .find('#article-root')
      .children()
      .length.should.equal(4)
  })

  it('sets up follow buttons', () => {
    const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
    rendered.state().following.length.should.exist
  })

  it('#hasNewDate returns true if article date is different from previous article', () => {
    props.articles.push(nextArticle)
    const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
    const hasNewDate = rendered.instance().hasNewDate(nextArticle, 1)
    hasNewDate.should.equal(true)
  })

  it('injects a canvas ad after the sixth article', async () => {
    const data = {
      articles: _.times(6, () => {
        return _.extend({}, NewsArticle, {
          slug: 'foobar',
          channel_id: '123',
          id: '678',
        })
      }),
      display: {
        name: 'BMW',
        canvas: UnitCanvasImage,
      },
    }
    rewire.__set__('positronql', sinon.stub().returns(Promise.resolve(data)))
    const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
    await rendered.instance().fetchNextArticles()
    rendered.update()
    rendered.find(DisplayCanvas).length.should.equal(1)
    rendered.html().should.containEql('Sponsored by BMW')
  })

  it('injects read more after the sixth article', async () => {
    const data = {
      articles: _.times(6, () => {
        return _.extend({}, fixtures.article, {
          slug: 'foobar',
          channel_id: '123',
          id: '678',
        })
      }),
      relatedArticlesCanvas: _.times(4, () => {
        return _.extend({}, fixtures.article, {
          slug: 'related-article',
          channel_id: '123',
          id: '456',
        })
      }),
    }
    rewire.__set__('positronql', sinon.stub().returns(Promise.resolve(data)))
    const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
    await rendered.instance().fetchNextArticles()
    rendered.update()
    rendered.find(RelatedArticlesCanvas).length.should.equal(1)
    rendered.html().should.containEql('More from Artsy Editorial')
  })

  describe('/news - news index', () => {
    beforeEach(() => {
      delete props.article
    })

    it('renders list', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered
        .find('#article-root')
        .children()
        .length.should.equal(3)
      rendered.html().should.containEql('NewsLayout')
    })

    it('sets up state without props.article', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.state().offset.should.eql(6)
      rendered.state().date.should.eql(props.articles[0].published_at)
    })
  })

  describe('/news/:id - single news article', () => {
    it('renders the initial article', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered
        .find('#article-root')
        .children()
        .length.should.equal(3)
      rendered.html().should.containEql('NewsLayout')
    })

    it('sets up state for a single article', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.state().offset.should.eql(0)
      rendered.state().omit.should.eql(props.article.id)
      rendered.state().date.should.eql(props.article.published_at)
    })
  })

  describe('#getDateField', () => {
    it('Returns published_at if present', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      const getDateField = rendered.instance().getDateField(article)

      getDateField.should.equal(article.published_at)
    })
    it('Returns scheduled_publish_at if no published_at', () => {
      const published_at = article.published_at
      article.scheduled_publish_at = published_at
      delete article.published_at
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      const getDateField = rendered.instance().getDateField(article)

      getDateField.should.equal(published_at)
    })
    it('Returns today for articles with no date field', () => {
      const today = moment()
        .toISOString()
        .substring(0, 10)
      delete article.published_at
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      const getDateField = rendered
        .instance()
        .getDateField(article)
        .substring(0, 10)

      getDateField.should.equal(today)
    })
  })

  // describe('#onDateChange', () => {
  //   it('is throttled', () => {
  //     const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
  //     rendered.instance().onDateChange('123')
  //     console.log(rendered.state('date'))

  //   })
  // })
})
