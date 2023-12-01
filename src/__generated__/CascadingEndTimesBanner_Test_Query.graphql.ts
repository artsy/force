/**
 * @generated SignedSource<<64c6a3d0c10d275ee71bfcc0f9b94789>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CascadingEndTimesBanner_Test_Query$variables = Record<PropertyKey, never>;
export type CascadingEndTimesBanner_Test_Query$data = {
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"CascadingEndTimesBanner_sale">;
  } | null | undefined;
};
export type CascadingEndTimesBanner_Test_Query = {
  response: CascadingEndTimesBanner_Test_Query$data;
  variables: CascadingEndTimesBanner_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CascadingEndTimesBanner_Test_Query",
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
            "name": "CascadingEndTimesBanner_sale"
          }
        ],
        "storageKey": "sale(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CascadingEndTimesBanner_Test_Query",
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
            "name": "cascadingEndTimeIntervalMinutes",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "extendedBiddingIntervalMinutes",
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
        "storageKey": "sale(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "73ed7a6b5d9d14ef99ebb6441754368b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "sale.cascadingEndTimeIntervalMinutes": (v1/*: any*/),
        "sale.extendedBiddingIntervalMinutes": (v1/*: any*/),
        "sale.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "CascadingEndTimesBanner_Test_Query",
    "operationKind": "query",
    "text": "query CascadingEndTimesBanner_Test_Query {\n  sale(id: \"example\") {\n    ...CascadingEndTimesBanner_sale\n    id\n  }\n}\n\nfragment CascadingEndTimesBanner_sale on Sale {\n  cascadingEndTimeIntervalMinutes\n  extendedBiddingIntervalMinutes\n}\n"
  }
};
})();

(node as any).hash = "b360f718b6b9e0a8aa5cff8fed562039";

export default node;
