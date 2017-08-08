import React from 'react'
import { renderReactLayout, __RewireAPI__ } from '../renderReactLayout'

describe.only('components/react/utils/renderReactLayout.js', () => {
  beforeEach(() => {
    __RewireAPI__.__Rewire__('ServerStyleSheet', class ServerStyleSheet {
      collectStyles () {}
      getStyleTags () {}
    })
  })

  afterEach(() => {
    __RewireAPI__.__ResetDependency__('renderTemplate')
    __RewireAPI__.__ResetDependency__('ServerStyleSheet')
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
      __RewireAPI__.__ResetDependency__('renderToString')
      done()
    })

    renderReactLayout({
      blocks: {
        body: () => <div />
      }
    })
  })

  // FIXME:
  // This test is dependent on this issue being resolved:
  // https://github.com/styled-components/styled-components/issues/893

  // it('injects styled component styles to template head', () => {
  //   const StyledDiv = styled.div`
  //     color: red;
  //   `
  //
  //   const output = renderReactLayout({
  //     blocks: {
  //       body: () => <StyledDiv />
  //     },
  //     locals: {
  //       asset: () => {},
  //       sd: {}
  //     }
  //   })
  //   output.should.containEql('color: red;')
  // })

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
