import { ContactUs } from "../ContactUs"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import { render, screen } from "@testing-library/react"

jest.mock("react-tracking")

describe("ContactUs", () => {
  const getWrapper = (breakpoint = "md") => {
    return render(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <ContactUs />
      </MockBoot>
    )
  }

  it("contains correct email in body with, correct email link and phone number", () => {
    getWrapper()
    // console.log("*****************************")
    // const text = screen.getByTestId("contactUsBody")
    // debug(text)
    // expect(within(text).getByText("Email us at")).toBeInTheDocument()
    expect(screen.getByText("sell@artsy.net")).toBeInTheDocument()
    expect(screen.getByText("+1-646-797-3423")).toBeInTheDocument()
  })
})
