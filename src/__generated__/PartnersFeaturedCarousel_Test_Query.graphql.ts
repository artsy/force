/**
 * @generated SignedSource<<d46a027d94889525b6df03fdb99c80df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnersFeaturedCarousel_Test_Query$variables = Record<PropertyKey, never>;
export type PartnersFeaturedCarousel_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnersFeaturedCarousel_viewer">;
  } | null | undefined;
};
export type PartnersFeaturedCarousel_Test_Query = {
  response: PartnersFeaturedCarousel_Test_Query$data;
  variables: PartnersFeaturedCarousel_Test_Query$variables;
};

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
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v6/*: any*/)
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersFeaturedCarousel_Test_Query",
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
            "args": (v0/*: any*/),
            "kind": "FragmentSpread",
            "name": "PartnersFeaturedCarousel_viewer"
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
    "name": "PartnersFeaturedCarousel_Test_Query",
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
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/),
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
                                        "concreteType": "Show",
                                        "kind": "LinkedField",
                                        "name": "featuredShow",
                                        "plural": false,
                                        "selections": [
                                          (v3/*: any*/),
                                          (v4/*: any*/),
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
                                              (v6/*: any*/)
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
                                                      "main",
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
                                                "storageKey": "resized(height:500,version:[\"main\",\"normalized\",\"larger\",\"large\"])"
                                              }
                                            ],
                                            "storageKey": null
                                          },
                                          (v6/*: any*/)
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
                              (v6/*: any*/)
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
                "storageKey": "orderedItemsConnection(first:50)"
              },
              (v6/*: any*/)
            ],
            "storageKey": "orderedSet(id:\"example\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "77a224a96c31f0d00ef2ce1f8354fc4c",
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
        "viewer.orderedSet.id": (v9/*: any*/),
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
        "viewer.orderedSet.orderedItemsConnection.edges.node.__isNode": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.__typename": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.id": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.internalID": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ProfileOwnerType"
        },
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.__isNode": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.__typename": (v10/*: any*/),
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
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.coverImage.resized.src": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.coverImage.resized.srcSet": (v10/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.endAt": (v11/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.href": (v11/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.id": (v9/*: any*/),
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
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.location.city": (v11/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.location.id": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.name": (v11/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.startAt": (v11/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.status": (v11/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.featuredShow.statusUpdate": (v11/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.href": (v11/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.id": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.internalID": (v9/*: any*/),
        "viewer.orderedSet.orderedItemsConnection.edges.node.owner.name": (v11/*: any*/)
      }
    },
    "name": "PartnersFeaturedCarousel_Test_Query",
    "operationKind": "query",
    "text": "query PartnersFeaturedCarousel_Test_Query {\n  viewer {\n    ...PartnersFeaturedCarousel_viewer_3GNcE2\n  }\n}\n\nfragment PartnersFeaturedCarouselCell_profile on Profile {\n  internalID\n  owner {\n    __typename\n    ... on Partner {\n      internalID\n      href\n      name\n      featuredShow {\n        href\n        name\n        status\n        statusUpdate\n        startAt(format: \"MMM D\")\n        endAt(format: \"MMM D\")\n        isOnlineExclusive\n        location {\n          city\n          id\n        }\n        coverImage {\n          resized(height: 500, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on FairOrganizer {\n      id\n    }\n  }\n}\n\nfragment PartnersFeaturedCarousel_viewer_3GNcE2 on Viewer {\n  orderedSet(id: \"example\") {\n    orderedItemsConnection(first: 50) {\n      edges {\n        node {\n          __typename\n          ... on Profile {\n            internalID\n            ...PartnersFeaturedCarouselCell_profile\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n          ... on FeaturedLink {\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a415921a8a8a1c7a99ddae30325b8de2";

export default node;
