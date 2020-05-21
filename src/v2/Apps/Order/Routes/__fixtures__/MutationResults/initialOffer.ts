export const initialOfferSuccess = {
  commerceAddInitialOfferToOrder: {
    orderOrError: {
      order: {
        id: "1234",
        internalID: "1234",
        mode: "BUY",
        itemsTotalCents: 400,
        totalListPriceCents: 600,
        totalListPrice: "$6.00",
        myLastOffer: {
          id: "2345",
          internalID: "2345",
          amountCents: 400,
          note: null,
        },
        lastOffer: null,
      },
    },
  },
}

export const initialOfferFailedCannotOffer = {
  commerceAddInitialOfferToOrder: {
    orderOrError: {
      error: {
        type: "validation",
        code: "cant_offer",
        data: null,
      },
    },
  },
}

export const initialOfferFailedAmountIsInvalid = {
  commerceAddInitialOfferToOrder: {
    orderOrError: {
      error: {
        type: "validation",
        code: "invalid_amount_cents",
        data: null,
      },
    },
  },
}
