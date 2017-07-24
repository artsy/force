import App from 'desktop/apps/article2/components/App'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import fixtures from 'desktop/test/helpers/fixtures.coffee'
import React from 'react'
import { shallow } from 'enzyme'
const { ImagesetPreview, Artwork, Image, FeatureHeader } = components

describe('<App />', () => {
  it('renders image collections', () => {
    // FIXME: The fixtures for articles.contributing_authors is empty

    // const article = fixtures.article
    // const rendered = shallow(<App article={article} />)
    // rendered.find(Artwork).length.should.equal(1)
    // rendered.find(Image).length.should.equal(1)
  })
  it('renders image set previews', () => {
    // FIXME: The fixtures for articles.contributing_authors is empty

    // const article = fixtures.article
    // const rendered = shallow(<App article={article} />)
    // rendered.find(ImagesetPreview).length.should.equal(1)
  })
  it('renders feature headers', () => {
    // FIXME: The fixtures for articles.contributing_authors is empty

    // const article = fixtures.article
    // const rendered = shallow(<App article={article} />)
    // rendered.find(FeatureHeader).length.should.equal(1)
  })
})
