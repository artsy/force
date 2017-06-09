/* eslint-disable react/prop-types */

import React from 'react'
import Layout from '../layout'
import { render } from 'enzyme'

describe('components/react/main_layout/layout.jsx', () => {
  before(() => {
    Layout.__Rewire__('getForceLayout', () => ({
      Header: ({ children }) => <header>{children}</header>,
      Body: ({ children }) => <body>{children}</body>,
      Footer: ({ children }) => <footer>{children}</footer>
    }))
  })

  after(() => {
    Layout.__ResetDependency__('getForceLayout')
  })

  describe('<Layout />', () => {
    it('should return a default layout', () => {
      const wrapper = render(<Layout>foo</Layout>)
      wrapper.html().should.containEql('<header></header><body>foo</body><footer></footer>')
    })
  })
})
