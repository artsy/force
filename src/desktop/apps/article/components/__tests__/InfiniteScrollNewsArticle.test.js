import 'jsdom-global/register'
import _ from 'underscore'
import benv from 'benv'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import sinon from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { data as sd } from 'sharify'
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
  const { Article } = require('reaction/Components/Publishing')
  const {
    DisplayCanvas,
  } = require('reaction/Components/Publishing/Display/Canvas')

  beforeEach(() => {
    window.history.replaceState = sinon.stub()
    article = _.extend({ slug: 'news-article' }, NewsArticle)
    nextArticle = {
      layout: 'news',
      id: '456',
      slug: 'news-article',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    }

    props = {
      article,
      articles: [article],
      marginTop: '50px',
    }
  })

  afterEach(() => {
    window.history.replaceState.reset()
  })

  describe('/news - news index', () => {
    beforeEach(() => {
      delete props.article
    })

    it('renders list', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.find(Article).length.should.equal(1)
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
      rendered.find(Article).length.should.equal(1)
      rendered.html().should.containEql('NewsLayout')
    })
    it('sets up state for a single article', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.state().offset.should.eql(0)
      rendered.state().omit.should.eql(props.article.id)
      rendered.state().date.should.eql(props.article.published_at)
    })
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
    rendered.find(Article).length.should.equal(2)
  })

  it('sets up follow buttons', () => {
    const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
    rendered.state().following.length.should.exist
  })

  it('injects a canvas ad after the sixth article', async () => {
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
    const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
    await rendered.instance().fetchNextArticles()
    rendered.update()
    rendered.find(DisplayCanvas).length.should.equal(1)
    rendered.html().should.containEql('Sponsored by BMW')
  })

  it('#onExpand pushes article url to browser', () => {
    const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
    rendered
      .instance()
      .onExpand({ id: '123', slug: 'news-article', title: 'Foo bar' })

    window.history.replaceState.args[0][2].should.containEql(
      '/news/news-article'
    )
  })

  it('#hasNewDate returns true if article date is different from previous article', () => {
    props.articles.push(nextArticle)
    const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
    const hasNewDate = rendered.instance().hasNewDate(nextArticle, 1)
    hasNewDate.should.equal(true)
  })

  describe('#onEnter', () => {
    it('does not push url to browser if it is not scrolling upwards into an article', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.instance().onEnter({}, 0, {})

      window.history.replaceState.args.length.should.equal(0)
    })

    it('sets state.date if entered and article date is different from existing state', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.instance().setState = sinon.stub()
      rendered.update()
      rendered.instance().onEnter(
        { published_at: nextArticle.published_at },
        {
          previousPosition: 'above',
          currentPosition: 'inside',
        }
      )
      rendered
        .instance()
        .setState.args[0][0].date.should.equal(nextArticle.published_at)
    })

    it('pushes article url to browser if it is scrolling upwards into props.article', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.instance().onEnter(props.article, {
        previousPosition: 'above',
        currentPosition: 'inside',
      })
      window.history.replaceState.args[0][2].should.containEql(
        '/news/news-article'
      )
    })

    it('does not push url to browser if it is not scrolling upwards into an article', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.instance().onEnter({}, {})

      window.history.replaceState.args.length.should.equal(0)
    })
  })

  describe('#onLeave', () => {
    it('does not push url to browser if it is not scrolling downwards into the next article', () => {
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.instance().onLeave(0, {})

      window.history.replaceState.args.length.should.equal(0)
    })

    it('pushes "/news" to browser if it is scrolling downwards into the next article', () => {
      props.articles.push(nextArticle)
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.instance().onLeave(0, {
        previousPosition: 'inside',
        currentPosition: 'above',
      })
      window.history.replaceState.args[0][2].should.containEql('/news')
    })

    it('sets state.date if has left and article date is different from existing state', () => {
      props.articles.push(nextArticle)
      const rendered = shallow(<InfiniteScrollNewsArticle {...props} />)
      rendered.instance().setState = sinon.stub()
      rendered.update()
      rendered.instance().onLeave(0, {
        previousPosition: 'inside',
        currentPosition: 'above',
      })
      rendered
        .instance()
        .setState.args[0][0].date.should.equal(nextArticle.published_at)
    })
  })
})
