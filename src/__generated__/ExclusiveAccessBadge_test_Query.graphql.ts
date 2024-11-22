/**
 * @generated SignedSource<<7730925c0381ae177ead6a1e9fb1adf2>>
 * @relayHash 0de38b85bc83566f8d1bf02c55337f30
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0de38b85bc83566f8d1bf02c55337f30

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExclusiveAccessBadge_test_Query$variables = Record<PropertyKey, never>;
export type ExclusiveAccessBadge_test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ExclusiveAccessBadge_artwork">;
  } | null | undefined;
};
export type ExclusiveAccessBadge_test_Query = {
  response: ExclusiveAccessBadge_test_Query$data;
  variables: ExclusiveAccessBadge_test_Query$variables;
};

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
    "name": "ExclusiveAccessBadge_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ExclusiveAccessBadge_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExclusiveAccessBadge_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isUnlisted",
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
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "id": "0de38b85bc83566f8d1bf02c55337f30",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.isUnlisted": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        }
      }
    },
    "name": "ExclusiveAccessBadge_test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "93ae9e34ac53e8d3afc26a4cffbd1b36";

export default node;
