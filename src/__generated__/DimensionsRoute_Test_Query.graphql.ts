/**
 * @generated SignedSource<<2a2d05493d834fe572adc60397cd2a50>>
 * @relayHash f149fc467f69a8f9c052822c4a66893b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f149fc467f69a8f9c052822c4a66893b

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
export type DimensionsRoute_Test_Query$variables = Record<PropertyKey, never>;
export type DimensionsRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"DimensionsRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type DimensionsRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly depth: string | null | undefined;
    readonly dimensionsMetric: string | null | undefined;
    readonly externalId: string;
    readonly height: string | null | undefined;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly myCollectionArtworkID: string | null | undefined;
    readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
    readonly width: string | null | undefined;
  } | null | undefined;
};
export type DimensionsRoute_Test_Query = {
  rawResponse: DimensionsRoute_Test_Query$rawResponse;
  response: DimensionsRoute_Test_Query$data;
  variables: DimensionsRoute_Test_Query$variables;
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
    "name": "DimensionsRoute_Test_Query",
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
            "name": "DimensionsRoute_submission"
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
    "name": "DimensionsRoute_Test_Query",
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
            "name": "width",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "height",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "depth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dimensionsMetric",
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
    "id": "f149fc467f69a8f9c052822c4a66893b",
    "metadata": {},
    "name": "DimensionsRoute_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "c454a2ccb797f504cb8f422625d21f3a";

export default node;
