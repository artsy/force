/**
 * @generated SignedSource<<4c4b77bb7f3d2bd79c1df7f2a92b85b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionInfoSidebarQuery$variables = Record<PropertyKey, never>;
export type AuctionInfoSidebarQuery$data = {
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionInfoSidebar_sale">;
  } | null | undefined;
};
export type AuctionInfoSidebarQuery = {
  response: AuctionInfoSidebarQuery$data;
  variables: AuctionInfoSidebarQuery$variables;
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
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v2 = {
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
    "name": "AuctionInfoSidebarQuery",
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
    "name": "AuctionInfoSidebarQuery",
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
            "name": "internalID",
            "storageKey": null
          },
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
    "cacheID": "a967a0d218fc70d2786e48daf7aa901e",
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
        "sale.id": (v1/*: any*/),
        "sale.internalID": (v1/*: any*/),
        "sale.liveStartAt": (v2/*: any*/),
        "sale.totalRaised": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "sale.totalRaised.display": (v2/*: any*/),
        "sale.totalRaised.minor": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Long"
        }
      }
    },
    "name": "AuctionInfoSidebarQuery",
    "operationKind": "query",
    "text": "query AuctionInfoSidebarQuery {\n  sale(id: \"foo\") {\n    ...AuctionInfoSidebar_sale\n    id\n  }\n}\n\nfragment AuctionInfoSidebar_sale on Sale {\n  internalID\n  liveStartAt\n  hideTotal\n  totalRaised {\n    minor\n    display\n  }\n}\n"
  }
};
})();

(node as any).hash = "e98dc4388d6486b9efd56de288c01a52";

export default node;
