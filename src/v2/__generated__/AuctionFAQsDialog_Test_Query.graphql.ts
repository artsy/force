/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionFAQsDialog_Test_QueryVariables = {};
export type AuctionFAQsDialog_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionFAQsDialog_viewer">;
    } | null;
};
export type AuctionFAQsDialog_Test_Query = {
    readonly response: AuctionFAQsDialog_Test_QueryResponse;
    readonly variables: AuctionFAQsDialog_Test_QueryVariables;
};



/*
query AuctionFAQsDialog_Test_Query {
  viewer {
    ...AuctionFAQsDialog_viewer
  }
}

fragment AuctionFAQsDialog_viewer on Viewer {
  bidding: page(id: "how-auctions-work-bidding") {
    name
    content(format: HTML)
    id
  }
  buyersPremium: page(id: "how-auctions-work-buyers-premium-taxes-and-fees") {
    name
    content(format: HTML)
    id
  }
  paymentsAndShipping: page(id: "how-auctions-work-payments-and-shipping") {
    name
    content(format: HTML)
    id
  }
  emailsAndAlerts: page(id: "how-auctions-work-emails-and-alerts") {
    name
    content(format: HTML)
    id
  }
  conditionsOfSale: page(id: "how-auctions-work-conditions-of-sale") {
    name
    content(format: HTML)
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
  "type": "Page",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v2 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.bidding": (v1/*: any*/),
        "viewer.buyersPremium": (v1/*: any*/),
        "viewer.paymentsAndShipping": (v1/*: any*/),
        "viewer.emailsAndAlerts": (v1/*: any*/),
        "viewer.conditionsOfSale": (v1/*: any*/),
        "viewer.bidding.name": (v2/*: any*/),
        "viewer.bidding.content": (v3/*: any*/),
        "viewer.bidding.id": (v4/*: any*/),
        "viewer.buyersPremium.name": (v2/*: any*/),
        "viewer.buyersPremium.content": (v3/*: any*/),
        "viewer.buyersPremium.id": (v4/*: any*/),
        "viewer.paymentsAndShipping.name": (v2/*: any*/),
        "viewer.paymentsAndShipping.content": (v3/*: any*/),
        "viewer.paymentsAndShipping.id": (v4/*: any*/),
        "viewer.emailsAndAlerts.name": (v2/*: any*/),
        "viewer.emailsAndAlerts.content": (v3/*: any*/),
        "viewer.emailsAndAlerts.id": (v4/*: any*/),
        "viewer.conditionsOfSale.name": (v2/*: any*/),
        "viewer.conditionsOfSale.content": (v3/*: any*/),
        "viewer.conditionsOfSale.id": (v4/*: any*/)
      }
    },
    "name": "AuctionFAQsDialog_Test_Query",
    "operationKind": "query",
    "text": "query AuctionFAQsDialog_Test_Query {\n  viewer {\n    ...AuctionFAQsDialog_viewer\n  }\n}\n\nfragment AuctionFAQsDialog_viewer on Viewer {\n  bidding: page(id: \"how-auctions-work-bidding\") {\n    name\n    content(format: HTML)\n    id\n  }\n  buyersPremium: page(id: \"how-auctions-work-buyers-premium-taxes-and-fees\") {\n    name\n    content(format: HTML)\n    id\n  }\n  paymentsAndShipping: page(id: \"how-auctions-work-payments-and-shipping\") {\n    name\n    content(format: HTML)\n    id\n  }\n  emailsAndAlerts: page(id: \"how-auctions-work-emails-and-alerts\") {\n    name\n    content(format: HTML)\n    id\n  }\n  conditionsOfSale: page(id: \"how-auctions-work-conditions-of-sale\") {\n    name\n    content(format: HTML)\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '175fc2bbd27ccf82b0175bdc54ef184e';
export default node;
