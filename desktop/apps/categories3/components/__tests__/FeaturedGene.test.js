import React from 'react'
import { render } from 'enzyme'
import FeaturedGene from '../FeaturedGene'

describe('FeaturedGene', () => {
  let rendered
  let featuredGene

  beforeEach(() => {
    featuredGene = {
      title: 'Gold',
      href: '/gene/gold',
      image: {
        url: 'gold.jpg'
      }
    }

    rendered = render(<FeaturedGene {...featuredGene} />)
  })

  it('renders a link to the gene', () => {
    rendered.find('a').text().should.equal('Gold')
    rendered.find('a').attr('href').should.equal('/gene/gold')
  })

  it('renders an image for the gene', () => {
    rendered.find('img').attr('src').should.equal('gold.jpg')
  })
})
