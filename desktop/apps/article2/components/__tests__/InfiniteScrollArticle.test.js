import 'jsdom-global/register'
import InfiniteScrollArticle, { __RewireAPI__ as RoutesRewireApi } from 'desktop/apps/article2/components/InfiniteScrollArticle'
import sinon from 'sinon'
import _ from 'underscore'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import { shallow, mount } from 'enzyme'
import React from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'
const { Article } = components

describe('<StandardArticle />', () => {
  it('renders the initial article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      contributing_authors: [{name: 'Kana'}]
    })
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    rendered.find(Article).length.should.equal(1)
    rendered.html().should.containEql('standard_layout')
  })

  it('fetches more articles at the end of the page', async () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}]
    })
    const data = {
      articles: [_.extend({}, fixtures.article, {
        slug: 'foobar',
        channel_id: '123',
        id: '678'
      })]
    }
    RoutesRewireApi.__Rewire__(
      'positronql',
      sinon.stub().returns(Promise.resolve(data))
    )
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    await rendered.instance().fetchNextArticles()
    rendered.update()
    rendered.find(Article).length.should.equal(2)
  })

  it('renders Related Articles', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      contributing_authors: [{name: 'Kana'}],
      relatedArticlesCanvas: [
        fixtures.article
      ],
      relatedArticlesPanel: [
        fixtures.article
      ]
    })
    const rendered = shallow(<InfiniteScrollArticle article={article} />)
    const html = rendered.html()
    html.should.containEql('Related Stories')
    html.should.containEql('Further Reading')
    html.should.containEql('related_articles_panel')
    html.should.containEql('related_articles_canvas')
  })

  it('renders the email signup when user is not subscribed', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      contributing_authors: [{name: 'Kana'}]
    })
    const rendered = mount(<InfiniteScrollArticle article={article} emailSignupUrl={'/signup/editorial'} />)
    rendered.html().should.containEql('Stay up to date with Artsy Editorial')
  })

  it('does not render the email signup when user is subscribed', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      contributing_authors: [{name: 'Kana'}]
    })
    const rendered = mount(<InfiniteScrollArticle article={article} emailSignupUrl={''} />)
    rendered.html().should.not.containEql('Stay up to date with Artsy Editorial')
  })
})
