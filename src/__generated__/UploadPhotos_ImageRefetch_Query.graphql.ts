/**
 * @generated SignedSource<<7869b43a4207664efbaf3f38adedec80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UploadPhotos_ImageRefetch_Query$variables = {
  id: string;
  sessionID?: string | null | undefined;
};
export type UploadPhotos_ImageRefetch_Query$data = {
  readonly submission: {
    readonly assets: ReadonlyArray<{
      readonly filename: string | null | undefined;
      readonly geminiToken: string | null | undefined;
      readonly id: string;
      readonly imageUrls: any | null | undefined;
      readonly size: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly externalId: string;
    readonly userEmail: string | null | undefined;
    readonly userId: string;
  } | null | undefined;
};
export type UploadPhotos_ImageRefetch_Query = {
  response: UploadPhotos_ImageRefetch_Query$data;
  variables: UploadPhotos_ImageRefetch_Query$variables;
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
    "name": "externalId",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "sessionID",
    "variableName": "sessionID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userEmail",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "ConsignmentSubmissionCategoryAsset",
  "kind": "LinkedField",
  "name": "assets",
  "plural": true,
  "selections": [
    (v5/*: any*/),
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadPhotos_ImageRefetch_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/)
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
    "name": "UploadPhotos_ImageRefetch_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0818a08f95bb5e0cfdb2491b06b10213",
    "id": null,
    "metadata": {},
    "name": "UploadPhotos_ImageRefetch_Query",
    "operationKind": "query",
    "text": "query UploadPhotos_ImageRefetch_Query(\n  $id: ID!\n  $sessionID: String\n) {\n  submission(externalId: $id, sessionID: $sessionID) {\n    externalId\n    userId\n    userEmail\n    assets {\n      id\n      imageUrls\n      geminiToken\n      size\n      filename\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2f7b3686a145a8ea1a718ae0baf9bac3";

export default node;
