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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "type": "ViewingRoom",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v11 = {
  "type": "ARImage",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v13 = {
  "type": "Partner",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "ImageURLs",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
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
                      (v8/*: any*/),
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
                  (v8/*: any*/)
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
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "allViewingRooms": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredViewingRooms": {
          "type": "ViewingRoomConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "allViewingRooms.viewingRoomsConnection": {
          "type": "ViewingRoomsConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "featuredViewingRooms.edges": {
          "type": "ViewingRoomEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "allViewingRooms.viewingRoomsConnection.edges": {
          "type": "ViewingRoomsEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "allViewingRooms.viewingRoomsConnection.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "featuredViewingRooms.edges.node": (v9/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node": (v9/*: any*/),
        "featuredViewingRooms.edges.node.status": (v10/*: any*/),
        "featuredViewingRooms.edges.node.slug": (v10/*: any*/),
        "featuredViewingRooms.edges.node.title": (v10/*: any*/),
        "featuredViewingRooms.edges.node.image": (v11/*: any*/),
        "featuredViewingRooms.edges.node.distanceToOpen": (v12/*: any*/),
        "featuredViewingRooms.edges.node.distanceToClose": (v12/*: any*/),
        "featuredViewingRooms.edges.node.partner": (v13/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.slug": (v10/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.status": (v10/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.title": (v10/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.image": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.distanceToOpen": (v12/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.distanceToClose": (v12/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.partner": (v13/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.cursor": (v10/*: any*/),
        "allViewingRooms.viewingRoomsConnection.pageInfo.endCursor": (v12/*: any*/),
        "allViewingRooms.viewingRoomsConnection.pageInfo.hasNextPage": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "featuredViewingRooms.edges.node.image.imageURLs": (v14/*: any*/),
        "featuredViewingRooms.edges.node.partner.name": (v12/*: any*/),
        "featuredViewingRooms.edges.node.partner.id": (v15/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.image.imageURLs": (v14/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.partner.name": (v12/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.partner.id": (v15/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.__typename": (v10/*: any*/),
        "featuredViewingRooms.edges.node.image.imageURLs.normalized": (v12/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.image.imageURLs.normalized": (v12/*: any*/)
      }
    },
    "name": "ViewingRoomsApp_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomsApp_Test_Query {\n  allViewingRooms: viewer {\n    ...ViewingRoomsApp_allViewingRooms\n  }\n  featuredViewingRooms: viewingRooms(featured: true) {\n    ...ViewingRoomsApp_featuredViewingRooms\n  }\n}\n\nfragment ViewingRoomsApp_allViewingRooms on Viewer {\n  ...ViewingRoomsLatestGrid_viewingRooms_9Znkm\n}\n\nfragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomConnection {\n  ...ViewingRoomsFeaturedRail_featuredViewingRooms\n}\n\nfragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {\n  edges {\n    node {\n      status\n      slug\n      title\n      image {\n        imageURLs {\n          normalized\n        }\n      }\n      distanceToOpen(short: true)\n      distanceToClose(short: true)\n      partner {\n        name\n        id\n      }\n    }\n  }\n}\n\nfragment ViewingRoomsLatestGrid_viewingRooms_9Znkm on Viewer {\n  viewingRoomsConnection {\n    edges {\n      node {\n        slug\n        status\n        title\n        image {\n          imageURLs {\n            normalized\n          }\n        }\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        partner {\n          name\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5e8709a6467d35395b4d7066db2c1669';
export default node;
