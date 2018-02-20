import 'jsdom-global/register'
import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'

describe('App', () => {
  let props
  let App
  window.matchMedia = () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }
  }

  beforeEach(() => {
    window.history.pushState = sinon.stub()
    App = require('desktop/apps/editorial_features/components/gucci/components/App.jsx')
      .default
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
      isMobile: false,
    }
    document.documentElement.scrollTop = 200
  })

  it('#onEnterSection', () => {
    const component = mount(<App {...props} />)
    component.instance().onEnterSection(0, {
      previousPosition: 'above',
      currentPosition: 'inside',
    })
    document.title.should.equal('Past')
    window.history.pushState.args[0][1].should.equal('Past')
    component.state('activeSection').should.equal(0)
    component.instance().onEnterSection(1, {
      previousPosition: 'above',
      currentPosition: 'inside',
    })
    document.title.should.equal('Present')
    window.history.pushState.args[1][1].should.equal('Present')
    component.state('activeSection').should.equal(1)
  })

  it('#onLeaveSection', () => {
    const component = mount(<App {...props} />)
    component.instance().onLeaveSection(0, {
      previousPosition: 'inside',
      currentPosition: 'above',
    })
    document.title.should.equal('Present')
    window.history.pushState.args[0][1].should.equal('Present')
    component.state('activeSection').should.equal(1)
    component.instance().onLeaveSection(1, {
      previousPosition: 'inside',
      currentPosition: 'above',
    })
    document.title.should.equal('Future')
    window.history.pushState.args[1][1].should.equal('Future')
    component.state('activeSection').should.equal(2)
  })
})
