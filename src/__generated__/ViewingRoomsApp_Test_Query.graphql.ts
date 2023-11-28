/**
 * @generated SignedSource<<728014666c09ad8bed6198b78c1ce1bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_Test_Query$variables = Record<PropertyKey, never>;
export type ViewingRoomsApp_Test_Query$data = {
  readonly allViewingRooms: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomsApp_allViewingRooms">;
  } | null | undefined;
  readonly featuredViewingRooms: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomsApp_featuredViewingRooms">;
  } | null | undefined;
};
export type ViewingRoomsApp_Test_Query$rawResponse = {
  readonly allViewingRooms: {
    readonly viewingRoomsConnection: {
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly __typename: "ViewingRoom";
          readonly distanceToClose: string | null | undefined;
          readonly distanceToOpen: string | null | undefined;
          readonly image: {
            readonly imageURLs: {
              readonly normalized: string | null | undefined;
            } | null | undefined;
          } | null | undefined;
          readonly partner: {
            readonly id: string;
            readonly name: string | null | undefined;
          } | null | undefined;
          readonly slug: string;
          readonly status: string;
          readonly title: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly pageInfo: {
        readonly endCursor: string | null | undefined;
        readonly hasNextPage: boolean;
      };
    } | null | undefined;
  } | null | undefined;
  readonly featuredViewingRooms: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly distanceToClose: string | null | undefined;
        readonly distanceToOpen: string | null | undefined;
        readonly image: {
          readonly imageURLs: {
            readonly normalized: string | null | undefined;
          } | null | undefined;
        } | null | undefined;
        readonly partner: {
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly slug: string;
        readonly status: string;
        readonly title: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type ViewingRoomsApp_Test_Query = {
  rawResponse: ViewingRoomsApp_Test_Query$rawResponse;
  response: ViewingRoomsApp_Test_Query$data;
  variables: ViewingRoomsApp_Test_Query$variables;
};

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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ViewingRoom"
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
  "type": "ARImage"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ImageURLs"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
    "type": "Query",
    "abstractKey": null
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
    "cacheID": "53e3bf63daf2dd0330e5f28853b03b3d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "allViewingRooms": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "allViewingRooms.viewingRoomsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoomsConnection"
        },
        "allViewingRooms.viewingRoomsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ViewingRoomsEdge"
        },
        "allViewingRooms.viewingRoomsConnection.edges.cursor": (v9/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node": (v10/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.__typename": (v9/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.distanceToClose": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.distanceToOpen": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.image": (v12/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.image.imageURLs": (v13/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.image.imageURLs.normalized": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.partner": (v14/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.partner.id": (v15/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.partner.name": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.slug": (v9/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.status": (v9/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.title": (v9/*: any*/),
        "allViewingRooms.viewingRoomsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "allViewingRooms.viewingRoomsConnection.pageInfo.endCursor": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "featuredViewingRooms": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoomConnection"
        },
        "featuredViewingRooms.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ViewingRoomEdge"
        },
        "featuredViewingRooms.edges.node": (v10/*: any*/),
        "featuredViewingRooms.edges.node.distanceToClose": (v11/*: any*/),
        "featuredViewingRooms.edges.node.distanceToOpen": (v11/*: any*/),
        "featuredViewingRooms.edges.node.image": (v12/*: any*/),
        "featuredViewingRooms.edges.node.image.imageURLs": (v13/*: any*/),
        "featuredViewingRooms.edges.node.image.imageURLs.normalized": (v11/*: any*/),
        "featuredViewingRooms.edges.node.partner": (v14/*: any*/),
        "featuredViewingRooms.edges.node.partner.id": (v15/*: any*/),
        "featuredViewingRooms.edges.node.partner.name": (v11/*: any*/),
        "featuredViewingRooms.edges.node.slug": (v9/*: any*/),
        "featuredViewingRooms.edges.node.status": (v9/*: any*/),
        "featuredViewingRooms.edges.node.title": (v9/*: any*/)
      }
    },
    "name": "ViewingRoomsApp_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomsApp_Test_Query {\n  allViewingRooms: viewer {\n    ...ViewingRoomsApp_allViewingRooms\n  }\n  featuredViewingRooms: viewingRooms(featured: true) {\n    ...ViewingRoomsApp_featuredViewingRooms\n  }\n}\n\nfragment ViewingRoomsApp_allViewingRooms on Viewer {\n  ...ViewingRoomsLatestGrid_viewingRooms_9Znkm\n}\n\nfragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomConnection {\n  ...ViewingRoomsFeaturedRail_featuredViewingRooms\n}\n\nfragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {\n  edges {\n    node {\n      status\n      slug\n      title\n      image {\n        imageURLs {\n          normalized\n        }\n      }\n      distanceToOpen(short: true)\n      distanceToClose(short: true)\n      partner {\n        name\n        id\n      }\n    }\n  }\n}\n\nfragment ViewingRoomsLatestGrid_viewingRooms_9Znkm on Viewer {\n  viewingRoomsConnection {\n    edges {\n      node {\n        slug\n        status\n        title\n        image {\n          imageURLs {\n            normalized\n          }\n        }\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        partner {\n          name\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5e8709a6467d35395b4d7066db2c1669";

export default node;
