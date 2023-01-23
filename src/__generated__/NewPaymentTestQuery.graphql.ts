/**
 * @generated SignedSource<<16c3a25a4f82ee93879eec71489670fa>>
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
export type NewPaymentTestQuery$variables = {};
export type NewPaymentTestQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NewPayment_me">;
  } | null;
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"NewPayment_order">;
  } | null;
};
export type NewPaymentTestQuery$rawResponse = {
  readonly me: {
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
    readonly buyerTotal: string | null;
    readonly code: string;
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
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly artists: ReadonlyArray<{
              readonly id: string;
              readonly slug: string;
            } | null> | null;
            readonly date: string | null;
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
    readonly stateExpiresAt: string | null;
    readonly taxTotal: string | null;
    readonly taxTotalCents: number | null;
  } | {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly buyerTotal: string | null;
    readonly code: string;
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
            readonly artists: ReadonlyArray<{
              readonly id: string;
              readonly slug: string;
            } | null> | null;
            readonly date: string | null;
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
    readonly stateExpiresAt: string | null;
    readonly taxTotal: string | null;
    readonly taxTotalCents: number | null;
  } | null;
};
export type NewPaymentTestQuery = {
  rawResponse: NewPaymentTestQuery$rawResponse;
  response: NewPaymentTestQuery$data;
  variables: NewPaymentTestQuery$variables;
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
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "brand",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastDigits",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationMonth",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationYear",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "note",
  "storageKey": null
},
v12 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v13 = {
  "alias": null,
  "args": (v12/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountCents",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": (v12/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": (v12/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": (v12/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerTotalCents",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v27 = [
  (v23/*: any*/),
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
  (v24/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  (v25/*: any*/),
  (v26/*: any*/)
],
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CreditCard"
},
v29 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v31 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
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
    "name": "NewPaymentTestQuery",
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
            "name": "NewPayment_me"
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
            "name": "NewPayment_order"
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
    "name": "NewPaymentTestQuery",
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 100
              }
            ],
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
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "creditCards(first:100)"
          },
          (v6/*: any*/)
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
          (v7/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          (v1/*: any*/),
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
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v8/*: any*/),
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/),
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
                            "name": "shippingOrigin",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v9/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v9/*: any*/),
                              (v6/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v10/*: any*/)
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
                          (v6/*: any*/)
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
                "name": "lastOffer",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v11/*: any*/),
                  (v6/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/)
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
                  (v1/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v11/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          (v22/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v23/*: any*/),
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
              (v24/*: any*/),
              (v22/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/),
              (v2/*: any*/),
              (v6/*: any*/)
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
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v27/*: any*/),
                "type": "CommerceShip",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v27/*: any*/),
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
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v23/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              (v10/*: any*/)
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
            "kind": "ScalarField",
            "name": "source",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          {
            "alias": null,
            "args": (v12/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          (v19/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ]
  },
  "params": {
    "cacheID": "02a1b43ea13760d355f89f5cdcddf367",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
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
        "me.creditCards.edges.node": (v28/*: any*/),
        "me.creditCards.edges.node.brand": (v29/*: any*/),
        "me.creditCards.edges.node.expirationMonth": (v30/*: any*/),
        "me.creditCards.edges.node.expirationYear": (v30/*: any*/),
        "me.creditCards.edges.node.id": (v31/*: any*/),
        "me.creditCards.edges.node.internalID": (v31/*: any*/),
        "me.creditCards.edges.node.lastDigits": (v29/*: any*/),
        "me.id": (v31/*: any*/),
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v29/*: any*/),
        "order.__typename": (v29/*: any*/),
        "order.buyerTotal": (v32/*: any*/),
        "order.code": (v29/*: any*/),
        "order.creditCard": (v28/*: any*/),
        "order.creditCard.brand": (v29/*: any*/),
        "order.creditCard.city": (v32/*: any*/),
        "order.creditCard.country": (v32/*: any*/),
        "order.creditCard.expirationMonth": (v30/*: any*/),
        "order.creditCard.expirationYear": (v30/*: any*/),
        "order.creditCard.id": (v31/*: any*/),
        "order.creditCard.internalID": (v31/*: any*/),
        "order.creditCard.lastDigits": (v29/*: any*/),
        "order.creditCard.name": (v32/*: any*/),
        "order.creditCard.postalCode": (v32/*: any*/),
        "order.creditCard.state": (v32/*: any*/),
        "order.creditCard.street1": (v32/*: any*/),
        "order.creditCard.street2": (v32/*: any*/),
        "order.currencyCode": (v29/*: any*/),
        "order.id": (v31/*: any*/),
        "order.internalID": (v31/*: any*/),
        "order.itemsTotal": (v32/*: any*/),
        "order.lastOffer": (v33/*: any*/),
        "order.lastOffer.amount": (v32/*: any*/),
        "order.lastOffer.amountCents": (v30/*: any*/),
        "order.lastOffer.buyerTotal": (v32/*: any*/),
        "order.lastOffer.buyerTotalCents": (v34/*: any*/),
        "order.lastOffer.createdAt": (v29/*: any*/),
        "order.lastOffer.fromParticipant": (v35/*: any*/),
        "order.lastOffer.id": (v31/*: any*/),
        "order.lastOffer.internalID": (v31/*: any*/),
        "order.lastOffer.note": (v32/*: any*/),
        "order.lastOffer.shippingTotal": (v32/*: any*/),
        "order.lastOffer.shippingTotalCents": (v34/*: any*/),
        "order.lastOffer.taxTotal": (v32/*: any*/),
        "order.lastOffer.taxTotalCents": (v34/*: any*/),
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
        "order.lineItems.edges.node.artwork.artists.id": (v31/*: any*/),
        "order.lineItems.edges.node.artwork.artists.slug": (v31/*: any*/),
        "order.lineItems.edges.node.artwork.date": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v31/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v31/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__isNode": (v29/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v29/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v31/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v32/*: any*/),
        "order.lineItems.edges.node.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "order.lineItems.edges.node.artworkVersion.artistNames": (v32/*: any*/),
        "order.lineItems.edges.node.artworkVersion.id": (v31/*: any*/),
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
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem.url": (v29/*: any*/),
        "order.lineItems.edges.node.artworkVersion.title": (v32/*: any*/),
        "order.lineItems.edges.node.id": (v31/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceShippingQuote"
        },
        "order.lineItems.edges.node.selectedShippingQuote.id": (v31/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.typeName": (v29/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "order.myLastOffer": (v33/*: any*/),
        "order.myLastOffer.amount": (v32/*: any*/),
        "order.myLastOffer.amountCents": (v30/*: any*/),
        "order.myLastOffer.buyerTotal": (v32/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v34/*: any*/),
        "order.myLastOffer.fromParticipant": (v35/*: any*/),
        "order.myLastOffer.id": (v31/*: any*/),
        "order.myLastOffer.internalID": (v31/*: any*/),
        "order.myLastOffer.note": (v32/*: any*/),
        "order.myLastOffer.shippingTotal": (v32/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v34/*: any*/),
        "order.myLastOffer.taxTotal": (v32/*: any*/),
        "order.myLastOffer.taxTotalCents": (v34/*: any*/),
        "order.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "order.requestedFulfillment.__typename": (v29/*: any*/),
        "order.requestedFulfillment.addressLine1": (v32/*: any*/),
        "order.requestedFulfillment.addressLine2": (v32/*: any*/),
        "order.requestedFulfillment.city": (v32/*: any*/),
        "order.requestedFulfillment.country": (v32/*: any*/),
        "order.requestedFulfillment.fulfillmentType": (v29/*: any*/),
        "order.requestedFulfillment.name": (v32/*: any*/),
        "order.requestedFulfillment.postalCode": (v32/*: any*/),
        "order.requestedFulfillment.region": (v32/*: any*/),
        "order.sellerDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderParty"
        },
        "order.sellerDetails.__isNode": (v29/*: any*/),
        "order.sellerDetails.__typename": (v29/*: any*/),
        "order.sellerDetails.id": (v31/*: any*/),
        "order.sellerDetails.name": (v32/*: any*/),
        "order.shippingTotal": (v32/*: any*/),
        "order.shippingTotalCents": (v34/*: any*/),
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
        "order.stateExpiresAt": (v32/*: any*/),
        "order.taxTotal": (v32/*: any*/),
        "order.taxTotalCents": (v34/*: any*/)
      }
    },
    "name": "NewPaymentTestQuery",
    "operationKind": "query",
    "text": "query NewPaymentTestQuery {\n  me {\n    ...NewPayment_me\n    id\n  }\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...NewPayment_order\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  currencyCode\n  mode\n  source\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        artwork {\n          date\n          shippingOrigin\n          id\n        }\n        artworkVersion {\n          artistNames\n          title\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardPicker_me on Me {\n  creditCards(first: 100) {\n    edges {\n      node {\n        internalID\n        brand\n        lastDigits\n        expirationMonth\n        expirationYear\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardPicker_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  state\n  creditCard {\n    internalID\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postalCode\n    expirationMonth\n    expirationYear\n    lastDigits\n    brand\n    id\n  }\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommerceShipArta {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommercePickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment NewPayment_me on Me {\n  ...CreditCardPicker_me\n}\n\nfragment NewPayment_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  stateExpiresAt\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          artists {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    lastOffer {\n      createdAt\n      internalID\n      note\n      id\n    }\n  }\n  ...CreditCardPicker_order\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          typeName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0cc56b005b9a11c716fae9645d398251";

export default node;
