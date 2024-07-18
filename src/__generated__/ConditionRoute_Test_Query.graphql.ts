/**
 * @generated SignedSource<<f782380f4d9c09eec6e903df119e11c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "SUBMITTED" | "%future added value";
export type ConditionRoute_Test_Query$variables = Record<PropertyKey, never>;
export type ConditionRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"ConditionRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type ConditionRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly myCollectionArtwork: {
      readonly artworkId: string;
      readonly condition: {
        readonly description: string | null | undefined;
        readonly value: string | null | undefined;
      } | null | undefined;
      readonly id: string;
    } | null | undefined;
    readonly state: ConsignmentSubmissionStateAggregation | null | undefined;
  } | null | undefined;
};
export type ConditionRoute_Test_Query = {
  rawResponse: ConditionRoute_Test_Query$rawResponse;
  response: ConditionRoute_Test_Query$data;
  variables: ConditionRoute_Test_Query$variables;
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
    "name": "ConditionRoute_Test_Query",
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
            "name": "ConditionRoute_submission"
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
    "name": "ConditionRoute_Test_Query",
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
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "myCollectionArtwork",
            "plural": false,
            "selections": [
              {
                "alias": "artworkId",
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkCondition",
                "kind": "LinkedField",
                "name": "condition",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
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
          (v1/*: any*/)
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "61a7e449891eb968fa357355a5ea5ff1",
    "id": null,
    "metadata": {},
    "name": "ConditionRoute_Test_Query",
    "operationKind": "query",
    "text": "query ConditionRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...ConditionRoute_submission\n    ...SubmissionRoute_submission\n    id\n  }\n}\n\nfragment ConditionRoute_submission on ConsignmentSubmission {\n  myCollectionArtwork {\n    artworkId: internalID\n    condition {\n      description\n      value\n    }\n    id\n  }\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n  state\n}\n"
  }
};
})();

(node as any).hash = "62410c32853ac737f0f25b4a0378cef2";

export default node;
