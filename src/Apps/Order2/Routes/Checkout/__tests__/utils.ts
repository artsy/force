import merge from "lodash/merge"
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
