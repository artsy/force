import { fireEvent, render, screen } from "@testing-library/react"
import { SendFeedback } from "Apps/Search/Components/SendFeedback"
import { useMutation } from "Utils/Hooks/useMutation"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { SystemContextProvider } from "System/Contexts/SystemContext"

jest.mock("Utils/Hooks/useMutation")
jest.mock("Utils/getENV", () => ({
  getENV: (name: string) => {
    const envs = {
      APP_URL: "https://www.artsy.net",
    }

    return envs[name]
  },
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "/search",
        search: "?term=something%20very%20unpopular",
      },
    },
  }),
}))

describe("SendFeedback", () => {
  const submitMutation = jest.fn()
  const url = "https://www.artsy.net/search?term=something%20very%20unpopular"

  beforeEach(() => {
    ;(useMutation as jest.Mock).mockImplementation(() => ({ submitMutation }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    render(<SendFeedback />)

    expect(
      screen.getByText(
        "Your feedback is important to us. Tell us how we can improve and help you find what you are looking for."
      )
    ).toBeInTheDocument()
  })

  it("submits the form (not logged-in user)", async () => {
    render(<SendFeedback />)

    const name = screen.getByPlaceholderText("Your name")
    const email = screen.getByPlaceholderText("Your email")
    const message = screen.getByPlaceholderText("Your comments here")

    fireEvent.change(name, { target: { value: "Example Name" } })
    fireEvent.change(email, { target: { value: "example@example.com" } })
    fireEvent.change(message, { target: { value: "Example Message" } })

    fireEvent.click(screen.getByText("Submit"))

    await flushPromiseQueue()

    expect(submitMutation).toHaveBeenCalledWith({
      rejectIf: expect.anything(),
      variables: {
        input: {
          name: "Example Name",
          email: "example@example.com",
          message: "Example Message",
          url,
        },
      },
    })
  })

  it("submits the form (logged-in user)", async () => {
    render(
      <SystemContextProvider
        user={{ id: "percy-z", email: "user@example.com", name: "Percy Z" }}
      >
        <SendFeedback />
      </SystemContextProvider>
    )

    const message = screen.getByPlaceholderText("Your comments here")
    fireEvent.change(message, { target: { value: "Example Message" } })

    fireEvent.click(screen.getByText("Submit"))

    await flushPromiseQueue()

    expect(submitMutation).toHaveBeenCalledWith({
      rejectIf: expect.anything(),
      variables: {
        input: {
          name: "Percy Z",
          email: "user@example.com",
          message: "Example Message",
          url,
        },
      },
    })
  })
})
