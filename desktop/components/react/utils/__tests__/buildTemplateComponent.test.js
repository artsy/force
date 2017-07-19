import React from 'react'
import buildTemplateComponent from '../buildTemplateComponent'
import { render } from 'enzyme'

describe('components/react/utils/buildTemplateComponent.js', () => {
  beforeEach(() => {
    buildTemplateComponent.__Rewire__('renderTemplate', (html) => html)
  })

  afterEach(() => {
    buildTemplateComponent.__ResetDependency__('renderTemplate')
  })

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
