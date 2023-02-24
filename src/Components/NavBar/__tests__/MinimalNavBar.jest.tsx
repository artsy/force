import { ArtsyLogoBlackIcon } from "@artsy/palette"
import { mount } from "enzyme"
import { SystemContextProvider } from "System/SystemContext"
import { MinimalNavBar } from "Components/NavBar/MinimalNavBar"

const getWrapper = ({ isEigen }: { isEigen?: boolean } = {}) => {
  return mount(
    <SystemContextProvider isEigen={isEigen}>
      <MinimalNavBar to="/">i am children</MinimalNavBar>
    </SystemContextProvider>
  )
}

describe("nav bar", () => {
  it("shows the artsy logo", () => {
    const tree = getWrapper()
    expect(tree.find(ArtsyLogoBlackIcon).length).toBe(1)
  })
  it("hides the artsy logo on eigen", () => {
    const tree = getWrapper({ isEigen: true })
    expect(tree.find(ArtsyLogoBlackIcon).length).toBe(0)
  })
})
