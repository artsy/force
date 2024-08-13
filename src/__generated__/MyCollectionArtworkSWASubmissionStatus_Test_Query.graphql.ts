/**
 * @generated SignedSource<<dc7339a7e1c2fbf321cb74476da78dfb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkConsignmentSubmissionState = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
export type MyCollectionArtworkSWASubmissionStatus_Test_Query$variables = Record<PropertyKey, never>;
export type MyCollectionArtworkSWASubmissionStatus_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSWASubmissionStatus_artwork">;
  } | null | undefined;
};
export type MyCollectionArtworkSWASubmissionStatus_Test_Query$rawResponse = {
  readonly artwork: {
    readonly consignmentSubmission: {
      readonly actionLabel: string | null | undefined;
      readonly buttonLabel: string | null | undefined;
      readonly externalID: string | null | undefined;
      readonly internalID: string | null | undefined;
      readonly state: ArtworkConsignmentSubmissionState;
      readonly stateHelpMessage: string | null | undefined;
      readonly stateLabel: string | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly internalID: string;
    readonly listedArtworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly internalID: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
};
export type MyCollectionArtworkSWASubmissionStatus_Test_Query = {
  rawResponse: MyCollectionArtworkSWASubmissionStatus_Test_Query$rawResponse;
  response: MyCollectionArtworkSWASubmissionStatus_Test_Query$data;
  variables: MyCollectionArtworkSWASubmissionStatus_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
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
    "name": "MyCollectionArtworkSWASubmissionStatus_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionArtworkSWASubmissionStatus_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionArtworkSWASubmissionStatus_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "listedArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "listedArtworksConnection(first:1)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkConsignmentSubmission",
            "kind": "LinkedField",
            "name": "consignmentSubmission",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "actionLabel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "buttonLabel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "externalID",
                "storageKey": null
              },
              (v1/*: any*/),
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
                "name": "stateLabel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "stateHelpMessage",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "6cc74d6f71fd40197d17929d7d8ea0f1",
    "id": null,
    "metadata": {},
    "name": "MyCollectionArtworkSWASubmissionStatus_Test_Query",
    "operationKind": "query",
    "text": "query MyCollectionArtworkSWASubmissionStatus_Test_Query {\n  artwork(id: \"artwork-id\") {\n    ...MyCollectionArtworkSWASubmissionStatus_artwork\n    id\n  }\n}\n\nfragment MyCollectionArtworkSWASubmissionStatus_artwork on Artwork {\n  internalID\n  listedArtworksConnection(first: 1) {\n    edges {\n      node {\n        internalID\n        id\n      }\n    }\n  }\n  consignmentSubmission {\n    actionLabel\n    buttonLabel\n    externalID\n    internalID\n    state\n    stateLabel\n    stateHelpMessage\n  }\n}\n"
  }
};
})();

(node as any).hash = "cdf09a904d955f920e143ce95c12d771";

export default node;
