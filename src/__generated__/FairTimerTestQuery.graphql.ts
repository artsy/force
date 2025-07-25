/**
 * @generated SignedSource<<b49502746157184bf5c865103bb662dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairTimerTestQuery$variables = Record<PropertyKey, never>;
export type FairTimerTestQuery$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairTimer_fair">;
  } | null | undefined;
};
export type FairTimerTestQuery = {
  response: FairTimerTestQuery$data;
  variables: FairTimerTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairTimerTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairTimer_fair"
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairTimerTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endAt",
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
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "aee95bf1e038b3c680970b4e87c45fc5",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.endAt": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "fair.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "FairTimerTestQuery",
    "operationKind": "query",
    "text": "query FairTimerTestQuery {\n  fair(id: \"example\") {\n    ...FairTimer_fair\n    id\n  }\n}\n\nfragment FairTimer_fair on Fair {\n  endAt\n}\n"
  }
};
})();

(node as any).hash = "242840a4b15abb991d81f1c60161500e";

export default node;
