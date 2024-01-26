import { BuyerGuaranteeIndex } from "Apps/BuyerGuarantee/Routes/BuyerGuaranteeIndex"
import { MockBoot } from "DevTools/MockBoot"
import { mount } from "DevTools/mountWithMockBoot"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("BuyerGuaranteeIndex", () => {
  const wrapper = mount(
    <MockBoot>
      <BuyerGuaranteeIndex />
    </MockBoot>
  )

  it("renders correctly", () => {
    const comp = wrapper.find(BuyerGuaranteeIndex).html()
    expect(wrapper.find("h1")).toHaveLength(1)
    expect(comp).not.toBeNull()
  })
})
