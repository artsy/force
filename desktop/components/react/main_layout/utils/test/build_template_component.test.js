/* eslint-disable react/prop-types */

import React from 'react'
import buildTemplateComponent from '../build_template_component'
import { render } from 'enzyme'

describe('components/react/main_layout/utils/build_template_component.jsx', () => {
  before(() => {
    buildTemplateComponent.__Rewire__('getForceLayout', () => ({
      render: (locals) => ({
        Header: ({ children }) => <header>{children}</header>,
        Body: ({ children }) => <body>{children}</body>,
        Footer: ({ children }) => <footer>{children}</footer>
      })
    }))
  })

  after(() => {
    buildTemplateComponent.__ResetDependency__('getForceLayout')
  })

  describe('#buildTemplateComponent', () => {
    it('takes a string and returns a component with the innerHTML set to that string', () => {
      const Component = buildTemplateComponent('foo')
      const wrapper = render(<Component />)
      wrapper.text().should.eql('foo')
    })

    it('accepts children', () => {
      const Component = buildTemplateComponent('foo')
      const wrapper = render(<Component> hello there</Component>)
      wrapper.text().should.eql('foo hello there')
    })
  })
})
