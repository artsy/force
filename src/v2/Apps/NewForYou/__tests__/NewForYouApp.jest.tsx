import { MockBoot } from "v2/DevTools"
import { render, screen } from "@testing-library/react"
import { NewForYouApp } from "../NewForYouApp"

describe("NewForYouApp", () => {
  it("renders", () => {
    render(
      <MockBoot breakpoint="lg">
        <NewForYouApp />
      </MockBoot>
    )
    expect(screen.getByText("NewForYouApp")).toBeInTheDocument()
  })
})
