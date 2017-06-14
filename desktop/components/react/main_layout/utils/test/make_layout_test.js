/* eslint-disable react/prop-types */

import React from 'react'
import makeLayout from '../make_layout'

describe('components/react/main_layout/utils/make_layout.jsx', () => {
  before(() => {
    makeLayout.__Rewire__('getLayout', () => ({
      render: (locals) => ({
        Header: ({ children }) => <header>{children}</header>,
        Body: ({ children }) => <body>{children}</body>,
        Footer: ({ children }) => <footer>{children}</footer>
      })
    }))
  })

  after(() => {
    makeLayout.__ResetDependency__('getLayout')
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
})
