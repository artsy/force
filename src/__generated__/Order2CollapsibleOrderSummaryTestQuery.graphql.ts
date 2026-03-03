/**
 * @generated SignedSource<<0b9981f144410dd149d4ef8f600ddd0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2CollapsibleOrderSummaryTestQuery$variables = Record<PropertyKey, never>;
export type Order2CollapsibleOrderSummaryTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2CollapsibleOrderSummary_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2CollapsibleOrderSummaryTestQuery = {
  response: Order2CollapsibleOrderSummaryTestQuery$data;
  variables: Order2CollapsibleOrderSummaryTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
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
  "name": "displayName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v4 = {
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
v5 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "pricingBreakdownLines",
  "plural": true,
  "selections": [
    (v1/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v5/*: any*/),
      "type": "ShippingLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*: any*/),
      "type": "TaxLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/),
        (v4/*: any*/)
      ],
      "type": "SubtotalLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "amount",
          "plural": false,
          "selections": (v6/*: any*/),
          "storageKey": null
        }
      ],
      "type": "TotalLine",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v10 = {
  "alias": "resizedSquare",
  "args": [
    {
      "kind": "Literal",
      "name": "height",
      "value": 200
    },
    {
      "kind": "Literal",
      "name": "version",
      "value": [
        "square"
      ]
    }
  ],
  "concreteType": "ResizedImageUrl",
  "kind": "LinkedField",
  "name": "resized",
  "plural": false,
  "selections": [
    (v9/*: any*/)
  ],
  "storageKey": "resized(height:200,version:[\"square\"])"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "PricingBreakdownLineUnion"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2CollapsibleOrderSummaryTestQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2CollapsibleOrderSummary_order"
              }
            ],
            "storageKey": "order(id:\"123\")"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Order2CollapsibleOrderSummaryTestQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
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
                "name": "buyerStateExpiresAt",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "pendingOffer",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/)
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
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "itemsTotal",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "shippingTotal",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "taxTotal",
                "plural": false,
                "selections": (v6/*: any*/),
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
                        "name": "title",
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
                        "name": "date",
                        "storageKey": null
                      },
                      {
                        "alias": "thumbnail",
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
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
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "figures",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v10/*: any*/)
                            ],
                            "type": "Image",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/)
                            ],
                            "type": "Video",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": "figures(includeAll:false)"
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": "order(id:\"123\")"
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "97686e643b61591f08b5d855d157c6cc",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v11/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.buyerStateExpiresAt": (v12/*: any*/),
        "me.order.buyerTotal": (v13/*: any*/),
        "me.order.buyerTotal.display": (v12/*: any*/),
        "me.order.id": (v11/*: any*/),
        "me.order.itemsTotal": (v13/*: any*/),
        "me.order.itemsTotal.display": (v12/*: any*/),
        "me.order.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "me.order.lineItems.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.order.lineItems.artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "me.order.lineItems.artwork.figures.__typename": (v14/*: any*/),
        "me.order.lineItems.artwork.figures.id": (v11/*: any*/),
        "me.order.lineItems.artwork.figures.resizedSquare": (v15/*: any*/),
        "me.order.lineItems.artwork.figures.resizedSquare.url": (v14/*: any*/),
        "me.order.lineItems.artwork.id": (v11/*: any*/),
        "me.order.lineItems.artwork.internalID": (v11/*: any*/),
        "me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "me.order.lineItems.artworkVersion.artistNames": (v12/*: any*/),
        "me.order.lineItems.artworkVersion.date": (v12/*: any*/),
        "me.order.lineItems.artworkVersion.id": (v11/*: any*/),
        "me.order.lineItems.artworkVersion.thumbnail": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.order.lineItems.artworkVersion.thumbnail.resizedSquare": (v15/*: any*/),
        "me.order.lineItems.artworkVersion.thumbnail.resizedSquare.url": (v14/*: any*/),
        "me.order.lineItems.artworkVersion.thumbnail.url": (v12/*: any*/),
        "me.order.lineItems.artworkVersion.title": (v12/*: any*/),
        "me.order.lineItems.id": (v11/*: any*/),
        "me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "me.order.pendingOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Offer"
        },
        "me.order.pendingOffer.id": (v11/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines": (v16/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.__typename": (v14/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount": (v13/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.amount": (v12/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.currencySymbol": (v12/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.display": (v12/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amountFallbackText": (v12/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.displayName": (v14/*: any*/),
        "me.order.pricingBreakdownLines": (v16/*: any*/),
        "me.order.pricingBreakdownLines.__typename": (v14/*: any*/),
        "me.order.pricingBreakdownLines.amount": (v13/*: any*/),
        "me.order.pricingBreakdownLines.amount.amount": (v12/*: any*/),
        "me.order.pricingBreakdownLines.amount.currencySymbol": (v12/*: any*/),
        "me.order.pricingBreakdownLines.amount.display": (v12/*: any*/),
        "me.order.pricingBreakdownLines.amountFallbackText": (v12/*: any*/),
        "me.order.pricingBreakdownLines.displayName": (v14/*: any*/),
        "me.order.shippingTotal": (v13/*: any*/),
        "me.order.shippingTotal.display": (v12/*: any*/),
        "me.order.source": {
          "enumValues": [
            "ARTWORK_PAGE",
            "INQUIRY",
            "PARTNER_OFFER",
            "PRIVATE_SALE"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderSourceEnum"
        },
        "me.order.taxTotal": (v13/*: any*/),
        "me.order.taxTotal.display": (v12/*: any*/)
      }
    },
    "name": "Order2CollapsibleOrderSummaryTestQuery",
    "operationKind": "query",
    "text": "query Order2CollapsibleOrderSummaryTestQuery {\n  me {\n    order(id: \"123\") {\n      ...Order2CollapsibleOrderSummary_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  mode\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2CollapsibleOrderSummary_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  source\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artworkVersion {\n      title\n      artistNames\n      date\n      thumbnail: image {\n        url\n        resizedSquare: resized(height: 200, version: [\"square\"]) {\n          url\n        }\n      }\n      id\n    }\n    artwork {\n      internalID\n      figures(includeAll: false) {\n        __typename\n        ... on Image {\n          resizedSquare: resized(height: 200, version: [\"square\"]) {\n            url\n          }\n        }\n        ... on Video {\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "67c8f529fb3165b2010c10a2e51611ff";

export default node;
