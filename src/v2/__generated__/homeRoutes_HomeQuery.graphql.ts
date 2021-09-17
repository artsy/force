/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type homeRoutes_HomeQueryVariables = {};
export type homeRoutes_HomeQueryResponse = {
    readonly homePage: {
        readonly " $fragmentRefs": FragmentRefs<"HomeApp_homePage">;
    } | null;
    readonly featuredEventsOrderedSet: {
        readonly " $fragmentRefs": FragmentRefs<"HomeApp_featuredEventsOrderedSet">;
    } | null;
};
export type homeRoutes_HomeQuery = {
    readonly response: homeRoutes_HomeQueryResponse;
    readonly variables: homeRoutes_HomeQueryVariables;
};



/*
query homeRoutes_HomeQuery {
  homePage {
    ...HomeApp_homePage
  }
  featuredEventsOrderedSet: orderedSet(id: "529939e2275b245e290004a0") {
    ...HomeApp_featuredEventsOrderedSet
    id
  }
}

fragment HomeApp_featuredEventsOrderedSet on OrderedSet {
  ...HomeFeaturedEventsRail_orderedSet
}

fragment HomeApp_homePage on HomePage {
  ...HomeHeroUnits_homePage
  ...HomeArtworkModules_homePage
}

fragment HomeArtworkModules_homePage on HomePage {
  artworkModules(exclude: [POPULAR_ARTISTS, GENERIC_GENES], maxRails: -1, maxFollowedGeneRails: -1, order: [ACTIVE_BIDS, RECENTLY_VIEWED_WORKS, SIMILAR_TO_RECENTLY_VIEWED, SAVED_WORKS, SIMILAR_TO_SAVED_WORKS, FOLLOWED_ARTISTS, FOLLOWED_GALLERIES, RECOMMENDED_WORKS, RELATED_ARTISTS, LIVE_AUCTIONS, CURRENT_FAIRS, FOLLOWED_GENES, GENERIC_GENES]) {
    title
    key
    params {
      internalID
      relatedArtistID
      followedArtistID
    }
    id
  }
}

fragment HomeFeaturedEventsRail_orderedSet on OrderedSet {
  items {
    __typename
    ... on FeaturedLink {
      internalID
      title
      subtitle
      href
      image {
        small: cropped(width: 95, height: 63) {
          src
          srcSet
          width
          height
        }
        large: cropped(width: 445, height: 297) {
          src
          srcSet
        }
      }
      id
    }
    ... on Node {
      __isNode: __typename
      id
    }
    ... on Profile {
      id
    }
  }
}

fragment HomeHeroUnit_heroUnit on HomePageHeroUnit {
  backgroundImageURL
  heading
  title
  subtitle
  linkText
  href
  creditLine
}

fragment HomeHeroUnits_homePage on HomePage {
  heroUnits(platform: DESKTOP) {
    internalID
    ...HomeHeroUnit_heroUnit
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "529939e2275b245e290004a0"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subtitle",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v8 = [
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "homeRoutes_HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeApp_homePage"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "featuredEventsOrderedSet",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeApp_featuredEventsOrderedSet"
          }
        ],
        "storageKey": "orderedSet(id:\"529939e2275b245e290004a0\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "homeRoutes_HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "platform",
                "value": "DESKTOP"
              }
            ],
            "concreteType": "HomePageHeroUnit",
            "kind": "LinkedField",
            "name": "heroUnits",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "backgroundImageURL",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "heading",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "linkText",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "creditLine",
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": "heroUnits(platform:\"DESKTOP\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "exclude",
                "value": [
                  "POPULAR_ARTISTS",
                  "GENERIC_GENES"
                ]
              },
              {
                "kind": "Literal",
                "name": "maxFollowedGeneRails",
                "value": -1
              },
              {
                "kind": "Literal",
                "name": "maxRails",
                "value": -1
              },
              {
                "kind": "Literal",
                "name": "order",
                "value": [
                  "ACTIVE_BIDS",
                  "RECENTLY_VIEWED_WORKS",
                  "SIMILAR_TO_RECENTLY_VIEWED",
                  "SAVED_WORKS",
                  "SIMILAR_TO_SAVED_WORKS",
                  "FOLLOWED_ARTISTS",
                  "FOLLOWED_GALLERIES",
                  "RECOMMENDED_WORKS",
                  "RELATED_ARTISTS",
                  "LIVE_AUCTIONS",
                  "CURRENT_FAIRS",
                  "FOLLOWED_GENES",
                  "GENERIC_GENES"
                ]
              }
            ],
            "concreteType": "HomePageArtworkModule",
            "kind": "LinkedField",
            "name": "artworkModules",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "key",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "HomePageModulesParams",
                "kind": "LinkedField",
                "name": "params",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "relatedArtistID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "followedArtistID",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": "artworkModules(exclude:[\"POPULAR_ARTISTS\",\"GENERIC_GENES\"],maxFollowedGeneRails:-1,maxRails:-1,order:[\"ACTIVE_BIDS\",\"RECENTLY_VIEWED_WORKS\",\"SIMILAR_TO_RECENTLY_VIEWED\",\"SAVED_WORKS\",\"SIMILAR_TO_SAVED_WORKS\",\"FOLLOWED_ARTISTS\",\"FOLLOWED_GALLERIES\",\"RECOMMENDED_WORKS\",\"RELATED_ARTISTS\",\"LIVE_AUCTIONS\",\"CURRENT_FAIRS\",\"FOLLOWED_GENES\",\"GENERIC_GENES\"])"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "featuredEventsOrderedSet",
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": [
                      {
                        "alias": "small",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 63
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 95
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v7/*: any*/),
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
                        "storageKey": "cropped(height:63,width:95)"
                      },
                      {
                        "alias": "large",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 297
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
                          (v6/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": "cropped(height:297,width:445)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "type": "FeaturedLink",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v8/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v8/*: any*/),
                "type": "Profile",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"529939e2275b245e290004a0\")"
      }
    ]
  },
  "params": {
    "cacheID": "f8234a10a8224005759991b7ab412c3d",
    "id": null,
    "metadata": {},
    "name": "homeRoutes_HomeQuery",
    "operationKind": "query",
    "text": "query homeRoutes_HomeQuery {\n  homePage {\n    ...HomeApp_homePage\n  }\n  featuredEventsOrderedSet: orderedSet(id: \"529939e2275b245e290004a0\") {\n    ...HomeApp_featuredEventsOrderedSet\n    id\n  }\n}\n\nfragment HomeApp_featuredEventsOrderedSet on OrderedSet {\n  ...HomeFeaturedEventsRail_orderedSet\n}\n\nfragment HomeApp_homePage on HomePage {\n  ...HomeHeroUnits_homePage\n  ...HomeArtworkModules_homePage\n}\n\nfragment HomeArtworkModules_homePage on HomePage {\n  artworkModules(exclude: [POPULAR_ARTISTS, GENERIC_GENES], maxRails: -1, maxFollowedGeneRails: -1, order: [ACTIVE_BIDS, RECENTLY_VIEWED_WORKS, SIMILAR_TO_RECENTLY_VIEWED, SAVED_WORKS, SIMILAR_TO_SAVED_WORKS, FOLLOWED_ARTISTS, FOLLOWED_GALLERIES, RECOMMENDED_WORKS, RELATED_ARTISTS, LIVE_AUCTIONS, CURRENT_FAIRS, FOLLOWED_GENES, GENERIC_GENES]) {\n    title\n    key\n    params {\n      internalID\n      relatedArtistID\n      followedArtistID\n    }\n    id\n  }\n}\n\nfragment HomeFeaturedEventsRail_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      subtitle\n      href\n      image {\n        small: cropped(width: 95, height: 63) {\n          src\n          srcSet\n          width\n          height\n        }\n        large: cropped(width: 445, height: 297) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment HomeHeroUnit_heroUnit on HomePageHeroUnit {\n  backgroundImageURL\n  heading\n  title\n  subtitle\n  linkText\n  href\n  creditLine\n}\n\nfragment HomeHeroUnits_homePage on HomePage {\n  heroUnits(platform: DESKTOP) {\n    internalID\n    ...HomeHeroUnit_heroUnit\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f030323f431f45ee405e86ffac831e6c';
export default node;
