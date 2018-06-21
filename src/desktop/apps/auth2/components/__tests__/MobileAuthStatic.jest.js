import { mount } from 'enzyme'
import React from 'react'
import { FormSwitcher } from '@artsy/reaction/dist/Components/Authentication/Mobile/FormSwitcher'
import { MobileAuthStatic } from '../MobileAuthStatic'

describe('MobileAuthStatic', () => {
  it('Renders the FormSwitcher', () => {
    const component = mount(
      <MobileAuthStatic type="login" handleSubmit={jest.fn()} />
    )

    expect(component.find(FormSwitcher).exists()).toBe(true)
  })
})
