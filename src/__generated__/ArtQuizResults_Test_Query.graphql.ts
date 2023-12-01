/**
 * @generated SignedSource<<d99bffdba355bf904e3782b52ae7f7aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizResults_Test_Query$variables = Record<PropertyKey, never>;
export type ArtQuizResults_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtQuizResults_me">;
  } | null | undefined;
};
export type ArtQuizResults_Test_Query = {
  response: ArtQuizResults_Test_Query$data;
  variables: ArtQuizResults_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtQuizResults_Test_Query",
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
    "name": "ArtQuizResults_Test_Query",
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
    "cacheID": "20e38823a7e414780e591437d7916616",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v1/*: any*/),
        "me.quiz": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Quiz"
        },
        "me.quiz.id": (v1/*: any*/),
        "me.quiz.savedArtworks": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Artwork"
        },
        "me.quiz.savedArtworks.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "me.quiz.savedArtworks.id": (v1/*: any*/)
      }
    },
    "name": "ArtQuizResults_Test_Query",
    "operationKind": "query",
    "text": "query ArtQuizResults_Test_Query {\n  me {\n    ...ArtQuizResults_me\n    id\n  }\n}\n\nfragment ArtQuizResults_me on Me {\n  quiz {\n    savedArtworks {\n      __typename\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "526acb35ec209a529ac48b04e417135c";

export default node;
