import {
  BuyOrderWithArtaShippingDetails,
  BuyOrderWithShippingDetails,
} from "v2/Apps/__tests__/Fixtures/Order"

export const settingOrderShipmentFailure = {
  commerceSetShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "Not permitted",
        data: null,
      },
    },
  },
}

export const settingOrderShipmentMissingRegionFailure = {
  commerceSetShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "missing_region",
        data: null,
      },
    },
  },
}

export const settingOrderShipmentMissingCountryFailure = {
  commerceSetShipping: {
    orderOrError: {
      error: {
        type: "validation",
        code: "missing_country",
        data: null,
      },
    },
  },
}

export const settingOrderShipmentSuccess = {
  commerceSetShipping: {
    orderOrError: {
      order: {
        ...BuyOrderWithShippingDetails,
      },
    },
  },
}

export const settingOrderArtaShipmentSuccess = {
  commerceSetShipping: {
    orderOrError: {
      order: {
        ...BuyOrderWithArtaShippingDetails,
      },
    },
  },
}

export const selectShippingQuoteSuccess = {
  commerceSelectShippingOption: {
    orderOrError: {
      order: {
        __typename: "CommerceBuyOrder",
        lineItems: {
          edges: [
            {
              node: {
                editionSetId: null,
                id: "line-item-node-id",
                selectedShippingQuote: {
                  id: "278ba0c4-f815-4197-8a8d-b97f1883db21",
                  tier: "premium",
                  name: "",
                  displayName: "White Glove",
                  isSelected: true,
                  priceCents: 200,
                  priceCurrency: "USD",
                  price: "$2.00",
                },
                shippingQuoteOptions: {
                  edges: [
                    {
                      node: {
                        id: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
                        tier: "select",
                        name: "",
                        displayName: "Premium",
                        isSelected: false,
                        priceCents: 400,
                        priceCurrency: "USD",
                        price: "$4.00",
                      },
                    },
                    {
                      node: {
                        id: "d8cfee28-8139-4391-8a8d-3010633e885b",
                        tier: "parcel",
                        name: "Next Day Air",
                        displayName: "Rush",
                        isSelected: false,
                        priceCents: 400,
                        priceCurrency: "USD",
                        price: "$4.00",
                      },
                    },
                    {
                      node: {
                        id: "1cbfad12-a90d-4e79-9753-02bf4fcc7f80",
                        tier: "parcel",
                        name: "Second Day Air",
                        displayName: "Express",
                        isSelected: false,
                        priceCents: 400,
                        priceCurrency: "USD",
                        price: "$4.00",
                      },
                    },
                    {
                      node: {
                        id: "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                        tier: "parcel",
                        name: "Ground",
                        displayName: "Standard",
                        isSelected: false,
                        priceCents: 400,
                        priceCurrency: "USD",
                        price: "$4.00",
                      },
                    },
                    {
                      node: {
                        id: "278ba0c4-f815-4197-8a8d-b97f1883db21",
                        tier: "premium",
                        name: "",
                        displayName: "White Glove",
                        isSelected: true,
                        priceCents: 200,
                        priceCurrency: "USD",
                        price: "$2.00",
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  },
}
