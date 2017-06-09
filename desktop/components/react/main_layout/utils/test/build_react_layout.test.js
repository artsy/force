/* eslint-disable react/prop-types */

import React from 'react'
import buildReactLayout from '../build_react_layout'

describe('components/react/main_layout/utils/build_react_layout.jsx', () => {
  before(() => {
    buildReactLayout.__Rewire__('getForceLayout', () => ({
      Header: ({ children }) => <header>{children}</header>,
      Body: ({ children }) => <body>{children}</body>,
      Footer: ({ children }) => <footer>{children}</footer>
    }))
  })

  after(() => {
    buildReactLayout.__ResetDependency__('getForceLayout')
  })

  describe('#buildReactLayout', () => {
    it('returns a layout object containing defaults', () => {
      const container = buildReactLayout()
      container.should.have.keys('Layout')
      container.Layout.should.have.keys('Header', 'Body', 'Footer')
    })

    it('returns additional custom layouts plucked from template key', () => {
      const container = buildReactLayout({
        templates: {
          foo: 'foo',
          bar: 'bar',
          baz: 'baz'
        }
      })

      container.should.have.keys('Foo', 'Bar', 'Baz')
    })

    it('returns renderable components', () => {
      const container = buildReactLayout({
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
})
