/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GalleriesRouteFragmentContainer_Test_QueryVariables = {};
export type GalleriesRouteFragmentContainer_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"GalleriesRoute_viewer">;
    } | null;
};
export type GalleriesRouteFragmentContainer_Test_Query = {
    readonly response: GalleriesRouteFragmentContainer_Test_QueryResponse;
    readonly variables: GalleriesRouteFragmentContainer_Test_QueryVariables;
};



/*
query GalleriesRouteFragmentContainer_Test_Query {
  viewer {
    ...GalleriesRoute_viewer
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}

fragment GalleriesRoute_viewer on Viewer {
  ...PartnersFeaturedCarousel_viewer_4uWBz4
}

fragment PartnersFeaturedCarouselCell_profile on Profile {
  ...FollowProfileButton_profile
  owner {
    __typename
    ... on Partner {
      internalID
      href
      name
      featuredShow {
        href
        name
        status
        statusUpdate
        startAt(format: "MMM D")
        endAt(format: "MMM D")
        isOnlineExclusive
        location {
          city
          id
        }
        coverImage {
          resized(height: 500, version: ["normalized", "larger", "large"]) {
            src
            srcSet
          }
        }
        id
      }
    }
    ... on Node {
      __isNode: __typename
      id
    }
    ... on FairOrganizer {
      id
    }
  }
}

fragment PartnersFeaturedCarousel_viewer_4uWBz4 on Viewer {
  orderedSet(id: "5638fdfb7261690296000031") {
    orderedItemsConnection(first: 50) {
      edges {
        node {
          __typename
          ... on Profile {
            internalID
            ...PartnersFeaturedCarouselCell_profile
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
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v6 = [
  (v2/*: any*/)
],
v7 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GalleriesRouteFragmentContainer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GalleriesRoute_viewer"
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
    "name": "GalleriesRouteFragmentContainer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "5638fdfb7261690296000031"
              }
            ],
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
                    "value": 50
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
                          (v0/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "slug",
                                "storageKey": null
                              },
                              (v3/*: any*/),
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
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "owner",
                                "plural": false,
                                "selections": [
                                  (v0/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v1/*: any*/),
                                      (v4/*: any*/),
                                      (v3/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Show",
                                        "kind": "LinkedField",
                                        "name": "featuredShow",
                                        "plural": false,
                                        "selections": [
                                          (v4/*: any*/),
                                          (v3/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "status",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "statusUpdate",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": (v5/*: any*/),
                                            "kind": "ScalarField",
                                            "name": "startAt",
                                            "storageKey": "startAt(format:\"MMM D\")"
                                          },
                                          {
                                            "alias": null,
                                            "args": (v5/*: any*/),
                                            "kind": "ScalarField",
                                            "name": "endAt",
                                            "storageKey": "endAt(format:\"MMM D\")"
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isOnlineExclusive",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Location",
                                            "kind": "LinkedField",
                                            "name": "location",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "city",
                                                "storageKey": null
                                              },
                                              (v2/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Image",
                                            "kind": "LinkedField",
                                            "name": "coverImage",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": [
                                                  {
                                                    "kind": "Literal",
                                                    "name": "height",
                                                    "value": 500
                                                  },
                                                  {
                                                    "kind": "Literal",
                                                    "name": "version",
                                                    "value": [
                                                      "normalized",
                                                      "larger",
                                                      "large"
                                                    ]
                                                  }
                                                ],
                                                "concreteType": "ResizedImageUrl",
                                                "kind": "LinkedField",
                                                "name": "resized",
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
                                                "storageKey": "resized(height:500,version:[\"normalized\",\"larger\",\"large\"])"
                                              }
                                            ],
                                            "storageKey": null
                                          },
                                          (v2/*: any*/)
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
                              }
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
                "storageKey": "orderedItemsConnection(first:50)"
              },
              (v2/*: any*/)
            ],
            "storageKey": "orderedSet(id:\"5638fdfb7261690296000031\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "592bb7a9d5d85d41519566307aa3da6e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.orderedSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "viewer.orderedSet.id": (v8/*: any*/),
        "viewer.orderedSet.orderedItemsConnection": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "OrderedSetItemConnection"
        },
        "viewer.orderedSet.orderedItemsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItemEdge"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSetItem"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node.__isNode": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.__typename": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.id": (v8/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.internalID": (v8/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.is_followed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node.name": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ProfileOwnerType"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.__isNode": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.__typename": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.coverImage.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.coverImage.resized.src": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.coverImage.resized.srcSet": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.endAt": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.href": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.id": (v8/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.isOnlineExclusive": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.location.city": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.location.id": (v8/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.name": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.startAt": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.status": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.statusUpdate": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.href": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.id": (v8/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.internalID": (v8/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.name": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.slug": (v8/*: any*/)
      }
    },
    "name": "GalleriesRouteFragmentContainer_Test_Query",
    "operationKind": "query",
    "text": "query GalleriesRouteFragmentContainer_Test_Query {\n  viewer {\n    ...GalleriesRoute_viewer\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment GalleriesRoute_viewer on Viewer {\n  ...PartnersFeaturedCarousel_viewer_4uWBz4\n}\n\nfragment PartnersFeaturedCarouselCell_profile on Profile {\n  ...FollowProfileButton_profile\n  owner {\n    __typename\n    ... on Partner {\n      internalID\n      href\n      name\n      featuredShow {\n        href\n        name\n        status\n        statusUpdate\n        startAt(format: \"MMM D\")\n        endAt(format: \"MMM D\")\n        isOnlineExclusive\n        location {\n          city\n          id\n        }\n        coverImage {\n          resized(height: 500, version: [\"normalized\", \"larger\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on FairOrganizer {\n      id\n    }\n  }\n}\n\nfragment PartnersFeaturedCarousel_viewer_4uWBz4 on Viewer {\n  orderedSet(id: \"5638fdfb7261690296000031\") {\n    orderedItemsConnection(first: 50) {\n      edges {\n        node {\n          __typename\n          ... on Profile {\n            internalID\n            ...PartnersFeaturedCarouselCell_profile\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n          ... on FeaturedLink {\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3295f5d80619388c7911a1b18354e926';
export default node;
