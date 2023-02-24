/**
 * @generated SignedSource<<115611549fc52c58a57b1eebec6ba035>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProgressiveOnboardingFollowArtistQuery$variables = {};
export type ProgressiveOnboardingFollowArtistQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ProgressiveOnboardingFollowArtist_me">;
  } | null;
};
export type ProgressiveOnboardingFollowArtistQuery = {
  response: ProgressiveOnboardingFollowArtistQuery$data;
  variables: ProgressiveOnboardingFollowArtistQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProgressiveOnboardingFollowArtistQuery",
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
            "name": "ProgressiveOnboardingFollowArtist_me"
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
    "name": "ProgressiveOnboardingFollowArtistQuery",
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
    "cacheID": "bec175881002e9f0f50066e5f1fdc296",
    "id": null,
    "metadata": {},
    "name": "ProgressiveOnboardingFollowArtistQuery",
    "operationKind": "query",
    "text": "query ProgressiveOnboardingFollowArtistQuery {\n  me {\n    ...ProgressiveOnboardingFollowArtist_me\n    id\n  }\n}\n\nfragment ProgressiveOnboardingFollowArtist_me on Me {\n  counts {\n    followedArtists\n  }\n}\n"
  }
};

(node as any).hash = "d30b8c2afc3184723efadb9750ed9428";

export default node;
