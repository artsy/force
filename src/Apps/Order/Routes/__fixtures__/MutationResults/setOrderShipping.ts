import {
  BuyOrderWithArtaShippingDetails,
  BuyOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"

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
      __typename: "CommerceOrderWithMutationSuccess",
      order: {
        ...BuyOrderWithShippingDetails,
      },
    },
  },
}

export const settingOrderArtaShipmentDestinationCouldNotBeGeocodedFailure = {
  commerceSetShipping: {
    orderOrError: {
      error: {
        type: "arta",
        code: "destination_could_not_be_geocoded",
        data:
          '{"status":422,"errors":{"destination":["could not be geocoded"]}}',
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
                  isSelected: true,
                  priceCents: 200,
                  priceCurrency: "USD",
                  price: "$2.00",
                  typeName: "premium",
                },
                shippingQuoteOptions: {
                  edges: [
                    {
                      node: {
                        id: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
                        tier: "select",
                        name: "",
                        isSelected: false,
                        priceCents: 400,
                        priceCurrency: "USD",
                        price: "$4.00",
                        typeName: "select",
                      },
                    },
                    {
                      node: {
                        id: "d8cfee28-8139-4391-8a8d-3010633e885b",
                        tier: "parcel",
                        name: "Next Day Air",
                        isSelected: false,
                        priceCents: 400,
                        priceCurrency: "USD",
                        price: "$4.00",
                        typeName: "next_day_air",
                      },
                    },
                    {
                      node: {
                        id: "1cbfad12-a90d-4e79-9753-02bf4fcc7f80",
                        tier: "parcel",
                        name: "Second Day Air",
                        isSelected: false,
                        priceCents: 400,
                        priceCurrency: "USD",
                        price: "$4.00",
                        typeName: "second_day_air",
                      },
                    },
                    {
                      node: {
                        id: "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                        tier: "parcel",
                        name: "Ground",
                        isSelected: false,
                        priceCents: 400,
                        priceCurrency: "USD",
                        price: "$4.00",
                        typeName: "ground",
                      },
                    },
                    {
                      node: {
                        id: "278ba0c4-f815-4197-8a8d-b97f1883db21",
                        tier: "premium",
                        name: "",
                        isSelected: true,
                        priceCents: 200,
                        priceCurrency: "USD",
                        price: "$2.00",
                        typeName: "premium",
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
