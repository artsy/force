/**
 * @generated SignedSource<<1777596008da54333b395bdfba7bcf00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionFAQsDialog_Test_Query$variables = Record<PropertyKey, never>;
export type AuctionFAQsDialog_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionFAQsDialog_viewer">;
  } | null | undefined;
};
export type AuctionFAQsDialog_Test_Query = {
  response: AuctionFAQsDialog_Test_Query$data;
  variables: AuctionFAQsDialog_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
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
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Page"
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
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
    "name": "AuctionFAQsDialog_Test_Query",
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
            "name": "AuctionFAQsDialog_viewer"
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
    "name": "AuctionFAQsDialog_Test_Query",
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
            "concreteType": "Page",
            "kind": "LinkedField",
            "name": "page",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "page(id:\"how-auctions-work-bidding\")"
          },
          {
            "alias": "buyersPremium",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-buyers-premium-taxes-and-fees"
              }
            ],
            "concreteType": "Page",
            "kind": "LinkedField",
            "name": "page",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "page(id:\"how-auctions-work-buyers-premium-taxes-and-fees\")"
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
            "concreteType": "Page",
            "kind": "LinkedField",
            "name": "page",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "page(id:\"how-auctions-work-payments-and-shipping\")"
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
            "concreteType": "Page",
            "kind": "LinkedField",
            "name": "page",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "page(id:\"how-auctions-work-emails-and-alerts\")"
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
            "concreteType": "Page",
            "kind": "LinkedField",
            "name": "page",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": "page(id:\"how-auctions-work-conditions-of-sale\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3f3162249896d5db65c95e6cfdeebe14",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.bidding": (v1/*: any*/),
        "viewer.bidding.content": (v2/*: any*/),
        "viewer.bidding.id": (v3/*: any*/),
        "viewer.bidding.name": (v4/*: any*/),
        "viewer.buyersPremium": (v1/*: any*/),
        "viewer.buyersPremium.content": (v2/*: any*/),
        "viewer.buyersPremium.id": (v3/*: any*/),
        "viewer.buyersPremium.name": (v4/*: any*/),
        "viewer.conditionsOfSale": (v1/*: any*/),
        "viewer.conditionsOfSale.content": (v2/*: any*/),
        "viewer.conditionsOfSale.id": (v3/*: any*/),
        "viewer.conditionsOfSale.name": (v4/*: any*/),
        "viewer.emailsAndAlerts": (v1/*: any*/),
        "viewer.emailsAndAlerts.content": (v2/*: any*/),
        "viewer.emailsAndAlerts.id": (v3/*: any*/),
        "viewer.emailsAndAlerts.name": (v4/*: any*/),
        "viewer.paymentsAndShipping": (v1/*: any*/),
        "viewer.paymentsAndShipping.content": (v2/*: any*/),
        "viewer.paymentsAndShipping.id": (v3/*: any*/),
        "viewer.paymentsAndShipping.name": (v4/*: any*/)
      }
    },
    "name": "AuctionFAQsDialog_Test_Query",
    "operationKind": "query",
    "text": "query AuctionFAQsDialog_Test_Query {\n  viewer {\n    ...AuctionFAQsDialog_viewer\n  }\n}\n\nfragment AuctionFAQsDialog_viewer on Viewer {\n  bidding: page(id: \"how-auctions-work-bidding\") {\n    name\n    content(format: HTML)\n    id\n  }\n  buyersPremium: page(id: \"how-auctions-work-buyers-premium-taxes-and-fees\") {\n    name\n    content(format: HTML)\n    id\n  }\n  paymentsAndShipping: page(id: \"how-auctions-work-payments-and-shipping\") {\n    name\n    content(format: HTML)\n    id\n  }\n  emailsAndAlerts: page(id: \"how-auctions-work-emails-and-alerts\") {\n    name\n    content(format: HTML)\n    id\n  }\n  conditionsOfSale: page(id: \"how-auctions-work-conditions-of-sale\") {\n    name\n    content(format: HTML)\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "175fc2bbd27ccf82b0175bdc54ef184e";

export default node;
