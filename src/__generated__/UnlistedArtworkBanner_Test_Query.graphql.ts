/**
 * @generated SignedSource<<a06093e4a41e39ec99596b01afe5d3ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlistedArtworkBanner_Test_Query$variables = {};
export type UnlistedArtworkBanner_Test_Query$data = {
  readonly partner: {
    readonly " $fragmentSpreads": FragmentRefs<"UnlistedArtworkBanner_partner">;
  } | null;
};
export type UnlistedArtworkBanner_Test_Query = {
  response: UnlistedArtworkBanner_Test_Query$data;
  variables: UnlistedArtworkBanner_Test_Query$variables;
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
    "name": "UnlistedArtworkBanner_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UnlistedArtworkBanner_partner"
          }
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UnlistedArtworkBanner_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
        "storageKey": "partner(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "fb5346259ccd5ba3498049b8a4ff515c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "partner.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "UnlistedArtworkBanner_Test_Query",
    "operationKind": "query",
    "text": "query UnlistedArtworkBanner_Test_Query {\n  partner(id: \"example\") {\n    ...UnlistedArtworkBanner_partner\n    id\n  }\n}\n\nfragment UnlistedArtworkBanner_partner on Partner {\n  name\n}\n"
  }
};
})();

(node as any).hash = "ac22b7bdd66f1ba167d45345ef06e762";

export default node;
