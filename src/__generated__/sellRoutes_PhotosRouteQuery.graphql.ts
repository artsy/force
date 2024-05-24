/**
 * @generated SignedSource<<abc99ff32af60fa5ded1bfbd5d46782e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_PhotosRouteQuery$variables = {
  id: string;
};
export type sellRoutes_PhotosRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"PhotosRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_PhotosRouteQuery = {
  response: sellRoutes_PhotosRouteQuery$data;
  variables: sellRoutes_PhotosRouteQuery$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "sellRoutes_PhotosRouteQuery",
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
            "name": "PhotosRoute_submission"
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
    "name": "sellRoutes_PhotosRouteQuery",
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
            "concreteType": "ConsignmentSubmissionCategoryAsset",
            "kind": "LinkedField",
            "name": "assets",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "imageUrls",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "06816d0a50dee9f52bbd3747dd48da3b",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_PhotosRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_PhotosRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...PhotosRoute_submission\n    id\n  }\n}\n\nfragment PhotosRoute_submission on ConsignmentSubmission {\n  assets {\n    id\n    imageUrls\n  }\n}\n"
  }
};
})();

(node as any).hash = "0b9b193f461e9136d8a145c9067e3900";

export default node;
