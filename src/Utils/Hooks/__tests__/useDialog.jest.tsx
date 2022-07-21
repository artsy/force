import { renderHook, act } from "@testing-library/react-hooks"
import { render, screen } from "@testing-library/react"
import { useDialog } from "../useDialog"

const onShow = jest.fn()
const onHide = jest.fn()
const hookProps = { Dialog: () => <div>Dialog</div>, onShow, onHide }

describe("useDialog", () => {
  afterEach(() => jest.clearAllMocks())

  it("returns with visible false and dialog null", async () => {
    const { result } = renderHook(() => useDialog(hookProps))
    render(result.current.dialogComponent)

    expect(result.current.isVisible).toBeFalsy()
    expect(screen.queryByText("Dialog")).not.toBeInTheDocument()
  })

  it("visibility is set to true", () => {
    const { result } = renderHook(() => useDialog(hookProps))

    act(() => {
      result.current.showDialog()
    })
    render(result.current.dialogComponent)

    expect(result.current.isVisible).toBeTruthy()
    expect(screen.queryByText("Dialog")).toBeInTheDocument()
    expect(onShow).toHaveBeenCalledTimes(1)
    expect(onHide).toHaveBeenCalledTimes(0)
  })

  it("visibility is set to false after being set to true", () => {
    const { result } = renderHook(() => useDialog(hookProps))

    act(() => {
      result.current.showDialog()
      result.current.hideDialog()
    })
    render(result.current.dialogComponent)

    expect(screen.queryByText("Dialog")).not.toBeInTheDocument()
    expect(onShow).toHaveBeenCalledTimes(1)
    expect(onHide).toHaveBeenCalledTimes(1)
  })
})
