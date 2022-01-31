/**
 * @generated SignedSource<<58f7671b11f098a53985300b7a1e34d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedGalleriesRailQuery$variables = {};
export type HomeFeaturedGalleriesRailQuery$data = {
  readonly orderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedGalleriesRail_orderedSet">;
  } | null;
};
export type HomeFeaturedGalleriesRailQuery = {
  variables: HomeFeaturedGalleriesRailQuery$variables;
  response: HomeFeaturedGalleriesRailQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "6193c9ede70512000fbf3e8d"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
  "name": "id",
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
],
v7 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeFeaturedGalleriesRailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeFeaturedGalleriesRail_orderedSet"
          }
        ],
        "storageKey": "orderedSet(id:\"6193c9ede70512000fbf3e8d\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeFeaturedGalleriesRailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              }
            ],
            "concreteType": "OrderedSetItemConnection",
            "kind": "LinkedField",
            "name": "orderedItemsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "OrderedSetItemEdge",
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
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "owner",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v2/*: any*/),
                                  (v3/*: any*/),
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "href",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "initials",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "first",
                                        "value": 15
                                      }
                                    ],
                                    "concreteType": "LocationConnection",
                                    "kind": "LinkedField",
                                    "name": "locationsConnection",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "LocationEdge",
                                        "kind": "LinkedField",
                                        "name": "edges",
                                        "plural": true,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Location",
                                            "kind": "LinkedField",
                                            "name": "node",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "city",
                                                "storageKey": null
                                              },
                                              (v5/*: any*/)
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": "locationsConnection(first:15)"
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "PartnerCategory",
                                    "kind": "LinkedField",
                                    "name": "categories",
                                    "plural": true,
                                    "selections": [
                                      (v4/*: any*/),
                                      (v3/*: any*/),
                                      (v5/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Profile",
                                    "kind": "LinkedField",
                                    "name": "profile",
                                    "plural": false,
                                    "selections": [
                                      (v5/*: any*/),
                                      (v3/*: any*/),
                                      (v4/*: any*/),
                                      (v2/*: any*/),
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
                                        "kind": "ScalarField",
                                        "name": "isFollowed",
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
                                                  "wide",
                                                  "large",
                                                  "featured",
                                                  "larger"
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
                                            "selections": [
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
                                            "storageKey": "cropped(height:334,version:[\"wide\",\"large\",\"featured\",\"larger\"],width:445)"
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "Partner",
                                "abstractKey": null
                              },
                              (v7/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v6/*: any*/),
                                "type": "FairOrganizer",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "type": "Profile",
                        "abstractKey": null
                      },
                      (v7/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "FeaturedLink",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orderedItemsConnection(first:20)"
          },
          (v5/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"6193c9ede70512000fbf3e8d\")"
      }
    ]
  },
  "params": {
    "cacheID": "0af8a1daa8ee08ecc491c288ecfa6135",
    "id": null,
    "metadata": {},
    "name": "HomeFeaturedGalleriesRailQuery",
    "operationKind": "query",
    "text": "query HomeFeaturedGalleriesRailQuery {\n  orderedSet(id: \"6193c9ede70512000fbf3e8d\") {\n    ...HomeFeaturedGalleriesRail_orderedSet\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment HomeFeaturedGalleriesRail_orderedSet on OrderedSet {\n  orderedItemsConnection(first: 20) {\n    edges {\n      node {\n        __typename\n        ... on Profile {\n          owner {\n            __typename\n            ...PartnerCell_partner\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n            ... on FairOrganizer {\n              id\n            }\n          }\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on FeaturedLink {\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment PartnerCell_partner on Partner {\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    image {\n      cropped(width: 445, height: 334, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8093210d3ba1837d4fb975d4ae3d3001";

export default node;
