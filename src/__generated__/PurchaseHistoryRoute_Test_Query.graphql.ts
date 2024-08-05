/**
 * @generated SignedSource<<07cf6f550d5cac1a56886ad7de2a0725>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
export type PurchaseHistoryRoute_Test_Query$variables = Record<PropertyKey, never>;
export type PurchaseHistoryRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"PurchaseHistoryRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type PurchaseHistoryRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly myCollectionArtworkID: string | null | undefined;
    readonly provenance: string | null | undefined;
    readonly signature: boolean | null | undefined;
    readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
  } | null | undefined;
};
export type PurchaseHistoryRoute_Test_Query = {
  rawResponse: PurchaseHistoryRoute_Test_Query$rawResponse;
  response: PurchaseHistoryRoute_Test_Query$data;
  variables: PurchaseHistoryRoute_Test_Query$variables;
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
    "name": "PurchaseHistoryRoute_Test_Query",
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
            "name": "PurchaseHistoryRoute_submission"
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
    "name": "PurchaseHistoryRoute_Test_Query",
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
            "name": "provenance",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "signature",
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
    "cacheID": "b6cd336c97e459dc816da72acbbf70e5",
    "id": null,
    "metadata": {},
    "name": "PurchaseHistoryRoute_Test_Query",
    "operationKind": "query",
    "text": "query PurchaseHistoryRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...SubmissionRoute_submission\n    ...PurchaseHistoryRoute_submission\n    id\n  }\n}\n\nfragment PurchaseHistoryRoute_submission on ConsignmentSubmission {\n  provenance\n  signature\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n  state\n  myCollectionArtworkID\n}\n"
  }
};
})();

(node as any).hash = "08c04db3acc2c28d99e57974c58c0ce1";

export default node;
