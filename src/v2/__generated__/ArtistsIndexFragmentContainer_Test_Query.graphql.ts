/**
 * @generated SignedSource<<1b07ae0b85bd2968917487a887e4cc74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistsIndexFragmentContainer_Test_Query$variables = {};
export type ArtistsIndexFragmentContainer_Test_Query$data = {
  readonly featuredArtists: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArtistsIndex_featuredArtists">;
  } | null> | null;
  readonly featuredGenes: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArtistsIndex_featuredGenes">;
  } | null> | null;
};
export type ArtistsIndexFragmentContainer_Test_Query = {
  variables: ArtistsIndexFragmentContainer_Test_Query$variables;
  response: ArtistsIndexFragmentContainer_Test_Query$data;
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
v6 = [
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
  }
],
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
  "kind": "InlineFragment",
  "selections": (v8/*: any*/),
  "type": "Profile",
  "abstractKey": null
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "OrderedSet"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "OrderedSetItem"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistsIndexFragmentContainer_Test_Query",
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
    "name": "ArtistsIndexFragmentContainer_Test_Query",
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
                        "selections": (v6/*: any*/),
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
              (v10/*: any*/)
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
                      (v7/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      {
                        "alias": "is_followed",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFollowed",
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
                            "name": "follows",
                            "storageKey": null
                          },
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
                      (v5/*: any*/),
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
                                "value": 334
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
                            "selections": (v6/*: any*/),
                            "storageKey": "cropped(height:334,width:445)"
                          }
                        ],
                        "storageKey": null
                      }
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
              (v10/*: any*/)
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
    "cacheID": "b39044be3d4e075bbe300137950ab2bb",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "featuredArtists": (v11/*: any*/),
        "featuredArtists.artists": (v12/*: any*/),
        "featuredArtists.artists.__isNode": (v13/*: any*/),
        "featuredArtists.artists.__typename": (v13/*: any*/),
        "featuredArtists.artists.href": (v14/*: any*/),
        "featuredArtists.artists.id": (v15/*: any*/),
        "featuredArtists.artists.image": (v16/*: any*/),
        "featuredArtists.artists.image.thumb": (v17/*: any*/),
        "featuredArtists.artists.image.thumb.height": (v18/*: any*/),
        "featuredArtists.artists.image.thumb.src": (v13/*: any*/),
        "featuredArtists.artists.image.thumb.srcSet": (v13/*: any*/),
        "featuredArtists.artists.image.thumb.width": (v18/*: any*/),
        "featuredArtists.artists.internalID": (v14/*: any*/),
        "featuredArtists.artists.subtitle": (v14/*: any*/),
        "featuredArtists.artists.title": (v14/*: any*/),
        "featuredArtists.id": (v15/*: any*/),
        "featuredArtists.name": (v14/*: any*/),
        "featuredGenes": (v11/*: any*/),
        "featuredGenes.genes": (v12/*: any*/),
        "featuredGenes.genes.__isNode": (v13/*: any*/),
        "featuredGenes.genes.__typename": (v13/*: any*/),
        "featuredGenes.genes.href": (v14/*: any*/),
        "featuredGenes.genes.id": (v15/*: any*/),
        "featuredGenes.genes.internalID": (v15/*: any*/),
        "featuredGenes.genes.name": (v14/*: any*/),
        "featuredGenes.genes.trendingArtists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "featuredGenes.genes.trendingArtists.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "featuredGenes.genes.trendingArtists.counts.artworks": (v19/*: any*/),
        "featuredGenes.genes.trendingArtists.counts.follows": (v19/*: any*/),
        "featuredGenes.genes.trendingArtists.counts.forSaleArtworks": (v19/*: any*/),
        "featuredGenes.genes.trendingArtists.formattedNationalityAndBirthday": (v14/*: any*/),
        "featuredGenes.genes.trendingArtists.href": (v14/*: any*/),
        "featuredGenes.genes.trendingArtists.id": (v15/*: any*/),
        "featuredGenes.genes.trendingArtists.image": (v16/*: any*/),
        "featuredGenes.genes.trendingArtists.image.thumb": (v17/*: any*/),
        "featuredGenes.genes.trendingArtists.image.thumb.height": (v18/*: any*/),
        "featuredGenes.genes.trendingArtists.image.thumb.src": (v13/*: any*/),
        "featuredGenes.genes.trendingArtists.image.thumb.srcSet": (v13/*: any*/),
        "featuredGenes.genes.trendingArtists.image.thumb.width": (v18/*: any*/),
        "featuredGenes.genes.trendingArtists.internalID": (v15/*: any*/),
        "featuredGenes.genes.trendingArtists.is_followed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "featuredGenes.genes.trendingArtists.name": (v14/*: any*/),
        "featuredGenes.genes.trendingArtists.slug": (v15/*: any*/),
        "featuredGenes.id": (v15/*: any*/),
        "featuredGenes.name": (v14/*: any*/)
      }
    },
    "name": "ArtistsIndexFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": "query ArtistsIndexFragmentContainer_Test_Query {\n  featuredArtists: orderedSets(key: \"homepage:featured-artists\") {\n    ...ArtistsIndex_featuredArtists\n    id\n  }\n  featuredGenes: orderedSets(key: \"artists:featured-genes\") {\n    ...ArtistsIndex_featuredGenes\n    id\n  }\n}\n\nfragment ArtistsArtistCard_artist on Artist {\n  ...FollowArtistButton_artist\n  name\n  href\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  image {\n    thumb: cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistsCarouselCell_featuredLink on FeaturedLink {\n  internalID\n  title\n  subtitle\n  href\n  image {\n    thumb: cropped(width: 600, height: 450, version: \"wide\") {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistsIndex_featuredArtists on OrderedSet {\n  name\n  artists: items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      id\n    }\n    ...ArtistsCarouselCell_featuredLink\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment ArtistsIndex_featuredGenes on OrderedSet {\n  name\n  genes: items {\n    __typename\n    ... on Gene {\n      internalID\n      name\n      href\n      trendingArtists(sample: 4) {\n        internalID\n        ...ArtistsArtistCard_artist\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n"
  }
};
})();

(node as any).hash = "fd6a2873ad604b1fc666c9950c458a4d";

export default node;
