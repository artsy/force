export type OrderMutationSuccess<T> = Extract<
  T,
  { __typename: "OrderMutationSuccess" }
>

type OrderMutationActionRequired<T> = Extract<
  T,
  { __typename: "OrderMutationActionRequired" }
>

type OrderMutationError<T> = Extract<
  T,
  {
    __typename: "OrderMutationError"
    mutationError: { message: string; code?: string }
  }
>

const isOrderMutationSuccess = <T extends { __typename?: string }>(
  data: T | null | undefined,
): data is OrderMutationSuccess<T> => {
  return data?.__typename === "OrderMutationSuccess"
}

const isOrderMutationActionRequired = <T extends { __typename?: string }>(
  data: T | null | undefined,
): data is OrderMutationActionRequired<T> => {
  return data?.__typename === "OrderMutationActionRequired"
}

const isOrderMutationError = <T extends { __typename?: string }>(
  data: T | null | undefined,
): data is OrderMutationError<T> => {
  return data?.__typename === "OrderMutationError"
}

/**
 * Validates the response from an order mutation and extracts the success data,
 * refining its type to a success in the process. Throws an error if this fails.
 */
export const validateAndExtractOrderResponse = <
  T extends { __typename?: string },
>(
  orderOrError?: T | null,
): OrderMutationSuccess<T> | OrderMutationActionRequired<T> => {
  if (isOrderMutationSuccess(orderOrError)) {
    return orderOrError
  }

  if (isOrderMutationActionRequired(orderOrError)) {
    return orderOrError
  }

  if (isOrderMutationError(orderOrError)) {
    throw new CheckoutMutationError(
      orderOrError.mutationError.message,
      orderOrError.mutationError.code,
    )
  }

  throw new CheckoutMutationError(
    `Unhandled orderOrError response type: ${JSON.stringify(orderOrError)}`,
  )
}

export class CheckoutMutationError extends Error {
  code?: string

  constructor(message: string, code?: string) {
    super(message)
    this.name = "CheckoutMutationError"
    this.code = code
  }
}
