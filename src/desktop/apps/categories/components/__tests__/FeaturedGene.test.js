import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
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

    rendered = mount(<FeaturedGene {...featuredGene} />)
  })

  it('renders a link to the gene', () => {
    rendered.find('a').text().should.containEql('Gold')
    rendered.find('a').props().href.should.equal('/gene/gold')
  })

  it('renders an image for the gene', () => {
    rendered.find('img').props().src.should.equal('gold.jpg')
  })
})
