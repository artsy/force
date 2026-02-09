import { render, screen } from "@testing-library/react"
import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { InquiryInquiryQueryRenderer } from "Components/Inquiry/Views/InquiryInquiry"
import { useSystemContext } from "System/Hooks/useSystemContext"

jest.mock("../../Hooks/useInquiryContext")
jest.mock("System/Hooks/useSystemContext")
jest.mock("../../Hooks/useArtworkInquiryRequest")

const mockUseFlag = jest.fn()
jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: (flagName: string) => mockUseFlag(flagName),
}))

jest.mock("System/Relay/SystemQueryRenderer", () => ({
  SystemQueryRenderer: ({ render: renderProp }: any) => {
    const mockProps = {
      artwork: {
        internalID: "artwork-123",
        title: "Test Artwork",
        date: "2024",
        artist: { name: "Test Artist" },
        partner: { name: "Test Gallery" },
        image: {
          resized: {
            src: "test.jpg",
            srcSet: "test.jpg",
            width: 60,
            height: 45,
          },
        },
        inquiryQuestions: [],
      },
    }
    return renderProp({ props: mockProps, error: null })
  },
}))
jest.mock("../../Components/InquiryQuestionsList", () => ({
  InquiryQuestionsList: () => null,
}))

describe("InquiryInquiry", () => {
  const mockNext = jest.fn()
  const mockSetInquiry = jest.fn()
  const mockSetContext = jest.fn()
  const mockSubmitArtworkInquiryRequest = jest.fn()

  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { name: "Test User" },
      relayEnvironment: {},
    }))
    ;(useArtworkInquiryRequest as jest.Mock).mockImplementation(() => ({
      submitArtworkInquiryRequest: mockSubmitArtworkInquiryRequest,
    }))
  })

  afterEach(() => {
    mockNext.mockReset()
    mockSetInquiry.mockReset()
    mockSetContext.mockReset()
  })

  it("shows error and disables button when message is empty and no questions selected", () => {
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next: mockNext,
      setInquiry: mockSetInquiry,
      inquiry: { message: "" },
      artworkID: "artwork-123",
      setContext: mockSetContext,
      questions: [],
    }))

    render(<InquiryInquiryQueryRenderer />)

    expect(
      screen.getByText("Please enter a message or select at least one option."),
    ).toBeInTheDocument()

    const button = screen.getByRole("button", { name: "Send" })
    expect(button).toBeDisabled()
  })

  it("does not show error when message has content", () => {
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next: mockNext,
      setInquiry: mockSetInquiry,
      inquiry: { message: "I'm interested in this artwork" },
      artworkID: "artwork-123",
      setContext: mockSetContext,
      questions: [],
    }))

    render(<InquiryInquiryQueryRenderer />)

    expect(
      screen.queryByText(
        "Please enter a message or select at least one option.",
      ),
    ).not.toBeInTheDocument()

    const button = screen.getByRole("button", { name: "Send" })
    expect(button).not.toBeDisabled()
  })

  it("does not show error when at least one question is selected", () => {
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next: mockNext,
      setInquiry: mockSetInquiry,
      inquiry: { message: "" },
      artworkID: "artwork-123",
      setContext: mockSetContext,
      questions: [{ questionID: "q1", question: "What is the price?" }],
    }))

    render(<InquiryInquiryQueryRenderer />)

    expect(
      screen.queryByText(
        "Please enter a message or select at least one option.",
      ),
    ).not.toBeInTheDocument()

    const button = screen.getByRole("button", { name: "Send" })
    expect(button).not.toBeDisabled()
  })

  it("does not show error when message has only whitespace but questions are selected", () => {
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next: mockNext,
      setInquiry: mockSetInquiry,
      inquiry: { message: "   " },
      artworkID: "artwork-123",
      setContext: mockSetContext,
      questions: [{ questionID: "q1", question: "What is the price?" }],
    }))

    render(<InquiryInquiryQueryRenderer />)

    expect(
      screen.queryByText(
        "Please enter a message or select at least one option.",
      ),
    ).not.toBeInTheDocument()

    const button = screen.getByRole("button", { name: "Send" })
    expect(button).not.toBeDisabled()
  })

  describe("From and To section visibility", () => {
    it("shows the 'From' and 'To' sections when collectorInquirySimplifiedLayout flag is disabled", () => {
      mockUseFlag.mockReturnValue(false)
      ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
        next: mockNext,
        setInquiry: mockSetInquiry,
        inquiry: { message: "Test message" },
        artworkID: "artwork-123",
        setContext: mockSetContext,
        questions: [],
      }))

      render(<InquiryInquiryQueryRenderer />)

      expect(screen.getByText("From")).toBeInTheDocument()
      expect(screen.getByText("Test User")).toBeInTheDocument()
      expect(screen.getByText("To")).toBeInTheDocument()
      expect(screen.getByText("Test Gallery")).toBeInTheDocument()
    })

    it("hides the 'From' and 'To' sections when collectorInquirySimplifiedLayout flag is enabled", () => {
      mockUseFlag.mockReturnValue(true)
      ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
        next: mockNext,
        setInquiry: mockSetInquiry,
        inquiry: { message: "Test message" },
        artworkID: "artwork-123",
        setContext: mockSetContext,
        questions: [],
      }))

      render(<InquiryInquiryQueryRenderer />)

      expect(screen.queryByText("From")).not.toBeInTheDocument()
      expect(screen.queryByText("Test User")).not.toBeInTheDocument()
      expect(screen.queryByText("To")).not.toBeInTheDocument()
      expect(screen.queryByText("Test Gallery")).not.toBeInTheDocument()
    })
  })
})
