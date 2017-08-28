import React from 'react'
import { render } from 'enzyme'
import TAGPIntro from '../TAGPIntro'

describe('TAGPIntro', () => {
  let rendered

  beforeEach(() => {
    rendered = render(<TAGPIntro />)

  })

  it('includes the description', () => {
    rendered.text().should.match(/The Art Genome Project/)
  })
})
