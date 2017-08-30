import React from 'react'
import { shallow } from 'enzyme'
import TAGPContent from '../TAGPContent'

describe('TAGPContent', () => {
  let component
  let geneFamilies
  let allFeaturedGenesByFamily

  beforeEach(() => {
    geneFamilies = [
      {
        id: 'materials',
        name: 'Materials',
        genes: [
          /* … */
        ]
      },
      {
        id: 'styles',
        name: 'Styles',
        genes: [
          /* … */
        ]
      }
    ]
    allFeaturedGenesByFamily = [
      {
        name: 'Materials',
        genes: [
          /* … */
        ]
      },
      {
        name: 'Styles',
        genes: [
          /* … */
        ]
      }
    ]
    component = shallow(
      <TAGPContent
        geneFamilies={geneFamilies}
        allFeaturedGenesByFamily={allFeaturedGenesByFamily}
      />
    )
  })

  it('renders the intro to TAGP', () => {
    component.find('TAGPIntro').length.should.equal(1)
  })

  it('renders the gene families listing', () => {
    component.find('GeneFamilies').length.should.equal(1)
  })
})
