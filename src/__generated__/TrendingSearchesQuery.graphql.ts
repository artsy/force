/**
 * @generated SignedSource<<04628f6e9a4d47ce601deb695d6118b0>>
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
    readonly oneDay: {
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
      readonly label: string;
    } | null | undefined;
    readonly sevenDays: {
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
      readonly label: string;
    } | null | undefined;
    readonly thirtyDays: {
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
      readonly label: string;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "initials",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v10 = {
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
        (v8/*: any*/),
        (v9/*: any*/)
      ],
      "storageKey": "cropped(height:128,version:[\"square\",\"small\",\"large\"],width:128)"
    }
  ],
  "storageKey": null
},
v11 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 8
  }
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v16 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v17 = {
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
        (v8/*: any*/),
        (v9/*: any*/),
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
v18 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": (v2/*: any*/),
    "concreteType": "TrendingSearchArtist",
    "kind": "LinkedField",
    "name": "artists",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "coverArtwork",
            "plural": false,
            "selections": [
              (v10/*: any*/)
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
    "args": (v11/*: any*/),
    "concreteType": "TrendingSearchArtwork",
    "kind": "LinkedField",
    "name": "artworks",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          {
            "alias": null,
            "args": (v16/*: any*/),
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v5/*: any*/)
            ],
            "storageKey": "partner(shallow:true)"
          },
          (v17/*: any*/),
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
v19 = [
  {
    "kind": "Literal",
    "name": "period",
    "value": "SEVEN_DAYS"
  }
],
v20 = [
  {
    "kind": "Literal",
    "name": "period",
    "value": "THIRTY_DAYS"
  }
],
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v22 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": (v2/*: any*/),
    "concreteType": "TrendingSearchArtist",
    "kind": "LinkedField",
    "name": "artists",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "coverArtwork",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              (v21/*: any*/)
            ],
            "storageKey": null
          },
          (v21/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": "artists(first:12)"
  },
  {
    "alias": null,
    "args": (v11/*: any*/),
    "concreteType": "TrendingSearchArtwork",
    "kind": "LinkedField",
    "name": "artworks",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          {
            "alias": null,
            "args": (v16/*: any*/),
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v21/*: any*/)
            ],
            "storageKey": "partner(shallow:true)"
          },
          (v17/*: any*/),
          (v21/*: any*/),
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
];
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
            "alias": "oneDay",
            "args": (v0/*: any*/),
            "concreteType": "TrendingSearches",
            "kind": "LinkedField",
            "name": "trending",
            "plural": false,
            "selections": (v18/*: any*/),
            "storageKey": "trending(period:\"ONE_DAY\")"
          },
          {
            "alias": "sevenDays",
            "args": (v19/*: any*/),
            "concreteType": "TrendingSearches",
            "kind": "LinkedField",
            "name": "trending",
            "plural": false,
            "selections": (v18/*: any*/),
            "storageKey": "trending(period:\"SEVEN_DAYS\")"
          },
          {
            "alias": "thirtyDays",
            "args": (v20/*: any*/),
            "concreteType": "TrendingSearches",
            "kind": "LinkedField",
            "name": "trending",
            "plural": false,
            "selections": (v18/*: any*/),
            "storageKey": "trending(period:\"THIRTY_DAYS\")"
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
            "alias": "oneDay",
            "args": (v0/*: any*/),
            "concreteType": "TrendingSearches",
            "kind": "LinkedField",
            "name": "trending",
            "plural": false,
            "selections": (v22/*: any*/),
            "storageKey": "trending(period:\"ONE_DAY\")"
          },
          {
            "alias": "sevenDays",
            "args": (v19/*: any*/),
            "concreteType": "TrendingSearches",
            "kind": "LinkedField",
            "name": "trending",
            "plural": false,
            "selections": (v22/*: any*/),
            "storageKey": "trending(period:\"SEVEN_DAYS\")"
          },
          {
            "alias": "thirtyDays",
            "args": (v20/*: any*/),
            "concreteType": "TrendingSearches",
            "kind": "LinkedField",
            "name": "trending",
            "plural": false,
            "selections": (v22/*: any*/),
            "storageKey": "trending(period:\"THIRTY_DAYS\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3a94f8a4e2d244bbab92e559921f9816",
    "id": null,
    "metadata": {},
    "name": "TrendingSearchesQuery",
    "operationKind": "query",
    "text": "query TrendingSearchesQuery {\n  searchDropdown {\n    oneDay: trending(period: ONE_DAY) {\n      label\n      artists(first: 12) {\n        internalID\n        artist {\n          internalID\n          slug\n          name\n          href\n          initials\n          coverArtwork {\n            image {\n              cropped(width: 128, height: 128, version: [\"square\", \"small\", \"large\"]) {\n                src\n                srcSet\n              }\n            }\n            id\n          }\n          id\n        }\n      }\n      artworks(first: 8) {\n        internalID\n        artwork {\n          internalID\n          slug\n          href\n          title\n          date\n          artistNames\n          saleMessage\n          partner(shallow: true) {\n            name\n            id\n          }\n          image {\n            resized(width: 240, height: 280, version: [\"larger\", \"large\", \"medium\"]) {\n              src\n              srcSet\n              width\n              height\n            }\n          }\n          ...SaveArtworkToListsButton_artwork\n          id\n        }\n      }\n    }\n    sevenDays: trending(period: SEVEN_DAYS) {\n      label\n      artists(first: 12) {\n        internalID\n        artist {\n          internalID\n          slug\n          name\n          href\n          initials\n          coverArtwork {\n            image {\n              cropped(width: 128, height: 128, version: [\"square\", \"small\", \"large\"]) {\n                src\n                srcSet\n              }\n            }\n            id\n          }\n          id\n        }\n      }\n      artworks(first: 8) {\n        internalID\n        artwork {\n          internalID\n          slug\n          href\n          title\n          date\n          artistNames\n          saleMessage\n          partner(shallow: true) {\n            name\n            id\n          }\n          image {\n            resized(width: 240, height: 280, version: [\"larger\", \"large\", \"medium\"]) {\n              src\n              srcSet\n              width\n              height\n            }\n          }\n          ...SaveArtworkToListsButton_artwork\n          id\n        }\n      }\n    }\n    thirtyDays: trending(period: THIRTY_DAYS) {\n      label\n      artists(first: 12) {\n        internalID\n        artist {\n          internalID\n          slug\n          name\n          href\n          initials\n          coverArtwork {\n            image {\n              cropped(width: 128, height: 128, version: [\"square\", \"small\", \"large\"]) {\n                src\n                srcSet\n              }\n            }\n            id\n          }\n          id\n        }\n      }\n      artworks(first: 8) {\n        internalID\n        artwork {\n          internalID\n          slug\n          href\n          title\n          date\n          artistNames\n          saleMessage\n          partner(shallow: true) {\n            name\n            id\n          }\n          image {\n            resized(width: 240, height: 280, version: [\"larger\", \"large\", \"medium\"]) {\n              src\n              srcSet\n              width\n              height\n            }\n          }\n          ...SaveArtworkToListsButton_artwork\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToAnyList\n  collectorSignals {\n    auction {\n      lotWatcherCount\n      lotClosesAt\n      liveBiddingStarted\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0dc9c9d532121fe2666a7c73dfd758e3";

export default node;
