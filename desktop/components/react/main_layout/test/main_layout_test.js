/* eslint-disable react/prop-types */

import React from 'react'
import { makeLayout, makeTemplateComponent, Layout, __RewireAPI__ } from '../index'
import { render } from 'enzyme'

describe('components/react/main_layout', () => {
  before(() => {
    __RewireAPI__.__Rewire__('getLayout', () => ({
      render: (locals) => ({
        Header: ({ children }) => <header>{children}</header>,
        Body: ({ children }) => <body>{children}</body>,
        Footer: ({ children }) => <footer>{children}</footer>
      })
    }))
  })

  after(() => {
    __RewireAPI__.__ResetDependency__('getLayout')
  })

  describe('#makeLayout', () => {
    it('returns a layout object containing defaults', () => {
      const container = makeLayout()
      container.should.have.keys('Layout')
      container.Layout.should.have.keys('Header', 'Body', 'Footer')
    })

    it('returns additional custom layouts plucked from template key', () => {
      const container = makeLayout({
        templates: {
          foo: 'foo',
          bar: 'bar',
          baz: 'baz'
        }
      })

      container.should.have.keys('Foo', 'Bar', 'Baz')
    })

    it('returns renderable components', () => {
      const container = makeLayout({
        templates: {
          foo: 'foo'
        }
      })

      container.Layout.Header({}).type.should.eql('header')
      container.Layout.Body({}).type.should.eql('body')
      container.Layout.Footer({}).type.should.eql('footer')
      container.Foo({}).type.should.eql('div')
    })
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

  describe('<Layout />', () => {
    it('should return a default layout', () => {
      const wrapper = render(<Layout>foo</Layout>)
      wrapper.html().should.eql('<div><header></header><body>foo</body><footer></footer></div>')
    })
  })
})
