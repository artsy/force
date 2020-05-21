import { createElement } from "react"
import { PaymentPicker } from "../PaymentPicker"

type UnpackPromise<T> = T extends Promise<infer R> ? R : T
type CreditCardIdResult = UnpackPromise<
  ReturnType<PaymentPicker["getCreditCardId"]>
>

const goodResult: CreditCardIdResult = {
  type: "success",
  creditCardId: "credit-card-id",
}

export const useGoodResult = () => {
  PaymentPickerMock.getCreditCardId.mockResolvedValue(goodResult)
}

const invalidFormResult: CreditCardIdResult = {
  type: "invalid_form",
}

export const useInvalidFormResult = () => {
  PaymentPickerMock.getCreditCardId.mockResolvedValue(invalidFormResult)
}

const errorResult: CreditCardIdResult = {
  type: "error",
  error: "This is the description of an error.",
}
export const useErrorResult = () => {
  PaymentPickerMock.getCreditCardId.mockResolvedValue(errorResult)
}

const internalErrorResult: CreditCardIdResult = {
  type: "internal_error",
  error: "This is the description of an internal error.",
}
export const useInternalErrorResult = () => {
  PaymentPickerMock.getCreditCardId.mockResolvedValue(internalErrorResult)
}

export const useThrownError = () => {
  PaymentPickerMock.getCreditCardId.mockRejectedValue(new Error("Actual error"))
}

const PaymentPickerMock = {
  getCreditCardId: jest.fn(
    () => Promise.resolve(goodResult) as Promise<CreditCardIdResult>
  ),
}

beforeEach(() => {
  PaymentPickerMock.getCreditCardId.mockReset()
  useGoodResult()
})

export const PaymentPickerFragmentContainer = ({ innerRef }) => {
  innerRef.current = PaymentPickerMock
  return createElement("div")
}
