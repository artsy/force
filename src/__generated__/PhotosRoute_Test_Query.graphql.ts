/**
 * @generated SignedSource<<0a0bf15cc6cbd82efca54485d7b056fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
export type PhotosRoute_Test_Query$variables = Record<PropertyKey, never>;
export type PhotosRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"PhotosRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type PhotosRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly assets: ReadonlyArray<{
      readonly filename: string | null | undefined;
      readonly geminiToken: string | null | undefined;
      readonly id: string;
      readonly imageUrls: any | null | undefined;
      readonly size: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly myCollectionArtwork: {
      readonly id: string;
      readonly images: ReadonlyArray<{
        readonly url: string | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly myCollectionArtworkID: string | null | undefined;
    readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
  } | null | undefined;
};
export type PhotosRoute_Test_Query = {
  rawResponse: PhotosRoute_Test_Query$rawResponse;
  response: PhotosRoute_Test_Query$data;
  variables: PhotosRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "submission-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PhotosRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmissionRoute_submission"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PhotosRoute_submission"
          }
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PhotosRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
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
            "kind": "ScalarField",
            "name": "externalId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "myCollectionArtworkID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "myCollectionArtwork",
            "plural": false,
            "selections": [
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
              (v1/*: any*/)
            ],
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
              (v1/*: any*/),
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
                "name": "geminiToken",
                "storageKey": null
              },
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
          (v1/*: any*/)
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "3b955119945204fcd7e4d03799c2c54b",
    "id": null,
    "metadata": {},
    "name": "PhotosRoute_Test_Query",
    "operationKind": "query",
    "text": "query PhotosRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...SubmissionRoute_submission\n    ...PhotosRoute_submission\n    id\n  }\n}\n\nfragment PhotosRoute_submission on ConsignmentSubmission {\n  externalId\n  myCollectionArtwork {\n    images {\n      url(version: \"large\")\n    }\n    id\n  }\n  assets {\n    id\n    size\n    filename\n    geminiToken\n    imageUrls\n  }\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n  state\n  myCollectionArtworkID\n}\n"
  }
};
})();

(node as any).hash = "5fecb11d4503b6a37e921c019cf45300";

export default node;
