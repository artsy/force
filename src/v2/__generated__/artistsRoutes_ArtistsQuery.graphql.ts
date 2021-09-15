/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type artistsRoutes_ArtistsQueryVariables = {};
export type artistsRoutes_ArtistsQueryResponse = {
    readonly featuredArtists: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArtistsIndex_featuredArtists">;
    } | null> | null;
    readonly featuredGenes: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArtistsIndex_featuredGenes">;
    } | null> | null;
};
export type artistsRoutes_ArtistsQuery = {
    readonly response: artistsRoutes_ArtistsQueryResponse;
    readonly variables: artistsRoutes_ArtistsQueryVariables;
};



/*
query artistsRoutes_ArtistsQuery {
  featuredArtists: orderedSets(key: "homepage:featured-artists") {
    ...ArtistsIndex_featuredArtists
    id
  }
  featuredGenes: orderedSets(key: "artists:featured-genes") {
    ...ArtistsIndex_featuredGenes
    id
  }
}

fragment ArtistsArtistCard_artist on Artist {
  ...FollowArtistButton_artist
  name
  href
  formattedNationalityAndBirthday
  counts {
    artworks
    forSaleArtworks
  }
  image {
    thumb: cropped(width: 445, height: 334) {
      width
      height
      src
      srcSet
    }
  }
}

fragment ArtistsCarouselCell_featuredLink on FeaturedLink {
  internalID
  title
  subtitle
  href
  image {
    thumb: cropped(width: 600, height: 450, version: "wide") {
      width
      height
      src
      srcSet
    }
  }
}

fragment ArtistsIndex_featuredArtists on OrderedSet {
  name
  artists: items {
    __typename
    ... on FeaturedLink {
      internalID
      id
    }
    ...ArtistsCarouselCell_featuredLink
    ... on Node {
      id
    }
    ... on Profile {
      id
    }
  }
}

fragment ArtistsIndex_featuredGenes on OrderedSet {
  name
  genes: items {
    __typename
    ... on Gene {
      internalID
      name
      href
      trendingArtists(sample: 4) {
        internalID
        ...ArtistsArtistCard_artist
        id
      }
    }
    ... on Node {
      id
    }
    ... on FeaturedLink {
      id
    }
    ... on Profile {
      id
    }
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
}
*/

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
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = [
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
    "type": "Query"
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
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/),
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
                        "selections": (v7/*: any*/),
                        "storageKey": "cropped(height:450,version:\"wide\",width:600)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "FeaturedLink"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
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
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/),
                  (v2/*: any*/),
                  (v6/*: any*/),
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
                      (v5/*: any*/),
                      (v4/*: any*/),
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
                      (v6/*: any*/),
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
                            "selections": (v7/*: any*/),
                            "storageKey": "cropped(height:334,width:445)"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "trendingArtists(sample:4)"
                  }
                ],
                "type": "Gene"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "orderedSets(key:\"artists:featured-genes\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "artistsRoutes_ArtistsQuery",
    "operationKind": "query",
    "text": "query artistsRoutes_ArtistsQuery {\n  featuredArtists: orderedSets(key: \"homepage:featured-artists\") {\n    ...ArtistsIndex_featuredArtists\n    id\n  }\n  featuredGenes: orderedSets(key: \"artists:featured-genes\") {\n    ...ArtistsIndex_featuredGenes\n    id\n  }\n}\n\nfragment ArtistsArtistCard_artist on Artist {\n  ...FollowArtistButton_artist\n  name\n  href\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  image {\n    thumb: cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistsCarouselCell_featuredLink on FeaturedLink {\n  internalID\n  title\n  subtitle\n  href\n  image {\n    thumb: cropped(width: 600, height: 450, version: \"wide\") {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistsIndex_featuredArtists on OrderedSet {\n  name\n  artists: items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      id\n    }\n    ...ArtistsCarouselCell_featuredLink\n    ... on Node {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment ArtistsIndex_featuredGenes on OrderedSet {\n  name\n  genes: items {\n    __typename\n    ... on Gene {\n      internalID\n      name\n      href\n      trendingArtists(sample: 4) {\n        internalID\n        ...ArtistsArtistCard_artist\n        id\n      }\n    }\n    ... on Node {\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e995ed1e0e3f670fa678146e605d76f8';
export default node;
