/**
 * @generated SignedSource<<5e1e68e0482843f1e8ea5d9c95cf6020>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowArtworksEmptyState_Test_Query$variables = Record<PropertyKey, never>;
export type ShowArtworksEmptyState_Test_Query$data = {
  readonly show: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowArtworksEmptyState_show">;
  } | null | undefined;
};
export type ShowArtworksEmptyState_Test_Query = {
  response: ShowArtworksEmptyState_Test_Query$data;
  variables: ShowArtworksEmptyState_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example-show-id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowArtworksEmptyState_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowArtworksEmptyState_show"
          }
        ],
        "storageKey": "show(id:\"example-show-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowArtworksEmptyState_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFairBooth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
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
        "storageKey": "show(id:\"example-show-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "75d8219d862fd0a45178ea701cfa40db",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "show.isFairBooth": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "show.status": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "ShowArtworksEmptyState_Test_Query",
    "operationKind": "query",
    "text": "query ShowArtworksEmptyState_Test_Query {\n  show(id: \"example-show-id\") {\n    ...ShowArtworksEmptyState_show\n    id\n  }\n}\n\nfragment ShowArtworksEmptyState_show on Show {\n  isFairBooth\n  status\n}\n"
  }
};
})();

(node as any).hash = "33e95d9ba8f2204ae2a38ff628f28f4a";

export default node;
