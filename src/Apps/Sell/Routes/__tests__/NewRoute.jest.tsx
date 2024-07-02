import { fireEvent, screen, waitFor } from "@testing-library/react"
import { NewRoute } from "Apps/Sell/Routes/NewRoute"
import { render } from "DevTools/renderWithMockBoot"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({ match: { location: { query: {} } } })),
}))
jest.mock("System/Hooks/useSystemContext")

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockImplementation(() => {
    return { isLoggedIn: true }
  })

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
