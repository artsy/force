import type { useCreateSavedAddressMutation$data } from "__generated__/useCreateSavedAddressMutation.graphql"
import type { useUpdateSavedAddressMutation$data } from "__generated__/useUpdateSavedAddressMutation.graphql"

export const saveAddressSuccess: useCreateSavedAddressMutation$data = {
  createUserAddress: {
    userAddressOrErrors: {
      __typename: "UserAddress",
      internalID: "address-id",
      id: "graphql-id",
      isDefault: false,
      name: "Bob Ross",
      addressLine1: "foo",
      addressLine2: "bar",
      addressLine3: "whatever",
      phoneNumber: "111-111-1111",
      city: "Brooklyn",
      region: "NY",
      country: "US",
      postalCode: "11111",
    },
    me: {} as any,
  },
}

export const updateAddressSuccess: useUpdateSavedAddressMutation$data = {
  updateUserAddress: {
    userAddressOrErrors: {
      __typename: "UserAddress",
      internalID: "address-id",
      id: "graphql-id",
      name: "Bob Ross",
      addressLine1: "1 Main St",
      addressLine2: "",
      addressLine3: "",
      isDefault: false,
      phoneNumber: "718-000-0000",
      city: "New York",
      region: "NY",
      postalCode: "10012",
      country: "USA",
    },
    me: {} as any,
  },
}
