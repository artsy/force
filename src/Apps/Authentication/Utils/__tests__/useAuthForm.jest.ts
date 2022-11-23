import { ModalType } from "Components/Authentication/Types"
import { useRouter } from "System/Router/useRouter"
import { getENV } from "Utils/getENV"
import { useAuthForm } from "Apps/Authentication/Utils/useAuthForm"
import { renderHook } from "@testing-library/react-hooks"

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

describe("useAuthForm", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockGetENV = getENV as jest.Mock

  const queryParams = {
    afterSignUpAction: "afterSignUpAction",
    contextModule: "contextModule",
    copy: null,
    intent: "intent",
  }

  beforeAll(() => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: queryParams,
        },
      },
    }))

    mockGetENV.mockImplementation(key => {
      switch (key) {
        case "AUTHENTICATION_REDIRECT_TO":
          return "/redirect-to"
        case "AUTHENTICATION_REFERER":
          return "/someReferer"
      }
    })
  })

  it("returns props for form", () => {
    const { result } = renderHook(() =>
      useAuthForm({
        canonical: "canonical",
        pageTitle: "some page title",
        type: ModalType.login,
      })
    )

    expect(result.current).toEqual({
      meta: {
        canonical: "canonical",
        description: "",
        title: "some page title",
      },
      options: {
        contextModule: "contextModule",
        copy: null,
        intent: "intent",
        redirectTo: "/redirect-to",
        signupReferer: "/someReferer",
      },
      type: ModalType.login,
    })
  })
})
