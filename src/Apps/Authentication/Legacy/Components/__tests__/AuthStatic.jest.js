import { merge } from "lodash"
import { mount } from "enzyme"
import { ModalHeader } from "Components/Modal/ModalHeader"
import { FormSwitcher } from "Components/Authentication/FormSwitcher"
import { AuthStatic } from "Apps/Authentication/Legacy/Components/AuthStatic"

describe("AuthStatic", () => {
  const getWrapper = props => {
    return mount(<AuthStatic {...props} />)
  }

  let props
  beforeAll(() => {
    props = {
      type: "login",
      meta: {
        title: "A title",
      },
      handleSubmit: jest.fn(),
      options: {},
    }
  })

  it("Renders the FormSwitcher", () => {
    const component = getWrapper(props)
    expect(component.find(FormSwitcher).exists()).toBe(true)
  })

  it("Renders the DesktopHeader", () => {
    const component = getWrapper(props)
    expect(component.find(ModalHeader).text()).toMatch("A title")
  })

  it("shows description on login", () => {
    const component = getWrapper(
      merge(props, {
        meta: {
          description: "a description",
        },
      })
    )
    expect(component.find(ModalHeader).text()).toMatch("a description")
  })
})
