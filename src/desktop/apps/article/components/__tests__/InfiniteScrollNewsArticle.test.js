import 'jsdom-global/register'
import _ from 'underscore'
import benv from 'benv'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import sinon from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { data as sd } from 'sharify'
import { UnitCanvasImage } from 'reaction/Components/Publishing/Fixtures/Components'

describe('<InfiniteScrollNewsArticle />', () => {
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
  const { Article } = require('reaction/Components/Publishing')
  const {
    DisplayCanvas,
  } = require('reaction/Components/Publishing/Display/Canvas')

  beforeEach(() => {
    window.history.replaceState = sinon.stub()
  })

  afterEach(() => {
    window.history.replaceState.reset()
  })

  it('renders the initial article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'news',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(
      <InfiniteScrollNewsArticle article={article} marginTop={'50px'} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.html().should.containEql('NewsLayout')
  })

  it('fetches more articles at the end of the page', async () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'news',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
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
    const rendered = shallow(<InfiniteScrollNewsArticle article={article} />)
    await rendered.instance().fetchNextArticles()
    rendered.update()
    rendered.find(Article).length.should.equal(2)
  })

  it('#onEnter does not push url to browser if it is not scrolling upwards into an article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'news',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollNewsArticle article={article} />)
    rendered.instance().onEnter({}, 0, {})
    window.history.replaceState.args.length.should.equal(0)
  })

  it('#onEnter pushes url to browser if it is scrolling upwards into an article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'news',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollNewsArticle article={article} />)
    rendered.instance().onEnter(
      { slug: '123' },
      {
        previousPosition: 'above',
        currentPosition: 'inside',
      }
    )
    window.history.replaceState.args[0][2].should.containEql('/news/123')
  })

  it('#onEnter does not push url to browser if it is not scrolling upwards into an article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'news',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollNewsArticle article={article} />)
    rendered.instance().onEnter({}, {})
    window.history.replaceState.args.length.should.equal(0)
  })

  it('#onLeave does not push url to browser if it is not scrolling downwards into the next article', () => {
    const rendered = shallow(
      <InfiniteScrollNewsArticle article={fixtures.article} />
    )
    rendered.instance().onLeave(0, {})
    window.history.replaceState.args.length.should.equal(0)
  })

  it('#onLeave pushes next article url to browser if it is scrolling downwards into the next article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'news',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const article1 = _.extend({}, fixtures.article, {
      layout: 'news',
      slug: '456',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollNewsArticle article={article} />)
    rendered.setState({ articles: rendered.state('articles').concat(article1) })
    rendered.instance().onLeave(0, {
      previousPosition: 'inside',
      currentPosition: 'above',
    })
    window.history.replaceState.args[0][2].should.containEql('/news/456')
  })

  it('sets up follow buttons', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'news',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollNewsArticle article={article} />)
    rendered.state().following.length.should.exist
  })

  it('injects a canvas ad after the sixth article', async () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'news',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const data = {
      articles: _.times(6, () => {
        return _.extend({}, fixtures.article, {
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
    const rendered = shallow(<InfiniteScrollNewsArticle article={article} />)
    await rendered.instance().fetchNextArticles()
    rendered.update()
    rendered.find(DisplayCanvas).length.should.equal(1)
    rendered.html().should.containEql('Sponsored by BMW')
  })
})
