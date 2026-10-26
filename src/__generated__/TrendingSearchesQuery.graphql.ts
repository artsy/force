/**
 * @generated SignedSource<<a8e857ffeae063d581265f907af02be9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TrendingSearchesQuery$variables = Record<PropertyKey, never>;
export type TrendingSearchesQuery$data = {
  readonly searchDropdown: {
    readonly trending: {
      readonly artists: ReadonlyArray<{
        readonly artist: {
          readonly coverArtwork: {
            readonly image: {
              readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
              } | null | undefined;
            } | null | undefined;
          } | null | undefined;
          readonly href: string | null | undefined;
          readonly initials: string | null | undefined;
          readonly internalID: string;
          readonly name: string | null | undefined;
          readonly slug: string;
        } | null | undefined;
        readonly internalID: string;
      }> | null | undefined;
      readonly artworks: ReadonlyArray<{
        readonly artwork: {
          readonly artistNames: string | null | undefined;
          readonly date: string | null | undefined;
          readonly href: string | null | undefined;
          readonly image: {
            readonly resized: {
              readonly height: number | null | undefined;
              readonly src: string;
              readonly srcSet: string;
              readonly width: number | null | undefined;
            } | null | undefined;
          } | null | undefined;
          readonly internalID: string;
          readonly partner: {
            readonly name: string | null | undefined;
          } | null | undefined;
          readonly saleMessage: string | null | undefined;
          readonly slug: string;
          readonly title: string | null | undefined;
          readonly " $fragmentSpreads": FragmentRefs<"SaveArtworkToListsButton_artwork">;
        } | null | undefined;
        readonly internalID: string;
      }> | null | undefined;
    } | null | undefined;
  };
};
export type TrendingSearchesQuery = {
  response: TrendingSearchesQuery$data;
  variables: TrendingSearchesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "period",
    "value": "ONE_DAY"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "initials",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v9 = {
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
          "value": 128
        },
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "square",
            "small",
            "large"
          ]
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 128
        }
      ],
      "concreteType": "CroppedImageUrl",
      "kind": "LinkedField",
      "name": "cropped",
      "plural": false,
      "selections": [
        (v7/*: any*/),
        (v8/*: any*/)
      ],
      "storageKey": "cropped(height:128,version:[\"square\",\"small\",\"large\"],width:128)"
    }
  ],
  "storageKey": null
},
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 8
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v15 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v16 = {
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
          "value": 280
        },
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "larger",
            "large",
            "medium"
          ]
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 240
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        (v7/*: any*/),
        (v8/*: any*/),
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
      "storageKey": "resized(height:280,version:[\"larger\",\"large\",\"medium\"],width:240)"
    }
  ],
  "storageKey": null
},
v17 = {
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
    "name": "TrendingSearchesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SearchDropdown",
        "kind": "LinkedField",
        "name": "searchDropdown",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "TrendingSearches",
            "kind": "LinkedField",
            "name": "trending",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "TrendingSearchArtist",
                "kind": "LinkedField",
                "name": "artists",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "coverArtwork",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "artists(first:12)"
              },
              {
                "alias": null,
                "args": (v10/*: any*/),
                "concreteType": "TrendingSearchArtwork",
                "kind": "LinkedField",
                "name": "artworks",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": (v15/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
                      },
                      (v16/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "SaveArtworkToListsButton_artwork"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "artworks(first:8)"
              }
            ],
            "storageKey": "trending(period:\"ONE_DAY\")"
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
    "name": "TrendingSearchesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SearchDropdown",
        "kind": "LinkedField",
        "name": "searchDropdown",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "TrendingSearches",
            "kind": "LinkedField",
            "name": "trending",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "TrendingSearchArtist",
                "kind": "LinkedField",
                "name": "artists",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "coverArtwork",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v17/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "artists(first:12)"
              },
              {
                "alias": null,
                "args": (v10/*: any*/),
                "concreteType": "TrendingSearchArtwork",
                "kind": "LinkedField",
                "name": "artworks",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": (v15/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v17/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
                      },
                      (v16/*: any*/),
                      (v17/*: any*/),
                      {
                        "alias": "preview",
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
                                "name": "version",
                                "value": "square"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"square\")"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isInAuction",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isSavedToAnyList",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CollectorSignals",
                        "kind": "LinkedField",
                        "name": "collectorSignals",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AuctionCollectorSignals",
                            "kind": "LinkedField",
                            "name": "auction",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotWatcherCount",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotClosesAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "liveBiddingStarted",
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
                  }
                ],
                "storageKey": "artworks(first:8)"
              }
            ],
            "storageKey": "trending(period:\"ONE_DAY\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0f53ae351c2f3d4aa92d83059d2604ab",
    "id": null,
    "metadata": {},
    "name": "TrendingSearchesQuery",
    "operationKind": "query",
    "text": "query TrendingSearchesQuery {\n  searchDropdown {\n    trending(period: ONE_DAY) {\n      artists(first: 12) {\n        internalID\n        artist {\n          internalID\n          slug\n          name\n          href\n          initials\n          coverArtwork {\n            image {\n              cropped(width: 128, height: 128, version: [\"square\", \"small\", \"large\"]) {\n                src\n                srcSet\n              }\n            }\n            id\n          }\n          id\n        }\n      }\n      artworks(first: 8) {\n        internalID\n        artwork {\n          internalID\n          slug\n          href\n          title\n          date\n          artistNames\n          saleMessage\n          partner(shallow: true) {\n            name\n            id\n          }\n          image {\n            resized(width: 240, height: 280, version: [\"larger\", \"large\", \"medium\"]) {\n              src\n              srcSet\n              width\n              height\n            }\n          }\n          ...SaveArtworkToListsButton_artwork\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToAnyList\n  collectorSignals {\n    auction {\n      lotWatcherCount\n      lotClosesAt\n      liveBiddingStarted\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2d7188dd26fb3326a2032621eea20a53";

export default node;
