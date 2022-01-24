/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_SubmissionFlowTest_QueryVariables = {
    id: string;
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
  $id: ID!
) {
  submission(id: $id) {
    ...UploadPhotos_submission
    id
  }
}

fragment UploadPhotos_submission on ConsignmentSubmission {
  id
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
          (v2/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "36646556c8404954a46d223a73865fb1",
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
        "submission.id": (v4/*: any*/)
      }
    },
    "name": "UploadPhotos_SubmissionFlowTest_Query",
    "operationKind": "query",
    "text": "query UploadPhotos_SubmissionFlowTest_Query(\n  $id: ID!\n) {\n  submission(id: $id) {\n    ...UploadPhotos_submission\n    id\n  }\n}\n\nfragment UploadPhotos_submission on ConsignmentSubmission {\n  id\n  assets {\n    id\n    imageUrls\n    geminiToken\n    size\n    filename\n  }\n}\n"
  }
};
})();
(node as any).hash = '64cb94052061e44cd21a134cee81f6b8';
export default node;
