import React from 'react'
import { render } from 'enzyme'
import GeneFamily from '../GeneFamily'

describe('GeneFamily', () => {
  let rendered
  let geneFamily

  beforeEach(() => {
    geneFamily = {
      id: 'materials',
      name: 'Materials',
      genes: [
        {
          id: 'gold',
          name: 'Gold'
        },
        {
          id: 'silver',
          name: 'Silver'
        },
        {
          id: 'bronze',
          name: 'Bronze'
        }
      ]
    }
    rendered = render(<GeneFamily {...geneFamily} />)
  })

  it('renders a family name heading', () => {
    rendered.find('h2').text().should.equal('Materials')
  })

  it('renders a list of genes', () => {
    rendered.find('ul').length.should.equal(1)
    rendered.find('li').length.should.equal(3)
  })

  it('alphabetizes the genes', () => {
    rendered.find('li a').eq(0).text().should.equal('Bronze')
    rendered.find('li a').eq(1).text().should.equal('Gold')
    rendered.find('li a').eq(2).text().should.equal('Silver')
  })
})
