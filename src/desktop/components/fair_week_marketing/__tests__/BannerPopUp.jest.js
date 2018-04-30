import React from 'react'
import { mount } from 'enzyme'
import { BannerPopUp, Container } from '../BannerPopUp'
import MarketingModal from 'desktop/components/marketing_signup_modal/index.coffee'

describe('BannerPopUp', () => {
  MarketingModal.prototype.open = jest.fn()

  let props = {
    ctaTitle: 'CTA Title',
    ctaImageUrl: 'http://image.jpg',
  }

  const getWrapper = props => {
    return mount(<BannerPopUp {...props} />)
  }

  it('renders title and image', () => {
    const component = getWrapper(props)

    expect(component.text()).toMatch(props.ctaTitle)
    expect(component.html()).toMatch(props.ctaImageUrl)
  })

  it('Calls #openModal on click', () => {
    const component = getWrapper(props)
    component.find(Container).simulate('click')

    expect(MarketingModal.prototype.open.mock.calls.length).toBe(1)
  })
})
