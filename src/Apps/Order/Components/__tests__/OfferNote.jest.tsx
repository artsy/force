import { OfferNote } from "Apps/Order/Components/OfferNote"
import { useInquiry } from "Components/Inquiry/useInquiry"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import type { ExtractProps } from "Utils/ExtractProps"
import { fireEvent, render, screen } from "@testing-library/react"

const simulateTyping = (text: string) => {
  const textArea = screen.getByRole("textbox")
  fireEvent.change(textArea, { target: { value: text } })
}

jest.mock("Components/Inquiry/useInquiry")

describe("OfferNote", () => {
  const onChange = jest.fn()
  const showInquiry = jest.fn()

  beforeEach(() => {
    ;(useInquiry as jest.Mock).mockImplementation(() => ({ showInquiry }))
  })

  afterEach(() => {
    onChange.mockReset()
    showInquiry.mockReset()
  })

  const renderComponent = (
    props: Partial<ExtractProps<typeof OfferNote>> = {}
  ) => {
    return render(
      <SystemContextProvider>
        <OfferNote onChange={onChange} artworkId="artwork-id" {...props} />
      </SystemContextProvider>
    )
  }

  it("calls onChange with appropriate change events", () => {
    renderComponent()

    simulateTyping("hello world")

    expect(onChange).toHaveBeenCalledWith({
      value: "hello world",
      exceedsCharacterLimit: false,
    })
  })

  it("has a title and description", () => {
    renderComponent()
    expect(screen.getByText("Note (recommended)")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Add additional information to help the gallery to evaluate your offer."
      )
    ).toBeInTheDocument()
  })
})
