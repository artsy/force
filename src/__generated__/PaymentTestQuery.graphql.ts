/**
 * @generated SignedSource<<61dd4f0c5aae4990067b02dcf2d782c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderSourceEnum = "artwork_page" | "inquiry" | "private_sale" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommercePaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
export type PaymentTestQuery$variables = {};
export type PaymentTestQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"Payment_me">;
  } | null;
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"Payment_order">;
  } | null;
};
export type PaymentTestQuery$rawResponse = {
  readonly me: {
    readonly bankAccounts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly internalID: string;
          readonly last4: string;
        } | null;
      } | null> | null;
    } | null;
    readonly creditCards: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly brand: string;
          readonly expirationMonth: number;
          readonly expirationYear: number;
          readonly id: string;
          readonly internalID: string;
          readonly lastDigits: string;
        } | null;
      } | null> | null;
    } | null;
    readonly id: string;
  } | null;
  readonly order: {
    readonly __typename: "CommerceOfferOrder";
    readonly __isCommerceOrder: "CommerceOfferOrder";
    readonly artworkDetails: string | null;
    readonly availablePaymentMethods: ReadonlyArray<CommercePaymentMethodEnum>;
    readonly bankAccountId: string | null;
    readonly buyerTotal: string | null;
    readonly buyerTotalCents: number | null;
    readonly code: string;
    readonly conditionsOfSale: string | null;
    readonly creditCard: {
      readonly brand: string;
      readonly city: string | null;
      readonly country: string | null;
      readonly expirationMonth: number;
      readonly expirationYear: number;
      readonly id: string;
      readonly internalID: string;
      readonly lastDigits: string;
      readonly name: string | null;
      readonly postalCode: string | null;
      readonly state: string | null;
      readonly street1: string | null;
      readonly street2: string | null;
    } | null;
    readonly currencyCode: string;
    readonly id: string;
    readonly internalID: string;
    readonly itemsTotal: string | null;
    readonly lastOffer: {
      readonly amount: string | null;
      readonly amountCents: number;
      readonly buyerTotal: string | null;
      readonly buyerTotalCents: number | null;
      readonly fromParticipant: CommerceOrderParticipantEnum | null;
      readonly id: string;
      readonly internalID: string;
      readonly note: string | null;
      readonly shippingTotal: string | null;
      readonly shippingTotalCents: number | null;
      readonly taxTotal: string | null;
      readonly taxTotalCents: number | null;
    } | null;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly id: string;
            readonly shippingOrigin: string | null;
            readonly slug: string;
          } | null;
          readonly artworkOrEditionSet: {
            readonly __typename: "Artwork";
            readonly __isNode: "Artwork";
            readonly id: string;
            readonly price: string | null;
          } | {
            readonly __typename: "EditionSet";
            readonly __isNode: "EditionSet";
            readonly id: string;
            readonly price: string | null;
          } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
          } | null;
          readonly artworkVersion: {
            readonly artistNames: string | null;
            readonly date: string | null;
            readonly id: string;
            readonly image: {
              readonly resized_ArtworkSummaryItem: {
                readonly url: string;
              } | null;
            } | null;
            readonly title: string | null;
          } | null;
          readonly id: string;
          readonly selectedShippingQuote: {
            readonly id: string;
            readonly typeName: string;
          } | null;
        } | null;
      } | null> | null;
    } | null;
    readonly mode: CommerceOrderModeEnum | null;
    readonly myLastOffer: {
      readonly amount: string | null;
      readonly amountCents: number;
      readonly buyerTotal: string | null;
      readonly buyerTotalCents: number | null;
      readonly fromParticipant: CommerceOrderParticipantEnum | null;
      readonly id: string;
      readonly internalID: string;
      readonly note: string | null;
      readonly shippingTotal: string | null;
      readonly shippingTotalCents: number | null;
      readonly taxTotal: string | null;
      readonly taxTotalCents: number | null;
    } | null;
    readonly paymentMethod: CommercePaymentMethodEnum | null;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
      readonly internalID: string;
      readonly last4: string;
    } | {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null;
    readonly requestedFulfillment: {
      readonly __typename: "CommercePickup";
      readonly fulfillmentType: string;
    } | {
      readonly __typename: "CommerceShip";
      readonly addressLine1: string | null;
      readonly addressLine2: string | null;
      readonly city: string | null;
      readonly country: string | null;
      readonly name: string | null;
      readonly postalCode: string | null;
      readonly region: string | null;
    } | {
      readonly __typename: "CommerceShipArta";
      readonly addressLine1: string | null;
      readonly addressLine2: string | null;
      readonly city: string | null;
      readonly country: string | null;
      readonly name: string | null;
      readonly postalCode: string | null;
      readonly region: string | null;
    } | {
      readonly __typename: string;
    } | null;
    readonly sellerDetails: {
      readonly __typename: "Partner";
      readonly __isNode: "Partner";
      readonly id: string;
      readonly name: string | null;
    } | {
      readonly __typename: string;
      readonly __isNode: string;
      readonly id: string;
    } | null;
    readonly shippingTotal: string | null;
    readonly shippingTotalCents: number | null;
    readonly source: CommerceOrderSourceEnum;
    readonly state: CommerceOrderStateEnum;
    readonly taxTotal: string | null;
    readonly taxTotalCents: number | null;
  } | {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly artworkDetails: string | null;
    readonly availablePaymentMethods: ReadonlyArray<CommercePaymentMethodEnum>;
    readonly bankAccountId: string | null;
    readonly buyerTotal: string | null;
    readonly buyerTotalCents: number | null;
    readonly code: string;
    readonly conditionsOfSale: string | null;
    readonly creditCard: {
      readonly brand: string;
      readonly city: string | null;
      readonly country: string | null;
      readonly expirationMonth: number;
      readonly expirationYear: number;
      readonly id: string;
      readonly internalID: string;
      readonly lastDigits: string;
      readonly name: string | null;
      readonly postalCode: string | null;
      readonly state: string | null;
      readonly street1: string | null;
      readonly street2: string | null;
    } | null;
    readonly currencyCode: string;
    readonly id: string;
    readonly internalID: string;
    readonly itemsTotal: string | null;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly id: string;
            readonly shippingOrigin: string | null;
            readonly slug: string;
          } | null;
          readonly artworkOrEditionSet: {
            readonly __typename: "Artwork";
            readonly __isNode: "Artwork";
            readonly id: string;
            readonly price: string | null;
          } | {
            readonly __typename: "EditionSet";
            readonly __isNode: "EditionSet";
            readonly id: string;
            readonly price: string | null;
          } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
          } | null;
          readonly artworkVersion: {
            readonly artistNames: string | null;
            readonly date: string | null;
            readonly id: string;
            readonly image: {
              readonly resized_ArtworkSummaryItem: {
                readonly url: string;
              } | null;
            } | null;
            readonly title: string | null;
          } | null;
          readonly id: string;
          readonly selectedShippingQuote: {
            readonly id: string;
            readonly typeName: string;
          } | null;
        } | null;
      } | null> | null;
    } | null;
    readonly mode: CommerceOrderModeEnum | null;
    readonly paymentMethod: CommercePaymentMethodEnum | null;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
      readonly internalID: string;
      readonly last4: string;
    } | {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null;
    readonly requestedFulfillment: {
      readonly __typename: "CommercePickup";
      readonly fulfillmentType: string;
    } | {
      readonly __typename: "CommerceShip";
      readonly addressLine1: string | null;
      readonly addressLine2: string | null;
      readonly city: string | null;
      readonly country: string | null;
      readonly name: string | null;
      readonly postalCode: string | null;
      readonly region: string | null;
    } | {
      readonly __typename: "CommerceShipArta";
      readonly addressLine1: string | null;
      readonly addressLine2: string | null;
      readonly city: string | null;
      readonly country: string | null;
      readonly name: string | null;
      readonly postalCode: string | null;
      readonly region: string | null;
    } | {
      readonly __typename: string;
    } | null;
    readonly sellerDetails: {
      readonly __typename: "Partner";
      readonly __isNode: "Partner";
      readonly id: string;
      readonly name: string | null;
    } | {
      readonly __typename: string;
      readonly __isNode: string;
      readonly id: string;
    } | null;
    readonly shippingTotal: string | null;
    readonly shippingTotalCents: number | null;
    readonly source: CommerceOrderSourceEnum;
    readonly state: CommerceOrderStateEnum;
    readonly taxTotal: string | null;
    readonly taxTotalCents: number | null;
  } | null;
};
export type PaymentTestQuery = {
  rawResponse: PaymentTestQuery$rawResponse;
  response: PaymentTestQuery$data;
  variables: PaymentTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "last4",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "brand",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastDigits",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationMonth",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationYear",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerTotalCents",
  "storageKey": null
},
v11 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v12 = {
  "alias": null,
  "args": (v11/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v14 = [
  (v4/*: any*/)
],
v15 = {
  "kind": "InlineFragment",
  "selections": (v14/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v21 = [
  (v17/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine1",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine2",
    "storageKey": null
  },
  (v18/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  (v19/*: any*/),
  (v20/*: any*/)
],
v22 = {
  "alias": null,
  "args": (v11/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": (v11/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v26 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": (v11/*: any*/),
    "kind": "ScalarField",
    "name": "amount",
    "storageKey": "amount(precision:2)"
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "amountCents",
    "storageKey": null
  },
  (v22/*: any*/),
  (v23/*: any*/),
  (v24/*: any*/),
  (v25/*: any*/),
  (v12/*: any*/),
  (v10/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fromParticipant",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "note",
    "storageKey": null
  },
  (v4/*: any*/)
],
v27 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CreditCard"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v32 = [
  "CREDIT_CARD",
  "SEPA_DEBIT",
  "US_BANK_ACCOUNT",
  "WIRE_TRANSFER"
],
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v35 = {
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderParticipantEnum"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PaymentTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Payment_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Payment_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PaymentTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "BankAccountConnection",
            "kind": "LinkedField",
            "name": "bankAccounts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BankAccountEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "BankAccount",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "bankAccounts(first:100)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "CreditCardConnection",
            "kind": "LinkedField",
            "name": "creditCards",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CreditCardEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreditCard",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "creditCards(first:100)"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artworkDetails",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "source",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "conditionsOfSale",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "bankAccountId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "availablePaymentMethods",
            "storageKey": null
          },
          (v10/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currencyCode",
            "storageKey": null
          },
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CommerceLineItemConnection",
            "kind": "LinkedField",
            "name": "lineItems",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceLineItemEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommerceLineItem",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "artwork",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "shippingOrigin",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v13/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v13/*: any*/),
                              (v4/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkVersion",
                        "kind": "LinkedField",
                        "name": "artworkVersion",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artistNames",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "resized_ArtworkSummaryItem",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 55
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "resized(width:55)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceShippingQuote",
                        "kind": "LinkedField",
                        "name": "selectedShippingQuote",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "typeName",
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "paymentMethod",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "paymentMethodDetails",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v14/*: any*/),
                "type": "CreditCard",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "type": "BankAccount",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isManualPayment",
                    "storageKey": null
                  }
                ],
                "type": "WireTransfer",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v16/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v17/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "street1",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "street2",
                "storageKey": null
              },
              (v18/*: any*/),
              (v16/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v6/*: any*/),
              (v5/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "requestedFulfillment",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v21/*: any*/),
                "type": "CommerceShip",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v21/*: any*/),
                "type": "CommerceShipArta",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "fulfillmentType",
                    "storageKey": null
                  }
                ],
                "type": "CommercePickup",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "sellerDetails",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v17/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              (v15/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          (v22/*: any*/),
          (v23/*: any*/),
          (v24/*: any*/),
          (v25/*: any*/),
          {
            "alias": null,
            "args": (v11/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": (v26/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": (v26/*: any*/),
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ]
  },
  "params": {
    "cacheID": "394e6b2595d4911346e551454caf9f32",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.bankAccounts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccountConnection"
        },
        "me.bankAccounts.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BankAccountEdge"
        },
        "me.bankAccounts.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccount"
        },
        "me.bankAccounts.edges.node.id": (v27/*: any*/),
        "me.bankAccounts.edges.node.internalID": (v27/*: any*/),
        "me.bankAccounts.edges.node.last4": (v28/*: any*/),
        "me.creditCards": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCardConnection"
        },
        "me.creditCards.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CreditCardEdge"
        },
        "me.creditCards.edges.node": (v29/*: any*/),
        "me.creditCards.edges.node.brand": (v28/*: any*/),
        "me.creditCards.edges.node.expirationMonth": (v30/*: any*/),
        "me.creditCards.edges.node.expirationYear": (v30/*: any*/),
        "me.creditCards.edges.node.id": (v27/*: any*/),
        "me.creditCards.edges.node.internalID": (v27/*: any*/),
        "me.creditCards.edges.node.lastDigits": (v28/*: any*/),
        "me.id": (v27/*: any*/),
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v28/*: any*/),
        "order.__typename": (v28/*: any*/),
        "order.artworkDetails": (v31/*: any*/),
        "order.availablePaymentMethods": {
          "enumValues": (v32/*: any*/),
          "nullable": false,
          "plural": true,
          "type": "CommercePaymentMethodEnum"
        },
        "order.bankAccountId": (v31/*: any*/),
        "order.buyerTotal": (v31/*: any*/),
        "order.buyerTotalCents": (v33/*: any*/),
        "order.code": (v28/*: any*/),
        "order.conditionsOfSale": (v31/*: any*/),
        "order.creditCard": (v29/*: any*/),
        "order.creditCard.brand": (v28/*: any*/),
        "order.creditCard.city": (v31/*: any*/),
        "order.creditCard.country": (v31/*: any*/),
        "order.creditCard.expirationMonth": (v30/*: any*/),
        "order.creditCard.expirationYear": (v30/*: any*/),
        "order.creditCard.id": (v27/*: any*/),
        "order.creditCard.internalID": (v27/*: any*/),
        "order.creditCard.lastDigits": (v28/*: any*/),
        "order.creditCard.name": (v31/*: any*/),
        "order.creditCard.postalCode": (v31/*: any*/),
        "order.creditCard.state": (v31/*: any*/),
        "order.creditCard.street1": (v31/*: any*/),
        "order.creditCard.street2": (v31/*: any*/),
        "order.currencyCode": (v28/*: any*/),
        "order.id": (v27/*: any*/),
        "order.internalID": (v27/*: any*/),
        "order.itemsTotal": (v31/*: any*/),
        "order.lastOffer": (v34/*: any*/),
        "order.lastOffer.amount": (v31/*: any*/),
        "order.lastOffer.amountCents": (v30/*: any*/),
        "order.lastOffer.buyerTotal": (v31/*: any*/),
        "order.lastOffer.buyerTotalCents": (v33/*: any*/),
        "order.lastOffer.fromParticipant": (v35/*: any*/),
        "order.lastOffer.id": (v27/*: any*/),
        "order.lastOffer.internalID": (v27/*: any*/),
        "order.lastOffer.note": (v31/*: any*/),
        "order.lastOffer.shippingTotal": (v31/*: any*/),
        "order.lastOffer.shippingTotalCents": (v33/*: any*/),
        "order.lastOffer.taxTotal": (v31/*: any*/),
        "order.lastOffer.taxTotalCents": (v33/*: any*/),
        "order.lineItems": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItemConnection"
        },
        "order.lineItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceLineItemEdge"
        },
        "order.lineItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItem"
        },
        "order.lineItems.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "order.lineItems.edges.node.artwork.id": (v27/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v31/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v27/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__isNode": (v28/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v28/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v27/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v31/*: any*/),
        "order.lineItems.edges.node.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "order.lineItems.edges.node.artworkVersion.artistNames": (v31/*: any*/),
        "order.lineItems.edges.node.artworkVersion.date": (v31/*: any*/),
        "order.lineItems.edges.node.artworkVersion.id": (v27/*: any*/),
        "order.lineItems.edges.node.artworkVersion.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem.url": (v28/*: any*/),
        "order.lineItems.edges.node.artworkVersion.title": (v31/*: any*/),
        "order.lineItems.edges.node.id": (v27/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceShippingQuote"
        },
        "order.lineItems.edges.node.selectedShippingQuote.id": (v27/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.typeName": (v28/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "order.myLastOffer": (v34/*: any*/),
        "order.myLastOffer.amount": (v31/*: any*/),
        "order.myLastOffer.amountCents": (v30/*: any*/),
        "order.myLastOffer.buyerTotal": (v31/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v33/*: any*/),
        "order.myLastOffer.fromParticipant": (v35/*: any*/),
        "order.myLastOffer.id": (v27/*: any*/),
        "order.myLastOffer.internalID": (v27/*: any*/),
        "order.myLastOffer.note": (v31/*: any*/),
        "order.myLastOffer.shippingTotal": (v31/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v33/*: any*/),
        "order.myLastOffer.taxTotal": (v31/*: any*/),
        "order.myLastOffer.taxTotalCents": (v33/*: any*/),
        "order.paymentMethod": {
          "enumValues": (v32/*: any*/),
          "nullable": true,
          "plural": false,
          "type": "CommercePaymentMethodEnum"
        },
        "order.paymentMethodDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PaymentMethodUnion"
        },
        "order.paymentMethodDetails.__typename": (v28/*: any*/),
        "order.paymentMethodDetails.id": (v27/*: any*/),
        "order.paymentMethodDetails.internalID": (v27/*: any*/),
        "order.paymentMethodDetails.isManualPayment": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "order.paymentMethodDetails.last4": (v28/*: any*/),
        "order.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "order.requestedFulfillment.__typename": (v28/*: any*/),
        "order.requestedFulfillment.addressLine1": (v31/*: any*/),
        "order.requestedFulfillment.addressLine2": (v31/*: any*/),
        "order.requestedFulfillment.city": (v31/*: any*/),
        "order.requestedFulfillment.country": (v31/*: any*/),
        "order.requestedFulfillment.fulfillmentType": (v28/*: any*/),
        "order.requestedFulfillment.name": (v31/*: any*/),
        "order.requestedFulfillment.postalCode": (v31/*: any*/),
        "order.requestedFulfillment.region": (v31/*: any*/),
        "order.sellerDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderParty"
        },
        "order.sellerDetails.__isNode": (v28/*: any*/),
        "order.sellerDetails.__typename": (v28/*: any*/),
        "order.sellerDetails.id": (v27/*: any*/),
        "order.sellerDetails.name": (v31/*: any*/),
        "order.shippingTotal": (v31/*: any*/),
        "order.shippingTotalCents": (v33/*: any*/),
        "order.source": {
          "enumValues": [
            "artwork_page",
            "inquiry",
            "private_sale"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderSourceEnum"
        },
        "order.state": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "IN_REVIEW",
            "PENDING",
            "PROCESSING_APPROVAL",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderStateEnum"
        },
        "order.taxTotal": (v31/*: any*/),
        "order.taxTotalCents": (v33/*: any*/)
      }
    },
    "name": "PaymentTestQuery",
    "operationKind": "query",
    "text": "query PaymentTestQuery {\n  me {\n    ...Payment_me\n    id\n  }\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...Payment_order\n    id\n  }\n}\n\nfragment AdditionalArtworkDetails_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  artworkDetails\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  currencyCode\n  mode\n  source\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        artwork {\n          shippingOrigin\n          id\n        }\n        artworkVersion {\n          date\n          artistNames\n          title\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment BankAccountPicker_me on Me {\n  bankAccounts(first: 100) {\n    edges {\n      node {\n        internalID\n        last4\n        id\n      }\n    }\n  }\n}\n\nfragment BankAccountPicker_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  bankAccountId\n  paymentMethodDetails {\n    __typename\n    ... on BankAccount {\n      internalID\n      last4\n      id\n    }\n    ... on CreditCard {\n      id\n    }\n  }\n}\n\nfragment CreditCardPicker_me on Me {\n  creditCards(first: 100) {\n    edges {\n      node {\n        internalID\n        brand\n        lastDigits\n        expirationMonth\n        expirationYear\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardPicker_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  state\n  creditCard {\n    internalID\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postalCode\n    expirationMonth\n    expirationYear\n    lastDigits\n    brand\n    id\n  }\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommerceShipArta {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommercePickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment Payment_me on Me {\n  bankAccounts(first: 100) {\n    edges {\n      node {\n        internalID\n        last4\n        id\n      }\n    }\n  }\n  ...CreditCardPicker_me\n  ...BankAccountPicker_me\n}\n\nfragment Payment_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  artworkDetails\n  source\n  conditionsOfSale\n  bankAccountId\n  availablePaymentMethods\n  buyerTotalCents\n  internalID\n  mode\n  currencyCode\n  buyerTotal(precision: 2)\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      id\n    }\n    ... on BankAccount {\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  ...CreditCardPicker_order\n  ...BankAccountPicker_order\n  ...ArtworkSummaryItem_order\n  ...AdditionalArtworkDetails_order\n  ...TransactionDetailsSummaryItem_order\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          typeName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "14f9674b9b6dce1805ec6518676f13a0";

export default node;
