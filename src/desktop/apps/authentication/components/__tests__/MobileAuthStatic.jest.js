import { mount } from "enzyme"
import React from "react"
import { FormSwitcher } from "v2/Components/Authentication/FormSwitcher"
import { MobileAuthStatic } from "../MobileAuthStatic"

describe("MobileAuthStatic", () => {
  it("Renders the FormSwitcher", () => {
    const component = mount(
      <MobileAuthStatic type="login" handleSubmit={jest.fn()} options={{}} />
    )

    expect(component.find(FormSwitcher).exists()).toBe(true)
  })
})
