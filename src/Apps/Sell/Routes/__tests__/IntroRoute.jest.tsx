import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { IntroRoute } from "Apps/Sell/Routes/IntroRoute"
import { useRouter } from "System/Hooks/useRouter"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({ match: { location: { query: {} } } })),
}))
jest.unmock("react-relay")

beforeEach(() => {
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

  it("calls router.push when Start New Submission button is clicked", async () => {
    render(<IntroRoute />)

    fireEvent.click(screen.getByText("Start New Submission"))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/sell2/submissions/new")
    })
  })
})
