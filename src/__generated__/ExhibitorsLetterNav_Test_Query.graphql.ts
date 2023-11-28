/**
 * @generated SignedSource<<5c1bf870e5122dd54dcb202eaa16f751>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExhibitorsLetterNav_Test_Query$variables = Record<PropertyKey, never>;
export type ExhibitorsLetterNav_Test_Query$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"ExhibitorsLetterNav_fair">;
  } | null | undefined;
};
export type ExhibitorsLetterNav_Test_Query = {
  response: ExhibitorsLetterNav_Test_Query$data;
  variables: ExhibitorsLetterNav_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "one-x-artsy"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExhibitorsLetterNav_Test_Query",
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
            "name": "ExhibitorsLetterNav_fair"
          }
        ],
        "storageKey": "fair(id:\"one-x-artsy\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExhibitorsLetterNav_Test_Query",
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
            "concreteType": "FairExhibitorsGroup",
            "kind": "LinkedField",
            "name": "exhibitorsGroupedByName",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "letter",
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
        "storageKey": "fair(id:\"one-x-artsy\")"
      }
    ]
  },
  "params": {
    "cacheID": "e425374b6e7a15a42e687dfbf664f554",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.exhibitorsGroupedByName": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FairExhibitorsGroup"
        },
        "fair.exhibitorsGroupedByName.letter": {
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
    "name": "ExhibitorsLetterNav_Test_Query",
    "operationKind": "query",
    "text": "query ExhibitorsLetterNav_Test_Query {\n  fair(id: \"one-x-artsy\") {\n    ...ExhibitorsLetterNav_fair\n    id\n  }\n}\n\nfragment ExhibitorsLetterNav_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n  }\n}\n"
  }
};
})();

(node as any).hash = "5e0b9b030a6a6f5eff7caf3985e38350";

export default node;
