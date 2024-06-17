/**
 * @generated SignedSource<<b9de60fd0170279b0924c0f269e037f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_PurchaseHistoryRouteQuery$variables = {
  id: string;
};
export type sellRoutes_PurchaseHistoryRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"PurchaseHistoryRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_PurchaseHistoryRouteQuery = {
  response: sellRoutes_PurchaseHistoryRouteQuery$data;
  variables: sellRoutes_PurchaseHistoryRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "sellRoutes_PurchaseHistoryRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PurchaseHistoryRoute_submission"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "sellRoutes_PurchaseHistoryRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "signature",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "99e2f40b36070661f43fbf3a33a5ccbe",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_PurchaseHistoryRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_PurchaseHistoryRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...PurchaseHistoryRoute_submission\n    id\n  }\n}\n\nfragment PurchaseHistoryRoute_submission on ConsignmentSubmission {\n  provenance\n  signature\n}\n"
  }
};
})();

(node as any).hash = "edce7fd445c83ea3ee42e959040cba6c";

export default node;
