export type OrderMutationSuccess<T> = Extract<
  T,
  { __typename: "OrderMutationSuccess" }
>
type OrderMutationError<T> = Extract<
  T,
  { __typename: "OrderMutationError"; mutationError: { message: string } }
>

const isOrderMutationSuccess = <T extends { __typename?: string }>(
  data: T | null | undefined,
): data is OrderMutationSuccess<T> => {
  return data?.__typename === "OrderMutationSuccess"
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
  orderOrError?: T | null | undefined,
): OrderMutationSuccess<T> => {
  if (isOrderMutationSuccess(orderOrError)) {
    return orderOrError
  }

  if (isOrderMutationError(orderOrError)) {
    throw new Error(orderOrError.mutationError.message)
  }

  throw new Error(
    `Unhandled orderOrError response type: ${JSON.stringify(orderOrError)}`,
  )
}
