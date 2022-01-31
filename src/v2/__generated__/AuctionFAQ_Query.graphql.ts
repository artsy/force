/**
 * @generated SignedSource<<7f805b35cffbda81265545fbec1264e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionFAQ_Query$variables = {};
export type AuctionFAQ_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionFAQ_viewer">;
  } | null;
};
export type AuctionFAQ_Query$rawResponse = {
  readonly viewer: {
    readonly bidding: {
      readonly content: string | null;
      readonly id: string;
    } | null;
    readonly buyersPremiumTaxesAndFees: {
      readonly content: string | null;
      readonly id: string;
    } | null;
    readonly paymentsAndShipping: {
      readonly content: string | null;
      readonly id: string;
    } | null;
    readonly emailsAndAlerts: {
      readonly content: string | null;
      readonly id: string;
    } | null;
    readonly conditionsOfSale: {
      readonly content: string | null;
      readonly id: string;
    } | null;
  } | null;
};
export type AuctionFAQ_Query = {
  variables: AuctionFAQ_Query$variables;
  response: AuctionFAQ_Query$data;
  rawResponse: AuctionFAQ_Query$rawResponse;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "content",
    "storageKey": null
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
  "nullable": true,
  "plural": false,
  "type": "StaticContent"
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionFAQ_Query",
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
            "name": "AuctionFAQ_viewer"
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
    "name": "AuctionFAQ_Query",
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
    "cacheID": "b869a5209002072384d42e9d8e4eb423",
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
        "viewer.buyersPremiumTaxesAndFees": (v1/*: any*/),
        "viewer.buyersPremiumTaxesAndFees.content": (v2/*: any*/),
        "viewer.buyersPremiumTaxesAndFees.id": (v3/*: any*/),
        "viewer.conditionsOfSale": (v1/*: any*/),
        "viewer.conditionsOfSale.content": (v2/*: any*/),
        "viewer.conditionsOfSale.id": (v3/*: any*/),
        "viewer.emailsAndAlerts": (v1/*: any*/),
        "viewer.emailsAndAlerts.content": (v2/*: any*/),
        "viewer.emailsAndAlerts.id": (v3/*: any*/),
        "viewer.paymentsAndShipping": (v1/*: any*/),
        "viewer.paymentsAndShipping.content": (v2/*: any*/),
        "viewer.paymentsAndShipping.id": (v3/*: any*/)
      }
    },
    "name": "AuctionFAQ_Query",
    "operationKind": "query",
    "text": "query AuctionFAQ_Query {\n  viewer {\n    ...AuctionFAQ_viewer\n  }\n}\n\nfragment AuctionFAQ_viewer on Viewer {\n  bidding: staticContent(id: \"how-auctions-work-bidding\") {\n    content\n    id\n  }\n  buyersPremiumTaxesAndFees: staticContent(id: \"how-auctions-work-buyers-premium-taxes-and-fees\") {\n    content\n    id\n  }\n  paymentsAndShipping: staticContent(id: \"how-auctions-work-payments-and-shipping\") {\n    content\n    id\n  }\n  emailsAndAlerts: staticContent(id: \"how-auctions-work-emails-and-alerts\") {\n    content\n    id\n  }\n  conditionsOfSale: staticContent(id: \"how-auctions-work-conditions-of-sale\") {\n    content\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "23cdc2b3dd27c64d9a6a252234e51d2f";

export default node;
