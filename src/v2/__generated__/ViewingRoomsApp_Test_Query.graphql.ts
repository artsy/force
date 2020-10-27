/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_Test_QueryVariables = {};
export type ViewingRoomsApp_Test_QueryResponse = {
    readonly allViewingRooms: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_allViewingRooms">;
    } | null;
    readonly featuredViewingRooms: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_featuredViewingRooms">;
    } | null;
};
export type ViewingRoomsApp_Test_QueryRawResponse = {
    readonly allViewingRooms: ({
        readonly viewingRoomsConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly slug: string;
                    readonly status: string;
                    readonly title: string;
                    readonly image: ({
                        readonly imageURLs: ({
                            readonly normalized: string | null;
                        }) | null;
                    }) | null;
                    readonly distanceToOpen: string | null;
                    readonly distanceToClose: string | null;
                    readonly partner: ({
                        readonly name: string | null;
                        readonly id: string | null;
                    }) | null;
                    readonly artworksConnection: ({
                        readonly totalCount: number | null;
                        readonly edges: ReadonlyArray<({
                            readonly node: ({
                                readonly image: ({
                                    readonly tall: ({
                                        readonly src: string;
                                        readonly srcSet: string;
                                    }) | null;
                                    readonly square: ({
                                        readonly src: string;
                                        readonly srcSet: string;
                                    }) | null;
                                }) | null;
                                readonly id: string | null;
                            }) | null;
                        }) | null> | null;
                    }) | null;
                    readonly __typename: "ViewingRoom";
                }) | null;
                readonly cursor: string;
            }) | null> | null;
            readonly pageInfo: {
                readonly endCursor: string | null;
                readonly hasNextPage: boolean;
            };
        }) | null;
    }) | null;
    readonly featuredViewingRooms: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly status: string;
                readonly slug: string;
                readonly title: string;
                readonly image: ({
                    readonly imageURLs: ({
                        readonly normalized: string | null;
                    }) | null;
                }) | null;
                readonly distanceToOpen: string | null;
                readonly distanceToClose: string | null;
                readonly partner: ({
                    readonly name: string | null;
                    readonly id: string | null;
                }) | null;
            }) | null;
        }) | null> | null;
    }) | null;
};
export type ViewingRoomsApp_Test_Query = {
    readonly response: ViewingRoomsApp_Test_QueryResponse;
    readonly variables: ViewingRoomsApp_Test_QueryVariables;
    readonly rawResponse: ViewingRoomsApp_Test_QueryRawResponse;
};



