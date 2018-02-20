import 'jsdom-global/register'
import _ from 'underscore'
import benv from 'benv'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import sinon from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { data as sd } from 'sharify'

describe('<InfiniteScrollArticle />', () => {
  before((done) => {
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

  const test = require('rewire')('../InfiniteScrollArticle')
  const { InfiniteScrollArticle } = test
  const {
    Article,
  } = require('@artsy/reaction-force/dist/Components/Publishing')

  beforeEach(() => {
    window.history.replaceState = sinon.stub()
  })

  afterEach(() => {
    window.history.replaceState.reset()
  })

  it('renders the initial article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(
      <InfiniteScrollArticle
        article={article}
        headerHeight={'calc(100vh - 50px)'}
        marginTop={'50px'}
      />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.html().should.containEql('StandardLayout')
  })

  it('fetches more articles at the end of the page', async () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
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
    test.__set__('positronql', sinon.stub().returns(Promise.resolve(data)))
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    await rendered.instance().fetchNextArticles()
    rendered.update()
    rendered.find(Article).length.should.equal(2)
  })

  it('renders Related Articles', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      contributing_authors: [{ name: 'Kana' }],
      relatedArticlesCanvas: [fixtures.article],
      relatedArticlesPanel: [fixtures.article],
    })
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    const html = rendered.html()
    html.should.containEql('Related Stories')
    html.should.containEql('Further Reading')
    html.should.containEql('RelatedArticlesPanel')
    html.should.containEql('RelatedArticlesCanvas')
  })

  it('renders the email signup when user is not subscribed', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(
      <InfiniteScrollArticle
        article={article}
        emailSignupUrl={'/signup/editorial'}
      />
    )
    rendered.html().should.containEql('Stay up to date with Artsy Editorial')
  })

  it('does not render the email signup when user is subscribed', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(
      <InfiniteScrollArticle article={article} emailSignupUrl={''} />
    )
    rendered
      .html()
      .should.not.containEql('Stay up to date with Artsy Editorial')
  })

  it('#onEnter does not push url to browser if it is not scrolling upwards into an article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    rendered.instance().onEnter({}, 0, {})
    window.history.replaceState.args.length.should.equal(0)
  })

  it('#onEnter pushes url to browser if it is scrolling upwards into an article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    rendered.instance().onEnter(
      { slug: '123' },
      {
        previousPosition: 'above',
        currentPosition: 'inside',
      }
    )
    window.history.replaceState.args[0][2].should.containEql('/article/123')
  })

  it('#onEnter does not push url to browser if it is not scrolling upwards into an article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    rendered.instance().onEnter({}, {})
    window.history.replaceState.args.length.should.equal(0)
  })

  it('#onLeave does not push url to browser if it is not scrolling downwards into the next article', () => {
    const rendered = shallow(
      <InfiniteScrollArticle article={fixtures.article} />
    )
    rendered.instance().onLeave(0, {})
    window.history.replaceState.args.length.should.equal(0)
  })

  it('#onLeave pushes next article url to browser if it is scrolling downwards into the next article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const article1 = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      slug: '456',
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    rendered.setState({ articles: rendered.state('articles').concat(article1) })
    rendered.instance().onLeave(0, {
      previousPosition: 'inside',
      currentPosition: 'above',
    })
    window.history.replaceState.args[0][2].should.containEql('/article/456')
  })

  it('sets up follow buttons', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market',
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{ name: 'Kana' }],
    })
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    rendered.state().following.length.should.exist
  })
})
