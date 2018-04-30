import 'jsdom-global/register'
import _ from 'underscore'
import benv from 'benv'
import sinon from 'sinon'
import React from 'react'
import { mount, shallow } from 'enzyme'
import { data as sd } from 'sharify'
import { NewsArticle as NewsArticleFixture } from 'reaction/Components/Publishing/Fixtures/Articles'

describe('<NewsArticle />', () => {
  let props
  let article

  before(done => {
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
      removeListener: () => {}
    }
  }

  let rewire = require('rewire')('../NewsArticle.tsx')
  let { NewsArticle } = rewire

  beforeEach(() => {
    window.history.replaceState = sinon.stub()
    article = _.extend({ slug: 'news-article' }, NewsArticleFixture)

    props = {
      article,
      isMobile: true,
      isTruncated: true,
      isFirstArticle: true,
      nextArticle: {
        id: '1234',
        published_at: '5678'
      },
      onDateChange: sinon.stub(),
      onActiveArticleChange: sinon.stub()
    }
  })

  afterEach(() => {
    window.history.replaceState.reset()
  })

  it('renders the article', () => {
    const rendered = mount(<NewsArticle {...props} />)
    rendered.html().should.containEql('NewsLayout')
  })

  it('#onExpand pushes article url to browser and updates articles state', () => {
    const rendered = mount(<NewsArticle {...props} />)
    rendered.instance().onExpand()

    rendered.state('isTruncated').should.be.false()
    window.history.replaceState.args[0][2].should.containEql(
      '/news/news-article'
    )
  })

  describe('#setMetadata', () => {
    it('sets default news metadata', () => {
      const rendered = mount(<NewsArticle {...props} />)
      rendered.instance().setMetadata()
      window.history.replaceState.args[0][2].should.containEql('/news')
    })

    it('#sets article metadata', () => {
      const rendered = mount(<NewsArticle {...props} />)
      rendered.instance().setMetadata({
        slug: 'some-slug',
        thumbnail_title: 'Some title',
        id: '123'
      })
      window.history.replaceState.args[0][2].should.containEql(
        '/news/some-slug'
      )
    })
  })

  describe('#onEnter', () => {
    it('does not push url to browser if it is not scrolling into an article', () => {
      const rendered = mount(<NewsArticle {...props} />)
      rendered.instance().onEnter({
        currentPosition: 'outside'
      })

      window.history.replaceState.args.length.should.equal(0)
    })

    it('calls onDateChange if waypoint is triggered inside', () => {
      const rendered = mount(<NewsArticle {...props} />)
      rendered.instance().onEnter({
        currentPosition: 'inside',
        previousPosition: 'above'
      })

      props.onDateChange.args[0][0].should.equal(article.published_at)
    })

    it('pushes /news to browser if it is scrolling into a truncated article', () => {
      const rendered = mount(<NewsArticle {...props} />)
      rendered.instance().onEnter({
        currentPosition: 'inside'
      })
      window.history.replaceState.args[0][2].should.containEql('/news')
    })

    it('pushes the article if it is scrolling into a non-truncated article', () => {
      props.isTruncated = false
      const rendered = mount(<NewsArticle {...props} />)
      rendered.instance().onEnter({
        currentPosition: 'inside'
      })
      window.history.replaceState.args[0][2].should.containEql(
        '/news/news-article'
      )
    })

    it('calls #onActiveArticleChange if it is mobile', () => {
      props.isMobile = true
      const rendered = mount(<NewsArticle {...props} />)
      rendered.instance().onEnter({
        currentPosition: 'inside'
      })
      props.onActiveArticleChange.callCount.should.equal(1)
    })
  })

  describe('#onLeave', () => {
    it('changes the date if there is a next article on leave', () => {
      const rendered = mount(<NewsArticle {...props} />)
      rendered.instance().onLeave({
        currentPosition: 'above',
        previousPosition: 'inside'
      })
      props.onDateChange.args[0][0].should.equal('5678')
    })

    it('calls #onActiveArticleChange if it is mobile', () => {
      const rendered = mount(<NewsArticle {...props} />)
      rendered.instance().onLeave({
        currentPosition: 'above',
        previousPosition: 'inside'
      })
      props.onActiveArticleChange.args[0][0].should.equal('1234')
    })
  })
})
