/**
 * @generated SignedSource<<7f92aa7bcf36c4bf2f063a4799a9512e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
    "cacheID": "3ad249d6845805f20627f5ab271251e3",
    "id": null,
    "metadata": {},
    "name": "DimensionsRoute_Test_Query",
    "operationKind": "query",
    "text": "query DimensionsRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...SubmissionRoute_submission\n    ...DimensionsRoute_submission\n    id\n  }\n}\n\nfragment DimensionsRoute_submission on ConsignmentSubmission {\n  width\n  height\n  depth\n  dimensionsMetric\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n}\n"
  }
};
})();

(node as any).hash = "c454a2ccb797f504cb8f422625d21f3a";

export default node;
