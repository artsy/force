/**
 * @generated SignedSource<<52046e3603a272c13213c20e2c919c03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ProgressiveOnboardingContextQuery$variables = {};
export type ProgressiveOnboardingContextQuery$data = {
  readonly me: {
    readonly followsAndSaves: {
      readonly artistsConnection: {
        readonly totalCount: number | null;
      } | null;
      readonly artworksConnection: {
        readonly totalCount: number | null;
      } | null;
    } | null;
  } | null;
};
export type ProgressiveOnboardingContextQuery = {
  response: ProgressiveOnboardingContextQuery$data;
  variables: ProgressiveOnboardingContextQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "FollowsAndSaves",
  "kind": "LinkedField",
  "name": "followsAndSaves",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "FollowArtistConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "artistsConnection(first:1)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "SavedArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "artworksConnection(first:1)"
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProgressiveOnboardingContextQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "ProgressiveOnboardingContextQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "cacheID": "fa207d0d81535d2f2867982b242358b3",
    "id": null,
    "metadata": {},
    "name": "ProgressiveOnboardingContextQuery",
    "operationKind": "query",
    "text": "query ProgressiveOnboardingContextQuery {\n  me {\n    followsAndSaves {\n      artistsConnection(first: 1) {\n        totalCount\n      }\n      artworksConnection(first: 1) {\n        totalCount\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6da284aedabe7b9346e82aca5f9bae09";

export default node;
