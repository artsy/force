import { merge } from "es-toolkit"
export const orderMutationSuccess = (initialValues, newValues) => {
  return {
    orderOrError: {
      __typename: "OrderMutationSuccess",
      order: merge(initialValues, newValues),
    },
  }
}

export const orderMutationError = error => {
  return {
    orderOrError: {
      __typename: "OrderMutationError",
      mutationError: error,
    },
  }
}
