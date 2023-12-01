/**
 * @generated SignedSource<<ce2c9bec1e582bc9fd6b871b6efc0814>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistsRoutes_ArtistsQuery$variables = Record<PropertyKey, never>;
export type artistsRoutes_ArtistsQuery$data = {
  readonly featuredArtists: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArtistsIndex_featuredArtists">;
  } | null | undefined> | null | undefined;
  readonly featuredGenes: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArtistsIndex_featuredGenes">;
  } | null | undefined> | null | undefined;
};
export type artistsRoutes_ArtistsQuery = {
  response: artistsRoutes_ArtistsQuery$data;
  variables: artistsRoutes_ArtistsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "key",
    "value": "homepage:featured-artists"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "key",
    "value": "artists:featured-genes"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "name": "formattedNationalityAndBirthday",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v7/*: any*/)
],
v9 = {
  "kind": "InlineFragment",
  "selections": (v8/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v12 = {
  "kind": "InlineFragment",
  "selections": (v8/*: any*/),
  "type": "Profile",
  "abstractKey": null
},
v13 = [
  (v10/*: any*/),
  (v11/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "artistsRoutes_ArtistsQuery",
    "selections": [
      {
        "alias": "featuredArtists",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistsIndex_featuredArtists"
          }
        ],
        "storageKey": "orderedSets(key:\"homepage:featured-artists\")"
      },
      {
        "alias": "featuredGenes",
        "args": (v1/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistsIndex_featuredGenes"
          }
        ],
        "storageKey": "orderedSets(key:\"artists:featured-genes\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "artistsRoutes_ArtistsQuery",
    "selections": [
      {
        "alias": "featuredArtists",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": "artists",
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
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
                    "name": "subtitle",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "entity",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v4/*: any*/),
                          (v2/*: any*/),
                          (v6/*: any*/)
                        ],
                        "type": "Artist",
                        "abstractKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
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
                        "alias": "thumb",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 450
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "wide"
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 600
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": [
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
                          },
                          (v10/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": "cropped(height:450,version:\"wide\",width:600)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "type": "FeaturedLink",
                "abstractKey": null
              },
              (v9/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": "orderedSets(key:\"homepage:featured-artists\")"
      },
      {
        "alias": "featuredGenes",
        "args": (v1/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": "genes",
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  (v2/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "sample",
                        "value": 4
                      }
                    ],
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "trendingArtists",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "initials",
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtistCounts",
                        "kind": "LinkedField",
                        "name": "counts",
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
                            "name": "forSaleArtworks",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "coverArtwork",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "avatar",
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
                                    "value": 45
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 45
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": (v13/*: any*/),
                                "storageKey": "cropped(height:45,width:45)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v7/*: any*/),
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
                                    "value": 334
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": [
                                      "larger",
                                      "large"
                                    ]
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 445
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": (v13/*: any*/),
                                "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": "trendingArtists(sample:4)"
                  }
                ],
                "type": "Gene",
                "abstractKey": null
              },
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v8/*: any*/),
                "type": "FeaturedLink",
                "abstractKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": "orderedSets(key:\"artists:featured-genes\")"
      }
    ]
  },
  "params": {
    "cacheID": "1dabb4016f64d991f5ba5c978aed33b3",
    "id": null,
    "metadata": {},
    "name": "artistsRoutes_ArtistsQuery",
    "operationKind": "query",
    "text": "query artistsRoutes_ArtistsQuery {\n  featuredArtists: orderedSets(key: \"homepage:featured-artists\") {\n    ...ArtistsIndex_featuredArtists\n    id\n  }\n  featuredGenes: orderedSets(key: \"artists:featured-genes\") {\n    ...ArtistsIndex_featuredGenes\n    id\n  }\n}\n\nfragment ArtistsCarouselCell_featuredLink on FeaturedLink {\n  internalID\n  title\n  subtitle\n  href\n  entity {\n    __typename\n    ... on Artist {\n      internalID\n      name\n      formattedNationalityAndBirthday\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  image {\n    thumb: cropped(width: 600, height: 450, version: \"wide\") {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistsIndex_featuredArtists on OrderedSet {\n  name\n  artists: items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      id\n    }\n    ...ArtistsCarouselCell_featuredLink\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment ArtistsIndex_featuredGenes on OrderedSet {\n  name\n  genes: items {\n    __typename\n    ... on Gene {\n      internalID\n      name\n      href\n      trendingArtists(sample: 4) {\n        ...CellArtist_artist\n        internalID\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment CellArtist_artist on Artist {\n  ...EntityHeaderArtist_artist\n  internalID\n  slug\n  name\n  href\n  initials\n  coverArtwork {\n    image {\n      cropped(width: 445, height: 334, version: [\"larger\", \"large\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e995ed1e0e3f670fa678146e605d76f8";

export default node;
