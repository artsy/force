/**
 * @generated SignedSource<<b82c1eeaa3b47737ffd4b11a8e326b31>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProgressiveOnboardingSaveArtworkQuery$variables = {};
export type ProgressiveOnboardingSaveArtworkQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ProgressiveOnboardingSaveArtwork_me">;
  } | null;
};
export type ProgressiveOnboardingSaveArtworkQuery = {
  response: ProgressiveOnboardingSaveArtworkQuery$data;
  variables: ProgressiveOnboardingSaveArtworkQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProgressiveOnboardingSaveArtworkQuery",
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
            "name": "ProgressiveOnboardingSaveArtwork_me"
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
    "name": "ProgressiveOnboardingSaveArtworkQuery",
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
                "name": "savedArtworks",
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
    "cacheID": "1786a7a4823be2f01bd460132c83e81f",
    "id": null,
    "metadata": {},
    "name": "ProgressiveOnboardingSaveArtworkQuery",
    "operationKind": "query",
    "text": "query ProgressiveOnboardingSaveArtworkQuery {\n  me {\n    ...ProgressiveOnboardingSaveArtwork_me\n    id\n  }\n}\n\nfragment ProgressiveOnboardingSaveArtwork_me on Me {\n  counts {\n    savedArtworks\n  }\n}\n"
  }
};

(node as any).hash = "ab50bc14b2d66c95bbecb1497681671a";

export default node;
