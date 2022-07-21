export const userAddressMutation = {
  me: {
    id: "123445",
    addressConnection: {
      totalCount: 1,
      pageInfo: {
        startCursor: "aaa",
        endCursor: "bbb",
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor: "aaaabbbb",
          node: {
            addressLine1: "1 Main St",
            addressLine2: "",
            addressLine3: "",
            city: "Madrid",
            country: "Spain",
            isDefault: false,
            name: "Test Name",
            phoneNumber: "555-555-5555",
            postalCode: "28001",
            region: "",
          },
        },
        {
          cursor: "ccccddddd",
          node: {
            addressLine1: "11 Primary St",
            addressLine2: "",
            addressLine3: "",
            city: "New York",
            country: "US",
            isDefault: false,
            name: "Ethan Artbuyer",
            phoneNumber: "347-347-3473",
            postalCode: "10021",
            region: "",
          },
        },
      ],
    },
  },
}
