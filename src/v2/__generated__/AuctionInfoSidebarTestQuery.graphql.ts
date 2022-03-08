/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionInfoSidebarTestQueryVariables = {};
export type AuctionInfoSidebarTestQueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionInfoSidebar_sale">;
    } | null;
};
export type AuctionInfoSidebarTestQuery = {
    readonly response: AuctionInfoSidebarTestQueryResponse;
    readonly variables: AuctionInfoSidebarTestQueryVariables;
};



/*
query AuctionInfoSidebarTestQuery {
  sale(id: "foo") {
    ...AuctionInfoSidebar_sale
    id
  }
}

fragment AuctionInfoSidebar_sale on Sale {
  liveStartAt
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionInfoSidebarTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionInfoSidebar_sale"
          }
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuctionInfoSidebarTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveStartAt",
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
        "storageKey": "sale(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "8c448b5672c90b8998259c383a51cfdb",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "sale.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "sale.liveStartAt": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "AuctionInfoSidebarTestQuery",
    "operationKind": "query",
    "text": "query AuctionInfoSidebarTestQuery {\n  sale(id: \"foo\") {\n    ...AuctionInfoSidebar_sale\n    id\n  }\n}\n\nfragment AuctionInfoSidebar_sale on Sale {\n  liveStartAt\n}\n"
  }
};
})();
(node as any).hash = '0a3591616768eea3b40ba01ed8729821';
export default node;
