import { UpdateUserAddressMutationResponse } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutationResponse } from "v2/__generated__/CreateUserAddressMutation.graphql"

export const saveAddressSuccess: CreateUserAddressMutationResponse = {
  createUserAddress: {
    userAddressOrErrors: {
      internalID: "address-id",
      id: "graphql-id",
    },
  },
}

export const updateAddressSuccess: UpdateUserAddressMutationResponse = {
  updateUserAddress: {
    userAddressOrErrors: {
      internalID: "address-id",
      id: "graphql-id",
      name: "Bob Ross",
      addressLine1: "1 Main St",
      addressLine2: "",
      isDefault: false,
      phoneNumber: "718-000-0000",
      city: "New York",
      region: "NY",
      postalCode: "10012",
      country: "USA",
    },
  },
}
