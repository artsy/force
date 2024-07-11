/**
 * @generated SignedSource<<8b0f7a3a0b3d4f235236683a4a07ceca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "SUBMITTED" | "%future added value";
export type ShippingLocationRoute_Test_Query$variables = Record<PropertyKey, never>;
export type ShippingLocationRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"ShippingLocationRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type ShippingLocationRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly locationCity: string | null | undefined;
    readonly locationCountry: string | null | undefined;
    readonly locationPostalCode: string | null | undefined;
    readonly locationState: string | null | undefined;
    readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
  } | null | undefined;
};
export type ShippingLocationRoute_Test_Query = {
  rawResponse: ShippingLocationRoute_Test_Query$rawResponse;
  response: ShippingLocationRoute_Test_Query$data;
  variables: ShippingLocationRoute_Test_Query$variables;
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
    "name": "ShippingLocationRoute_Test_Query",
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
            "name": "ShippingLocationRoute_submission"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmissionRoute_submission"
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
    "name": "ShippingLocationRoute_Test_Query",
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
            "name": "locationCity",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationCountry",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationPostalCode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationState",
            "storageKey": null
          },
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "00c858d737e8b420a5fcf09a5097157c",
    "id": null,
    "metadata": {},
    "name": "ShippingLocationRoute_Test_Query",
    "operationKind": "query",
    "text": "query ShippingLocationRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...ShippingLocationRoute_submission\n    ...SubmissionRoute_submission\n    id\n  }\n}\n\nfragment ShippingLocationRoute_submission on ConsignmentSubmission {\n  locationCity\n  locationCountry\n  locationPostalCode\n  locationState\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n  state\n}\n"
  }
};
})();

(node as any).hash = "c740ebb31f78b3b094bd94734591d988";

export default node;
