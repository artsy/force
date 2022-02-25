/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsIndexFragmentContainer_Test_QueryVariables = {};
export type ArtistsIndexFragmentContainer_Test_QueryResponse = {
    readonly featuredArtists: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArtistsIndex_featuredArtists">;
    } | null> | null;
    readonly featuredGenes: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArtistsIndex_featuredGenes">;
    } | null> | null;
};
export type ArtistsIndexFragmentContainer_Test_Query = {
    readonly response: ArtistsIndexFragmentContainer_Test_QueryResponse;
    readonly variables: ArtistsIndexFragmentContainer_Test_QueryVariables;
};



/*
query ArtistsIndexFragmentContainer_Test_Query {
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
  entity {
    __typename
    ... on Artist {
      internalID
      name
      formattedNationalityAndBirthday
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
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
      __isNode: __typename
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
      __isNode: __typename
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
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "OrderedSet"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "OrderedSetItem"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v21 = {
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
                            "selections": [
                              (v10/*: any*/),
                              (v11/*: any*/)
                            ],
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
    "cacheID": "38a513c14fb438758be34b1c4c719634",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "featuredArtists": (v13/*: any*/),
        "featuredArtists.artists": (v14/*: any*/),
        "featuredArtists.artists.__isNode": (v15/*: any*/),
        "featuredArtists.artists.__typename": (v15/*: any*/),
        "featuredArtists.artists.entity": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FeaturedLinkEntity"
        },
        "featuredArtists.artists.entity.__isNode": (v15/*: any*/),
        "featuredArtists.artists.entity.__typename": (v15/*: any*/),
        "featuredArtists.artists.entity.formattedNationalityAndBirthday": (v16/*: any*/),
        "featuredArtists.artists.entity.id": (v17/*: any*/),
        "featuredArtists.artists.entity.internalID": (v17/*: any*/),
        "featuredArtists.artists.entity.name": (v16/*: any*/),
        "featuredArtists.artists.href": (v16/*: any*/),
        "featuredArtists.artists.id": (v17/*: any*/),
        "featuredArtists.artists.image": (v18/*: any*/),
        "featuredArtists.artists.image.thumb": (v19/*: any*/),
        "featuredArtists.artists.image.thumb.height": (v20/*: any*/),
        "featuredArtists.artists.image.thumb.src": (v15/*: any*/),
        "featuredArtists.artists.image.thumb.srcSet": (v15/*: any*/),
        "featuredArtists.artists.image.thumb.width": (v20/*: any*/),
        "featuredArtists.artists.internalID": (v17/*: any*/),
        "featuredArtists.artists.subtitle": (v16/*: any*/),
        "featuredArtists.artists.title": (v16/*: any*/),
        "featuredArtists.id": (v17/*: any*/),
        "featuredArtists.name": (v16/*: any*/),
        "featuredGenes": (v13/*: any*/),
        "featuredGenes.genes": (v14/*: any*/),
        "featuredGenes.genes.__isNode": (v15/*: any*/),
        "featuredGenes.genes.__typename": (v15/*: any*/),
        "featuredGenes.genes.href": (v16/*: any*/),
        "featuredGenes.genes.id": (v17/*: any*/),
        "featuredGenes.genes.internalID": (v17/*: any*/),
        "featuredGenes.genes.name": (v16/*: any*/),
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
        "featuredGenes.genes.trendingArtists.counts.artworks": (v21/*: any*/),
        "featuredGenes.genes.trendingArtists.counts.follows": (v21/*: any*/),
        "featuredGenes.genes.trendingArtists.counts.forSaleArtworks": (v21/*: any*/),
        "featuredGenes.genes.trendingArtists.formattedNationalityAndBirthday": (v16/*: any*/),
        "featuredGenes.genes.trendingArtists.href": (v16/*: any*/),
        "featuredGenes.genes.trendingArtists.id": (v17/*: any*/),
        "featuredGenes.genes.trendingArtists.image": (v18/*: any*/),
        "featuredGenes.genes.trendingArtists.image.thumb": (v19/*: any*/),
        "featuredGenes.genes.trendingArtists.image.thumb.src": (v15/*: any*/),
        "featuredGenes.genes.trendingArtists.image.thumb.srcSet": (v15/*: any*/),
        "featuredGenes.genes.trendingArtists.internalID": (v17/*: any*/),
        "featuredGenes.genes.trendingArtists.is_followed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "featuredGenes.genes.trendingArtists.name": (v16/*: any*/),
        "featuredGenes.genes.trendingArtists.slug": (v17/*: any*/),
        "featuredGenes.id": (v17/*: any*/),
        "featuredGenes.name": (v16/*: any*/)
      }
    },
    "name": "ArtistsIndexFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": "query ArtistsIndexFragmentContainer_Test_Query {\n  featuredArtists: orderedSets(key: \"homepage:featured-artists\") {\n    ...ArtistsIndex_featuredArtists\n    id\n  }\n  featuredGenes: orderedSets(key: \"artists:featured-genes\") {\n    ...ArtistsIndex_featuredGenes\n    id\n  }\n}\n\nfragment ArtistsArtistCard_artist on Artist {\n  ...FollowArtistButton_artist\n  name\n  href\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  image {\n    thumb: cropped(width: 445, height: 334) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistsCarouselCell_featuredLink on FeaturedLink {\n  internalID\n  title\n  subtitle\n  href\n  entity {\n    __typename\n    ... on Artist {\n      internalID\n      name\n      formattedNationalityAndBirthday\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  image {\n    thumb: cropped(width: 600, height: 450, version: \"wide\") {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistsIndex_featuredArtists on OrderedSet {\n  name\n  artists: items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      id\n    }\n    ...ArtistsCarouselCell_featuredLink\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment ArtistsIndex_featuredGenes on OrderedSet {\n  name\n  genes: items {\n    __typename\n    ... on Gene {\n      internalID\n      name\n      href\n      trendingArtists(sample: 4) {\n        internalID\n        ...ArtistsArtistCard_artist\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on FeaturedLink {\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fd6a2873ad604b1fc666c9950c458a4d';
export default node;
