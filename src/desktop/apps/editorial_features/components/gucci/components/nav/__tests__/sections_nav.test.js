import 'jsdom-global/register'
import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { SectionsNav } from '../sections_nav.jsx'

describe('SectionsNav', () => {
  const props = {
    activeSection: null,
    sections: [{ title: 'Past' }, { title: 'Present' }, { title: 'Future' }],
    onClick: sinon.stub(),
  }

  it('Renders the titles for each section', () => {
    const component = mount(<SectionsNav {...props} />)
    component.html().should.containEql('Past')
    component.html().should.containEql('Present')
    component.html().should.containEql('Future')
  })

  it('Calls onClick with section index on title click', () => {
    const component = mount(<SectionsNav {...props} />)
    component
      .find('.SectionsNav__item')
      .last()
      .simulate('click')
    props.onClick.args[0][0].should.eql(2)
  })
})
