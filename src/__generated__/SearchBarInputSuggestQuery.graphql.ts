/**
 * @generated SignedSource<<afeb378f2ad0cd9fd4241f432f6d24ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchEntity = "ARTICLE" | "ARTIST" | "ARTIST_SERIES" | "ARTWORK" | "CITY" | "COLLECTION" | "FAIR" | "FEATURE" | "GALLERY" | "GENE" | "INSTITUTION" | "PAGE" | "PROFILE" | "SALE" | "SHOW" | "TAG" | "VIDEO" | "VIEWING_ROOM" | "%future added value";
export type SearchBarInputSuggestQuery$variables = {
  entities?: ReadonlyArray<SearchEntity | null | undefined> | null | undefined;
  hasTerm: boolean;
  term: string;
  variant?: string | null | undefined;
};
export type SearchBarInputSuggestQuery$data = {
  readonly viewer: {
    readonly searchConnection?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly __typename: string;
          readonly coverArtwork?: {
            readonly image: {
              readonly src: string | null | undefined;
            } | null | undefined;
          } | null | undefined;
          readonly displayLabel: string | null | undefined;
          readonly displayType?: string | null | undefined;
          readonly href: string | null | undefined;
          readonly imageUrl: string | null | undefined;
          readonly internalID?: string;
          readonly slug?: string;
          readonly statuses?: {
            readonly artworks: boolean | null | undefined;
            readonly auctionLots: boolean | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"SearchInputPills_viewer">;
  } | null | undefined;
};
export type SearchBarInputSuggestQuery = {
  response: SearchBarInputSuggestQuery$data;
  variables: SearchBarInputSuggestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "entities"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasTerm"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "term"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "variant"
},
v4 = {
  "kind": "Literal",
  "name": "mode",
  "value": "AUTOSUGGEST"
},
v5 = {
  "kind": "Variable",
  "name": "query",
  "variableName": "term"
},
v6 = [
  {
    "kind": "Variable",
    "name": "entities",
    "variableName": "entities"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 7
  },
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "kind": "Variable",
    "name": "variant",
    "variableName": "variant"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayLabel",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v12 = {
  "kind": "InlineFragment",
  "selections": [
    (v11/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "SearchableItem",
  "abstractKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtistStatuses",
  "kind": "LinkedField",
  "name": "statuses",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artworks",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "auctionLots",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": "src",
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "square"
          ]
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"square\"])"
    }
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchBarInputSuggestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "term",
                "variableName": "term"
              }
            ],
            "kind": "FragmentSpread",
            "name": "SearchInputPills_viewer"
          },
          {
            "condition": "hasTerm",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "SearchableConnection",
                "kind": "LinkedField",
                "name": "searchConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SearchableEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v12/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/),
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "coverArtwork",
                                "plural": false,
                                "selections": [
                                  (v14/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "Artist",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ]
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "SearchBarInputSuggestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "searchConnectionAggregation",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TYPE"
                ]
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 0
              },
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "concreteType": "SearchableConnection",
            "kind": "LinkedField",
            "name": "searchConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "condition": "hasTerm",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "SearchableConnection",
                "kind": "LinkedField",
                "name": "searchConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SearchableEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v12/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/),
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "coverArtwork",
                                "plural": false,
                                "selections": [
                                  (v14/*: any*/),
                                  (v15/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "Artist",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v15/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1004d9bb4cb290cad1ee16377091a7f3",
    "id": null,
    "metadata": {},
    "name": "SearchBarInputSuggestQuery",
    "operationKind": "query",
    "text": "query SearchBarInputSuggestQuery(\n  $term: String!\n  $hasTerm: Boolean!\n  $entities: [SearchEntity]\n  $variant: String\n) {\n  viewer {\n    ...SearchInputPills_viewer_4hh6ED\n    searchConnection(query: $term, entities: $entities, mode: AUTOSUGGEST, first: 7, variant: $variant) @include(if: $hasTerm) {\n      edges {\n        node {\n          displayLabel\n          href\n          imageUrl\n          __typename\n          ... on SearchableItem {\n            internalID\n            displayType\n            slug\n          }\n          ... on Artist {\n            internalID\n            statuses {\n              artworks\n              auctionLots\n            }\n            coverArtwork {\n              image {\n                src: url(version: [\"square\"])\n              }\n              id\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment SearchInputPills_viewer_4hh6ED on Viewer {\n  searchConnectionAggregation: searchConnection(first: 0, mode: AUTOSUGGEST, query: $term, aggregations: [TYPE]) {\n    aggregations {\n      counts {\n        count\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "af2a63a12a66851b61da955e57c24545";

export default node;
