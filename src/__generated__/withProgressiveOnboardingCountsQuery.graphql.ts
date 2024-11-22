/**
 * @generated SignedSource<<66927f203cdfee6adfb6ed6636858c53>>
 * @relayHash 457c3f65a942f5ee7d59891f512aa0b4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 457c3f65a942f5ee7d59891f512aa0b4

import { ConcreteRequest, Query } from 'relay-runtime';
export type withProgressiveOnboardingCountsQuery$variables = Record<PropertyKey, never>;
export type withProgressiveOnboardingCountsQuery$data = {
  readonly me: {
    readonly counts: {
      readonly followedArtists: number;
      readonly followedProfiles: number;
      readonly savedArtworks: number;
      readonly savedSearches: number;
    } | null | undefined;
  } | null | undefined;
};
export type withProgressiveOnboardingCountsQuery = {
  response: withProgressiveOnboardingCountsQuery$data;
  variables: withProgressiveOnboardingCountsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
      "name": "followedProfiles",
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "withProgressiveOnboardingCountsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
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
    "name": "withProgressiveOnboardingCountsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    "id": "457c3f65a942f5ee7d59891f512aa0b4",
    "metadata": {},
    "name": "withProgressiveOnboardingCountsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "563c912e49346cb7841595f74dbdc70e";

export default node;
