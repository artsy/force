import { fireEvent, screen } from "@testing-library/react"
import { render } from "@testing-library/react"
import {
  InquiryQuestionIDs,
  InquiryQuestionOption,
} from "Components/Inquiry/Components/InquiryQuestionOption"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"

jest.mock("../../Hooks/useInquiryContext")
jest.mock("Components/LocationAutocompleteInput", () => ({
  LocationAutocompleteInput: ({
    onChange,
  }: {
    onChange: (place: any) => void
  }) => (
    <input
      data-testid="location-input"
      onChange={e => {
        onChange({
          city: "New York",
          state: "NY",
          country: "United States",
          postalCode: "10001",
        })
      }}
    />
  ),
  normalizePlace: (place: any) => ({
    city: place.city,
    state: place.state,
    stateCode: place.state,
    country: place.country,
    postalCode: place.postalCode,
    coordinates: null,
  }),
}))

describe("InquiryQuestionOption", () => {
  const mockAddQuestion = jest.fn()
  const mockRemoveQuestion = jest.fn()
  const mockAddQuestionDetails = jest.fn()

  beforeAll(() => {
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      questions: [],
      addQuestion: mockAddQuestion,
      removeQuestion: mockRemoveQuestion,
      addQuestionDetails: mockAddQuestionDetails,
    }))
  })

  afterEach(() => {
    mockAddQuestion.mockClear()
    mockRemoveQuestion.mockClear()
    mockAddQuestionDetails.mockClear()
  })

  it("renders the question text correctly", () => {
    render(
      <InquiryQuestionOption
        id={InquiryQuestionIDs.PriceAndAvailability}
        question="What is the price and availability?"
      />,
    )

    expect(
      screen.getByText("What is the price and availability?"),
    ).toBeInTheDocument()
  })

  it("renders an unchecked checkbox by default", () => {
    render(
      <InquiryQuestionOption
        id={InquiryQuestionIDs.PriceAndAvailability}
        question="What is the price and availability?"
      />,
    )

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).not.toBeChecked()
  })

  it("adds a question to inquiry payload when checkbox is selected", () => {
    render(
      <InquiryQuestionOption
        id={InquiryQuestionIDs.PriceAndAvailability}
        question="What is the price and availability?"
      />,
    )

    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)

    expect(mockAddQuestion).toHaveBeenCalledWith({
      questionID: InquiryQuestionIDs.PriceAndAvailability,
      details: "What is the price and availability?",
    })
  })

  it("removes a question from inquiry payload when checkbox is deselected", () => {
    render(
      <InquiryQuestionOption
        id={InquiryQuestionIDs.PriceAndAvailability}
        question="What is the price and availability?"
      />,
    )

    const checkbox = screen.getByRole("checkbox")

    // Select the checkbox
    fireEvent.click(checkbox)
    expect(mockAddQuestion).toHaveBeenCalled()

    // Deselect the checkbox
    fireEvent.click(checkbox)
    expect(mockRemoveQuestion).toHaveBeenCalledWith({
      questionID: InquiryQuestionIDs.PriceAndAvailability,
      details: "What is the price and availability?",
    })
  })

  describe("shipping question", () => {
    it("does not show location input by default", () => {
      render(
        <InquiryQuestionOption
          id={InquiryQuestionIDs.Shipping}
          question="Request a shipping quote"
        />,
      )

      expect(screen.queryByTestId("location-input")).not.toBeInTheDocument()
    })

    it("shows location input when shipping question is selected", () => {
      render(
        <InquiryQuestionOption
          id={InquiryQuestionIDs.Shipping}
          question="Request a shipping quote"
        />,
      )

      const checkbox = screen.getByRole("checkbox")
      fireEvent.click(checkbox)

      expect(screen.getByTestId("location-input")).toBeInTheDocument()
    })

    it("hides location input when shipping question is deselected", () => {
      render(
        <InquiryQuestionOption
          id={InquiryQuestionIDs.Shipping}
          question="Request a shipping quote"
        />,
      )

      const checkbox = screen.getByRole("checkbox")

      // Select
      fireEvent.click(checkbox)
      expect(screen.getByTestId("location-input")).toBeInTheDocument()

      // Deselect
      fireEvent.click(checkbox)
      expect(screen.queryByTestId("location-input")).not.toBeInTheDocument()
    })

    it("adds shipping details when location is changed", () => {
      render(
        <InquiryQuestionOption
          id={InquiryQuestionIDs.Shipping}
          question="Request a shipping quote"
        />,
      )

      const checkbox = screen.getByRole("checkbox")
      fireEvent.click(checkbox)

      const locationInput = screen.getByTestId("location-input")
      fireEvent.change(locationInput)

      expect(mockAddQuestionDetails).toHaveBeenCalledWith({
        questionID: InquiryQuestionIDs.Shipping,
        details: JSON.stringify({
          city: "New York",
          coordinates: null,
          country: "United States",
          postal_code: "10001",
          state: "NY",
          state_code: "NY",
        }),
      })
    })
  })

  describe("non-shipping questions", () => {
    it("does not show location input for non-shipping questions", () => {
      render(
        <InquiryQuestionOption
          id={InquiryQuestionIDs.PriceAndAvailability}
          question="What is the price and availability?"
        />,
      )

      const checkbox = screen.getByRole("checkbox")
      fireEvent.click(checkbox)

      expect(screen.queryByTestId("location-input")).not.toBeInTheDocument()
    })
  })
})
