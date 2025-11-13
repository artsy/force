import { ScrollToFieldError } from "Apps/Order/Utils/scrollToFieldError"
import { render } from "@testing-library/react"
import { useFormikContext } from "formik"

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}))

describe("ScrollToFieldError", () => {
  const mockScrollIntoView = jest.fn()
  const mockUseFormikContext = useFormikContext as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(document, "querySelector").mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    } as any)
  })

  it("should scroll to the first field error when form is invalid", () => {
    const errors = { attributes: { firstName: "First name is required" } }
    const isValid = false
    const submitCount = 1

    jest.spyOn(document, "querySelector")

    mockUseFormikContext.mockReturnValueOnce({
      isValid,
      errors,
      submitCount,
    } as any)

    const { container } = render(<ScrollToFieldError />)

    expect(container.firstChild).toBeNull()

    expect(document.querySelector).toHaveBeenCalledWith(
      "input[name='attributes.firstName']"
    )

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    })
  })

  it("should not scroll when form is valid", () => {
    const errors = {}
    const isValid = true
    const submitCount = 1

    jest.spyOn(document, "querySelector")

    mockUseFormikContext.mockReturnValueOnce({ isValid, errors, submitCount })

    const { container } = render(<ScrollToFieldError />)

    expect(container.firstChild).toBeNull()

    expect(document.querySelector).not.toHaveBeenCalled()
  })

  it("should not scroll when there are no field errors", () => {
    const errors = {}
    const isValid = false
    const submitCount = 1

    jest.spyOn(document, "querySelector")

    mockUseFormikContext.mockReturnValueOnce({ isValid, errors, submitCount })

    const { container } = render(<ScrollToFieldError />)

    expect(container.firstChild).toBeNull()

    expect(document.querySelector).not.toHaveBeenCalled()
  })
})
