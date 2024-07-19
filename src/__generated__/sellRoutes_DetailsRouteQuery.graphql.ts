/**
 * @generated SignedSource<<332fd21f5e5107bdfed550c0642207ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_DetailsRouteQuery$variables = {
  id: string;
  sessionID: string;
};
export type sellRoutes_DetailsRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"DetailsRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_DetailsRouteQuery = {
  response: sellRoutes_DetailsRouteQuery$data;
  variables: sellRoutes_DetailsRouteQuery$variables;
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
    "name": "sellRoutes_DetailsRouteQuery",
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
            "name": "DetailsRoute_submission"
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
    "name": "sellRoutes_DetailsRouteQuery",
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
            "name": "year",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
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
    "cacheID": "d59bb2e7100c552c243f66c6e5d0a307",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_DetailsRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_DetailsRouteQuery(\n  $id: ID!\n  $sessionID: String!\n) {\n  submission(id: $id, sessionID: $sessionID) @principalField {\n    ...DetailsRoute_submission\n    id\n  }\n}\n\nfragment DetailsRoute_submission on ConsignmentSubmission {\n  year\n  category\n  medium\n}\n"
  }
};
})();

(node as any).hash = "484309e7e72a9304a5404c0497364f54";

export default node;
