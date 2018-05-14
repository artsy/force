import 'jsdom-global/register'
import _ from 'underscore'
import benv from 'benv'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import sinon from 'sinon'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { data as sd } from 'sharify'
import { ContextProvider } from 'reaction/Components/Artsy'

describe('<InfiniteScrollArticle />', () => {
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

  let rewire = require('rewire')('../InfiniteScrollArticle')
  let InfiniteScrollArticle = rewire.default
  const { Article } = require('reaction/Components/Publishing')

  const getWrapper = props => {
    return mount(
      <ContextProvider currentUser={null}>
        <InfiniteScrollArticle {...props} />
      </ContextProvider>
    )
  }
  let props

  beforeEach(() => {
    window.history.replaceState = sinon.stub()
    props = {
      article: _.extend({}, fixtures.article, {
        layout: 'standard',
        vertical: {
          name: 'Art Market',
        },
        published_at: '2017-05-19T13:09:18.567Z',
        contributing_authors: [{ name: 'Kana' }],
      }),
    }
  })

  afterEach(() => {
    window.history.replaceState.reset()
  })

  it('renders the initial article', () => {
    const rendered = getWrapper(props)

    rendered.find(Article).length.should.equal(1)
    rendered.html().should.containEql('StandardLayout')
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
    const rendered = getWrapper(props)
    await rendered
      .childAt(0)
      .instance()
      .fetchNextArticles()
    rendered.update()

    rendered.find(Article).length.should.equal(2)
  })

  it('renders Related Articles', () => {
    props.article = _.extend({}, props.article, {
      relatedArticlesCanvas: [fixtures.article],
      relatedArticlesPanel: [fixtures.article],
    })
    const rendered = getWrapper(props).html()

    rendered.should.containEql('Related Stories')
    rendered.should.containEql('Further Reading')
    rendered.should.containEql('RelatedArticlesPanel')
    rendered.should.containEql('RelatedArticlesCanvas')
  })

  it('renders the email signup when user is not subscribed', () => {
    props.emailSignupUrl = '/signup/editorial'
    const rendered = getWrapper(props)

    rendered.html().should.containEql('Stay up to date with Artsy Editorial')
  })

  it('does not render the email signup when user is subscribed', () => {
    props.emailSignupUrl = ''
    const rendered = getWrapper(props)

    rendered
      .html()
      .should.not.containEql('Stay up to date with Artsy Editorial')
  })

  it('#onEnter does not push url to browser if it is not scrolling upwards into an article', () => {
    const rendered = getWrapper(props)
    rendered
      .childAt(0)
      .instance()
      .onEnter({}, 0, {})

    window.history.replaceState.args.length.should.equal(0)
  })

  it('#onEnter pushes url to browser if it is scrolling upwards into an article', () => {
    const rendered = getWrapper(props)
    rendered
      .childAt(0)
      .instance()
      .onEnter(
        { slug: '123' },
        {
          previousPosition: 'above',
          currentPosition: 'inside',
        }
      )

    window.history.replaceState.args[0][2].should.containEql('/article/123')
  })

  it('#onEnter does not push url to browser if it is not scrolling upwards into an article', () => {
    const rendered = getWrapper(props)
    rendered
      .childAt(0)
      .instance()
      .onEnter({}, {})

    window.history.replaceState.args.length.should.equal(0)
  })

  it('#onLeave does not push url to browser if it is not scrolling downwards into the next article', () => {
    const rendered = getWrapper(props)
    rendered
      .childAt(0)
      .instance()
      .onLeave(0, {})

    window.history.replaceState.args.length.should.equal(0)
  })

  it('#onLeave pushes next article url to browser if it is scrolling downwards into the next article', () => {
    const article1 = _.extend({}, props.article, {
      slug: '456',
    })
    const rendered = getWrapper(props)
    const articles = rendered
      .childAt(0)
      .instance()
      .state.articles.concat(article1)
    rendered
      .childAt(0)
      .instance()
      .setState({ articles })
    rendered
      .childAt(0)
      .instance()
      .onLeave(0, {
        previousPosition: 'inside',
        currentPosition: 'above',
      })

    window.history.replaceState.args[0][2].should.containEql('/article/456')
  })

  it('sets up follow buttons', () => {
    const rendered = getWrapper(props)
    rendered.childAt(0).instance().state.following.length.should.exist
  })
})
