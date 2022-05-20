import { useAuthForm } from "v2/Apps/Authentication/Utils/useAuthForm"
import { render, screen } from "@testing-library/react"
import { ModalType } from "v2/Components/Authentication/Types"
import { useRouter } from "v2/System/Router/useRouter"
import { SignupRoute } from "../SignupRoute"

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))

jest.mock("v2/Apps/Authentication/Utils/useAuthForm", () => ({
  useAuthForm: jest.fn(),
}))

describe("SignupRoute", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockUseAuthForm = useAuthForm as jest.Mock

  it("renders correctly", () => {
    const queryParams = {}

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: queryParams,
        },
      },
    }))

    mockUseAuthForm.mockImplementation(() => ({
      meta: {
        title: "Signup to Artsy",
        type: ModalType.signup,
      },
      options: queryParams,
      type: ModalType.signup,
    }))

    render(<SignupRoute />)
    expect(screen.getAllByText("Signup to Artsy").length).toBe(2)
  })
})
