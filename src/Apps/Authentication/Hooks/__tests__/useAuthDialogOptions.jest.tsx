import { useAuthDialogOptions } from "Apps/Authentication/Hooks/useAuthDialogOptions"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useRouter } from "System/Hooks/useRouter"
import { ContextModule, Intent } from "@artsy/cohesion"
import { renderHook } from "@testing-library/react-hooks"

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
      state: { mode: "Welcome" },
      dispatch,
    }))

    const { result } = renderHook(useAuthDialogOptions)

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        analytics: { intent: "signup" },
        mode: "Welcome",
        options: {
          title: "Sign up or log in",
        },
      },
      type: "SET",
    })

    expect(result.current).toEqual({
      description: null,
      pageTitle: "Sign up or log in",
      title: "Sign up or log in",
    })
  })

  it("sets and returns defaults for welcome", () => {
    const dispatch = jest.fn()

    mockUseAuthDialogContext.mockImplementation(() => ({
      state: { mode: "Welcome" },
      dispatch,
    }))

    const { result } = renderHook(useAuthDialogOptions)

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        analytics: { intent: "signup" },
        mode: "Welcome",
        options: {
          title: "Sign up or log in",
        },
      },
      type: "SET",
    })

    expect(result.current).toEqual({
      description: null,
      pageTitle: "Sign up or log in",
      title: "Sign up or log in",
    })
  })

  it("sets relevant options from query params", () => {
    const dispatch = jest.fn()

    mockUseAuthDialogContext.mockImplementation(() => ({
      state: { mode: "Welcome" },
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
        mode: "Welcome",
        options: {
          title: "Example Title",
          redirectTo: "/example-redirect",
        },
      },
      type: "SET",
    })

    expect(result.current).toEqual({
      description: "Example Description",
      pageTitle: "Sign up or log in",
      title: "Example Title",
    })
  })

  it("sets afterAuthAction correctly", () => {
    const dispatch = jest.fn()

    mockUseAuthDialogContext.mockImplementation(() => ({
      state: { mode: "Welcome" },
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
          intent: "signup",
        },
        mode: "Welcome",
        options: {
          title: "Sign up or log in",
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
})
