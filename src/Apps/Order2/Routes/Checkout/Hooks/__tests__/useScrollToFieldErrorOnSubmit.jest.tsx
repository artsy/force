import { act, render } from "@testing-library/react"
import { useFormikContext } from "formik"
import { useScrollToFieldErrorOnSubmit } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToFieldErrorOnSubmit"

jest.mock("formik")

const mockUseFormikContext = useFormikContext as jest.Mock

describe("useScrollToFieldErrorOnSubmit", () => {
  let mockScrollIntoView: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()

    mockScrollIntoView = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  const setup = (initialValues: {
    submitCount: number
    isValid: boolean
    errors: object
  }) => {
    mockUseFormikContext.mockReturnValue(initialValues)

    const TestForm = () => {
      const formRef = useScrollToFieldErrorOnSubmit()
      return (
        <div ref={formRef}>
          <input name="name" />
          <input name="addressLine1" />
        </div>
      )
    }

    const utils = render(<TestForm />)

    const updateFormik = (newValues: {
      submitCount: number
      isValid: boolean
      errors: object
    }) => {
      mockUseFormikContext.mockReturnValue(newValues)
      utils.rerender(<TestForm />)
    }

    return { ...utils, updateFormik }
  }

  it("does not scroll before the form is submitted", () => {
    setup({ submitCount: 0, isValid: true, errors: {} })
    act(() => jest.runAllTimers())
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it("scrolls to the first error field when submitted with errors", () => {
    const { updateFormik } = setup({ submitCount: 0, isValid: true, errors: {} })

    act(() => {
      updateFormik({
        submitCount: 1,
        isValid: false,
        errors: { name: "Full name is required", addressLine1: "Street address is required" },
      })
    })

    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    })
  })

  it("does not re-scroll when errors change while the user is typing after a submit", () => {
    const { updateFormik } = setup({ submitCount: 0, isValid: true, errors: {} })

    // User submits with multiple required-field errors
    act(() => {
      updateFormik({
        submitCount: 1,
        isValid: false,
        errors: { name: "Full name is required", addressLine1: "Street address is required" },
      })
    })

    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)

    // User starts typing in the name field — that error clears, submitCount unchanged
    act(() => {
      updateFormik({
        submitCount: 1,
        isValid: false,
        errors: { addressLine1: "Street address is required" },
      })
    })

    act(() => jest.runAllTimers())

    // Must NOT scroll again — the user is mid-input
    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)
  })

  it("scrolls again when the form is submitted a second time with errors", () => {
    const { updateFormik } = setup({ submitCount: 0, isValid: true, errors: {} })

    act(() => {
      updateFormik({
        submitCount: 1,
        isValid: false,
        errors: { name: "Full name is required" },
      })
    })

    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)

    act(() => {
      updateFormik({
        submitCount: 2,
        isValid: false,
        errors: { name: "Full name is required" },
      })
    })

    expect(mockScrollIntoView).toHaveBeenCalledTimes(2)
  })
})
