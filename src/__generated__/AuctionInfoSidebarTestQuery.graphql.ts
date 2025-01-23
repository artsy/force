/**
 * @generated SignedSource<<b155480924ff6369c98ca30772199da2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionInfoSidebarTestQuery$variables = Record<PropertyKey, never>;
export type AuctionInfoSidebarTestQuery$data = {
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionInfoSidebar_sale">;
  } | null | undefined;
};
export type AuctionInfoSidebarTestQuery = {
  response: AuctionInfoSidebarTestQuery$data;
  variables: AuctionInfoSidebarTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
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
            "name": "hideTotal",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "totalRaised",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "minor",
                "storageKey": null
              },
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
    "cacheID": "b1c07e024c3d3cdfaf1299eff8665bd2",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "sale.hideTotal": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "sale.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "sale.liveStartAt": (v1/*: any*/),
        "sale.totalRaised": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "sale.totalRaised.display": (v1/*: any*/),
        "sale.totalRaised.minor": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Long"
        }
      }
    },
    "name": "AuctionInfoSidebarTestQuery",
    "operationKind": "query",
    "text": "query AuctionInfoSidebarTestQuery {\n  sale(id: \"foo\") {\n    ...AuctionInfoSidebar_sale\n    id\n  }\n}\n\nfragment AuctionInfoSidebar_sale on Sale {\n  liveStartAt\n  hideTotal\n  totalRaised {\n    minor\n    display\n  }\n}\n"
  }
};
})();

(node as any).hash = "0a3591616768eea3b40ba01ed8729821";

export default node;
