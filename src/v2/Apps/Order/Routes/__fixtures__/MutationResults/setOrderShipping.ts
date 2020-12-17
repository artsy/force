import { BuyOrderWithShippingDetails } from "v2/Apps/__tests__/Fixtures/Order"

export const settingOrderShipmentFailure = {
  commerceSetShipping: {
    orderOrError: {
      error: {
        code: "Not permitted",
        data: null,
        type: "validation",
      },
    },
  },
}

export const settingOrderShipmentMissingRegionFailure = {
  commerceSetShipping: {
    orderOrError: {
      error: {
        code: "missing_region",
        data: null,
        type: "validation",
      },
    },
  },
}

export const settingOrderShipmentMissingCountryFailure = {
  commerceSetShipping: {
    orderOrError: {
      error: {
        code: "missing_country",
        data: null,
        type: "validation",
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
