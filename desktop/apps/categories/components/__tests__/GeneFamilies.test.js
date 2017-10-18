import React from 'react'
import { shallow } from 'enzyme'
import GeneFamilies from '../GeneFamilies'

describe('GeneFamilies', () => {
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
    component = shallow(<GeneFamilies geneFamilies={geneFamilies} allFeaturedGenesByFamily={allFeaturedGenesByFamily} />)
  })

  it('renders each GeneFamily', () => {
    component.find('GeneFamily').length.should.equal(geneFamilies.length)
  })
})
