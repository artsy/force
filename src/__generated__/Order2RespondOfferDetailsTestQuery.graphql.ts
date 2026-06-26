/**
 * @generated SignedSource<<6928f4ecc427ab5c66a48bb8d2b4cadd>>
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v3 = {
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
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v1/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v7 = {
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
v8 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
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
      "selections": (v8/*: any*/),
      "type": "ShippingLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v8/*: any*/),
      "type": "TaxLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v5/*: any*/),
        (v7/*: any*/)
      ],
      "type": "SubtotalLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v5/*: any*/),
        (v6/*: any*/),
        (v3/*: any*/)
      ],
      "type": "TotalLine",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Offer"
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
  "plural": true,
  "type": "PricingBreakdownLineUnion"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
                "name": "internalID",
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
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "lastSubmittedOffer",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "submittedOffers",
                "plural": true,
                "selections": (v4/*: any*/),
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v1/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "938fba6fc849f1cc93fb43b4115b644f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v10/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.buyerStateExpiresAt": (v11/*: any*/),
        "me.order.id": (v10/*: any*/),
        "me.order.internalID": (v10/*: any*/),
        "me.order.lastSubmittedOffer": (v12/*: any*/),
        "me.order.lastSubmittedOffer.amount": (v13/*: any*/),
        "me.order.lastSubmittedOffer.amount.display": (v11/*: any*/),
        "me.order.lastSubmittedOffer.createdAt": (v11/*: any*/),
        "me.order.lastSubmittedOffer.id": (v10/*: any*/),
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
        "me.order.lineItems.artwork.id": (v10/*: any*/),
        "me.order.lineItems.artwork.slug": (v10/*: any*/),
        "me.order.lineItems.id": (v10/*: any*/),
        "me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "me.order.pendingOffer": (v12/*: any*/),
        "me.order.pendingOffer.amount": (v13/*: any*/),
        "me.order.pendingOffer.amount.display": (v11/*: any*/),
        "me.order.pendingOffer.createdAt": (v11/*: any*/),
        "me.order.pendingOffer.id": (v10/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines": (v14/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.__typename": (v15/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount": (v13/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.amount": (v11/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.currencySymbol": (v11/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.display": (v11/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amountFallbackText": (v11/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.displayName": (v15/*: any*/),
        "me.order.pricingBreakdownLines": (v14/*: any*/),
        "me.order.pricingBreakdownLines.__typename": (v15/*: any*/),
        "me.order.pricingBreakdownLines.amount": (v13/*: any*/),
        "me.order.pricingBreakdownLines.amount.amount": (v11/*: any*/),
        "me.order.pricingBreakdownLines.amount.currencySymbol": (v11/*: any*/),
        "me.order.pricingBreakdownLines.amount.display": (v11/*: any*/),
        "me.order.pricingBreakdownLines.amountFallbackText": (v11/*: any*/),
        "me.order.pricingBreakdownLines.displayName": (v15/*: any*/),
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
        "me.order.submittedOffers": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Offer"
        },
        "me.order.submittedOffers.amount": (v13/*: any*/),
        "me.order.submittedOffers.amount.display": (v11/*: any*/),
        "me.order.submittedOffers.createdAt": (v11/*: any*/),
        "me.order.submittedOffers.id": (v10/*: any*/)
      }
    },
    "name": "Order2RespondOfferDetailsTestQuery",
    "operationKind": "query",
    "text": "query Order2RespondOfferDetailsTestQuery {\n  me {\n    order(id: \"order-id\") {\n      ...Order2RespondContext_order\n      ...Order2RespondOfferDetails_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  mode\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2RespondContext_order on Order {\n  internalID\n  source\n  mode\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2RespondOfferDetails_order on Order {\n  buyerStateExpiresAt\n  lastSubmittedOffer {\n    createdAt\n    amount {\n      display\n    }\n    id\n  }\n  submittedOffers {\n    createdAt\n    amount {\n      display\n    }\n    id\n  }\n  pendingOffer {\n    createdAt\n    amount {\n      display\n    }\n    id\n  }\n  ...Order2CheckoutPricingBreakdown_order\n}\n"
  }
};
})();

(node as any).hash = "c990c5bf9754468f08158e8ffffc2b4b";

export default node;
