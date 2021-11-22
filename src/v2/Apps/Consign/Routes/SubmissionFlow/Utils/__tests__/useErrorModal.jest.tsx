import { act, renderHook } from "@testing-library/react-hooks"
import { useErrorModal, ErrorModalProvider } from "../useErrorModal"

describe("useErrorModal", () => {
  let useErrorModalResult

  beforeEach(() => {
    const wrapper = ({ children }) => (
      <ErrorModalProvider>{children}</ErrorModalProvider>
    )
    const { result } = renderHook(() => useErrorModal(), { wrapper })
    useErrorModalResult = result
  })

  it("has initial state correctly set not to render an error modal", async () => {
    expect(useErrorModalResult.current.isErrorModalOpen).toBe(false)
  })

  it("renders error modal when openErrorModal is called", async () => {
    act(() => {
      useErrorModalResult.current.openErrorModal()
    })
    expect(useErrorModalResult.current.isErrorModalOpen).toBe(true)
  })
})
