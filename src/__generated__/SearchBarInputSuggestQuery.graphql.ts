/**
 * @generated SignedSource<<de14a06d73355c608dae1d4c83e10c2c>>
 * @relayHash 04d19cea2adb45006b8bd09c434abffc
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 04d19cea2adb45006b8bd09c434abffc

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchEntity = "ARTICLE" | "ARTIST" | "ARTIST_SERIES" | "ARTWORK" | "CITY" | "COLLECTION" | "FAIR" | "FEATURE" | "GALLERY" | "GENE" | "INSTITUTION" | "PAGE" | "PROFILE" | "SALE" | "SHOW" | "TAG" | "VIEWING_ROOM" | "%future added value";
export type SearchBarInputSuggestQuery$variables = {
  entities?: ReadonlyArray<SearchEntity | null | undefined> | null | undefined;
  hasTerm: boolean;
  term: string;
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
  "kind": "Literal",
  "name": "mode",
  "value": "AUTOSUGGEST"
},
v4 = {
  "kind": "Variable",
  "name": "query",
  "variableName": "term"
},
v5 = [
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
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayLabel",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "kind": "InlineFragment",
  "selections": [
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
v11 = {
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
v12 = {
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
v13 = {
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
      (v2/*: any*/)
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
                "args": (v5/*: any*/),
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
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "coverArtwork",
                                "plural": false,
                                "selections": [
                                  (v12/*: any*/)
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
      (v0/*: any*/)
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
              (v3/*: any*/),
              (v4/*: any*/)
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
                "args": (v5/*: any*/),
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
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "coverArtwork",
                                "plural": false,
                                "selections": [
                                  (v12/*: any*/),
                                  (v13/*: any*/)
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
                              (v13/*: any*/)
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
    "id": "04d19cea2adb45006b8bd09c434abffc",
    "metadata": {},
    "name": "SearchBarInputSuggestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "24a8f0c826080a6d521d3bbd1bad13a1";

export default node;
