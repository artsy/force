import { fireEvent, render, screen } from "@testing-library/react"
import { SendFeedback } from "../SendFeedback"
import { useMutation } from "Utils/Hooks/useMutation"
import { flushPromiseQueue } from "DevTools"

jest.mock("Utils/Hooks/useMutation")

describe("SendFeedback", () => {
  const submitMutation = jest.fn()
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

  it("submits the form", async () => {
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
        },
      },
    })
  })
})
