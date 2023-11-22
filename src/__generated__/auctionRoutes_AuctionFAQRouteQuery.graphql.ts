/**
 * @generated SignedSource<<60298178d611c18a5f60b804dab8670d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type auctionRoutes_AuctionFAQRouteQuery$variables = Record<PropertyKey, never>;
export type auctionRoutes_AuctionFAQRouteQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionFAQRoute_viewer">;
  } | null | undefined;
};
export type auctionRoutes_AuctionFAQRouteQuery = {
  response: auctionRoutes_AuctionFAQRouteQuery$data;
  variables: auctionRoutes_AuctionFAQRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "format",
        "value": "HTML"
      }
    ],
    "kind": "ScalarField",
    "name": "content",
    "storageKey": "content(format:\"HTML\")"
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionRoutes_AuctionFAQRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionFAQRoute_viewer"
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
    "name": "auctionRoutes_AuctionFAQRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "bidding",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-bidding"
              }
            ],
            "concreteType": "StaticContent",
            "kind": "LinkedField",
            "name": "staticContent",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "staticContent(id:\"how-auctions-work-bidding\")"
          },
          {
            "alias": "buyersPremiumTaxesAndFees",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-buyers-premium-taxes-and-fees"
              }
            ],
            "concreteType": "StaticContent",
            "kind": "LinkedField",
            "name": "staticContent",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "staticContent(id:\"how-auctions-work-buyers-premium-taxes-and-fees\")"
          },
          {
            "alias": "paymentsAndShipping",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-payments-and-shipping"
              }
            ],
            "concreteType": "StaticContent",
            "kind": "LinkedField",
            "name": "staticContent",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "staticContent(id:\"how-auctions-work-payments-and-shipping\")"
          },
          {
            "alias": "emailsAndAlerts",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-emails-and-alerts"
              }
            ],
            "concreteType": "StaticContent",
            "kind": "LinkedField",
            "name": "staticContent",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "staticContent(id:\"how-auctions-work-emails-and-alerts\")"
          },
          {
            "alias": "conditionsOfSale",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-conditions-of-sale"
              }
            ],
            "concreteType": "StaticContent",
            "kind": "LinkedField",
            "name": "staticContent",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "staticContent(id:\"how-auctions-work-conditions-of-sale\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "280acc52aa9b82c18f5919737a2b0df6",
    "id": null,
    "metadata": {},
    "name": "auctionRoutes_AuctionFAQRouteQuery",
    "operationKind": "query",
    "text": "query auctionRoutes_AuctionFAQRouteQuery {\n  viewer {\n    ...AuctionFAQRoute_viewer\n  }\n}\n\nfragment AuctionFAQRoute_viewer on Viewer {\n  bidding: staticContent(id: \"how-auctions-work-bidding\") {\n    content(format: HTML)\n    id\n  }\n  buyersPremiumTaxesAndFees: staticContent(id: \"how-auctions-work-buyers-premium-taxes-and-fees\") {\n    content(format: HTML)\n    id\n  }\n  paymentsAndShipping: staticContent(id: \"how-auctions-work-payments-and-shipping\") {\n    content(format: HTML)\n    id\n  }\n  emailsAndAlerts: staticContent(id: \"how-auctions-work-emails-and-alerts\") {\n    content(format: HTML)\n    id\n  }\n  conditionsOfSale: staticContent(id: \"how-auctions-work-conditions-of-sale\") {\n    content(format: HTML)\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "7c18bc7a323b659e3d2e7ee510a0a68b";

export default node;
