/**
 * @generated SignedSource<<f14b51381482a8c373a1204a3789a5dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProgressiveOnboardingCountsQuery$variables = {};
export type ProgressiveOnboardingCountsQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ProgressiveOnboardingCounts_me">;
  } | null;
};
export type ProgressiveOnboardingCountsQuery = {
  response: ProgressiveOnboardingCountsQuery$data;
  variables: ProgressiveOnboardingCountsQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProgressiveOnboardingCountsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProgressiveOnboardingCounts_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProgressiveOnboardingCountsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MeCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "followedArtists",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "savedArtworks",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "savedSearches",
                "storageKey": null
              }
            ],
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8b8a74124a0ba09c3e76970c9e9f7599",
    "id": null,
    "metadata": {},
    "name": "ProgressiveOnboardingCountsQuery",
    "operationKind": "query",
    "text": "query ProgressiveOnboardingCountsQuery {\n  me {\n    ...ProgressiveOnboardingCounts_me\n    id\n  }\n}\n\nfragment ProgressiveOnboardingCounts_me on Me {\n  counts {\n    followedArtists\n    savedArtworks\n    savedSearches\n  }\n}\n"
  }
};

(node as any).hash = "030f410defdea35307c0f1ace885f9b8";

export default node;
