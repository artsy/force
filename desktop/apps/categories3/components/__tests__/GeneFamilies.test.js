import React from 'react'
import { shallow } from 'enzyme'
import GeneFamilies from '../GeneFamilies'

describe('GeneFamilies', () => {
  let component
  let geneFamilies

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
    component = shallow(<GeneFamilies geneFamilies={geneFamilies}/>)
  })

  it('renders each GeneFamily', () => {
    component.find('GeneFamily').length.should.equal(geneFamilies.length)
  })
})
