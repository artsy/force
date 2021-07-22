import { UpdateUserAddressMutationResponse } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutationResponse } from "v2/__generated__/CreateUserAddressMutation.graphql"
import { DeleteUserAddressMutationResponse } from "v2/__generated__/DeleteUserAddressMutation.graphql"

export const saveAddressSuccess: CreateUserAddressMutationResponse = {
  createUserAddress: {
    userAddressOrErrors: {
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

export const deleteAddressSuccess: DeleteUserAddressMutationResponse = {
  deleteUserAddress: {
    userAddressOrErrors: {
      internalID: "1",
      addressLine1: "1 Main St",
      addressLine2: "",
      city: "New York",
      country: "US",
      isDefault: false,
      name: "Test Name",
      phoneNumber: "555-555-5555",
      postalCode: "28001",
      region: "",
      id: "addressID1",
    },
  },
}

export const updateAddressFailure: UpdateUserAddressMutationResponse = {
  updateUserAddress: {
    userAddressOrErrors: {
      errors: [
        {
          code: "100",
          message: "Invalid address",
        },
      ],
    },
  },
}
