import { mount } from "enzyme"
import { IdentityVerificationWarning } from "../IdentityVerificationWarning"

describe("IdentityVerificationWarning", () => {
  const getWrapper = () => {
    return mount(<IdentityVerificationWarning />)
  }

  it("renders correct compnents", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain(
      "This auction requires Artsy to verify your identity before bidding."
    )
  })

  it("shows /conditions-of-sale link", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain("/conditions-of-sale")
  })
})
