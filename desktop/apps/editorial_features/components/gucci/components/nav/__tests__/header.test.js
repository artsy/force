import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import { Header } from '../header.jsx'
import { PartnerInline } from '../../partner/partner_inline.jsx'

describe('Header', () => {
  const props = {
    title: 'Artists For Gender Equality',
    partner_logo: 'http://partner.com/logo.jpg',
    partner_url: 'http://partner.com'
  }

  it('Renders the ParnerInline block, title and menu link', () => {
    const component = mount(
      <Header {...props} />
    )
    component.find(PartnerInline).length.should.eql(1)
    component.html().should.containEql('Artists For Gender Equality')
    component.html().should.containEql('href="/articles"')
    component.html().should.containEql('Back to Editorial')
  })
})
