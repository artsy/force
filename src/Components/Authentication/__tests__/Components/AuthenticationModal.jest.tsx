import { AuthenticationModal } from "Components/Authentication/Components/AuthenticationModal"
import { mount } from "enzyme"

jest.mock("Utils/Events")

describe("AuthenticationModal", () => {
  const getWrapper = (props: any = {}) =>
    mount(
      <AuthenticationModal tracking={props.tracking} onClose={jest.fn()} show>
        <div>Modal Contents</div>
      </AuthenticationModal>
    )

  it("renders children", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatch("Modal Contents")
  })

  it("renders a subtitle", () => {
    const wrapper = mount(
      <AuthenticationModal subtitle="Test Subtitle" onClose={jest.fn()} show>
        <div>Modal Contents</div>
      </AuthenticationModal>
    )
    expect(wrapper.text()).toMatch("Test Subtitle")
  })

  describe("Analytics", () => {
    it("tracks close", () => {
      const tracking = { trackEvent: jest.fn() }
      const wrapper = getWrapper({ tracking })
      wrapper.find("Icon").at(0).simulate("click")

      expect(tracking.trackEvent).toBeCalledWith({
        action: "Click",
        flow: "auth",
        label: "dismiss auth modal",
        type: "dismiss",
      })
    })
  })
})
