/**
 * @generated SignedSource<<382fabd8a5237c78cf355e9d3dcd42da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondOfferDetailsTestQuery$variables = Record<PropertyKey, never>;
export type Order2RespondOfferDetailsTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2RespondContext_order" | "Order2RespondOfferDetails_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2RespondOfferDetailsTestQuery = {
  response: Order2RespondOfferDetailsTestQuery$data;
  variables: Order2RespondOfferDetailsTestQuery$variables;
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
  "name": "createdAt",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v5 = {
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
v6 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
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
      "selections": (v6/*: any*/),
      "type": "ShippingLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v6/*: any*/),
      "type": "TaxLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v3/*: any*/),
        (v5/*: any*/)
      ],
      "type": "SubtotalLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "display",
              "storageKey": null
            }
          ],
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Offer"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "PricingBreakdownLineUnion"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2RespondOfferDetailsTestQuery",
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
                "name": "Order2RespondOfferDetails_order"
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
    "name": "Order2RespondOfferDetailsTestQuery",
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
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "lastSubmittedOffer",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "pendingOffer",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v7/*: any*/)
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
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
              (v7/*: any*/),
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
    "cacheID": "6b1ff8e85bd214e331f5842b16f39fde",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v8/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.buyerState": {
          "enumValues": [
            "APPROVED",
            "CANCELED",
            "COMPLETED",
            "COUNTEROFFER_SENT",
            "DECLINED_BY_BUYER",
            "DECLINED_BY_SELLER",
            "INCOMPLETE",
            "OFFER_RECEIVED",
            "PAYMENT_FAILED",
            "PROCESSING_OFFLINE_PAYMENT",
            "PROCESSING_PAYMENT",
            "REFUNDED",
            "SHIPPED",
            "SUBMITTED",
            "UNKNOWN"
          ],
          "nullable": true,
          "plural": false,
          "type": "OrderBuyerStateEnum"
        },
        "me.order.buyerStateExpiresAt": (v9/*: any*/),
        "me.order.id": (v8/*: any*/),
        "me.order.lastSubmittedOffer": (v10/*: any*/),
        "me.order.lastSubmittedOffer.createdAt": (v9/*: any*/),
        "me.order.lastSubmittedOffer.id": (v8/*: any*/),
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
        "me.order.lineItems.artwork.id": (v8/*: any*/),
        "me.order.lineItems.artwork.slug": (v8/*: any*/),
        "me.order.lineItems.id": (v8/*: any*/),
        "me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "me.order.pendingOffer": (v10/*: any*/),
        "me.order.pendingOffer.createdAt": (v9/*: any*/),
        "me.order.pendingOffer.id": (v8/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines": (v11/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.__typename": (v12/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount": (v13/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.amount": (v9/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.currencySymbol": (v9/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.display": (v9/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amountFallbackText": (v9/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.displayName": (v12/*: any*/),
        "me.order.pricingBreakdownLines": (v11/*: any*/),
        "me.order.pricingBreakdownLines.__typename": (v12/*: any*/),
        "me.order.pricingBreakdownLines.amount": (v13/*: any*/),
        "me.order.pricingBreakdownLines.amount.amount": (v9/*: any*/),
        "me.order.pricingBreakdownLines.amount.currencySymbol": (v9/*: any*/),
        "me.order.pricingBreakdownLines.amount.display": (v9/*: any*/),
        "me.order.pricingBreakdownLines.amountFallbackText": (v9/*: any*/),
        "me.order.pricingBreakdownLines.displayName": (v12/*: any*/),
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
    "name": "Order2RespondOfferDetailsTestQuery",
    "operationKind": "query",
    "text": "query Order2RespondOfferDetailsTestQuery {\n  me {\n    order(id: \"order-id\") {\n      ...Order2RespondContext_order\n      ...Order2RespondOfferDetails_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PricingBreakdown_order on Order {\n  source\n  mode\n  buyerState\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2RespondContext_order on Order {\n  source\n  mode\n  lastSubmittedOffer {\n    createdAt\n    id\n  }\n  pendingOffer {\n    createdAt\n    id\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2RespondOfferDetails_order on Order {\n  ...Order2PricingBreakdown_order\n}\n"
  }
};
})();

(node as any).hash = "c990c5bf9754468f08158e8ffffc2b4b";

export default node;
