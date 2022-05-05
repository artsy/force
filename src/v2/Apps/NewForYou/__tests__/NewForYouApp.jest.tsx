import { MockBoot } from "v2/DevTools"
import { render, screen } from "@testing-library/react"
import { NewForYouApp } from "../NewForYouApp"
import { SystemContextProvider } from "v2/System"

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    router: {
      replace: jest.fn(),
    },
  }),
}))

describe("NewForYouApp", () => {
  it("renders", () => {
    render(
      <MockBoot breakpoint="lg">
        <SystemContextProvider>
          <NewForYouApp />
        </SystemContextProvider>
      </MockBoot>
    )
    expect(screen.getByText("New Works For You")).toBeInTheDocument()
  })
})
