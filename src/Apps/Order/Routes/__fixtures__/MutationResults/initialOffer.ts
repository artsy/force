export const initialOfferSuccess = {
  commerceAddInitialOfferToOrder: {
    orderOrError: {
      order: {
        id: "1234",
        internalID: "1234",
        itemsTotalCents: 400,
        lastOffer: null,
        mode: "BUY",
        myLastOffer: {
          amountCents: 400,
          id: "2345",
          internalID: "2345",
          note: null,
        },
        totalListPriceCents: 600,
      },
    },
  },
}

export const initialOfferFailedCannotOffer = {
  commerceAddInitialOfferToOrder: {
    orderOrError: {
      error: {
        code: "cant_offer",
        data: null,
        type: "validation",
      },
    },
  },
}

export const initialOfferFailedAmountIsInvalid = {
  commerceAddInitialOfferToOrder: {
    orderOrError: {
      error: {
        code: "invalid_amount_cents",
        data: null,
        type: "validation",
      },
    },
  },
}
