/**
 * @generated SignedSource<<ef7ca6b55c7b7abd384ce1e796975939>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_DimensionsRouteQuery$variables = {
  id: string;
};
export type sellRoutes_DimensionsRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"DimensionsRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_DimensionsRouteQuery = {
  response: sellRoutes_DimensionsRouteQuery$data;
  variables: sellRoutes_DimensionsRouteQuery$variables;
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
    "name": "sellRoutes_DimensionsRouteQuery",
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
            "name": "DimensionsRoute_submission"
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
    "name": "sellRoutes_DimensionsRouteQuery",
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
            "name": "width",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "height",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "depth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dimensionsMetric",
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
    "cacheID": "a5144f41b8f50f98eaa08de0a44d5376",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_DimensionsRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_DimensionsRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...DimensionsRoute_submission\n    id\n  }\n}\n\nfragment DimensionsRoute_submission on ConsignmentSubmission {\n  width\n  height\n  depth\n  dimensionsMetric\n}\n"
  }
};
})();

(node as any).hash = "dbfcd8396147e68b824d880b3f7f69c8";

export default node;
