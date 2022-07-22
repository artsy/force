import { createElement } from "react"
import { CreditCardPicker } from "../CreditCardPicker"

type UnpackPromise<T> = T extends Promise<infer R> ? R : T
type CreditCardIdResult = UnpackPromise<
  ReturnType<CreditCardPicker["getCreditCardId"]>
>

const goodResult: CreditCardIdResult = {
  type: "success",
  creditCardId: "credit-card-id",
}

export const useGoodResult = () => {
  CreditCardPickerMock.getCreditCardId.mockResolvedValue(goodResult)
}

const invalidFormResult: CreditCardIdResult = {
  type: "invalid_form",
}

export const useInvalidFormResult = () => {
  CreditCardPickerMock.getCreditCardId.mockResolvedValue(invalidFormResult)
}

const errorResult: CreditCardIdResult = {
  type: "error",
  error: "This is the description of an error.",
}
export const useErrorResult = () => {
  CreditCardPickerMock.getCreditCardId.mockResolvedValue(errorResult)
}

const internalErrorResult: CreditCardIdResult = {
  type: "internal_error",
  error: "This is the description of an internal error.",
}
export const useInternalErrorResult = () => {
  CreditCardPickerMock.getCreditCardId.mockResolvedValue(internalErrorResult)
}

export const useThrownError = () => {
  CreditCardPickerMock.getCreditCardId.mockRejectedValue(
    new Error("Actual error")
  )
}

const CreditCardPickerMock = {
  getCreditCardId: jest.fn(
    () => Promise.resolve(goodResult) as Promise<CreditCardIdResult>
  ),
}

beforeEach(() => {
  CreditCardPickerMock.getCreditCardId.mockReset()
  useGoodResult()
})

export const CreditCardPickerFragmentContainer = ({ innerRef }) => {
  innerRef.current = CreditCardPickerMock
  return createElement("div")
}
