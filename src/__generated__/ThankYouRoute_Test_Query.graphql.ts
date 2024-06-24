/**
 * @generated SignedSource<<e271ab2689eb3f1cdd207db9760f9125>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ThankYouRoute_Test_Query$variables = Record<PropertyKey, never>;
export type ThankYouRoute_Test_Query$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"SubmissionRoute_submission" | "ThankYouRoute_submission">;
  } | null | undefined;
};
export type ThankYouRoute_Test_Query$rawResponse = {
  readonly submission: {
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
  } | null | undefined;
};
export type ThankYouRoute_Test_Query = {
  rawResponse: ThankYouRoute_Test_Query$rawResponse;
  response: ThankYouRoute_Test_Query$data;
  variables: ThankYouRoute_Test_Query$variables;
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
    "name": "ThankYouRoute_Test_Query",
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
            "name": "ThankYouRoute_submission"
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
    "name": "ThankYouRoute_Test_Query",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "submission(id:\"submission-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "048040010cce16c223129a159ad12753",
    "id": null,
    "metadata": {},
    "name": "ThankYouRoute_Test_Query",
    "operationKind": "query",
    "text": "query ThankYouRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...SubmissionRoute_submission\n    ...ThankYouRoute_submission\n    id\n  }\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n}\n\nfragment ThankYouRoute_submission on ConsignmentSubmission {\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "ac0ec3a8a0855ede978ce4c9b3ae7d0c";

export default node;
