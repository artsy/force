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
      },
    },
  },
}
