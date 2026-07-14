/**
 * @generated SignedSource<<010e190e0e1cd27a57b4dcf122329600>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type createBuyerOfferInput = {
  amountMinor: any;
  clientMutationId?: string | null | undefined;
  note?: string | null | undefined;
  orderID: string;
  respondsToID?: string | null | undefined;
};
export type useOrder2CreateCounterOfferMutation$variables = {
  input: createBuyerOfferInput;
};
export type useOrder2CreateCounterOfferMutation$data = {
  readonly createBuyerOffer: {
    readonly offerOrError: {
      readonly __typename: "OfferMutationSuccess";
      readonly mutationError?: {
        readonly code: string;
        readonly message: string;
      };
      readonly offer?: {
        readonly internalID: string;
        readonly order: {
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"Order2RespondContext_order" | "Order2RespondForm_order" | "Order2RespondSummary_order">;
        } | null | undefined;
      };
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2CreateCounterOfferMutation = {
  response: useOrder2CreateCounterOfferMutation$data;
  variables: useOrder2CreateCounterOfferMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "OfferExchangeError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
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
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OfferMutationError",
  "abstractKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencySymbol",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = [
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/)
],
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "pricingBreakdownLines",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v9/*: any*/),
      "type": "ShippingLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v9/*: any*/),
      "type": "TaxLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v6/*: any*/),
        (v8/*: any*/)
      ],
      "type": "SubtotalLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v6/*: any*/),
        (v7/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "amount",
          "plural": false,
          "selections": (v10/*: any*/),
          "storageKey": null
        }
      ],
      "type": "TotalLine",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v14 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 200
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
    "storageKey": "resized(height:200)"
  }
],
v15 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useOrder2CreateCounterOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "createBuyerOfferPayload",
        "kind": "LinkedField",
        "name": "createBuyerOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "offerOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "offer",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Order",
                        "kind": "LinkedField",
                        "name": "order",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "Order2RespondSummary_order"
                          },
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "Order2RespondForm_order"
                          },
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "Order2RespondContext_order"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OfferMutationSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useOrder2CreateCounterOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "createBuyerOfferPayload",
        "kind": "LinkedField",
        "name": "createBuyerOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "offerOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "offer",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Order",
                        "kind": "LinkedField",
                        "name": "order",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
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
                            "name": "mode",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "buyerState",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "buyerStateExpiresAt",
                            "storageKey": null
                          },
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Offer",
                            "kind": "LinkedField",
                            "name": "pendingOffer",
                            "plural": false,
                            "selections": [
                              (v11/*: any*/),
                              (v4/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "amount",
                                "plural": false,
                                "selections": [
                                  (v12/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Offer",
                            "kind": "LinkedField",
                            "name": "lastSubmittedOffer",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "amount",
                                "plural": false,
                                "selections": [
                                  (v12/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "currencyCode",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "buyerTotal",
                                "plural": false,
                                "selections": (v10/*: any*/),
                                "storageKey": null
                              },
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "LineItem",
                            "kind": "LinkedField",
                            "name": "lineItems",
                            "plural": true,
                            "selections": [
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
                                    "kind": "ScalarField",
                                    "name": "date",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": (v14/*: any*/),
                                    "storageKey": null
                                  },
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
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
                                    "kind": "ScalarField",
                                    "name": "price",
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
                                      (v4/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "dimensions",
                                    "kind": "LinkedField",
                                    "name": "dimensions",
                                    "plural": false,
                                    "selections": (v15/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "dimensions",
                                    "kind": "LinkedField",
                                    "name": "framedDimensions",
                                    "plural": false,
                                    "selections": (v15/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "includeAll",
                                        "value": false
                                      }
                                    ],
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "images",
                                    "plural": true,
                                    "selections": (v14/*: any*/),
                                    "storageKey": "images(includeAll:false)"
                                  },
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "slug",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OfferMutationSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9f2f0024e86278353725f42981f9b8e9",
    "id": null,
    "metadata": {},
    "name": "useOrder2CreateCounterOfferMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2CreateCounterOfferMutation(\n  $input: createBuyerOfferInput!\n) {\n  createBuyerOffer(input: $input) {\n    offerOrError {\n      __typename\n      ... on OfferMutationSuccess {\n        __typename\n        offer {\n          internalID\n          order {\n            id\n            ...Order2RespondSummary_order\n            ...Order2RespondForm_order\n            ...Order2RespondContext_order\n          }\n          id\n        }\n      }\n      ... on OfferMutationError {\n        mutationError {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment Order2OrderSummary_order on Order {\n  ...Order2PricingBreakdown_order\n}\n\nfragment Order2PricingBreakdown_order on Order {\n  source\n  mode\n  buyerState\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2RespondContext_order on Order {\n  source\n  mode\n  lastSubmittedOffer {\n    createdAt\n    id\n  }\n  pendingOffer {\n    createdAt\n    id\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2RespondForm_order on Order {\n  internalID\n  lastSubmittedOffer {\n    internalID\n    amount {\n      major\n      currencyCode\n    }\n    buyerTotal {\n      display\n    }\n    id\n  }\n  pendingOffer {\n    amount {\n      major\n    }\n    id\n  }\n  ...Order2RespondOfferDetails_order\n}\n\nfragment Order2RespondOfferDetails_order on Order {\n  ...Order2PricingBreakdown_order\n}\n\nfragment Order2RespondSummary_order on Order {\n  ...Order2OrderSummary_order\n  internalID\n  lastSubmittedOffer {\n    internalID\n    id\n  }\n  pendingOffer {\n    internalID\n    id\n  }\n  lineItems {\n    artworkVersion {\n      artistNames\n      title\n      date\n      image {\n        resized(height: 200) {\n          url\n        }\n      }\n      id\n    }\n    artwork {\n      internalID\n      price\n      attributionClass {\n        shortDescription\n        id\n      }\n      dimensions {\n        in\n        cm\n      }\n      framedDimensions {\n        in\n        cm\n      }\n      images(includeAll: false) {\n        resized(height: 200) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6c78fa2f8bc99a20f8ae86cfe98014b5";

export default node;
