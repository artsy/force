/**
 * @generated SignedSource<<9e4599fe20410dbab8f092c5caffdfd0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artQuizRoutes_ArtQuizResultsQuery$variables = Record<PropertyKey, never>;
export type artQuizRoutes_ArtQuizResultsQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtQuizResults_me">;
  } | null | undefined;
};
export type artQuizRoutes_ArtQuizResultsQuery = {
  response: artQuizRoutes_ArtQuizResultsQuery$data;
  variables: artQuizRoutes_ArtQuizResultsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
    "name": "artQuizRoutes_ArtQuizResultsQuery",
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
            "name": "ArtQuizResults_me"
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
    "name": "artQuizRoutes_ArtQuizResultsQuery",
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
            "concreteType": "Quiz",
            "kind": "LinkedField",
            "name": "quiz",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "savedArtworks",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c3c90f87fea90b57c3ee3e0eaf1f00b8",
    "id": null,
    "metadata": {},
    "name": "artQuizRoutes_ArtQuizResultsQuery",
    "operationKind": "query",
    "text": "query artQuizRoutes_ArtQuizResultsQuery {\n  me {\n    ...ArtQuizResults_me\n    id\n  }\n}\n\nfragment ArtQuizResults_me on Me {\n  quiz {\n    savedArtworks {\n      __typename\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "622889a7b10db3cbd72a4ebc323f5bd8";

export default node;
