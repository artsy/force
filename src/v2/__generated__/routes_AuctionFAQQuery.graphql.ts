/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_AuctionFAQQueryVariables = {};
export type routes_AuctionFAQQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionFAQ_viewer">;
    } | null;
};
export type routes_AuctionFAQQuery = {
    readonly response: routes_AuctionFAQQueryResponse;
    readonly variables: routes_AuctionFAQQueryVariables;
};



/*
query routes_AuctionFAQQuery {
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
    "kind": "ScalarField",
    "alias": null,
    "name": "content",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "id",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_AuctionFAQQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AuctionFAQ_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_AuctionFAQQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "bidding",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-bidding\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-bidding"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": (v0/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": "buyersPremiumTaxesAndFees",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-buyers-premium-taxes-and-fees\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-buyers-premium-taxes-and-fees"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": (v0/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": "paymentsAndShipping",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-payments-and-shipping\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-payments-and-shipping"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": (v0/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": "emailsAndAlerts",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-emails-and-alerts\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-emails-and-alerts"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": (v0/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": "conditionsOfSale",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-conditions-of-sale\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-conditions-of-sale"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": (v0/*: any*/)
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_AuctionFAQQuery",
    "id": null,
    "text": "query routes_AuctionFAQQuery {\n  viewer {\n    ...AuctionFAQ_viewer\n  }\n}\n\nfragment AuctionFAQ_viewer on Viewer {\n  bidding: staticContent(id: \"how-auctions-work-bidding\") {\n    content\n    id\n  }\n  buyersPremiumTaxesAndFees: staticContent(id: \"how-auctions-work-buyers-premium-taxes-and-fees\") {\n    content\n    id\n  }\n  paymentsAndShipping: staticContent(id: \"how-auctions-work-payments-and-shipping\") {\n    content\n    id\n  }\n  emailsAndAlerts: staticContent(id: \"how-auctions-work-emails-and-alerts\") {\n    content\n    id\n  }\n  conditionsOfSale: staticContent(id: \"how-auctions-work-conditions-of-sale\") {\n    content\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '6b138c40e1ca0295da3be70c984600d3';
export default node;
