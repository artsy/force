/* eslint-disable react/prop-types */

import React from 'react'
import { Layout, __RewireAPI__ } from '../layout'
import { render } from 'enzyme'

describe('components/react/main_layout/layout.jsx', () => {
  before(() => {
    __RewireAPI__.__Rewire__('getLayout', () => ({
      Header: ({ children }) => <header>{children}</header>,
      Body: ({ children }) => <body>{children}</body>,
      Footer: ({ children }) => <footer>{children}</footer>
    }))
  })

  after(() => {
    __RewireAPI__.__ResetDependency__('getLayout')
  })

  describe('<Layout />', () => {
    it('should return a default layout', () => {
      const wrapper = render(<Layout>foo</Layout>)
      wrapper.html().should.containEql('<header></header><body>foo</body><footer></footer>')
    })
  })
})
