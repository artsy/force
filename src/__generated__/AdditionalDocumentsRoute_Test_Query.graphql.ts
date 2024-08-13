/**
 * @generated SignedSource<<df6d35e500ce51c39094b014772a83ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
export type AdditionalDocumentsRoute_Test_Query$variables = Record<PropertyKey, never>;
export type AdditionalDocumentsRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"AdditionalDocumentsRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type AdditionalDocumentsRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly assets: ReadonlyArray<{
      readonly documentPath: string | null | undefined;
      readonly filename: string | null | undefined;
      readonly id: string;
      readonly s3Bucket: string | null | undefined;
      readonly s3Path: string | null | undefined;
      readonly size: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly myCollectionArtworkID: string | null | undefined;
    readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
  } | null | undefined;
};
export type AdditionalDocumentsRoute_Test_Query = {
  rawResponse: AdditionalDocumentsRoute_Test_Query$rawResponse;
  response: AdditionalDocumentsRoute_Test_Query$data;
  variables: AdditionalDocumentsRoute_Test_Query$variables;
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
    "name": "AdditionalDocumentsRoute_Test_Query",
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
            "name": "AdditionalDocumentsRoute_submission"
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
    "name": "AdditionalDocumentsRoute_Test_Query",
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
          (v1/*: any*/)
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "fa5b5e28f5ac000a391ec74ae975ed19",
    "id": null,
    "metadata": {},
    "name": "AdditionalDocumentsRoute_Test_Query",
    "operationKind": "query",
    "text": "query AdditionalDocumentsRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...SubmissionRoute_submission\n    ...AdditionalDocumentsRoute_submission\n    id\n  }\n}\n\nfragment AdditionalDocumentsRoute_submission on ConsignmentSubmission {\n  externalId\n  assets(assetType: [ADDITIONAL_FILE]) {\n    id\n    size\n    filename\n    documentPath\n    s3Path\n    s3Bucket\n  }\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n  state\n  myCollectionArtworkID\n}\n"
  }
};
})();

(node as any).hash = "f32d3fcd2cb52f5ace1aa7401f109b78";

export default node;
