/**
 * @generated SignedSource<<9f379bf034be822e35f045b1358fdd01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExhibitorsLetterNavTestQuery$variables = Record<PropertyKey, never>;
export type ExhibitorsLetterNavTestQuery$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"ExhibitorsLetterNav_fair">;
  } | null | undefined;
};
export type ExhibitorsLetterNavTestQuery = {
  response: ExhibitorsLetterNavTestQuery$data;
  variables: ExhibitorsLetterNavTestQuery$variables;
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
    "name": "ExhibitorsLetterNavTestQuery",
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
    "name": "ExhibitorsLetterNavTestQuery",
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
    "cacheID": "1588418077c98d6f9a3dda27ba5e9319",
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
    "name": "ExhibitorsLetterNavTestQuery",
    "operationKind": "query",
    "text": "query ExhibitorsLetterNavTestQuery {\n  fair(id: \"one-x-artsy\") {\n    ...ExhibitorsLetterNav_fair\n    id\n  }\n}\n\nfragment ExhibitorsLetterNav_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n  }\n}\n"
  }
};
})();

(node as any).hash = "9e5e2392b824fef4218a7fe7a59d559f";

export default node;
