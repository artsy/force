import { AddressModalMutationResponse } from "v2/__generated__/AddressModalMutation.graphql"
import { ShippingCreateUserAddressMutationResponse } from "v2/__generated__/ShippingCreateUserAddressMutation.graphql"

export const saveAddressSuccess: ShippingCreateUserAddressMutationResponse = {
  createUserAddress: {
    userAddressOrErrors: {
      internalID: "address-id",
      id: "graphql-id",
    },
  },
}

export const updateAddressSuccess: AddressModalMutationResponse = {
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
