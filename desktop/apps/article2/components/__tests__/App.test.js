import 'jsdom-global/register'
import * as _ from 'underscore'
import App from 'desktop/apps/article2/components/App'
import InfiniteScrollArticle from '../InfiniteScrollArticle'
import React from 'react'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'

describe('<App />', () => {
  it('renders a standard article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}]
    })
    const rendered = shallow(<App article={article} templates={{}} />)
    rendered.find(InfiniteScrollArticle).length.should.equal(1)
    rendered.html().should.containEql('StandardLayout')
  })

  it('renders a feature article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'feature',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}]
    })
    const rendered = shallow(<App article={article} templates={{}} />)
    rendered.html().should.containEql('FeatureLayout')
  })

  it('renders Related Articles', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      contributing_authors: [{name: 'Kana'}],
      relatedArticlesPanel: [
        fixtures.article
      ]
    })
    const rendered = shallow(<App article={article} />)
    const html = rendered.html()
    html.should.containEql('Related Stories')
    html.should.containEql('RelatedArticlesPanel')
  })

  it('it mounts backbone views for super articles', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'feature',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}],
      title: 'Super Article Title'
    })
    const SuperArticleView = sinon.stub()
    App.__Rewire__('SuperArticleView', SuperArticleView)
    const rendered = mount(
      <App
        isSuper
        article={article}
        templates={{
          SuperArticleFooter: 'sa-footer',
          SuperArticleHeader: 'sa-header'
        }}
      />
    )
    rendered.html().should.containEql('sa-footer')
    rendered.html().should.containEql('sa-header')
    SuperArticleView.called.should.be.true()
    SuperArticleView.args[0][0].article.get('title').should.equal('Super Article Title')
  })

  it('renders a standard article with ads', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}],
      display: {
        name: 'Campaign 1',
        panel: {
          assets: [{ url: 'http://url.jpg' }],
          headline: 'Ad Headline',
          link: { url: 'http://link' }
        },
        canvas: {
          assets: [{ url: 'http://url.jpg' }],
          headline: 'Ad Headline',
          link: { url: 'http://link' },
          layout: 'standard'
        }
      }
    })
    const rendered = shallow(<App article={article} templates={{}} />)
    const html = rendered.html()
    html.should.containEql('DisplayPanel')
    html.should.containEql('DisplayCanvas')
    html.should.containEql('Campaign 1')
    html.should.containEql('Ad Headline')
  })
})
