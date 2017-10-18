import React from 'react'
import { render } from 'enzyme'
import Gene from '../Gene'

describe('Gene', () => {
  let rendered
  let gene

  beforeEach(() => {
    gene = {
      id: 'gold',
      name: 'Gold'
    }
    rendered = render(<Gene {...gene} />)
  })

  it('renders a link to the gene', () => {
    rendered.find('a').text().should.equal('Gold')
    rendered.find('a').attr('href').should.equal('/gene/gold')
  })
})
