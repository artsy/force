import 'jsdom-global/register'
import benv from 'benv'
import React from 'react'
import { mount } from 'enzyme'
import { data as sd } from 'sharify'

describe('<App />', () => {
  before((done) => {
    benv.setup(() => {
      benv.expose({
        $: benv.require('jquery'),
        jQuery: benv.require('jquery'),
      })
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

  const { App } = require('desktop/apps/article/components/App')

  const {
    Article,
    Fixtures,
  } = require('@artsy/reaction-force/dist/Components/Publishing')

  const { ArticleLayout } = require('../layouts/Article')

  it('renders a standard article', () => {
    const rendered = mount(
      <App article={Fixtures.StandardArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(1)
    rendered.html().should.containEql('StandardLayout')
  })

  it('renders a feature article', () => {
    const rendered = mount(
      <App article={Fixtures.FeatureArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(1)
    rendered.html().should.containEql('FeatureLayout')
  })

  it('renders a series article', () => {
    const rendered = mount(
      <App article={Fixtures.SeriesArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(0)
    rendered.html().should.containEql('Series')
  })

  it('renders a video article', () => {
    const rendered = mount(
      <App article={Fixtures.VideoArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(0)
    rendered.html().should.containEql('Video')
  })
})
