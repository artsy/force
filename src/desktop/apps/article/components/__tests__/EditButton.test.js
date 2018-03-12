import 'jsdom-global/register'
import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'

const rewire = require('rewire')('../EditButton')
const { EditButton } = rewire

describe('<EditButton />', () => {
  it('does not render edit button if there is no user', () => {
    const rendered = mount(<EditButton slug='artsy-editorial-slug' channelId='123' />)
    rendered.children().length.should.equal(0)
  })

  it('renders edit button if the user is a member of the article\'s channel', async () => {
    rewire.__set__('sd', { CURRENT_USER: { id: '567' } })
    const data = {
      channels: [ {id: '123'}, {id: '234'} ]
    }
    const promise = Promise.resolve(data)
    rewire.__set__(
      'positronql',
      sinon.stub().returns(promise)
    )
    const rendered = mount(<EditButton slug='artsy-editorial-slug' channelId='123' />)
    await promise
    const html = rendered.html()
    html.should.containEql('/articles/artsy-editorial-slug/edit')
    html.should.containEql('icon-with-black-circle')
  })

  it('does not render edit button if the user is not a member of the article\'s channel', async () => {
    rewire.__set__('sd', { CURRENT_USER: { id: '567' } })
    const data = {
      channels: [ {id: '234'} ]
    }
    const promise = Promise.resolve(data)
    rewire.__set__(
      'positronql',
      sinon.stub().returns(promise)
    )
    const rendered = mount(<EditButton slug='artsy-editorial-slug' channelId='123' />)
    await promise
    rendered.children().length.should.equal(0)
  })
})
