/**
 * @generated SignedSource<<91f5de9da1f720a5b92d24925cbbf45e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
export type DetailsRoute_Test_Query$variables = Record<PropertyKey, never>;
export type DetailsRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"DetailsRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type DetailsRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly category: string | null | undefined;
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly medium: string | null | undefined;
    readonly myCollectionArtworkID: string | null | undefined;
    readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
    readonly year: string | null | undefined;
  } | null | undefined;
};
export type DetailsRoute_Test_Query = {
  rawResponse: DetailsRoute_Test_Query$rawResponse;
  response: DetailsRoute_Test_Query$data;
  variables: DetailsRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "submission-id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DetailsRoute_Test_Query",
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
            "name": "DetailsRoute_submission"
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
    "name": "DetailsRoute_Test_Query",
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
            "kind": "ScalarField",
            "name": "year",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "6facb5d5928a33ffd714f88cae1b0098",
    "id": null,
    "metadata": {},
    "name": "DetailsRoute_Test_Query",
    "operationKind": "query",
    "text": "query DetailsRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...SubmissionRoute_submission\n    ...DetailsRoute_submission\n    id\n  }\n}\n\nfragment DetailsRoute_submission on ConsignmentSubmission {\n  year\n  category\n  medium\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n  state\n  myCollectionArtworkID\n}\n"
  }
};
})();

(node as any).hash = "fae619a74d924cc0087b1b0c2fd2dbcf";

export default node;
