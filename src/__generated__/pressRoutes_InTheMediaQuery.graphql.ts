/**
 * @generated SignedSource<<c428adb6fae988484b8a65555ac9f5a4>>
 * @relayHash 3e95c4e8ef398018892fe07275c8c961
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3e95c4e8ef398018892fe07275c8c961

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pressRoutes_InTheMediaQuery$variables = Record<PropertyKey, never>;
export type pressRoutes_InTheMediaQuery$data = {
  readonly page: {
    readonly " $fragmentSpreads": FragmentRefs<"PressApp_page">;
  };
};
export type pressRoutes_InTheMediaQuery = {
  response: pressRoutes_InTheMediaQuery$data;
  variables: pressRoutes_InTheMediaQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "in-the-media"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pressRoutes_InTheMediaQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PressApp_page"
          }
        ],
        "storageKey": "page(id:\"in-the-media\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pressRoutes_InTheMediaQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "content",
            "storageKey": "content(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "page(id:\"in-the-media\")"
      }
    ]
  },
  "params": {
    "id": "3e95c4e8ef398018892fe07275c8c961",
    "metadata": {},
    "name": "pressRoutes_InTheMediaQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "375038273fedb117d441bffae18b23a5";

export default node;
