import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { InquiryInquiryQueryRenderer } from "Components/Inquiry/Views/InquiryInquiry"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { render, screen } from "@testing-library/react"

jest.mock("../../Hooks/useInquiryContext")
jest.mock("System/Hooks/useSystemContext")
jest.mock("../../Hooks/useArtworkInquiryRequest")

const mockUseVariant = jest.fn()
jest.mock("@unleash/proxy-client-react", () => ({
  useVariant: (flagName: string) => mockUseVariant(flagName),
}))
jest.mock("System/Hooks/useTrackFeatureVariant", () => ({
  useTrackFeatureVariantOnMount: jest.fn(),
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

  describe("validation when feature flag is enabled", () => {
    beforeAll(() => {
      mockUseVariant.mockReturnValue({ name: "experiment" })
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
        screen.getByText(
          "Please enter a message or select at least one option.",
        ),
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
  })

  describe("validation when feature flag is disabled", () => {
    beforeAll(() => {
      mockUseVariant.mockReturnValue({ name: "control" })
    })

    it("does not show error message and textarea is required", () => {
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
        screen.queryByText(
          "Please enter a message or select at least one option.",
        ),
      ).not.toBeInTheDocument()

      const textarea = screen.getByTitle("Your message")
      expect(textarea).toBeRequired()
    })

    it("does not show error when message is empty but textarea is still required", () => {
      ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
        next: mockNext,
        setInquiry: mockSetInquiry,
        inquiry: { message: "" },
        artworkID: "artwork-123",
        setContext: mockSetContext,
        questions: [],
      }))

      render(<InquiryInquiryQueryRenderer />)

      const button = screen.getByRole("button", { name: "Send" })
      expect(button).not.toBeDisabled()

      const textarea = screen.getByTitle("Your message")
      expect(textarea).toBeRequired()
    })
  })
})
