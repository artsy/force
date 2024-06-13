import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { NewRoute } from "Apps/Sell/Routes/NewRoute"
import { useRouter } from "System/Hooks/useRouter"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({ match: { location: { query: {} } } })),
}))
jest.unmock("react-relay")

beforeEach(() => {
  mockUseRouter.mockImplementation(() => ({
    router: {
      push: mockPush,
      replace: mockReplace,
    },
    match: { location: { pathname: "/submissions/new" } },
  }))
})

describe("NewRoute", () => {
  it("renders the artist step with context", async () => {
    render(<NewRoute />)

    await waitFor(() => {
      expect(screen.getByText("Add artist name")).toBeInTheDocument()

      const artistInput = screen.getByPlaceholderText("Enter full name")

      fireEvent.change(artistInput, { target: { value: "Banksy" } })

      expect(artistInput).toBeInTheDocument()
    })
  })
})
