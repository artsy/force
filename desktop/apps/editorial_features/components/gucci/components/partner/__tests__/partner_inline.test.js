import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import { PartnerInline } from '../partner_inline.jsx'

describe('Partner Inline', () => {
  const props = {
    logo: 'http://partner.com/logo.jpg',
    url: 'http://partner.com'
  }

  it('Shows the artsy logo', () => {
    const component = mount(
      <PartnerInline {...props} />
    )
    component.html().should.containEql('<a href="/" class="icon-logotype">')
  })

  it('Shows a partner link and logo if logo present', () => {
    const component = mount(
      <PartnerInline {...props} />
    )
    component.html().should.containEql('href="http://partner.com"')
    component.html().should.containEql('src="http://partner.com/logo.jpg"')
  })

  it('Hides partner link and logo if logo not present', () => {
    delete props.logo
    const component = mount(
      <PartnerInline {...props} />
    )
    component.html().should.not.containEql('href="http://partner.com"')
    component.html().should.not.containEql('src="http://partner.com/logo.jpg"')
  })
})
