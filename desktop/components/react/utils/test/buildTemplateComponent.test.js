import React from 'react'
import buildTemplateComponent from '../build_template_component'
import { render } from 'enzyme'

describe('components/react/utils/build_template_component.jsx', () => {
  before(() => {
    buildTemplateComponent.__Rewire__('renderTemplate', (html) => html)
  })

  after(() => {
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
