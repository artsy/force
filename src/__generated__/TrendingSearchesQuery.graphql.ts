/**
 * @generated SignedSource<<fb6e8756411f033af3d40705413cc59f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TrendingSearchesQuery$variables = {
  artistIds?: ReadonlyArray<string | null | undefined> | null | undefined;
  artworkIds?: ReadonlyArray<string | null | undefined> | null | undefined;
};
export type TrendingSearchesQuery$data = {
  readonly artists: ReadonlyArray<{
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
  } | null | undefined> | null | undefined;
  readonly artworks: {
    readonly edges: ReadonlyArray<{
      readonly node: {
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
        readonly " $fragmentSpreads": FragmentRefs<"SaveButton_artwork">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type TrendingSearchesQuery = {
  response: TrendingSearchesQuery$data;
  variables: TrendingSearchesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistIds"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkIds"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "artistIds"
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
          "value": 96
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
          "value": 96
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
      "storageKey": "cropped(height:96,version:[\"square\",\"small\",\"large\"],width:96)"
    }
  ],
  "storageKey": null
},
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "artworkIds"
  },
  {
    "kind": "Literal",
    "name": "respectParamsOrder",
    "value": true
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
          "value": 230
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
      "storageKey": "resized(height:230,version:[\"larger\",\"large\",\"medium\"],width:240)"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TrendingSearchesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artists",
        "plural": true,
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
      },
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": "ArtworkConnection",
        "kind": "LinkedField",
        "name": "artworks",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "node",
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
                    "name": "SaveButton_artwork"
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrendingSearchesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artists",
        "plural": true,
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
      },
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": "ArtworkConnection",
        "kind": "LinkedField",
        "name": "artworks",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "node",
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isSaved",
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
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "61f7c2be5310566766f91d81b92088b6",
    "id": null,
    "metadata": {},
    "name": "TrendingSearchesQuery",
    "operationKind": "query",
    "text": "query TrendingSearchesQuery(\n  $artistIds: [String]\n  $artworkIds: [String]\n) {\n  artists(ids: $artistIds) {\n    internalID\n    slug\n    name\n    href\n    initials\n    coverArtwork {\n      image {\n        cropped(width: 96, height: 96, version: [\"square\", \"small\", \"large\"]) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n  artworks(ids: $artworkIds, first: 50, respectParamsOrder: true) {\n    edges {\n      node {\n        internalID\n        slug\n        href\n        title\n        date\n        artistNames\n        saleMessage\n        partner(shallow: true) {\n          name\n          id\n        }\n        image {\n          resized(width: 240, height: 230, version: [\"larger\", \"large\", \"medium\"]) {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        ...SaveButton_artwork\n        id\n      }\n    }\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n  collectorSignals {\n    auction {\n      lotWatcherCount\n      lotClosesAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "39f319951144cc2111505ab123a12152";

export default node;
