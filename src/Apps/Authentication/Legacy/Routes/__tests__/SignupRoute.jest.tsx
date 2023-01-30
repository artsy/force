import { useAuthForm } from "Apps/Authentication/Legacy/Utils/useAuthForm"
import { render, screen } from "@testing-library/react"
import { ModalType } from "Components/Authentication/Types"
import { useRouter } from "System/Router/useRouter"
import { SignupRoute } from "Apps/Authentication/Legacy/Routes/SignupRoute"

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))

jest.mock("Apps/Authentication/Legacy/Utils/useAuthForm", () => ({
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
