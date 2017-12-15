import 'jsdom-global/register'
import * as _ from 'underscore'
import benv from 'benv'
import React from 'react'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import { mount } from 'enzyme'
import { data as sd } from 'sharify'

describe('<App />', () => {
  before((done) => {
    benv.setup(() => {
      benv.expose({$: benv.require('jquery'), jQuery: benv.require('jquery')})
      sd.APP_URL = 'http://artsy.net'
      sd.CURRENT_PATH = '/article/artsy-editorial-surprising-reason-men-women-selfies-differently'
      sd.CURRENT_USER = {id: '123'}
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

  const App = require('desktop/apps/article/components/App').default
  const { Article } = require('@artsy/reaction-force/dist/Components/Publishing')
  const { ArticleLayout } = require('../layouts/Article')

  it('renders a standard article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'standard',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}]
    })
    const rendered = mount(<App article={article} templates={{}} />)
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(1)
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
    const rendered = mount(<App article={article} templates={{}} />)
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(1)
    rendered.html().should.containEql('FeatureLayout')
  })

  it('renders a series article', () => {
    const article = _.extend({}, fixtures.article, {
      layout: 'series',
      vertical: {
        name: 'Art Market'
      },
      published_at: '2017-05-19T13:09:18.567Z',
      contributing_authors: [{name: 'Kana'}]
    })
    const rendered = mount(<App article={article} templates={{}} />)
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(0)
    rendered.html().should.containEql('Series')
  })
})
