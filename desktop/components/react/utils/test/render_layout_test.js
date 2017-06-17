import React from 'react'
import renderLayout from '../render_layout'

describe('components/react/utils/render_layout.js', () => {
  afterEach(() => {
    renderLayout.__ResetDependency__('renderTemplate')
  })

  it('renders jade template blocks', () => {
    renderLayout.__Rewire__('renderTemplate', (options) => {
      return 'jade'
    })

    const output = renderLayout({
      blocks: {
        header: 'foo.jade'
      }
    })

    output.should.eql('jade')
  })

  it('renders a stateless functional react component', (done) => {
    renderLayout.__Rewire__('renderTemplate', (options) => {
      return 'react'
    })

    renderLayout.__Rewire__('renderToString', () => {
      done()
    })

    renderLayout({
      blocks: {
        body: () => <div />
      }
    })
  })

  it('throws if trying to render a class component', () => {
    (() => // eslint-disable-line
      renderLayout({
        blocks: {
          header: class Foo extends React.Component { render () {} }
        }
      })
    ).should.throw
  })

  it('renders a string', () => {
    renderLayout.__Rewire__('renderTemplate', () => {
      return 'string'
    })

    const output = renderLayout({
      blocks: {
        header: 'hello there'
      }
    })

    output.should.eql('string')
  })
})
