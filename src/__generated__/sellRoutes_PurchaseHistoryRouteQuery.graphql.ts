/**
 * @generated SignedSource<<f970313e7301540ce087f18a12e7803e>>
 * @relayHash fe685ddc81a113b98fdaf1cf1846eae1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fe685ddc81a113b98fdaf1cf1846eae1

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_PurchaseHistoryRouteQuery$variables = {
  id: string;
  sessionID: string;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sessionID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "sessionID",
    "variableName": "sessionID"
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
    "id": "fe685ddc81a113b98fdaf1cf1846eae1",
    "metadata": {},
    "name": "sellRoutes_PurchaseHistoryRouteQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "7ef056639d38f2a19fc9c955143eb848";

export default node;
