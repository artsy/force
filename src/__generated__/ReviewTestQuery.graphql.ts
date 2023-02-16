/**
 * @generated SignedSource<<05b91085ab4dc4fdb576399625eb70ce>>
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
export type ReviewTestQuery$variables = {};
export type ReviewTestQuery$data = {
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"Review_order">;
  } | null;
};
export type ReviewTestQuery$rawResponse = {
  readonly order: {
    readonly __typename: "CommerceOfferOrder";
    readonly __isCommerceOrder: "CommerceOfferOrder";
    readonly artworkDetails: string | null;
    readonly awaitingResponseFrom: CommerceOrderParticipantEnum | null;
    readonly bankAccountId: string | null;
    readonly buyerTotal: string | null;
    readonly code: string;
    readonly conditionsOfSale: string | null;
    readonly creditCard: {
      readonly id: string;
      readonly internalID: string;
    } | null;
    readonly currencyCode: string;
    readonly id: string;
    readonly impulseConversationId: string | null;
    readonly internalID: string;
    readonly itemsTotal: string | null;
    readonly lastOffer: {
      readonly amount: string | null;
      readonly amountCents: number;
      readonly buyerTotal: string | null;
      readonly buyerTotalCents: number | null;
      readonly createdAt: string;
      readonly fromParticipant: CommerceOrderParticipantEnum | null;
      readonly id: string;
      readonly internalID: string;
      readonly note: string | null;
      readonly shippingTotal: string | null;
      readonly shippingTotalCents: number | null;
      readonly taxTotal: string | null;
      readonly taxTotalCents: number | null;
    } | null;
    readonly lastTransactionFailed: boolean | null;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly artists: ReadonlyArray<{
              readonly id: string;
              readonly slug: string;
            } | null> | null;
            readonly editionSets: ReadonlyArray<{
              readonly dimensions: {
                readonly cm: string | null;
                readonly in: string | null;
              } | null;
              readonly id: string;
              readonly internalID: string;
            } | null> | null;
            readonly id: string;
            readonly internalID: string;
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
            readonly attributionClass: {
              readonly id: string;
              readonly shortDescription: string | null;
            } | null;
            readonly date: string | null;
            readonly dimensions: {
              readonly cm: string | null;
              readonly in: string | null;
            } | null;
            readonly id: string;
            readonly image: {
              readonly resized: {
                readonly url: string;
              } | null;
              readonly resized_ArtworkSummaryItem: {
                readonly url: string;
              } | null;
            } | null;
            readonly medium: string | null;
            readonly title: string | null;
          } | null;
          readonly editionSetId: string | null;
          readonly id: string;
          readonly selectedShippingQuote: {
            readonly id: string;
            readonly price: string | null;
            readonly typeName: string;
          } | null;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly id: string;
                readonly isSelected: boolean;
              } | null;
            } | null> | null;
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
      readonly createdAt: string;
      readonly fromParticipant: CommerceOrderParticipantEnum | null;
      readonly hasDefiniteTotal: boolean;
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
    } | null;
    readonly requestedFulfillment: {
      readonly __typename: "CommerceShip";
      readonly __isCommerceRequestedFulfillmentUnion: "CommerceShip";
      readonly addressLine1: string | null;
      readonly addressLine2: string | null;
      readonly city: string | null;
      readonly country: string | null;
      readonly name: string | null;
      readonly phoneNumber: string | null;
      readonly postalCode: string | null;
      readonly region: string | null;
    } | {
      readonly __typename: "CommerceShipArta";
      readonly __isCommerceRequestedFulfillmentUnion: "CommerceShipArta";
      readonly addressLine1: string | null;
      readonly addressLine2: string | null;
      readonly city: string | null;
      readonly country: string | null;
      readonly name: string | null;
      readonly phoneNumber: string | null;
      readonly postalCode: string | null;
      readonly region: string | null;
    } | {
      readonly __typename: string;
      readonly __isCommerceRequestedFulfillmentUnion: string;
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
    readonly stateExpiresAt: string | null;
    readonly taxTotal: string | null;
    readonly taxTotalCents: number | null;
  } | {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly artworkDetails: string | null;
    readonly bankAccountId: string | null;
    readonly buyerTotal: string | null;
    readonly code: string;
    readonly conditionsOfSale: string | null;
    readonly creditCard: {
      readonly id: string;
      readonly internalID: string;
    } | null;
    readonly currencyCode: string;
    readonly id: string;
    readonly impulseConversationId: string | null;
    readonly internalID: string;
    readonly itemsTotal: string | null;
    readonly lastTransactionFailed: boolean | null;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly artists: ReadonlyArray<{
              readonly id: string;
              readonly slug: string;
            } | null> | null;
            readonly editionSets: ReadonlyArray<{
              readonly dimensions: {
                readonly cm: string | null;
                readonly in: string | null;
              } | null;
              readonly id: string;
              readonly internalID: string;
            } | null> | null;
            readonly id: string;
            readonly internalID: string;
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
            readonly attributionClass: {
              readonly id: string;
              readonly shortDescription: string | null;
            } | null;
            readonly date: string | null;
            readonly dimensions: {
              readonly cm: string | null;
              readonly in: string | null;
            } | null;
            readonly id: string;
            readonly image: {
              readonly resized: {
                readonly url: string;
              } | null;
              readonly resized_ArtworkSummaryItem: {
                readonly url: string;
              } | null;
            } | null;
            readonly medium: string | null;
            readonly title: string | null;
          } | null;
          readonly editionSetId: string | null;
          readonly id: string;
          readonly selectedShippingQuote: {
            readonly id: string;
            readonly price: string | null;
            readonly typeName: string;
          } | null;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly id: string;
                readonly isSelected: boolean;
              } | null;
            } | null> | null;
          } | null;
        } | null;
      } | null> | null;
    } | null;
    readonly mode: CommerceOrderModeEnum | null;
    readonly paymentMethod: CommercePaymentMethodEnum | null;
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
    } | null;
    readonly requestedFulfillment: {
      readonly __typename: "CommerceShip";
      readonly __isCommerceRequestedFulfillmentUnion: "CommerceShip";
      readonly addressLine1: string | null;
      readonly addressLine2: string | null;
      readonly city: string | null;
      readonly country: string | null;
      readonly name: string | null;
      readonly phoneNumber: string | null;
      readonly postalCode: string | null;
      readonly region: string | null;
    } | {
      readonly __typename: "CommerceShipArta";
      readonly __isCommerceRequestedFulfillmentUnion: "CommerceShipArta";
      readonly addressLine1: string | null;
      readonly addressLine2: string | null;
      readonly city: string | null;
      readonly country: string | null;
      readonly name: string | null;
      readonly phoneNumber: string | null;
      readonly postalCode: string | null;
      readonly region: string | null;
    } | {
      readonly __typename: string;
      readonly __isCommerceRequestedFulfillmentUnion: string;
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
    readonly stateExpiresAt: string | null;
    readonly taxTotal: string | null;
    readonly taxTotalCents: number | null;
  } | null;
};
export type ReviewTestQuery = {
  rawResponse: ReviewTestQuery$rawResponse;
  response: ReviewTestQuery$data;
  variables: ReviewTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
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
v3 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "in",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cm",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v9 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v10 = {
  "alias": null,
  "args": (v3/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountCents",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": (v3/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": (v3/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": (v3/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerTotalCents",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "note",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v22 = [
  (v21/*: any*/),
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
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v25 = {
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderParticipantEnum"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceShippingQuote"
},
v33 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ReviewTestQuery",
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
            "name": "Review_order"
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
    "name": "ReviewTestQuery",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artworkDetails",
            "storageKey": null
          },
          (v2/*: any*/),
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
            "kind": "ScalarField",
            "name": "mode",
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
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "impulseConversationId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D"
              }
            ],
            "kind": "ScalarField",
            "name": "stateExpiresAt",
            "storageKey": "stateExpiresAt(format:\"MMM D\")"
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EditionSet",
                            "kind": "LinkedField",
                            "name": "editionSets",
                            "plural": true,
                            "selections": [
                              (v2/*: any*/),
                              (v4/*: any*/),
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v6/*: any*/),
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
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
                            "kind": "ScalarField",
                            "name": "medium",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "shortDescription",
                                "storageKey": null
                              },
                              (v5/*: any*/)
                            ],
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
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 185
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": (v7/*: any*/),
                                "storageKey": "resized(width:185)"
                              },
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
                                "selections": (v7/*: any*/),
                                "storageKey": "resized(width:55)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "editionSetId",
                        "storageKey": null
                      },
                      (v5/*: any*/),
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
                              (v8/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/),
                              (v5/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v9/*: any*/)
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
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": (v3/*: any*/),
                            "kind": "ScalarField",
                            "name": "price",
                            "storageKey": "price(precision:2)"
                          }
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
                                  (v5/*: any*/)
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
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasDefiniteTotal",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v5/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v5/*: any*/),
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "awaitingResponseFrom",
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
            "name": "sellerDetails",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v21/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
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
                "selections": (v22/*: any*/),
                "type": "CommerceShip",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v22/*: any*/),
                "type": "CommerceShipArta",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
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
                  (v5/*: any*/)
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
                  (v5/*: any*/)
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
            "name": "lastTransactionFailed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ]
  },
  "params": {
    "cacheID": "97fa20011cfb87254ab5b645fd8fc71f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v23/*: any*/),
        "order.__typename": (v23/*: any*/),
        "order.artworkDetails": (v24/*: any*/),
        "order.awaitingResponseFrom": (v25/*: any*/),
        "order.bankAccountId": (v24/*: any*/),
        "order.buyerTotal": (v24/*: any*/),
        "order.code": (v23/*: any*/),
        "order.conditionsOfSale": (v24/*: any*/),
        "order.creditCard": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCard"
        },
        "order.creditCard.id": (v26/*: any*/),
        "order.creditCard.internalID": (v26/*: any*/),
        "order.currencyCode": (v23/*: any*/),
        "order.id": (v26/*: any*/),
        "order.impulseConversationId": (v24/*: any*/),
        "order.internalID": (v26/*: any*/),
        "order.itemsTotal": (v24/*: any*/),
        "order.lastOffer": (v27/*: any*/),
        "order.lastOffer.amount": (v24/*: any*/),
        "order.lastOffer.amountCents": (v28/*: any*/),
        "order.lastOffer.buyerTotal": (v24/*: any*/),
        "order.lastOffer.buyerTotalCents": (v29/*: any*/),
        "order.lastOffer.createdAt": (v23/*: any*/),
        "order.lastOffer.fromParticipant": (v25/*: any*/),
        "order.lastOffer.id": (v26/*: any*/),
        "order.lastOffer.internalID": (v26/*: any*/),
        "order.lastOffer.note": (v24/*: any*/),
        "order.lastOffer.shippingTotal": (v24/*: any*/),
        "order.lastOffer.shippingTotalCents": (v29/*: any*/),
        "order.lastOffer.taxTotal": (v24/*: any*/),
        "order.lastOffer.taxTotalCents": (v29/*: any*/),
        "order.lastTransactionFailed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
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
        "order.lineItems.edges.node.artwork.artists.id": (v26/*: any*/),
        "order.lineItems.edges.node.artwork.artists.slug": (v26/*: any*/),
        "order.lineItems.edges.node.artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "order.lineItems.edges.node.artwork.editionSets.dimensions": (v30/*: any*/),
        "order.lineItems.edges.node.artwork.editionSets.dimensions.cm": (v24/*: any*/),
        "order.lineItems.edges.node.artwork.editionSets.dimensions.in": (v24/*: any*/),
        "order.lineItems.edges.node.artwork.editionSets.id": (v26/*: any*/),
        "order.lineItems.edges.node.artwork.editionSets.internalID": (v26/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v26/*: any*/),
        "order.lineItems.edges.node.artwork.internalID": (v26/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v24/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v26/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__isNode": (v23/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v23/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v26/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v24/*: any*/),
        "order.lineItems.edges.node.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "order.lineItems.edges.node.artworkVersion.artistNames": (v24/*: any*/),
        "order.lineItems.edges.node.artworkVersion.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "order.lineItems.edges.node.artworkVersion.attributionClass.id": (v26/*: any*/),
        "order.lineItems.edges.node.artworkVersion.attributionClass.shortDescription": (v24/*: any*/),
        "order.lineItems.edges.node.artworkVersion.date": (v24/*: any*/),
        "order.lineItems.edges.node.artworkVersion.dimensions": (v30/*: any*/),
        "order.lineItems.edges.node.artworkVersion.dimensions.cm": (v24/*: any*/),
        "order.lineItems.edges.node.artworkVersion.dimensions.in": (v24/*: any*/),
        "order.lineItems.edges.node.artworkVersion.id": (v26/*: any*/),
        "order.lineItems.edges.node.artworkVersion.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "order.lineItems.edges.node.artworkVersion.image.resized": (v31/*: any*/),
        "order.lineItems.edges.node.artworkVersion.image.resized.url": (v23/*: any*/),
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem": (v31/*: any*/),
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem.url": (v23/*: any*/),
        "order.lineItems.edges.node.artworkVersion.medium": (v24/*: any*/),
        "order.lineItems.edges.node.artworkVersion.title": (v24/*: any*/),
        "order.lineItems.edges.node.editionSetId": (v24/*: any*/),
        "order.lineItems.edges.node.id": (v26/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote": (v32/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.id": (v26/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.price": (v24/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.typeName": (v23/*: any*/),
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
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node": (v32/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node.id": (v26/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node.isSelected": (v33/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "order.myLastOffer": (v27/*: any*/),
        "order.myLastOffer.amount": (v24/*: any*/),
        "order.myLastOffer.amountCents": (v28/*: any*/),
        "order.myLastOffer.buyerTotal": (v24/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v29/*: any*/),
        "order.myLastOffer.createdAt": (v23/*: any*/),
        "order.myLastOffer.fromParticipant": (v25/*: any*/),
        "order.myLastOffer.hasDefiniteTotal": (v33/*: any*/),
        "order.myLastOffer.id": (v26/*: any*/),
        "order.myLastOffer.internalID": (v26/*: any*/),
        "order.myLastOffer.note": (v24/*: any*/),
        "order.myLastOffer.shippingTotal": (v24/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v29/*: any*/),
        "order.myLastOffer.taxTotal": (v24/*: any*/),
        "order.myLastOffer.taxTotalCents": (v29/*: any*/),
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
        "order.paymentMethodDetails.__typename": (v23/*: any*/),
        "order.paymentMethodDetails.brand": (v23/*: any*/),
        "order.paymentMethodDetails.expirationMonth": (v28/*: any*/),
        "order.paymentMethodDetails.expirationYear": (v28/*: any*/),
        "order.paymentMethodDetails.id": (v26/*: any*/),
        "order.paymentMethodDetails.isManualPayment": (v33/*: any*/),
        "order.paymentMethodDetails.last4": (v23/*: any*/),
        "order.paymentMethodDetails.lastDigits": (v23/*: any*/),
        "order.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "order.requestedFulfillment.__isCommerceRequestedFulfillmentUnion": (v23/*: any*/),
        "order.requestedFulfillment.__typename": (v23/*: any*/),
        "order.requestedFulfillment.addressLine1": (v24/*: any*/),
        "order.requestedFulfillment.addressLine2": (v24/*: any*/),
        "order.requestedFulfillment.city": (v24/*: any*/),
        "order.requestedFulfillment.country": (v24/*: any*/),
        "order.requestedFulfillment.name": (v24/*: any*/),
        "order.requestedFulfillment.phoneNumber": (v24/*: any*/),
        "order.requestedFulfillment.postalCode": (v24/*: any*/),
        "order.requestedFulfillment.region": (v24/*: any*/),
        "order.sellerDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderParty"
        },
        "order.sellerDetails.__isNode": (v23/*: any*/),
        "order.sellerDetails.__typename": (v23/*: any*/),
        "order.sellerDetails.id": (v26/*: any*/),
        "order.sellerDetails.name": (v24/*: any*/),
        "order.shippingTotal": (v24/*: any*/),
        "order.shippingTotalCents": (v29/*: any*/),
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
        "order.stateExpiresAt": (v24/*: any*/),
        "order.taxTotal": (v24/*: any*/),
        "order.taxTotalCents": (v29/*: any*/)
      }
    },
    "name": "ReviewTestQuery",
    "operationKind": "query",
    "text": "query ReviewTestQuery {\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...Review_order\n    id\n  }\n}\n\nfragment AdditionalArtworkDetails_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  artworkDetails\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  currencyCode\n  mode\n  source\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        artwork {\n          shippingOrigin\n          id\n        }\n        artworkVersion {\n          date\n          artistNames\n          title\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ItemReview_lineItem on CommerceLineItem {\n  artwork {\n    editionSets {\n      internalID\n      dimensions {\n        in\n        cm\n      }\n      id\n    }\n    id\n  }\n  artworkVersion {\n    date\n    artistNames\n    title\n    medium\n    attributionClass {\n      shortDescription\n      id\n    }\n    image {\n      resized(width: 185) {\n        url\n      }\n    }\n    dimensions {\n      in\n      cm\n    }\n    id\n  }\n  editionSetId\n}\n\nfragment OfferSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  currencyCode\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    myLastOffer {\n      amount(precision: 2)\n      note\n      id\n    }\n  }\n}\n\nfragment OrderStepper_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  bankAccountId\n  internalID\n  mode\n  state\n  source\n  lastTransactionFailed\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      id\n    }\n    ... on BankAccount {\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  ... on CommerceOfferOrder {\n    myLastOffer {\n      internalID\n      createdAt\n      id\n    }\n    lastOffer {\n      internalID\n      createdAt\n      id\n    }\n    awaitingResponseFrom\n  }\n  requestedFulfillment {\n    __typename\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        shippingQuoteOptions {\n          edges {\n            node {\n              isSelected\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n  creditCard {\n    internalID\n    id\n  }\n}\n\nfragment PaymentMethodSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  source\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      brand\n      lastDigits\n      expirationYear\n      expirationMonth\n      id\n    }\n    ... on BankAccount {\n      last4\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment Review_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  artworkDetails\n  internalID\n  paymentMethod\n  mode\n  code\n  source\n  conditionsOfSale\n  itemsTotal(precision: 2)\n  impulseConversationId\n  stateExpiresAt(format: \"MMM D\")\n  lineItems {\n    edges {\n      node {\n        ...ItemReview_lineItem\n        artwork {\n          slug\n          internalID\n          artists {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    myLastOffer {\n      hasDefiniteTotal\n      internalID\n      id\n    }\n  }\n  ...ArtworkSummaryItem_order\n  ...AdditionalArtworkDetails_order\n  ...TransactionDetailsSummaryItem_order\n  ...ShippingSummaryItem_order\n  ...PaymentMethodSummaryItem_order\n  ...ShippingArtaSummaryItem_order\n  ...OfferSummaryItem_order\n  ...OrderStepper_order\n}\n\nfragment ShippingAddress_ship on CommerceRequestedFulfillmentUnion {\n  __isCommerceRequestedFulfillmentUnion: __typename\n  ... on CommerceShip {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n  ... on CommerceShipArta {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n}\n\nfragment ShippingArtaSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  requestedFulfillment {\n    __typename\n  }\n  lineItems {\n    edges {\n      node {\n        selectedShippingQuote {\n          typeName\n          price(precision: 2)\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ShippingSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  state\n  paymentMethod\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          typeName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b9f08ca664558f6f1f39d24fc6c41cef";

export default node;
