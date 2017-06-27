import React from 'react'
import { renderReactLayout, __RewireAPI__ } from '../render_react_layout'

describe('components/react/utils/render_react_layout.js', () => {
  afterEach(() => {
    __RewireAPI__.__ResetDependency__('renderTemplate')
  })

  it('renders jade template blocks', () => {
    __RewireAPI__.__Rewire__('renderTemplate', (options) => {
      return 'jade'
    })

    const output = renderReactLayout({
      blocks: {
        header: 'foo.jade'
      }
    })

    output.should.eql('jade')
  })

  it('renders a stateless functional react component', (done) => {
    __RewireAPI__.__Rewire__('renderTemplate', (options) => {
      return 'react'
    })

    __RewireAPI__.__Rewire__('renderToString', () => {
      done()
    })

    renderReactLayout({
      blocks: {
        body: () => <div />
      }
    })
  })

  it('throws if trying to render a class component', () => {
    (() => // eslint-disable-line
      renderReactLayout({
        blocks: {
          header: class Foo extends React.Component { render () {} }
        }
      })
    ).should.throw
  })

  it('renders a string', () => {
    __RewireAPI__.__Rewire__('renderTemplate', () => {
      return 'string'
    })

    const output = renderReactLayout({
      blocks: {
        header: 'hello there'
      }
    })

    output.should.eql('string')
  })
})
