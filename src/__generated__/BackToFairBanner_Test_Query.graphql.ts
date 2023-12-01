/**
 * @generated SignedSource<<ce3fa0ed84160cf7d9f06220c70570bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BackToFairBanner_Test_Query$variables = Record<PropertyKey, never>;
export type BackToFairBanner_Test_Query$data = {
  readonly show: {
    readonly " $fragmentSpreads": FragmentRefs<"BackToFairBanner_show">;
  } | null | undefined;
};
export type BackToFairBanner_Test_Query = {
  response: BackToFairBanner_Test_Query$data;
  variables: BackToFairBanner_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "show-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BackToFairBanner_Test_Query",
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
            "name": "BackToFairBanner_show"
          }
        ],
        "storageKey": "show(id:\"show-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BackToFairBanner_Test_Query",
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
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fair",
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
                "name": "href",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "show(id:\"show-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "571ed50bd38f5bd9e4ae35cf05c8d18f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "show.fair.href": (v2/*: any*/),
        "show.fair.id": (v3/*: any*/),
        "show.fair.name": (v2/*: any*/),
        "show.id": (v3/*: any*/)
      }
    },
    "name": "BackToFairBanner_Test_Query",
    "operationKind": "query",
    "text": "query BackToFairBanner_Test_Query {\n  show(id: \"show-id\") {\n    ...BackToFairBanner_show\n    id\n  }\n}\n\nfragment BackToFairBanner_show on Show {\n  fair {\n    name\n    href\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "52f47020325199c51fd1895e9c5dfa38";

export default node;
