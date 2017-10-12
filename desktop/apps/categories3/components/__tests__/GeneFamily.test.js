import React from 'react'
import { render } from 'enzyme'
import GeneFamily from '../GeneFamily'

describe('GeneFamily', () => {
  let rendered
  let geneFamily
  let featuredGenes

  beforeEach(() => {
    geneFamily = {
      id: 'materials',
      name: 'Materials',
      genes: [
        {
          id: 'gold',
          name: 'Gold',
          display_name: 'Bigly Gold',
          is_published: true
        },
        {
          id: 'silver',
          name: 'Silver',
          display_name: 'Silver',
          is_published: true
        },
        {
          id: 'bronze',
          name: 'Bronze',
          display_name: 'Bronze',
          is_published: true
        }
      ]
    }

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

    rendered = render(<GeneFamily featuredGenes={featuredGenes} {...geneFamily} />)
  })

  it('renders a family name heading', () => {
    rendered.find('h2').text().should.equal('Materials')
  })

  it('renders image links for featured genes', () => {
    rendered.find('a img').length.should.equal(3)
  })

  it('renders a list of genes', () => {
    rendered.find('ul').length.should.equal(1)
    rendered.find('li').length.should.equal(3)
  })

  it('alphabetizes the genes by display name', () => {
    rendered.find('li a').eq(0).text().should.equal('Bigly Gold')
    rendered.find('li a').eq(1).text().should.equal('Bronze')
    rendered.find('li a').eq(2).text().should.equal('Silver')
  })
})
