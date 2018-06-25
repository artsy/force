import { mount } from 'enzyme'
import React from 'react'
import { DesktopHeader } from '@artsy/reaction/dist/Components/Authentication/Desktop/Components/DesktopHeader'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/Desktop/FormSwitcher'
import { AuthStatic } from '../AuthStatic'

xdescribe('AuthStatic', () => {
  const getWrapper = props => {
    return mount(<AuthStatic {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      type: 'login',
      subtitle: 'A sub title',
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
    expect(component.find(DesktopHeader).text()).toMatch('A sub title')
  })
})
