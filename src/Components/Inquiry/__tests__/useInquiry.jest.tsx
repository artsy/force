import {
  type WithInquiryProps,
  useInquiry,
  withInquiry,
} from "Components/Inquiry/useInquiry"
import { render, screen, fireEvent } from "@testing-library/react"
import type * as React from "react"

jest.mock("../Inquiry", () => ({
  Inquiry: ({ askSpecialist }) => (
    <>{askSpecialist ? "Specialist Inquiry" : "Artwork Inquiry"}</>
  ),
}))

describe("useInquiry", () => {
  const Wrapper: React.FC<React.PropsWithChildren<unknown>> = () => {
    const { showInquiry, inquiryComponent } = useInquiry({
      artworkID: "example",
    })

    return (
      <>
        {inquiryComponent}

        <button id="artwork-inquiry" onClick={() => showInquiry()}>
          show artwork inquiry
        </button>

        <button
          id="specialist-inquiry"
          onClick={() => showInquiry({ askSpecialist: true })}
        >
          show specialist inquiry
        </button>
      </>
    )
  }

  it("displays the artwork inquiry modal when called", () => {
    const { container } = render(<Wrapper />)

    expect(container.innerHTML).not.toContain("Artwork Inquiry")

    fireEvent.click(
      screen.getByRole("button", { name: "show artwork inquiry" }),
    )

    expect(container.innerHTML).toContain("Artwork Inquiry")
  })

  it("displays the specialist inquiry modal when called", () => {
    const { container } = render(<Wrapper />)

    expect(container.innerHTML).not.toContain("Specialist Inquiry")

    fireEvent.click(
      screen.getByRole("button", { name: "show specialist inquiry" }),
    )

    expect(container.innerHTML).toContain("Specialist Inquiry")
  })
})

describe("withInquiry", () => {
  const Wrapper: React.FC<React.PropsWithChildren<WithInquiryProps>> = ({
    showInquiry,
    inquiryComponent,
  }) => {
    return (
      <>
        {inquiryComponent}

        <button id="artwork-inquiry" onClick={() => showInquiry()}>
          show artwork inquiry
        </button>

        <button
          id="specialist-inquiry"
          onClick={() => showInquiry({ askSpecialist: true })}
        >
          show specialist inquiry
        </button>
      </>
    )
  }

  const WrapperWithInquiry = withInquiry(Wrapper)

  it("displays the artwork inquiry modal when called", () => {
    const { container } = render(<WrapperWithInquiry artworkID="example" />)

    expect(container.innerHTML).not.toContain("Artwork Inquiry")

    fireEvent.click(
      screen.getByRole("button", { name: "show artwork inquiry" }),
    )

    expect(container.innerHTML).toContain("Artwork Inquiry")
  })

  it("displays the specialist inquiry modal when called", () => {
    const { container } = render(<WrapperWithInquiry artworkID="example" />)

    expect(container.innerHTML).not.toContain("Specialist Inquiry")

    fireEvent.click(
      screen.getByRole("button", { name: "show specialist inquiry" }),
    )

    expect(container.innerHTML).toContain("Specialist Inquiry")
  })
})
