/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_SubmissionFlowTest_QueryVariables = {
    externalId?: string | null | undefined;
};
export type UploadPhotos_SubmissionFlowTest_QueryResponse = {
    readonly submission: {
        readonly " $fragmentRefs": FragmentRefs<"UploadPhotos_submission">;
    } | null;
};
export type UploadPhotos_SubmissionFlowTest_Query = {
    readonly response: UploadPhotos_SubmissionFlowTest_QueryResponse;
    readonly variables: UploadPhotos_SubmissionFlowTest_QueryVariables;
};



/*
query UploadPhotos_SubmissionFlowTest_Query(
  $externalId: ID
) {
  submission(externalId: $externalId) {
    ...UploadPhotos_submission
    id
  }
}

fragment UploadPhotos_submission on ConsignmentSubmission {
  externalId
  assets {
    id
    imageUrls
    geminiToken
    size
    filename
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "externalId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "externalId",
    "variableName": "externalId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadPhotos_SubmissionFlowTest_Query",
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
            "name": "UploadPhotos_submission"
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
    "name": "UploadPhotos_SubmissionFlowTest_Query",
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
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dd111c8ae0d473c5b423d2c879701d33",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "submission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConsignmentSubmission"
        },
        "submission.assets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConsignmentSubmissionCategoryAsset"
        },
        "submission.assets.filename": (v3/*: any*/),
        "submission.assets.geminiToken": (v3/*: any*/),
        "submission.assets.id": (v4/*: any*/),
        "submission.assets.imageUrls": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "JSON"
        },
        "submission.assets.size": (v3/*: any*/),
        "submission.externalId": (v4/*: any*/),
        "submission.id": (v4/*: any*/)
      }
    },
    "name": "UploadPhotos_SubmissionFlowTest_Query",
    "operationKind": "query",
    "text": "query UploadPhotos_SubmissionFlowTest_Query(\n  $externalId: ID\n) {\n  submission(externalId: $externalId) {\n    ...UploadPhotos_submission\n    id\n  }\n}\n\nfragment UploadPhotos_submission on ConsignmentSubmission {\n  externalId\n  assets {\n    id\n    imageUrls\n    geminiToken\n    size\n    filename\n  }\n}\n"
  }
};
})();
(node as any).hash = 'cd7943b11af98f793bb6b58f4fe9ed6a';
export default node;
