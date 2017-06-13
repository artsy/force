/* eslint-disable react/prop-types */

import React from 'react'
import makeTemplateComponent from '../make_template_component'
import { render } from 'enzyme'

describe('components/react/main_layout/utils/make_template_component.jsx', () => {
  before(() => {
    makeTemplateComponent.__Rewire__('getLayout', () => ({
      render: (locals) => ({
        Header: ({ children }) => <header>{children}</header>,
        Body: ({ children }) => <body>{children}</body>,
        Footer: ({ children }) => <footer>{children}</footer>
      })
    }))
  })

  after(() => {
    makeTemplateComponent.__ResetDependency__('getLayout')
  })

  describe('#makeTemplateComponent', () => {
    it('takes a string and returns a component with the innerHTML set to that string', () => {
      const Component = makeTemplateComponent('foo')
      const wrapper = render(<Component />)
      wrapper.text().should.eql('foo')
    })

    it('accepts children', () => {
      const Component = makeTemplateComponent('foo')
      const wrapper = render(<Component> hello there</Component>)
      wrapper.text().should.eql('foo hello there')
    })
  })
})
