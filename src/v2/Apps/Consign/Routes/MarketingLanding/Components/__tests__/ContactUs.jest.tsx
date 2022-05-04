import { ContactUs } from "../ContactUs"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import { render, screen } from "@testing-library/react"

jest.mock("react-tracking")

describe("ContactUs", () => {
  const renderContactUs = (breakpoint = "md") => {
    return render(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <ContactUs />
      </MockBoot>
    )
  }

  it.each([
    /(Email us at)/g,
    /(sell@artsy.net)/g,
    /(\+1-646-797-3423)/g,
    /(information on how Artsy can sell your artwork\.)/g,
  ])("text body contains %s", (text: RegExp) => {
    renderContactUs()
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
