import 'jsdom-global/register'
import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { FixedHeader } from '../fixed_header.jsx'
import { Header } from '../header.jsx'
import { SectionsNav } from '../sections_nav.jsx'

describe('FixedHeader', () => {
  let props

  beforeEach(() => {
    props = {
      activeSection: null,
      curation: {
        name: 'Artists For Gender Equality',
        sections: [
          { title: 'Past' },
          { title: 'Present' },
          { title: 'Future' },
        ],
        partner_logo_primary: 'http://partner.com/logo.jpg',
        partner_link_url: 'http://partner.com',
      },
      isOpen: null,
      isVisible: null,
      onChangeSection: sinon.stub(),
    }
    document.documentElement.scrollTop = 200
  })

  it('Renders the Header component', () => {
    const component = mount(<FixedHeader {...props} />)
    component.find(Header).length.should.eql(1)
  })

  it('Hides the SectionsNav component when props.isOpen is false', () => {
    const component = mount(<FixedHeader {...props} />)
    component.find(SectionsNav).length.should.eql(0)
  })

  it('Renders the SectionsNav component if props.isOpen', () => {
    props.isOpen = true
    const component = mount(<FixedHeader {...props} />)
    component.find(SectionsNav).length.should.eql(1)
  })

  it('Sets state.isOpen on mouseEnter', () => {
    const component = mount(<FixedHeader {...props} />)
    component.simulate('mouseEnter')
    component.state().isOpen.should.eql(true)
    component.find(SectionsNav).length.should.eql(1)
  })

  it('Sets state.isOpen on on mouseLeave', () => {
    props.isOpen = true
    const component = mount(<FixedHeader {...props} />)
    component.simulate('mouseLeave')
    component.state().isOpen.should.eql(false)
    component.find(SectionsNav).length.should.eql(0)
  })

  it('Sets up a scroll listener on mount', () => {
    window.addEventListener = sinon.spy()
    mount(<FixedHeader {...props} />)
    window.addEventListener.args[0][0].should.eql('scroll')
  })

  it('#onScroll opens menu if scrolling up', () => {
    const component = mount(<FixedHeader {...props} />)
    component.setState({ scrollPosition: 201 })
    component.instance().onScroll()
    component.state().isOpen.should.eql(true)
    component.state().scrollPosition.should.eql(200)
  })

  it('#onScroll closes menu if scrolling down', () => {
    const component = mount(<FixedHeader {...props} />)
    component.setState({ isOpen: true, scrollPosition: 199 })
    component.instance().onScroll()
    component.state().isOpen.should.eql(false)
    component.state().scrollPosition.should.eql(200)
  })
})
