/**
 * @generated SignedSource<<f273b81c09b4c367a9139f366eeac18d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondSummaryTestQuery$variables = Record<PropertyKey, never>;
export type Order2RespondSummaryTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2RespondContext_order" | "Order2RespondForm_order" | "Order2RespondSummary_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2RespondSummaryTestQuery = {
  response: Order2RespondSummaryTestQuery$data;
  variables: Order2RespondSummaryTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "order-id"
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
  "name": "id",
  "storageKey": null
},
v3 = [
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
v4 = [
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
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v9 = {
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
v10 = [
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "pricingBreakdownLines",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v10/*: any*/),
      "type": "ShippingLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v10/*: any*/),
      "type": "TaxLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v7/*: any*/),
        (v9/*: any*/)
      ],
      "type": "SubtotalLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v7/*: any*/),
        (v8/*: any*/),
        (v6/*: any*/)
      ],
      "type": "TotalLine",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Offer"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v19 = {
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
    "name": "Order2RespondSummaryTestQuery",
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
                "name": "Order2RespondContext_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2RespondForm_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2RespondSummary_order"
              }
            ],
            "storageKey": "order(id:\"order-id\")"
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
    "name": "Order2RespondSummaryTestQuery",
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
              (v1/*: any*/),
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
                "concreteType": "LineItem",
                "kind": "LinkedField",
                "name": "lineItems",
                "plural": true,
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
                      (v2/*: any*/),
                      (v1/*: any*/),
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
                          (v2/*: any*/)
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
                        "selections": (v3/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "dimensions",
                        "kind": "LinkedField",
                        "name": "framedDimensions",
                        "plural": false,
                        "selections": (v3/*: any*/),
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
                        "selections": (v4/*: any*/),
                        "storageKey": "images(includeAll:false)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
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
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "lastSubmittedOffer",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "buyerTotal",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5ddfc4ec9aeebb15b067b1144bce903d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v12/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.buyerStateExpiresAt": (v13/*: any*/),
        "me.order.id": (v12/*: any*/),
        "me.order.internalID": (v12/*: any*/),
        "me.order.lastSubmittedOffer": (v14/*: any*/),
        "me.order.lastSubmittedOffer.amount": (v15/*: any*/),
        "me.order.lastSubmittedOffer.amount.display": (v13/*: any*/),
        "me.order.lastSubmittedOffer.buyerTotal": (v15/*: any*/),
        "me.order.lastSubmittedOffer.buyerTotal.display": (v13/*: any*/),
        "me.order.lastSubmittedOffer.createdAt": (v13/*: any*/),
        "me.order.lastSubmittedOffer.id": (v12/*: any*/),
        "me.order.lastSubmittedOffer.internalID": (v12/*: any*/),
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
        "me.order.lineItems.artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.order.lineItems.artwork.attributionClass.id": (v12/*: any*/),
        "me.order.lineItems.artwork.attributionClass.shortDescription": (v13/*: any*/),
        "me.order.lineItems.artwork.dimensions": (v16/*: any*/),
        "me.order.lineItems.artwork.dimensions.cm": (v13/*: any*/),
        "me.order.lineItems.artwork.dimensions.in": (v13/*: any*/),
        "me.order.lineItems.artwork.framedDimensions": (v16/*: any*/),
        "me.order.lineItems.artwork.framedDimensions.cm": (v13/*: any*/),
        "me.order.lineItems.artwork.framedDimensions.in": (v13/*: any*/),
        "me.order.lineItems.artwork.id": (v12/*: any*/),
        "me.order.lineItems.artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "me.order.lineItems.artwork.images.resized": (v17/*: any*/),
        "me.order.lineItems.artwork.images.resized.url": (v18/*: any*/),
        "me.order.lineItems.artwork.internalID": (v12/*: any*/),
        "me.order.lineItems.artwork.price": (v13/*: any*/),
        "me.order.lineItems.artwork.slug": (v12/*: any*/),
        "me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "me.order.lineItems.artworkVersion.artistNames": (v13/*: any*/),
        "me.order.lineItems.artworkVersion.date": (v13/*: any*/),
        "me.order.lineItems.artworkVersion.id": (v12/*: any*/),
        "me.order.lineItems.artworkVersion.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.order.lineItems.artworkVersion.image.resized": (v17/*: any*/),
        "me.order.lineItems.artworkVersion.image.resized.url": (v18/*: any*/),
        "me.order.lineItems.artworkVersion.title": (v13/*: any*/),
        "me.order.lineItems.id": (v12/*: any*/),
        "me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "me.order.pendingOffer": (v14/*: any*/),
        "me.order.pendingOffer.id": (v12/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines": (v19/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.__typename": (v18/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount": (v15/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.amount": (v13/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.currencySymbol": (v13/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.display": (v13/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amountFallbackText": (v13/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.displayName": (v18/*: any*/),
        "me.order.pricingBreakdownLines": (v19/*: any*/),
        "me.order.pricingBreakdownLines.__typename": (v18/*: any*/),
        "me.order.pricingBreakdownLines.amount": (v15/*: any*/),
        "me.order.pricingBreakdownLines.amount.amount": (v13/*: any*/),
        "me.order.pricingBreakdownLines.amount.currencySymbol": (v13/*: any*/),
        "me.order.pricingBreakdownLines.amount.display": (v13/*: any*/),
        "me.order.pricingBreakdownLines.amountFallbackText": (v13/*: any*/),
        "me.order.pricingBreakdownLines.displayName": (v18/*: any*/),
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
        }
      }
    },
    "name": "Order2RespondSummaryTestQuery",
    "operationKind": "query",
    "text": "query Order2RespondSummaryTestQuery {\n  me {\n    order(id: \"order-id\") {\n      ...Order2RespondContext_order\n      ...Order2RespondForm_order\n      ...Order2RespondSummary_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  mode\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2OrderSummary_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n}\n\nfragment Order2RespondContext_order on Order {\n  internalID\n  source\n  mode\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2RespondForm_order on Order {\n  internalID\n  lastSubmittedOffer {\n    internalID\n    buyerTotal {\n      display\n    }\n    id\n  }\n  ...Order2RespondOfferDetails_order\n}\n\nfragment Order2RespondOfferDetails_order on Order {\n  buyerStateExpiresAt\n  lastSubmittedOffer {\n    createdAt\n    amount {\n      display\n    }\n    id\n  }\n  ...Order2CheckoutPricingBreakdown_order\n}\n\nfragment Order2RespondSummary_order on Order {\n  ...Order2OrderSummary_order\n  lineItems {\n    artworkVersion {\n      artistNames\n      title\n      date\n      image {\n        resized(height: 200) {\n          url\n        }\n      }\n      id\n    }\n    artwork {\n      internalID\n      price\n      attributionClass {\n        shortDescription\n        id\n      }\n      dimensions {\n        in\n        cm\n      }\n      framedDimensions {\n        in\n        cm\n      }\n      images(includeAll: false) {\n        resized(height: 200) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4c38851b904ac59cc6e500024d7168f1";

export default node;
