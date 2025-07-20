/**
 * @generated SignedSource<<d74d0cc989bacae12451b7e20297ed48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowArtworksEmptyStateTestQuery$variables = Record<PropertyKey, never>;
export type ShowArtworksEmptyStateTestQuery$data = {
  readonly show: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowArtworksEmptyState_show">;
  } | null | undefined;
};
export type ShowArtworksEmptyStateTestQuery = {
  response: ShowArtworksEmptyStateTestQuery$data;
  variables: ShowArtworksEmptyStateTestQuery$variables;
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
    "name": "ShowArtworksEmptyStateTestQuery",
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
    "name": "ShowArtworksEmptyStateTestQuery",
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
    "cacheID": "9d9fd02895357f59c481d4bf854dbbd6",
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
    "name": "ShowArtworksEmptyStateTestQuery",
    "operationKind": "query",
    "text": "query ShowArtworksEmptyStateTestQuery {\n  show(id: \"example-show-id\") {\n    ...ShowArtworksEmptyState_show\n    id\n  }\n}\n\nfragment ShowArtworksEmptyState_show on Show {\n  isFairBooth\n  status\n}\n"
  }
};
})();

(node as any).hash = "c1667371f00c23848bf72758519b2616";

export default node;
