/**
 * @generated SignedSource<<bd3ffdad7c7b364f18482c64860ba441>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UploadPhotos_ImageRefetch_Query$variables = {
  id: string;
  sessionID?: string | null;
};
export type UploadPhotos_ImageRefetch_Query$data = {
  readonly submission: {
    readonly id: string;
    readonly assets: ReadonlyArray<{
      readonly id: string;
      readonly imageUrls: any | null;
      readonly geminiToken: string | null;
      readonly size: string | null;
      readonly filename: string | null;
    } | null> | null;
  } | null;
};
export type UploadPhotos_ImageRefetch_Query = {
  variables: UploadPhotos_ImageRefetch_Query$variables;
  response: UploadPhotos_ImageRefetch_Query$data;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
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
    ],
    "concreteType": "ConsignmentSubmission",
    "kind": "LinkedField",
    "name": "submission",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ConsignmentSubmissionCategoryAsset",
        "kind": "LinkedField",
        "name": "assets",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "imageUrls",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "geminiToken",
            "storageKey": null
          },
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
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadPhotos_ImageRefetch_Query",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UploadPhotos_ImageRefetch_Query",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "0adfbc258a8ab403d98dd5913fbdddf4",
    "id": null,
    "metadata": {},
    "name": "UploadPhotos_ImageRefetch_Query",
    "operationKind": "query",
    "text": "query UploadPhotos_ImageRefetch_Query(\n  $id: ID!\n  $sessionID: String\n) {\n  submission(id: $id, sessionID: $sessionID) {\n    id\n    assets {\n      id\n      imageUrls\n      geminiToken\n      size\n      filename\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7040a50cc1e19f9ea5255fbeb1b1b390";

export default node;
