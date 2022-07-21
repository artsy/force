import { ModalType } from "Components/Authentication/Types"
import { useRouter } from "System/Router/useRouter"
import { getENV } from "Utils/getENV"
import { useAuthForm } from "../useAuthForm"

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
    action: "action",
    afterSignUpAction: "afterSignUpAction",
    contextModule: "contextModule",
    copy: null,
    destination: "destination",
    intent: "intent",
    kind: "kind",
    objectId: "objectId",
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
    expect(
      useAuthForm({
        canonical: "canonical",
        pageTitle: "some page title",
        type: ModalType.login,
      })
    ).toEqual({
      meta: {
        canonical: "canonical",
        description: "",
        title: "some page title",
      },
      options: {
        ...queryParams,
        redirectTo: "/redirect-to",
        signupReferer: "/someReferer",
        title: "some page title",
      },
      type: ModalType.login,
    })
  })
})
