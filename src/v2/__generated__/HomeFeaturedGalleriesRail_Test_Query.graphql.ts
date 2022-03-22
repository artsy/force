/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedGalleriesRail_Test_QueryVariables = {};
export type HomeFeaturedGalleriesRail_Test_QueryResponse = {
    readonly orderedSet: {
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedGalleriesRail_orderedSet">;
    } | null;
};
export type HomeFeaturedGalleriesRail_Test_Query = {
    readonly response: HomeFeaturedGalleriesRail_Test_QueryResponse;
    readonly variables: HomeFeaturedGalleriesRail_Test_QueryVariables;
};



/*
query HomeFeaturedGalleriesRail_Test_Query {
  orderedSet(id: "example") {
    ...HomeFeaturedGalleriesRail_orderedSet
    id
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}

fragment HomeFeaturedGalleriesRail_orderedSet on OrderedSet {
  orderedItemsConnection(first: 20) {
    edges {
      node {
        __typename
        ... on Profile {
          owner {
            __typename
            ...PartnerCell_partner
            ... on Node {
              __isNode: __typename
              id
            }
            ... on FairOrganizer {
              id
            }
          }
          id
        }
        ... on Node {
          __isNode: __typename
          id
        }
        ... on FeaturedLink {
          id
        }
      }
    }
  }
}

fragment PartnerCell_partner on Partner {
  ...PartnerEntityHeader_partner
  internalID
  slug
  name
  href
  initials
  locationsConnection(first: 15) {
    edges {
      node {
        city
        id
      }
    }
  }
  categories {
    name
    slug
    id
  }
  profile {
    ...FollowProfileButton_profile
    isFollowed
    image {
      cropped(width: 445, height: 334, version: ["wide", "large", "featured", "larger"]) {
        src
        srcSet
      }
    }
    id
  }
}

fragment PartnerEntityHeader_partner on Partner {
  internalID
  slug
  href
  name
  initials
  locationsConnection(first: 15) {
    edges {
      node {
        city
        id
      }
    }
  }
  categories {
    name
    slug
    id
  }
  profile {
    ...FollowProfileButton_profile
    avatar: image {
      cropped(width: 45, height: 45) {
        src
        srcSet
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
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
v7 = [
  (v5/*: any*/)
],
v8 = {
  "kind": "InlineFragment",
  "selections": (v7/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeFeaturedGalleriesRail_Test_Query",
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
        "storageKey": "orderedSet(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeFeaturedGalleriesRail_Test_Query",
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
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "href",
                                    "storageKey": null
                                  },
                                  (v4/*: any*/),
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
                                            "selections": (v6/*: any*/),
                                            "storageKey": "cropped(height:45,width:45)"
                                          }
                                        ],
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
                                            "selections": (v6/*: any*/),
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
                              (v8/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v7/*: any*/),
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
                      (v8/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v7/*: any*/),
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
        "storageKey": "orderedSet(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "9bc3c85c3355e45f0ccce20a6bb73c16",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "orderedSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "orderedSet.id": (v9/*: any*/),
        "orderedSet.orderedItemsConnection": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "OrderedSetItemConnection"
        },
        "orderedSet.orderedItemsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItemEdge"
        },
        "orderedSet.orderedItemsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSetItem"
        },
        "orderedSet.orderedItemsConnection.edges.node.__isNode": (v10/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.__typename": (v10/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.id": (v9/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ProfileOwnerType"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.__isNode": (v10/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.__typename": (v10/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.categories.id": (v9/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.categories.name": (v11/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.categories.slug": (v9/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.href": (v11/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.id": (v9/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.initials": (v11/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.internalID": (v9/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges.node.city": (v11/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges.node.id": (v9/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.name": (v11/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar": (v12/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar.cropped": (v13/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar.cropped.src": (v10/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar.cropped.srcSet": (v10/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.id": (v9/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.image": (v12/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.image.cropped": (v13/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.image.cropped.src": (v10/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.image.cropped.srcSet": (v10/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.internalID": (v9/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.isFollowed": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.is_followed": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.name": (v11/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.slug": (v9/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.slug": (v9/*: any*/)
      }
    },
    "name": "HomeFeaturedGalleriesRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeFeaturedGalleriesRail_Test_Query {\n  orderedSet(id: \"example\") {\n    ...HomeFeaturedGalleriesRail_orderedSet\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment HomeFeaturedGalleriesRail_orderedSet on OrderedSet {\n  orderedItemsConnection(first: 20) {\n    edges {\n      node {\n        __typename\n        ... on Profile {\n          owner {\n            __typename\n            ...PartnerCell_partner\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n            ... on FairOrganizer {\n              id\n            }\n          }\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on FeaturedLink {\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment PartnerCell_partner on Partner {\n  ...PartnerEntityHeader_partner\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    image {\n      cropped(width: 445, height: 334, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment PartnerEntityHeader_partner on Partner {\n  internalID\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    ...FollowProfileButton_profile\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e59183886bc1733b39d5345c9d24b6a9';
export default node;
