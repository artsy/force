/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionFAQ_QueryVariables = {};
export type AuctionFAQ_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionFAQ_viewer">;
    } | null;
};
export type AuctionFAQ_QueryRawResponse = {
    readonly viewer: ({
        readonly bidding: ({
            readonly content: string | null;
            readonly id: string | null;
        }) | null;
        readonly buyersPremiumTaxesAndFees: ({
            readonly content: string | null;
            readonly id: string | null;
        }) | null;
        readonly paymentsAndShipping: ({
            readonly content: string | null;
            readonly id: string | null;
        }) | null;
        readonly emailsAndAlerts: ({
            readonly content: string | null;
            readonly id: string | null;
        }) | null;
        readonly conditionsOfSale: ({
            readonly content: string | null;
            readonly id: string | null;
        }) | null;
    }) | null;
};
export type AuctionFAQ_Query = {
    readonly response: AuctionFAQ_QueryResponse;
    readonly variables: AuctionFAQ_QueryVariables;
    readonly rawResponse: AuctionFAQ_QueryRawResponse;
};



/*
query AuctionFAQ_Query {
  viewer {
    ...AuctionFAQ_viewer
  }
}

fragment AuctionFAQ_viewer on Viewer {
  bidding: staticContent(id: "how-auctions-work-bidding") {
    content
    id
  }
  buyersPremiumTaxesAndFees: staticContent(id: "how-auctions-work-buyers-premium-taxes-and-fees") {
    content
    id
  }
  paymentsAndShipping: staticContent(id: "how-auctions-work-payments-and-shipping") {
    content
    id
  }
  emailsAndAlerts: staticContent(id: "how-auctions-work-emails-and-alerts") {
    content
    id
  }
  conditionsOfSale: staticContent(id: "how-auctions-work-conditions-of-sale") {
    content
    id
  }
}
*/

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
];
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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "AuctionFAQ_Query",
    "operationKind": "query",
    "text": "query AuctionFAQ_Query {\n  viewer {\n    ...AuctionFAQ_viewer\n  }\n}\n\nfragment AuctionFAQ_viewer on Viewer {\n  bidding: staticContent(id: \"how-auctions-work-bidding\") {\n    content\n    id\n  }\n  buyersPremiumTaxesAndFees: staticContent(id: \"how-auctions-work-buyers-premium-taxes-and-fees\") {\n    content\n    id\n  }\n  paymentsAndShipping: staticContent(id: \"how-auctions-work-payments-and-shipping\") {\n    content\n    id\n  }\n  emailsAndAlerts: staticContent(id: \"how-auctions-work-emails-and-alerts\") {\n    content\n    id\n  }\n  conditionsOfSale: staticContent(id: \"how-auctions-work-conditions-of-sale\") {\n    content\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a961addccb7d30c9417a40ffef2cbf21';
export default node;
