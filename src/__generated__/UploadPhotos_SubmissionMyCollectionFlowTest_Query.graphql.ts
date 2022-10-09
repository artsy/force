/**
 * @generated SignedSource<<7e8e11bb3e2617b361e08f422ea8935b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_SubmissionMyCollectionFlowTest_Query$variables = {
  artworkId: string;
  externalId?: string | null;
};
export type UploadPhotos_SubmissionMyCollectionFlowTest_Query$data = {
  readonly myCollectionArtwork: {
    readonly " $fragmentSpreads": FragmentRefs<"UploadPhotos_myCollectionArtwork">;
  } | null;
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"UploadPhotos_submission">;
  } | null;
};
export type UploadPhotos_SubmissionMyCollectionFlowTest_Query = {
  response: UploadPhotos_SubmissionMyCollectionFlowTest_Query$data;
  variables: UploadPhotos_SubmissionMyCollectionFlowTest_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artworkId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "externalId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "externalId",
    "variableName": "externalId"
  }
],
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UploadPhotos_SubmissionMyCollectionFlowTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
      },
      {
        "alias": "myCollectionArtwork",
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UploadPhotos_myCollectionArtwork"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UploadPhotos_SubmissionMyCollectionFlowTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
              (v4/*: any*/),
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
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "myCollectionArtwork",
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"large\")"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ac7aaae8fd7970833dcfe7a1744bc99b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "myCollectionArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "myCollectionArtwork.id": (v5/*: any*/),
        "myCollectionArtwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "myCollectionArtwork.images.url": (v6/*: any*/),
        "myCollectionArtwork.internalID": (v5/*: any*/),
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
        "submission.assets.filename": (v6/*: any*/),
        "submission.assets.geminiToken": (v6/*: any*/),
        "submission.assets.id": (v5/*: any*/),
        "submission.assets.imageUrls": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "JSON"
        },
        "submission.assets.size": (v6/*: any*/),
        "submission.externalId": (v5/*: any*/),
        "submission.id": (v5/*: any*/)
      }
    },
    "name": "UploadPhotos_SubmissionMyCollectionFlowTest_Query",
    "operationKind": "query",
    "text": "query UploadPhotos_SubmissionMyCollectionFlowTest_Query(\n  $externalId: ID\n  $artworkId: String!\n) {\n  submission(externalId: $externalId) {\n    ...UploadPhotos_submission\n    id\n  }\n  myCollectionArtwork: artwork(id: $artworkId) {\n    ...UploadPhotos_myCollectionArtwork\n    id\n  }\n}\n\nfragment UploadPhotos_myCollectionArtwork on Artwork {\n  internalID\n  images {\n    url(version: \"large\")\n  }\n}\n\nfragment UploadPhotos_submission on ConsignmentSubmission {\n  externalId\n  assets {\n    id\n    imageUrls\n    geminiToken\n    size\n    filename\n  }\n}\n"
  }
};
})();

(node as any).hash = "0d3770683651cdd8479126c52f825d90";

export default node;
