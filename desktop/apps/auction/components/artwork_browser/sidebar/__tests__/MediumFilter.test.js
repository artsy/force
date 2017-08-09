import React from 'react'
import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import { test, __RewireAPI__ } from 'desktop/apps/auction2/components/artwork_browser/sidebar/MediumFilter'

const { MediumFilter } = test

describe('auction/components/artwork_browser/sidebar/MediumFilter.test', () => {
  describe('<MediumFilter />', () => {
    const BasicCheckbox = () => <div />

    const props = {
      allMediums: { id: 1 },
      mediumIds: [1, 2, 3],
      aggregatedMediums: [{ id: 1 }, { id: 2 }, { id: 3 }],
      initialMediumMap: [{ id: 1 }, { id: 2 }, { id: 3 }]
    }

    beforeEach(() => {
      __RewireAPI__.__Rewire__('BasicCheckbox', BasicCheckbox)
    })

    afterEach(() => {
      __RewireAPI__.__ResetDependency__('BasicCheckbox')
    })

    it('renders a Medium label', () => {
      const { wrapper } = renderTestComponent({
        Component: MediumFilter,
        props
      })

      wrapper.html().should.containEql('Medium')
    })

    it('renders a list of Medium checkboxes', () => {
      const { wrapper } = renderTestComponent({
        Component: MediumFilter,
        props
      })

      wrapper.find(BasicCheckbox).length.should.eql(4)
    })
  })
})