/*
query ViewingRoomsApp_Test_Query {
  allViewingRooms: viewer {
    ...ViewingRoomsApp_allViewingRooms
  }
  featuredViewingRooms: viewingRooms(featured: true) {
    ...ViewingRoomsApp_featuredViewingRooms
  }
}

fragment ViewingRoomsApp_allViewingRooms on Viewer {
  ...ViewingRoomsLatestGrid_viewingRooms_9Znkm
}

fragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomConnection {
  ...ViewingRoomsFeaturedRail_featuredViewingRooms
}

fragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {
  edges {
    node {
      status
      slug
      title
      image {
        imageURLs {
          normalized
        }
      }
      distanceToOpen(short: true)
      distanceToClose(short: true)
      partner {
        name
        id
      }
    }
  }
}

fragment ViewingRoomsLatestGrid_viewingRooms_9Znkm on Viewer {
  viewingRoomsConnection {
    edges {
      node {
        slug
        status
        title
        image {
          imageURLs {
            normalized
          }
        }
        distanceToOpen(short: true)
        distanceToClose(short: true)
        partner {
          name
          id
        }
        artworksConnection(first: 2) {
          totalCount
          edges {
            node {
              image {
                tall: cropped(width: 140, height: 280) {
                  src
                  srcSet
                }
                square: cropped(width: 140, height: 140) {
                  src
                  srcSet
                }
              }
              id
            }
          }
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "featured",
    "value": true
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "ARImage",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ImageURLs",
      "kind": "LinkedField",
      "name": "imageURLs",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "normalized",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "short",
    "value": true
  }
],
v6 = {
  "alias": null,
  "args": (v5/*: any*/),
  "kind": "ScalarField",
  "name": "distanceToOpen",
  "storageKey": "distanceToOpen(short:true)"
},
v7 = {
  "alias": null,
  "args": (v5/*: any*/),
  "kind": "ScalarField",
  "name": "distanceToClose",
  "storageKey": "distanceToClose(short:true)"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v8/*: any*/)
  ],
  "storageKey": null
},
v10 = {
  "kind": "Literal",
  "name": "width",
  "value": 140
},
v11 = [
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
    "name": "ViewingRoomsApp_Test_Query",
    "selections": [
      {
        "alias": "allViewingRooms",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_allViewingRooms"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "featuredViewingRooms",
        "args": (v0/*: any*/),
        "concreteType": "ViewingRoomConnection",
        "kind": "LinkedField",
        "name": "viewingRooms",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_featuredViewingRooms"
          }
        ],
        "storageKey": "viewingRooms(featured:true)"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewingRoomsApp_Test_Query",
    "selections": [
      {
        "alias": "allViewingRooms",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ViewingRoomsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ViewingRoom",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 2
                          }
                        ],
                        "concreteType": "ArtworkConnection",
                        "kind": "LinkedField",
                        "name": "artworksConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "totalCount",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkEdge",
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
                                        "alias": "tall",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "height",
                                            "value": 280
                                          },
                                          (v10/*: any*/)
                                        ],
                                        "concreteType": "CroppedImageUrl",
                                        "kind": "LinkedField",
                                        "name": "cropped",
                                        "plural": false,
                                        "selections": (v11/*: any*/),
                                        "storageKey": "cropped(height:280,width:140)"
                                      },
                                      {
                                        "alias": "square",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "height",
                                            "value": 140
                                          },
                                          (v10/*: any*/)
                                        ],
                                        "concreteType": "CroppedImageUrl",
                                        "kind": "LinkedField",
                                        "name": "cropped",
                                        "plural": false,
                                        "selections": (v11/*: any*/),
                                        "storageKey": "cropped(height:140,width:140)"
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v8/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "artworksConnection(first:2)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
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
            "filters": null,
            "handle": "connection",
            "key": "ViewingRoomsLatestGrid_viewingRoomsConnection",
            "kind": "LinkedHandle",
            "name": "viewingRoomsConnection"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "featuredViewingRooms",
        "args": (v0/*: any*/),
        "concreteType": "ViewingRoomConnection",
        "kind": "LinkedField",
        "name": "viewingRooms",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ViewingRoomEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ViewingRoom",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v1/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "viewingRooms(featured:true)"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ViewingRoomsApp_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomsApp_Test_Query {\n  allViewingRooms: viewer {\n    ...ViewingRoomsApp_allViewingRooms\n  }\n  featuredViewingRooms: viewingRooms(featured: true) {\n    ...ViewingRoomsApp_featuredViewingRooms\n  }\n}\n\nfragment ViewingRoomsApp_allViewingRooms on Viewer {\n  ...ViewingRoomsLatestGrid_viewingRooms_9Znkm\n}\n\nfragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomConnection {\n  ...ViewingRoomsFeaturedRail_featuredViewingRooms\n}\n\nfragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {\n  edges {\n    node {\n      status\n      slug\n      title\n      image {\n        imageURLs {\n          normalized\n        }\n      }\n      distanceToOpen(short: true)\n      distanceToClose(short: true)\n      partner {\n        name\n        id\n      }\n    }\n  }\n}\n\nfragment ViewingRoomsLatestGrid_viewingRooms_9Znkm on Viewer {\n  viewingRoomsConnection {\n    edges {\n      node {\n        slug\n        status\n        title\n        image {\n          imageURLs {\n            normalized\n          }\n        }\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        partner {\n          name\n          id\n        }\n        artworksConnection(first: 2) {\n          totalCount\n          edges {\n            node {\n              image {\n                tall: cropped(width: 140, height: 280) {\n                  src\n                  srcSet\n                }\n                square: cropped(width: 140, height: 140) {\n                  src\n                  srcSet\n                }\n              }\n              id\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2bc02bd85bb6be749cc2e3a289aace6b';
export default node;
