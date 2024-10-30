import { mount } from "enzyme"
import { useFormikContext } from "formik"
import { ScrollToFieldError } from "Apps/Order/Utils/scrollToFieldError"

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

    const wrapper = mount(<ScrollToFieldError />)

    expect(wrapper.isEmptyRender()).toBe(true)

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

    const wrapper = mount(<ScrollToFieldError />)

    expect(wrapper.isEmptyRender()).toBe(true)

    expect(document.querySelector).not.toHaveBeenCalled()
  })

  it("should not scroll when there are no field errors", () => {
    const errors = {}
    const isValid = false
    const submitCount = 1

    jest.spyOn(document, "querySelector")

    mockUseFormikContext.mockReturnValueOnce({ isValid, errors, submitCount })

    const wrapper = mount(<ScrollToFieldError />)

    expect(wrapper.isEmptyRender()).toBe(true)

    expect(document.querySelector).not.toHaveBeenCalled()
  })
})
