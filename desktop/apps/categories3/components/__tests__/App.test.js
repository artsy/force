import React from 'react'
import { shallow } from 'enzyme'
import App from '../App'

describe('Categories App', () => {
  let app
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

    app = shallow(<App geneFamilies={geneFamilies} allFeaturedGenesByFamily={allFeaturedGenesByFamily} />)
  })

  it('renders navigation', () => {
    app.find('GeneFamilyNav').length.should.equal(1)
  })

  it('renders TAGP content', () => {
    app.find('TAGPContent').length.should.equal(1)
  })
})
