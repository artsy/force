import { mount } from 'enzyme'
import React from 'react'
import { ModalHeader } from '@artsy/reaction/dist/Components/Modal/ModalHeader'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/FormSwitcher'
import { AuthStatic } from '../AuthStatic'

describe('AuthStatic', () => {
  const getWrapper = props => {
    return mount(<AuthStatic {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      type: 'login',
      meta: {
        title: 'A sub title',
      },
      handleSubmit: jest.fn(),
      options: {},
    }
  })

  it('Renders the FormSwitcher', () => {
    const component = getWrapper(props)
    expect(component.find(FormSwitcher).exists()).toBe(true)
  })

  it('Renders the DesktopHeader', () => {
    const component = getWrapper(props)
    expect(component.find(ModalHeader).text()).toMatch('A sub title')
  })
})
