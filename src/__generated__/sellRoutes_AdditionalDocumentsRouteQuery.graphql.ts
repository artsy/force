/**
 * @generated SignedSource<<864784f748e8c881bb48ff0b16e6f16c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_AdditionalDocumentsRouteQuery$variables = {
  id: string;
};
export type sellRoutes_AdditionalDocumentsRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"AdditionalDocumentsRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_AdditionalDocumentsRouteQuery = {
  response: sellRoutes_AdditionalDocumentsRouteQuery$data;
  variables: sellRoutes_AdditionalDocumentsRouteQuery$variables;
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
    "name": "sellRoutes_AdditionalDocumentsRouteQuery",
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
            "name": "AdditionalDocumentsRoute_submission"
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
    "name": "sellRoutes_AdditionalDocumentsRouteQuery",
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
            "name": "externalId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "assetType",
                "value": [
                  "ADDITIONAL_FILE"
                ]
              }
            ],
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
                "name": "size",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "filename",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "documentPath",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "s3Path",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "s3Bucket",
                "storageKey": null
              }
            ],
            "storageKey": "assets(assetType:[\"ADDITIONAL_FILE\"])"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fb94cfdb6e151d1568a95b1be381d3d9",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_AdditionalDocumentsRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_AdditionalDocumentsRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...AdditionalDocumentsRoute_submission\n    id\n  }\n}\n\nfragment AdditionalDocumentsRoute_submission on ConsignmentSubmission {\n  externalId\n  assets(assetType: [ADDITIONAL_FILE]) {\n    id\n    size\n    filename\n    documentPath\n    s3Path\n    s3Bucket\n  }\n}\n"
  }
};
})();

(node as any).hash = "25c3687222ffccf5bf7e061f857d08ee";

export default node;
