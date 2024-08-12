/**
 * @generated SignedSource<<02a3b8c0c81265fc12bd570a9df313e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectRoutes_CollectionQuery$variables = {
  slug: string;
};
export type collectRoutes_CollectionQuery$data = {
  readonly collection: {
    readonly " $fragmentSpreads": FragmentRefs<"Collection_collection">;
  } | null | undefined;
};
export type collectRoutes_CollectionQuery = {
  response: collectRoutes_CollectionQuery$data;
  variables: collectRoutes_CollectionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headerImage",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v13 = [
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/)
],
v14 = {
  "kind": "Literal",
  "name": "sort",
  "value": "-decayed_merch"
},
v15 = {
  "kind": "Literal",
  "name": "includeMediumFilterInAggregation",
  "value": true
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "collectRoutes_CollectionQuery",
    "selections": [
      {
        "alias": "collection",
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Collection_collection"
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
    "name": "collectRoutes_CollectionQuery",
    "selections": [
      {
        "alias": "collection",
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "credit",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "featuredArtistExclusionIds",
            "storageKey": null
          },
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MarketingCollectionQuery",
            "kind": "LinkedField",
            "name": "query",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artistIDs",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "showHeaderArtworksRail",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "showFeaturedArtists",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "descriptionMarkdown",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 1
              }
            ],
            "concreteType": "MarketingCollection",
            "kind": "LinkedField",
            "name": "relatedCollections",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": "relatedCollections(size:1)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MarketingCollectionGroup",
            "kind": "LinkedField",
            "name": "linkedCollections",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "groupType",
                "storageKey": null
              },
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MarketingCollection",
                "kind": "LinkedField",
                "name": "members",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "priceGuidance",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "thumbnailImage",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 244
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 325
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": (v13/*: any*/),
                        "storageKey": "cropped(height:244,width:325)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "thumbnail",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "aggregations",
                        "value": [
                          "TOTAL"
                        ]
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3
                      },
                      (v14/*: any*/)
                    ],
                    "concreteType": "FilterArtworksConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FilterArtworksEdge",
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
                              (v7/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artist",
                                "plural": false,
                                "selections": [
                                  (v8/*: any*/),
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v6/*: any*/),
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
                                        "value": 150
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 150
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "resized",
                                    "plural": false,
                                    "selections": [
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      (v9/*: any*/),
                                      (v10/*: any*/)
                                    ],
                                    "storageKey": "resized(height:150,width:150)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "fallbackHeaderImage",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              (v15/*: any*/),
              (v14/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
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
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "artworksConnection(first:1,includeMediumFilterInAggregation:true,sort:\"-decayed_merch\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5
              },
              (v15/*: any*/),
              (v14/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
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
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v16/*: any*/),
                      (v5/*: any*/),
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
                                "value": 450
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
                                "value": 300
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v13/*: any*/),
                            "storageKey": "resized(height:450,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:300)"
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
                "alias": null,
                "args": null,
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "merchandisableArtists",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v16/*: any*/),
                  (v5/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "initials",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "formattedNationalityAndBirthday",
                    "storageKey": null
                  },
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
                            "selections": [
                              (v9/*: any*/),
                              (v10/*: any*/)
                            ],
                            "storageKey": "cropped(height:45,width:45)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "artworksConnection(first:5,includeMediumFilterInAggregation:true,sort:\"-decayed_merch\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ad0a3d8f2efb2be0a32c48be815cbe00",
    "id": null,
    "metadata": {},
    "name": "collectRoutes_CollectionQuery",
    "operationKind": "query",
    "text": "query collectRoutes_CollectionQuery(\n  $slug: String!\n) {\n  collection: marketingCollection(slug: $slug) @principalField {\n    ...Collection_collection\n    id\n  }\n}\n\nfragment ArtistSeriesEntity_member on MarketingCollection {\n  id\n  slug\n  headerImage\n  thumbnail\n  title\n  priceGuidance\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        internalID\n        artist {\n          name\n          id\n        }\n        title\n        image {\n          resized(width: 150, height: 150) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    slug\n    ...ArtistSeriesEntity_member\n    id\n  }\n}\n\nfragment Collection_collection on MarketingCollection {\n  ...Header_collection\n  descriptionMarkdown\n  headerImage\n  slug\n  id\n  title\n  relatedCollections(size: 1) {\n    internalID\n    id\n  }\n  linkedCollections {\n    ...CollectionsHubRails_linkedCollections\n  }\n  fallbackHeaderImage: artworksConnection(includeMediumFilterInAggregation: true, first: 1, sort: \"-decayed_merch\") {\n    edges {\n      node {\n        image {\n          url\n        }\n        id\n      }\n    }\n    id\n  }\n  artworksConnection(includeMediumFilterInAggregation: true, first: 5, sort: \"-decayed_merch\") {\n    ...Header_artworks\n    id\n  }\n}\n\nfragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {\n  groupType\n  ...FeaturedCollectionsRails_collectionGroup\n  ...OtherCollectionsRail_collectionGroup\n  ...ArtistSeriesRail_collectionGroup\n}\n\nfragment DefaultHeaderArtwork_artwork on Artwork {\n  id\n  title\n  href\n  slug\n  image {\n    resized(width: 300, height: 450, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment DefaultHeader_headerArtworks on FilterArtworksConnection {\n  edges {\n    node {\n      ...DefaultHeaderArtwork_artwork\n      id\n    }\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FeaturedCollectionRailEntity_member on MarketingCollection {\n  id\n  slug\n  title\n  description\n  priceGuidance\n  thumbnailImage {\n    cropped(width: 325, height: 244) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...FeaturedCollectionRailEntity_member\n    internalID\n    id\n  }\n}\n\nfragment Header_artworks on FilterArtworksConnection {\n  ...DefaultHeader_headerArtworks\n  merchandisableArtists {\n    ...EntityHeaderArtist_artist\n    internalID\n    name\n    id\n  }\n}\n\nfragment Header_collection on MarketingCollection {\n  category\n  credit\n  description\n  featuredArtistExclusionIds\n  headerImage\n  id\n  query {\n    artistIDs\n  }\n  slug\n  title\n  showHeaderArtworksRail\n  showFeaturedArtists\n}\n\nfragment OtherCollectionEntity_member on MarketingCollection {\n  id\n  slug\n  thumbnail\n  title\n}\n\nfragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...OtherCollectionEntity_member\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2566b07fe046631802dc9efe1a2fd66f";

export default node;
