/**
 * @generated SignedSource<<68098813518c24612d1edc3a81663d8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizArtworks_Test_Query$variables = Record<PropertyKey, never>;
export type ArtQuizArtworks_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtQuizArtworks_me">;
  } | null | undefined;
};
export type ArtQuizArtworks_Test_Query = {
  response: ArtQuizArtworks_Test_Query$data;
  variables: ArtQuizArtworks_Test_Query$variables;
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
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v4 = [
  (v2/*: any*/),
  (v0/*: any*/)
],
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtQuizArtworks_Test_Query",
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
            "name": "ArtQuizArtworks_me"
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
    "name": "ArtQuizArtworks_Test_Query",
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
          (v1/*: any*/),
          (v2/*: any*/),
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
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 16
                  }
                ],
                "concreteType": "QuizArtworkConnection",
                "kind": "LinkedField",
                "name": "quizArtworkConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "QuizArtworkEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "interactedAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "dominantColors",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "culturalMaker",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": (v3/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": (v4/*: any*/),
                            "storageKey": "artists(shallow:true)"
                          },
                          {
                            "alias": null,
                            "args": (v3/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": "partner(shallow:true)"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 900
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": [
                                      "main",
                                      "normalized",
                                      "larger",
                                      "large"
                                    ]
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 900
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "src",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "srcSet",
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
                                  }
                                ],
                                "storageKey": "resized(height:900,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:900)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isDisliked",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSaved",
                            "storageKey": null
                          },
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "quizArtworkConnection(first:16)"
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "774266f425fa3d3aa8957f16871fb440",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v5/*: any*/),
        "me.internalID": (v5/*: any*/),
        "me.name": (v6/*: any*/),
        "me.quiz": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Quiz"
        },
        "me.quiz.id": (v5/*: any*/),
        "me.quiz.quizArtworkConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "QuizArtworkConnection"
        },
        "me.quiz.quizArtworkConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "QuizArtworkEdge"
        },
        "me.quiz.quizArtworkConnection.edges.interactedAt": (v6/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.quiz.quizArtworkConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.quiz.quizArtworkConnection.edges.node.artists.id": (v5/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.artists.name": (v6/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.culturalMaker": (v6/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.date": (v6/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.dominantColors": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "me.quiz.quizArtworkConnection.edges.node.id": (v5/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.quiz.quizArtworkConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "me.quiz.quizArtworkConnection.edges.node.image.resized.height": (v7/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.image.resized.src": (v8/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.image.resized.srcSet": (v8/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.image.resized.width": (v7/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.internalID": (v5/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.isDisliked": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.quiz.quizArtworkConnection.edges.node.isSaved": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.quiz.quizArtworkConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.quiz.quizArtworkConnection.edges.node.partner.id": (v5/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.partner.name": (v6/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.slug": (v5/*: any*/),
        "me.quiz.quizArtworkConnection.edges.node.title": (v6/*: any*/)
      }
    },
    "name": "ArtQuizArtworks_Test_Query",
    "operationKind": "query",
    "text": "query ArtQuizArtworks_Test_Query {\n  me {\n    ...ArtQuizArtworks_me\n    id\n  }\n}\n\nfragment ArtQuizArtworksCardMetadata_artwork on Artwork {\n  title\n  date\n  dominantColors\n  culturalMaker\n  artists(shallow: true) {\n    name\n    id\n  }\n  partner(shallow: true) {\n    name\n    id\n  }\n}\n\nfragment ArtQuizArtworksCard_artwork on Artwork {\n  ...ArtQuizArtworksCardMetadata_artwork\n  image {\n    resized(width: 900, height: 900, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ArtQuizArtworks_me on Me {\n  id\n  internalID\n  name\n  quiz {\n    quizArtworkConnection(first: 16) {\n      edges {\n        interactedAt\n        node {\n          ...ArtQuizArtworksCard_artwork\n          internalID\n          slug\n          isDisliked\n          isSaved\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f284f1e055d060048d333081794ba7b1";

export default node;
