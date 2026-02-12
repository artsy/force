import { render, screen } from "@testing-library/react"
import { InquiryQuestionsList } from "Components/Inquiry/Components/InquiryQuestionsList"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"

jest.mock("../../Hooks/useInquiryContext")

describe("InquiryQuestionsList", () => {
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

  it("renders the heading text", () => {
    const mockQuestions = [
      {
        internalID: "q1",
        question: "What is the price and availability?",
      },
    ]

    render(<InquiryQuestionsList inquiryQuestions={mockQuestions} />)

    expect(
      screen.getByText("What information are you looking for?"),
    ).toBeInTheDocument()
  })

  it("renders multiple questions", () => {
    const mockQuestions = [
      {
        internalID: "q1",
        question: "What is the price and availability?",
      },
      {
        internalID: "q2",
        question: "Request a shipping quote",
      },
      {
        internalID: "q3",
        question: "What is the condition and provenance?",
      },
    ]

    render(<InquiryQuestionsList inquiryQuestions={mockQuestions} />)

    expect(
      screen.getByText("What is the price and availability?"),
    ).toBeInTheDocument()
    expect(screen.getByText("Request a shipping quote")).toBeInTheDocument()
    expect(
      screen.getByText("What is the condition and provenance?"),
    ).toBeInTheDocument()
  })

  it("filters out null questions", () => {
    const mockQuestions = [
      {
        internalID: "q1",
        question: "What is the price and availability?",
      },
      null,
      {
        internalID: "q2",
        question: "Request a shipping quote",
      },
    ]

    render(<InquiryQuestionsList inquiryQuestions={mockQuestions} />)

    expect(
      screen.getByText("What is the price and availability?"),
    ).toBeInTheDocument()
    expect(screen.getByText("Request a shipping quote")).toBeInTheDocument()
    expect(screen.getAllByRole("checkbox")).toHaveLength(2)
  })

  it("returns null when inquiryQuestions is null", () => {
    const { container } = render(
      <InquiryQuestionsList inquiryQuestions={null} />,
    )

    expect(container.firstChild).toBeNull()
  })

  it("returns null when inquiryQuestions is undefined", () => {
    const { container } = render(
      <InquiryQuestionsList inquiryQuestions={undefined} />,
    )

    expect(container.firstChild).toBeNull()
  })

  it("returns null when inquiryQuestions is an empty array", () => {
    const { container } = render(<InquiryQuestionsList inquiryQuestions={[]} />)

    expect(container.firstChild).toBeNull()
  })
})
