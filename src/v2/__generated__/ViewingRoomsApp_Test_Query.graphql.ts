/* tslint:disable */

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
                    readonly heroImageURL: string | null;
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
                                    readonly square: string | null;
                                    readonly regular: string | null;
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
                readonly heroImageURL: string | null;
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
      heroImageURL
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
        heroImageURL
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
                square: url(version: "square")
                regular: url(version: "large")
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
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "heroImageURL",
  "args": null,
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
  "kind": "ScalarField",
  "alias": null,
  "name": "distanceToOpen",
  "args": (v5/*: any*/),
  "storageKey": "distanceToOpen(short:true)"
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "distanceToClose",
  "args": (v5/*: any*/),
  "storageKey": "distanceToClose(short:true)"
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "partner",
  "storageKey": null,
  "args": null,
  "concreteType": "Partner",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    (v8/*: any*/)
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ViewingRoomsApp_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "allViewingRooms",
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_allViewingRooms",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "featuredViewingRooms",
        "name": "viewingRooms",
        "storageKey": "viewingRooms(featured:true)",
        "args": (v0/*: any*/),
        "concreteType": "ViewingRoomConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_featuredViewingRooms",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ViewingRoomsApp_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "allViewingRooms",
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "viewingRoomsConnection",
            "storageKey": null,
            "args": null,
            "concreteType": "ViewingRoomConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ViewingRoomEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ViewingRoom",
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
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artworksConnection",
                        "storageKey": "artworksConnection(first:2)",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 2
                          }
                        ],
                        "concreteType": "ArtworkConnection",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "totalCount",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edges",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "ArtworkEdge",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "node",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "image",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": "square",
                                        "name": "url",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": "square"
                                          }
                                        ],
                                        "storageKey": "url(version:\"square\")"
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": "regular",
                                        "name": "url",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": "large"
                                          }
                                        ],
                                        "storageKey": "url(version:\"large\")"
                                      }
                                    ]
                                  },
                                  (v8/*: any*/)
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "viewingRoomsConnection",
            "args": null,
            "handle": "connection",
            "key": "ViewingRoomsLatestGrid_viewingRoomsConnection",
            "filters": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "featuredViewingRooms",
        "name": "viewingRooms",
        "storageKey": "viewingRooms(featured:true)",
        "args": (v0/*: any*/),
        "concreteType": "ViewingRoomConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "ViewingRoomEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "ViewingRoom",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v1/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v9/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ViewingRoomsApp_Test_Query",
    "id": null,
    "text": "query ViewingRoomsApp_Test_Query {\n  allViewingRooms: viewer {\n    ...ViewingRoomsApp_allViewingRooms\n  }\n  featuredViewingRooms: viewingRooms(featured: true) {\n    ...ViewingRoomsApp_featuredViewingRooms\n  }\n}\n\nfragment ViewingRoomsApp_allViewingRooms on Viewer {\n  ...ViewingRoomsLatestGrid_viewingRooms_9Znkm\n}\n\nfragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomConnection {\n  ...ViewingRoomsFeaturedRail_featuredViewingRooms\n}\n\nfragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {\n  edges {\n    node {\n      status\n      slug\n      title\n      heroImageURL\n      distanceToOpen(short: true)\n      distanceToClose(short: true)\n      partner {\n        name\n        id\n      }\n    }\n  }\n}\n\nfragment ViewingRoomsLatestGrid_viewingRooms_9Znkm on Viewer {\n  viewingRoomsConnection {\n    edges {\n      node {\n        slug\n        status\n        title\n        heroImageURL\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        partner {\n          name\n          id\n        }\n        artworksConnection(first: 2) {\n          totalCount\n          edges {\n            node {\n              image {\n                square: url(version: \"square\")\n                regular: url(version: \"large\")\n              }\n              id\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '2bc02bd85bb6be749cc2e3a289aace6b';
export default node;
