import { BuyerGuaranteeIndex } from "../BuyerGuaranteeIndex"
import { MockBoot } from "DevTools"
import { mount } from "enzyme"

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
