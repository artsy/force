import { renderHook } from "@testing-library/react-hooks"
import { SubmissionModel, useSubmission } from "../useSubmission"

let sessionStore = {
  "submission-1": JSON.stringify({
    artworkDetailsForm: {
      artistId: "artistId",
    },
  }),
}
Object.defineProperty(window, "sessionStorage", {
  value: {
    getItem(key) {
      return sessionStore[key] || null
    },
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
})

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()
jest.mock("v2/System/Router/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return {
        router: {
          push: mockRouterPush,
          replace: mockRouterReplace,
          matcher: {
            format: jest.fn().mockReturnValue(""),
          },
          createLocation: jest.fn().mockReturnValue(""),
          isActive: jest.fn().mockReturnValue(true),
        },
        match: {
          params: {
            id: "1",
          },
        },
      }
    }),
  }
})

describe("useSubmission", () => {
  it("returns correct initial values", async () => {
    const { result } = renderHook(() => useSubmission("1"))

    expect(result.current.submissionId).toEqual("1")
    expect(result.current.submission).toEqual({
      artworkDetailsForm: {
        artistId: "artistId",
      },
    })
    expect(result.current.saveSubmission).toBeTruthy()
    expect(result.current.removeSubmission).toBeTruthy()
  })

  it("returns empty submission if session storage empty", async () => {
    const { result } = renderHook(() => useSubmission("2"))

    expect(result.current.submissionId).toEqual("2")
    expect(result.current.submission).toBeFalsy()
  })

  it("save submission", async () => {
    const { result } = renderHook(() => useSubmission("1"))

    const submission: SubmissionModel = {
      artworkDetailsForm: {
        artistId: "artistId",
        artistName: "artistName",
        depth: "",
        editionNumber: "",
        height: "100",
        width: "100",
        materials: "materials",
        rarity: "rarity",
        title: "title",
        units: "in",
        year: "2020",
        provenance: "provenance",
      },
    }

    result.current.saveSubmission(submission)

    expect(sessionStorage.setItem).toHaveBeenCalled()
    expect(result.current.submission).toEqual(submission)
  })

  it("remove submission", async () => {
    const { result } = renderHook(() => useSubmission("1"))

    result.current.removeSubmission()

    expect(sessionStorage.removeItem).toHaveBeenCalled()
    expect(result.current.submission).toBeFalsy()
  })

  it("redirects to artwork details if submission id empty", async () => {
    renderHook(() => useSubmission(""))

    expect(mockRouterReplace).toHaveBeenCalled()
    expect(mockRouterReplace).toHaveBeenCalledWith(
      "/consign/submission/artwork-details"
    )
  })
})
