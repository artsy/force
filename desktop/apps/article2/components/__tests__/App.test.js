import App from 'desktop/apps/article2/components/App'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import React from 'react'
import { shallow } from 'enzyme'
import * as _ from 'underscore'
const { Article } = components
import InfiniteScrollArticle from '../InfiniteScrollArticle'

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
    const rendered = shallow(<App article={article} />)
    rendered.find(InfiniteScrollArticle).length.should.equal(1)
    rendered.html().should.containEql('standard_layout')
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
    const rendered = shallow(<App article={article} />)
    rendered.find(Article).length.should.equal(1)
    rendered.html().should.containEql('feature_layout')
  })
})
