import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import EditButton, { __RewireAPI__ as RewireApi } from 'desktop/apps/article2/components/EditButton'

describe('<EditButton />', () => {
  it('does not render edit button if there is no user', () => {
    const rendered = mount(<EditButton slug='artsy-editorial-slug' channelId='123' />)
    rendered.children().length.should.equal(0)
  })

  it('renders edit button if the user is a member of the article\'s channel', async () => {
    RewireApi.__Rewire__('sd', { CURRENT_USER: { id: '567' } })
    const data = {
      channels: [ {id: '123'}, {id: '234'} ]
    }
    const promise = Promise.resolve(data)
    RewireApi.__Rewire__(
      'positronql',
      sinon.stub().returns(promise)
    )
    const rendered = mount(<EditButton slug='artsy-editorial-slug' channelId='123' />)
    await promise
    const html = rendered.html()
    html.should.containEql('/articles/artsy-editorial-slug/edit2')
    html.should.containEql('icon-with-black-circle')
  })

  it('does not render edit button if the user is not a member of the article\'s channel', async () => {
    RewireApi.__Rewire__('sd', { CURRENT_USER: { id: '567' } })
    const data = {
      channels: [ {id: '234'} ]
    }
    const promise = Promise.resolve(data)
    RewireApi.__Rewire__(
      'positronql',
      sinon.stub().returns(promise)
    )
    const rendered = mount(<EditButton slug='artsy-editorial-slug' channelId='123' />)
    await promise
    rendered.children().length.should.equal(0)
  })
})
