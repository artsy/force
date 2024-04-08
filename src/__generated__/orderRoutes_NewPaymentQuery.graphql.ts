/**
 * @generated SignedSource<<aefce0d6bf43971184e6a2fc91b50013>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type orderRoutes_NewPaymentQuery$variables = {
  orderID: string;
};
export type orderRoutes_NewPaymentQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"NewPayment_me">;
  } | null | undefined;
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"NewPayment_order">;
  } | null | undefined;
};
export type orderRoutes_NewPaymentQuery = {
  response: orderRoutes_NewPaymentQuery$data;
  variables: orderRoutes_NewPaymentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID"
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
  "name": "brand",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastDigits",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationMonth",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationYear",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v11 = [
  (v7/*: any*/)
],
v12 = {
  "kind": "InlineFragment",
  "selections": (v11/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "note",
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v15 = {
  "alias": null,
  "args": (v14/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountCents",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": (v14/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": (v14/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": (v14/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerTotalCents",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v29 = [
  (v25/*: any*/),
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
  (v26/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  (v27/*: any*/),
  (v28/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "orderRoutes_NewPaymentQuery",
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
        "args": (v1/*: any*/),
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
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "orderRoutes_NewPaymentQuery",
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "creditCards(first:100)"
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
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
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v9/*: any*/),
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v7/*: any*/),
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
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v10/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v10/*: any*/),
                              (v7/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v12/*: any*/)
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
                          (v7/*: any*/)
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
                          (v7/*: any*/)
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
                                  (v7/*: any*/)
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
                  (v2/*: any*/),
                  (v13/*: any*/),
                  (v7/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/)
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
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/),
                  (v13/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          (v24/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v25/*: any*/),
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
              (v26/*: any*/),
              (v24/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v4/*: any*/),
              (v3/*: any*/),
              (v7/*: any*/)
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
              (v8/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v29/*: any*/),
                "type": "CommerceShip",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v29/*: any*/),
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
              (v8/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v25/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              (v12/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayState",
            "storageKey": null
          },
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          {
            "alias": null,
            "args": (v14/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          (v21/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "paymentMethodDetails",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v11/*: any*/),
                "type": "CreditCard",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v11/*: any*/),
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
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d6f5bb3da6f0be2c7d8fa57db87d77b3",
    "id": null,
    "metadata": {},
    "name": "orderRoutes_NewPaymentQuery",
    "operationKind": "query",
    "text": "query orderRoutes_NewPaymentQuery(\n  $orderID: ID!\n) {\n  me {\n    ...NewPayment_me\n    id\n  }\n  order: commerceOrder(id: $orderID) {\n    __typename\n    ...NewPayment_order\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  currencyCode\n  mode\n  source\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        artwork {\n          slug\n          shippingOrigin\n          isUnlisted\n          id\n        }\n        artworkVersion {\n          date\n          artistNames\n          title\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardPicker_me on Me {\n  creditCards(first: 100) {\n    edges {\n      node {\n        internalID\n        brand\n        lastDigits\n        expirationMonth\n        expirationYear\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardPicker_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  state\n  creditCard {\n    internalID\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postalCode\n    expirationMonth\n    expirationYear\n    lastDigits\n    brand\n    id\n  }\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommerceShipArta {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommercePickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment NewPayment_me on Me {\n  ...CreditCardPicker_me\n}\n\nfragment NewPayment_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  stateExpiresAt\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          artists {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    lastOffer {\n      createdAt\n      internalID\n      note\n      id\n    }\n  }\n  ...CreditCardPicker_order\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  ...OrderStepper_order\n}\n\nfragment OrderStepper_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  mode\n  requestedFulfillment {\n    __typename\n  }\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      id\n    }\n    ... on BankAccount {\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        shippingQuoteOptions {\n          edges {\n            node {\n              isSelected\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          typeName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  source\n  displayState\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2eadba26d02af195242eb30fb1b719d8";

export default node;
