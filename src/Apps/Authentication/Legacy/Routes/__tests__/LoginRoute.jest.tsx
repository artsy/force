import { useAuthForm } from "Apps/Authentication/Legacy/Utils/useAuthForm"
import { render, screen } from "@testing-library/react"
import { ModalType } from "Components/Authentication/Types"
import { useRouter } from "System/Router/useRouter"
import { LoginRoute } from "Apps/Authentication/Legacy/Routes/LoginRoute"

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))

jest.mock("Apps/Authentication/Legacy/Utils/useAuthForm", () => ({
  useAuthForm: jest.fn(),
}))

describe("LoginRoute", () => {
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
        title: "Login to Artsy",
        type: ModalType.login,
      },
      options: queryParams,
      type: ModalType.login,
    }))

    render(<LoginRoute />)
    expect(screen.getAllByText("Login to Artsy").length).toBe(2)
  })
})
