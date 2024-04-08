/**
 * @generated SignedSource<<4248ceca699c6bf06d02cfc4356c6449>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderDisplayStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_TRANSIT" | "PENDING" | "PROCESSING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderSourceEnum = "artwork_page" | "inquiry" | "partner_offer" | "private_sale" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommercePaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
export type AcceptTestQuery$variables = Record<PropertyKey, never>;
export type AcceptTestQuery$data = {
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"Accept_order">;
  } | null | undefined;
};
export type AcceptTestQuery$rawResponse = {
  readonly order: {
    readonly __typename: "CommerceOfferOrder";
    readonly __isCommerceOrder: "CommerceOfferOrder";
    readonly buyerTotal: string | null | undefined;
    readonly code: string;
    readonly creditCardId: string | null | undefined;
    readonly currencyCode: string;
    readonly displayState: CommerceOrderDisplayStateEnum;
    readonly id: string;
    readonly internalID: string;
    readonly itemsTotal: string | null | undefined;
    readonly lastOffer: {
      readonly amount: string | null | undefined;
      readonly amountCents: number;
      readonly buyerTotal: string | null | undefined;
      readonly buyerTotalCents: number | null | undefined;
      readonly createdAt: string;
      readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
      readonly id: string;
      readonly internalID: string;
      readonly note: string | null | undefined;
      readonly shippingTotal: string | null | undefined;
      readonly shippingTotalCents: number | null | undefined;
      readonly taxTotal: string | null | undefined;
      readonly taxTotalCents: number | null | undefined;
    } | null | undefined;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly artists: ReadonlyArray<{
              readonly id: string;
              readonly slug: string;
            } | null | undefined> | null | undefined;
            readonly id: string;
            readonly isUnlisted: boolean;
            readonly shippingOrigin: string | null | undefined;
            readonly slug: string;
          } | null | undefined;
          readonly artworkOrEditionSet: {
            readonly __typename: "Artwork";
            readonly __isNode: "Artwork";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: "EditionSet";
            readonly __isNode: "EditionSet";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
          } | null | undefined;
          readonly artworkVersion: {
            readonly artistNames: string | null | undefined;
            readonly date: string | null | undefined;
            readonly id: string;
            readonly image: {
              readonly resized_ArtworkSummaryItem: {
                readonly url: string;
              } | null | undefined;
            } | null | undefined;
            readonly title: string | null | undefined;
          } | null | undefined;
          readonly id: string;
          readonly selectedShippingQuote: {
            readonly id: string;
            readonly typeName: string;
          } | null | undefined;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly id: string;
                readonly isSelected: boolean;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly mode: CommerceOrderModeEnum | null | undefined;
    readonly myLastOffer: {
      readonly amount: string | null | undefined;
      readonly amountCents: number;
      readonly buyerTotal: string | null | undefined;
      readonly buyerTotalCents: number | null | undefined;
      readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
      readonly id: string;
      readonly internalID: string;
      readonly note: string | null | undefined;
      readonly shippingTotal: string | null | undefined;
      readonly shippingTotalCents: number | null | undefined;
      readonly taxTotal: string | null | undefined;
      readonly taxTotalCents: number | null | undefined;
    } | null | undefined;
    readonly paymentMethod: CommercePaymentMethodEnum | null | undefined;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
      readonly last4: string;
    } | {
      readonly __typename: "CreditCard";
      readonly brand: string;
      readonly expirationMonth: number;
      readonly expirationYear: number;
      readonly id: string;
      readonly lastDigits: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly requestedFulfillment: {
      readonly __typename: "CommerceShip";
      readonly __isCommerceRequestedFulfillmentUnion: "CommerceShip";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: "CommerceShipArta";
      readonly __isCommerceRequestedFulfillmentUnion: "CommerceShipArta";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: string;
      readonly __isCommerceRequestedFulfillmentUnion: string;
    } | null | undefined;
    readonly sellerDetails: {
      readonly __typename: "Partner";
      readonly __isNode: "Partner";
      readonly id: string;
      readonly name: string | null | undefined;
    } | {
      readonly __typename: string;
      readonly __isNode: string;
      readonly id: string;
    } | null | undefined;
    readonly shippingTotal: string | null | undefined;
    readonly shippingTotalCents: number | null | undefined;
    readonly source: CommerceOrderSourceEnum;
    readonly state: CommerceOrderStateEnum;
    readonly stateExpiresAt: string | null | undefined;
    readonly taxTotal: string | null | undefined;
    readonly taxTotalCents: number | null | undefined;
  } | {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly buyerTotal: string | null | undefined;
    readonly code: string;
    readonly creditCardId: string | null | undefined;
    readonly currencyCode: string;
    readonly displayState: CommerceOrderDisplayStateEnum;
    readonly id: string;
    readonly internalID: string;
    readonly itemsTotal: string | null | undefined;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly artists: ReadonlyArray<{
              readonly id: string;
              readonly slug: string;
            } | null | undefined> | null | undefined;
            readonly id: string;
            readonly isUnlisted: boolean;
            readonly shippingOrigin: string | null | undefined;
            readonly slug: string;
          } | null | undefined;
          readonly artworkOrEditionSet: {
            readonly __typename: "Artwork";
            readonly __isNode: "Artwork";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: "EditionSet";
            readonly __isNode: "EditionSet";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
          } | null | undefined;
          readonly artworkVersion: {
            readonly artistNames: string | null | undefined;
            readonly date: string | null | undefined;
            readonly id: string;
            readonly image: {
              readonly resized_ArtworkSummaryItem: {
                readonly url: string;
              } | null | undefined;
            } | null | undefined;
            readonly title: string | null | undefined;
          } | null | undefined;
          readonly id: string;
          readonly selectedShippingQuote: {
            readonly id: string;
            readonly typeName: string;
          } | null | undefined;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly id: string;
                readonly isSelected: boolean;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly mode: CommerceOrderModeEnum | null | undefined;
    readonly paymentMethod: CommercePaymentMethodEnum | null | undefined;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
      readonly last4: string;
    } | {
      readonly __typename: "CreditCard";
      readonly brand: string;
      readonly expirationMonth: number;
      readonly expirationYear: number;
      readonly id: string;
      readonly lastDigits: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly requestedFulfillment: {
      readonly __typename: "CommerceShip";
      readonly __isCommerceRequestedFulfillmentUnion: "CommerceShip";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: "CommerceShipArta";
      readonly __isCommerceRequestedFulfillmentUnion: "CommerceShipArta";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: string;
      readonly __isCommerceRequestedFulfillmentUnion: string;
    } | null | undefined;
    readonly sellerDetails: {
      readonly __typename: "Partner";
      readonly __isNode: "Partner";
      readonly id: string;
      readonly name: string | null | undefined;
    } | {
      readonly __typename: string;
      readonly __isNode: string;
      readonly id: string;
    } | null | undefined;
    readonly shippingTotal: string | null | undefined;
    readonly shippingTotalCents: number | null | undefined;
    readonly source: CommerceOrderSourceEnum;
    readonly state: CommerceOrderStateEnum;
    readonly stateExpiresAt: string | null | undefined;
    readonly taxTotal: string | null | undefined;
    readonly taxTotalCents: number | null | undefined;
  } | null | undefined;
};
export type AcceptTestQuery = {
  rawResponse: AcceptTestQuery$rawResponse;
  response: AcceptTestQuery$data;
  variables: AcceptTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
  "name": "slug",
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
  "name": "price",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v7 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v8 = {
  "alias": null,
  "args": (v7/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountCents",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": (v7/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": (v7/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": (v7/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerTotalCents",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "note",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v19 = [
  (v18/*: any*/),
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
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "city",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "postalCode",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "country",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "phoneNumber",
    "storageKey": null
  }
],
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v22 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v24 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v26 = {
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderParticipantEnum"
},
v27 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceShippingQuote"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AcceptTestQuery",
    "selections": [
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
            "name": "Accept_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"test-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AcceptTestQuery",
    "selections": [
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stateExpiresAt",
            "storageKey": null
          },
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "shippingOrigin",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isUnlisted",
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
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/),
                              (v4/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v6/*: any*/)
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
                        "concreteType": "CommerceShippingQuoteConnection",
                        "kind": "LinkedField",
                        "name": "shippingQuoteOptions",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceShippingQuoteEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceShippingQuote",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isSelected",
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
            "name": "creditCardId",
            "storageKey": null
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
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "requestedFulfillment",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isCommerceRequestedFulfillmentUnion"
              },
              {
                "kind": "InlineFragment",
                "selections": (v19/*: any*/),
                "type": "CommerceShip",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v19/*: any*/),
                "type": "CommerceShipArta",
                "abstractKey": null
              }
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
            "name": "source",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayState",
            "storageKey": null
          },
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": (v7/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          (v14/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currencyCode",
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
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v18/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
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
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "brand",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lastDigits",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "expirationYear",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "expirationMonth",
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "type": "CreditCard",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "last4",
                    "storageKey": null
                  },
                  (v4/*: any*/)
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
          (v4/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"test-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "152ff491c875f3571354bcb51736582e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v20/*: any*/),
        "order.__typename": (v20/*: any*/),
        "order.buyerTotal": (v21/*: any*/),
        "order.code": (v20/*: any*/),
        "order.creditCardId": (v21/*: any*/),
        "order.currencyCode": (v20/*: any*/),
        "order.displayState": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "IN_TRANSIT",
            "PENDING",
            "PROCESSING",
            "PROCESSING_APPROVAL",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderDisplayStateEnum"
        },
        "order.id": (v22/*: any*/),
        "order.internalID": (v22/*: any*/),
        "order.itemsTotal": (v21/*: any*/),
        "order.lastOffer": (v23/*: any*/),
        "order.lastOffer.amount": (v21/*: any*/),
        "order.lastOffer.amountCents": (v24/*: any*/),
        "order.lastOffer.buyerTotal": (v21/*: any*/),
        "order.lastOffer.buyerTotalCents": (v25/*: any*/),
        "order.lastOffer.createdAt": (v20/*: any*/),
        "order.lastOffer.fromParticipant": (v26/*: any*/),
        "order.lastOffer.id": (v22/*: any*/),
        "order.lastOffer.internalID": (v22/*: any*/),
        "order.lastOffer.note": (v21/*: any*/),
        "order.lastOffer.shippingTotal": (v21/*: any*/),
        "order.lastOffer.shippingTotalCents": (v25/*: any*/),
        "order.lastOffer.taxTotal": (v21/*: any*/),
        "order.lastOffer.taxTotalCents": (v25/*: any*/),
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
        "order.lineItems.edges.node.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "order.lineItems.edges.node.artwork.artists.id": (v22/*: any*/),
        "order.lineItems.edges.node.artwork.artists.slug": (v22/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v22/*: any*/),
        "order.lineItems.edges.node.artwork.isUnlisted": (v27/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v21/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v22/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__isNode": (v20/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v20/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v22/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v21/*: any*/),
        "order.lineItems.edges.node.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "order.lineItems.edges.node.artworkVersion.artistNames": (v21/*: any*/),
        "order.lineItems.edges.node.artworkVersion.date": (v21/*: any*/),
        "order.lineItems.edges.node.artworkVersion.id": (v22/*: any*/),
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
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem.url": (v20/*: any*/),
        "order.lineItems.edges.node.artworkVersion.title": (v21/*: any*/),
        "order.lineItems.edges.node.id": (v22/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote": (v28/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.id": (v22/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.typeName": (v20/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceShippingQuoteConnection"
        },
        "order.lineItems.edges.node.shippingQuoteOptions.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceShippingQuoteEdge"
        },
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node": (v28/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node.id": (v22/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node.isSelected": (v27/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "order.myLastOffer": (v23/*: any*/),
        "order.myLastOffer.amount": (v21/*: any*/),
        "order.myLastOffer.amountCents": (v24/*: any*/),
        "order.myLastOffer.buyerTotal": (v21/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v25/*: any*/),
        "order.myLastOffer.fromParticipant": (v26/*: any*/),
        "order.myLastOffer.id": (v22/*: any*/),
        "order.myLastOffer.internalID": (v22/*: any*/),
        "order.myLastOffer.note": (v21/*: any*/),
        "order.myLastOffer.shippingTotal": (v21/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v25/*: any*/),
        "order.myLastOffer.taxTotal": (v21/*: any*/),
        "order.myLastOffer.taxTotalCents": (v25/*: any*/),
        "order.paymentMethod": {
          "enumValues": [
            "CREDIT_CARD",
            "SEPA_DEBIT",
            "US_BANK_ACCOUNT",
            "WIRE_TRANSFER"
          ],
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
        "order.paymentMethodDetails.__typename": (v20/*: any*/),
        "order.paymentMethodDetails.brand": (v20/*: any*/),
        "order.paymentMethodDetails.expirationMonth": (v24/*: any*/),
        "order.paymentMethodDetails.expirationYear": (v24/*: any*/),
        "order.paymentMethodDetails.id": (v22/*: any*/),
        "order.paymentMethodDetails.isManualPayment": (v27/*: any*/),
        "order.paymentMethodDetails.last4": (v20/*: any*/),
        "order.paymentMethodDetails.lastDigits": (v20/*: any*/),
        "order.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "order.requestedFulfillment.__isCommerceRequestedFulfillmentUnion": (v20/*: any*/),
        "order.requestedFulfillment.__typename": (v20/*: any*/),
        "order.requestedFulfillment.addressLine1": (v21/*: any*/),
        "order.requestedFulfillment.addressLine2": (v21/*: any*/),
        "order.requestedFulfillment.city": (v21/*: any*/),
        "order.requestedFulfillment.country": (v21/*: any*/),
        "order.requestedFulfillment.name": (v21/*: any*/),
        "order.requestedFulfillment.phoneNumber": (v21/*: any*/),
        "order.requestedFulfillment.postalCode": (v21/*: any*/),
        "order.requestedFulfillment.region": (v21/*: any*/),
        "order.sellerDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderParty"
        },
        "order.sellerDetails.__isNode": (v20/*: any*/),
        "order.sellerDetails.__typename": (v20/*: any*/),
        "order.sellerDetails.id": (v22/*: any*/),
        "order.sellerDetails.name": (v21/*: any*/),
        "order.shippingTotal": (v21/*: any*/),
        "order.shippingTotalCents": (v25/*: any*/),
        "order.source": {
          "enumValues": [
            "artwork_page",
            "inquiry",
            "partner_offer",
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
        "order.stateExpiresAt": (v21/*: any*/),
        "order.taxTotal": (v21/*: any*/),
        "order.taxTotalCents": (v25/*: any*/)
      }
    },
    "name": "AcceptTestQuery",
    "operationKind": "query",
    "text": "query AcceptTestQuery {\n  order: commerceOrder(id: \"test-id\") {\n    __typename\n    ...Accept_order\n    id\n  }\n}\n\nfragment Accept_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  stateExpiresAt\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          artists {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  creditCardId\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      createdAt\n      id\n    }\n  }\n  ...TransactionDetailsSummaryItem_order\n  ...ArtworkSummaryItem_order\n  ...ShippingSummaryItem_order\n  ...PaymentMethodSummaryItem_order\n  ...OrderStepper_order\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  currencyCode\n  mode\n  source\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        artwork {\n          slug\n          shippingOrigin\n          isUnlisted\n          id\n        }\n        artworkVersion {\n          date\n          artistNames\n          title\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment OrderStepper_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  mode\n  requestedFulfillment {\n    __typename\n  }\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      id\n    }\n    ... on BankAccount {\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        shippingQuoteOptions {\n          edges {\n            node {\n              isSelected\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment PaymentMethodSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  source\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      brand\n      lastDigits\n      expirationYear\n      expirationMonth\n      id\n    }\n    ... on BankAccount {\n      last4\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment ShippingAddress_ship on CommerceRequestedFulfillmentUnion {\n  __isCommerceRequestedFulfillmentUnion: __typename\n  ... on CommerceShip {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n  ... on CommerceShipArta {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n}\n\nfragment ShippingSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  state\n  paymentMethod\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          typeName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  source\n  displayState\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "34366bd2db78a893e855e0d61993b4f0";

export default node;
