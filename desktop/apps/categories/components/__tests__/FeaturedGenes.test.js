import React from 'react'
import { shallow } from 'enzyme'
import FeaturedGenes from '../FeaturedGenes'
import FeaturedGene from '../FeaturedGene'

describe('FeaturedGenes', () => {
  let component
  let featuredGenes

  beforeEach(() => {
    featuredGenes = {
      name: 'Materials',
      genes: [
        {
          id: 'gold',
          title: 'Gold',
          href: '/gene/gold',
          image: {
            url: 'gold.jpg'
          }
        },
        {
          id: 'silver',
          title: 'Silver',
          href: '/gene/silver',
          image: {
            url: 'silver.jpg'
          }
        },
        {
          id: 'bronze',
          title: 'Bronze',
          href: '/gene/bronze',
          image: {
            url: 'bronze.jpg'
          }
        },
        {
          id: 'wood',
          title: 'Wood',
          href: '/gene/wood',
          image: {
            url: 'wood.jpg'
          }
        }
      ]
    }

    component = shallow(<FeaturedGenes featuredGenes={featuredGenes} />)
  })

  it('renders up to three featured genes', () => {
    component.find(FeaturedGene).length.should.equal(3)
    const titleProps = component.find(FeaturedGene).map(fg => fg.props().title)
    titleProps.should.match(['Gold', 'Silver', 'Bronze'])
  })
})
