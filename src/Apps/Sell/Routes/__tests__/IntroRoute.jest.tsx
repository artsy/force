import { fireEvent, screen, waitFor } from "@testing-library/react"
import { IntroRoute } from "Apps/Sell/Routes/IntroRoute"
import { render } from "DevTools/renderWithMockBoot"
import { useRouter } from "System/Hooks/useRouter"
import { useTracking } from "react-tracking"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
const trackEvent = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({ match: { location: { query: {} } } })),
}))
jest.unmock("react-relay")

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => {
    return {
      trackEvent,
    }
  })

  mockUseRouter.mockImplementation(() => ({
    router: {
      push: mockPush,
      replace: mockReplace,
    },
    match: { location: { pathname: "/intro" } },
  }))
})

describe("IntroRoute", () => {
  it("renders the Intro page", async () => {
    render(<IntroRoute />)

    await waitFor(() => {
      expect(screen.getByText("It’s easy to sell on Artsy")).toBeInTheDocument()
      expect(screen.getByText("Tell us about your work")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Start by adding an artist from our list of high demand artists. Include information such as year, medium, dimensions and materials."
        )
      ).toBeInTheDocument()
      expect(screen.getByText("Upload artwork images")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Improve your chances of selling by including photographs of the front, back, frame, signature, and other details."
        )
      ).toBeInTheDocument()
      expect(screen.getByText("Complete submission")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Your work will be submitted to an Artsy advisor who will assess whether your work is eligible and help guide you on next steps."
        )
      ).toBeInTheDocument()
      expect(screen.getByText("Start New Submission")).toBeInTheDocument()
      expect(
        screen.queryByText("New from My Collection")
      ).not.toBeInTheDocument()
    })
  })

  it("renders the Start New Submission button and route", async () => {
    render(<IntroRoute />)

    const startNewSubmissionButton = screen.getByTestId("start-new-submission")

    expect(startNewSubmissionButton).toBeInTheDocument()
    expect(startNewSubmissionButton).toHaveAttribute(
      "href",
      "/sell/submissions/new"
    )

    fireEvent.click(startNewSubmissionButton)

    expect(trackEvent).toHaveBeenCalledWith({
      action: "tappedNewSubmission",
      context_module: "sell",
      context_owner_type: "submitArtworkStepStart",
    })
  })
})
