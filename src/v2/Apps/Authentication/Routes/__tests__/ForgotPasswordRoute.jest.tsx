import { useAuthForm } from "v2/Apps/Authentication/Utils/useAuthForm"
import { render, screen } from "@testing-library/react"
import { ForgotPasswordRoute } from "../ForgotPasswordRoute"
import { ModalType } from "v2/Components/Authentication/Types"
import { useRouter } from "v2/System/Router/useRouter"

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))

jest.mock("v2/Apps/Authentication/Utils/useAuthForm", () => ({
  useAuthForm: jest.fn(),
}))

describe("ForgotPasswordRoute", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockUseAuthForm = useAuthForm as jest.Mock

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders forgot password", () => {
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
        title: "Reset your password",
        type: ModalType.forgot,
      },
      options: queryParams,
      type: ModalType.forgot,
    }))

    render(<ForgotPasswordRoute />)
    expect(screen.getAllByText("Reset your password").length).toBe(2)
    expect(screen.queryByText("Send me reset instructions")).toBeInTheDocument()
  })

  it("renders set password", () => {
    const queryParams = {
      set_password: true,
    }

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: queryParams,
        },
      },
    }))

    mockUseAuthForm.mockImplementation(() => ({
      meta: {
        title: "Set your password",
        type: ModalType.forgot,
      },
      options: queryParams,
      type: ModalType.forgot,
    }))

    render(<ForgotPasswordRoute />)
    expect(screen.getAllByText("Set your password").length).toBe(2)
  })
})
