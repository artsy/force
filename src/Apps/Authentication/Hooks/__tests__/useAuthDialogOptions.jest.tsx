import { ContextModule, Intent } from "@artsy/cohesion"
import { renderHook } from "@testing-library/react-hooks"
import { useAuthDialogOptions } from "Apps/Authentication/Hooks/useAuthDialogOptions"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useRouter } from "System/Hooks/useRouter"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn().mockImplementation(() => {
    return { match: { location: { query: {} } } }
  }),
}))

jest.mock("Components/AuthDialog/AuthDialogContext", () => ({
  ...jest.requireActual("Components/AuthDialog/AuthDialogContext"),
  useAuthDialogContext: jest.fn().mockImplementation(() => {
    return { state: { options: {} } }
  }),
}))

describe("useAuthDialogOptions", () => {
  const mockUseAuthDialogContext = useAuthDialogContext as jest.Mock
  const mockUseRouter = useRouter as jest.Mock

  it("sets and returns defaults", () => {
    const dispatch = jest.fn()

    mockUseAuthDialogContext.mockImplementation(() => ({
      state: { mode: "SignUp" },
      dispatch,
    }))

    const { result } = renderHook(useAuthDialogOptions)

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        analytics: { intent: "signup" },
        mode: "SignUp",
        options: {
          title: "Sign up to collect art by the world’s leading artists",
        },
      },
      type: "SET",
    })

    expect(result.current).toEqual({
      description:
        "Build your personalized profile. Get art market insights. Buy and sell with confidence.",
      pageTitle: "Sign up for Artsy",
      title: "Sign up to collect art by the world’s leading artists",
    })
  })

  it("sets and returns defaults for login", () => {
    const dispatch = jest.fn()

    mockUseAuthDialogContext.mockImplementation(() => ({
      state: { mode: "Login" },
      dispatch,
    }))

    const { result } = renderHook(useAuthDialogOptions)

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        analytics: { intent: "login" },
        mode: "Login",
        options: {
          title: "Log in to collect art by the world’s leading artists",
        },
      },
      type: "SET",
    })

    expect(result.current).toEqual({
      description: null,
      pageTitle: "Log in to Artsy",
      title: "Log in to collect art by the world’s leading artists",
    })
  })

  it("sets relevant options from query params", () => {
    const dispatch = jest.fn()

    mockUseAuthDialogContext.mockImplementation(() => ({
      state: { mode: "Login" },
      dispatch,
    }))

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {
            title: "Example Title",
            description: "Example Description",
            redirectTo: "/example-redirect",
            contextModule: ContextModule.inquiry,
            intent: Intent.inquire,
          },
        },
      },
    }))

    const { result } = renderHook(useAuthDialogOptions)

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        analytics: {
          contextModule: "inquiry",
          intent: "inquire",
        },
        mode: "Login",
        options: {
          title: "Example Title",
          redirectTo: "/example-redirect",
        },
      },
      type: "SET",
    })

    expect(result.current).toEqual({
      description: "Example Description",
      pageTitle: "Log in to Artsy",
      title: "Example Title",
    })
  })

  it("sets afterAuthAction correctly", () => {
    const dispatch = jest.fn()

    mockUseAuthDialogContext.mockImplementation(() => ({
      state: { mode: "Login" },
      dispatch,
    }))

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {
            afterAuthAction: {
              action: "save",
              kind: "artworks",
              objectId: "exampleId",
            },
          },
        },
      },
    }))

    renderHook(useAuthDialogOptions)

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        analytics: {
          intent: "login",
        },
        mode: "Login",
        options: {
          title: "Log in to collect art by the world’s leading artists",
          afterAuthAction: {
            action: "save",
            kind: "artworks",
            objectId: "exampleId",
          },
        },
      },
      type: "SET",
    })
  })

  it("sets afterAuthAction correctly when there is a submissionId", () => {
    const dispatch = jest.fn()

    mockUseAuthDialogContext.mockImplementation(() => ({
      state: { mode: "Login" },
      dispatch,
    }))

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {
            submissionId: "exampleSubmissionId",
          },
        },
      },
    }))

    renderHook(useAuthDialogOptions)

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        analytics: {
          intent: "login",
        },
        mode: "Login",
        options: {
          title: "Log in to collect art by the world’s leading artists",
          afterAuthAction: {
            action: "associateSubmission",
            kind: "submission",
            objectId: "exampleSubmissionId",
          },
        },
      },
      type: "SET",
    })
  })
})
