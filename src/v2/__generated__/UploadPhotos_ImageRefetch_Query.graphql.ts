/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UploadPhotos_ImageRefetch_QueryVariables = {
    id: string;
    sessionID?: string | null | undefined;
};
export type UploadPhotos_ImageRefetch_QueryResponse = {
    readonly submission: {
        readonly externalId: string;
        readonly assets: ReadonlyArray<{
            readonly id: string;
            readonly imageUrls: unknown | null;
            readonly geminiToken: string | null;
            readonly size: string | null;
            readonly filename: string | null;
        } | null> | null;
    } | null;
};
export type UploadPhotos_ImageRefetch_Query = {
    readonly response: UploadPhotos_ImageRefetch_QueryResponse;
    readonly variables: UploadPhotos_ImageRefetch_QueryVariables;
};



/*
query UploadPhotos_ImageRefetch_Query(
  $id: ID!
  $sessionID: String
) {
  submission(externalId: $id, sessionID: $sessionID) {
    externalId
    assets {
      id
      imageUrls
      geminiToken
      size
      filename
    }
    id
  }
}
*/

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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ConsignmentSubmissionCategoryAsset",
  "kind": "LinkedField",
  "name": "assets",
  "plural": true,
  "selections": [
    (v3/*: any*/),
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
          (v4/*: any*/)
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
          (v4/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f813b36dce7c3d23e2dca6faf1f7aacb",
    "id": null,
    "metadata": {},
    "name": "UploadPhotos_ImageRefetch_Query",
    "operationKind": "query",
    "text": "query UploadPhotos_ImageRefetch_Query(\n  $id: ID!\n  $sessionID: String\n) {\n  submission(externalId: $id, sessionID: $sessionID) {\n    externalId\n    assets {\n      id\n      imageUrls\n      geminiToken\n      size\n      filename\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '2f7b3686a145a8ea1a718ae0baf9bac3';
export default node;
