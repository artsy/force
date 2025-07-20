/**
 * @generated SignedSource<<708115f025ab4f4a4d322d585c172e5c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsAppTestQuery$variables = Record<PropertyKey, never>;
export type ViewingRoomsAppTestQuery$data = {
  readonly allViewingRooms: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomsApp_allViewingRooms">;
  } | null | undefined;
  readonly featuredViewingRooms: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomsApp_featuredViewingRooms">;
  } | null | undefined;
};
export type ViewingRoomsAppTestQuery$rawResponse = {
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
export type ViewingRoomsAppTestQuery = {
  rawResponse: ViewingRoomsAppTestQuery$rawResponse;
  response: ViewingRoomsAppTestQuery$data;
  variables: ViewingRoomsAppTestQuery$variables;
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
  "concreteType": "GravityARImage",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityImageURLs",
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
  "nullable": true,
  "plural": false,
  "type": "ViewingRoomsConnection"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ViewingRoomsEdge"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ViewingRoom"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "GravityARImage"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "GravityImageURLs"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v17 = {
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
    "name": "ViewingRoomsAppTestQuery",
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
        "concreteType": "ViewingRoomsConnection",
        "kind": "LinkedField",
        "name": "viewingRoomsConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomsApp_featuredViewingRooms"
          }
        ],
        "storageKey": "viewingRoomsConnection(featured:true)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewingRoomsAppTestQuery",
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
        "storageKey": "viewingRoomsConnection(featured:true)"
      }
    ]
  },
  "params": {
    "cacheID": "65bd3b7b7ae603023513fb0805bb2ee2",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "allViewingRooms": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "allViewingRooms.viewingRoomsConnection": (v9/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges": (v10/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.cursor": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node": (v12/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.__typename": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.distanceToClose": (v13/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.distanceToOpen": (v13/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.image": (v14/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.image.imageURLs": (v15/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.image.imageURLs.normalized": (v13/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.partner": (v16/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.partner.id": (v17/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.partner.name": (v13/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.slug": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.status": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.edges.node.title": (v11/*: any*/),
        "allViewingRooms.viewingRoomsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "allViewingRooms.viewingRoomsConnection.pageInfo.endCursor": (v13/*: any*/),
        "allViewingRooms.viewingRoomsConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "featuredViewingRooms": (v9/*: any*/),
        "featuredViewingRooms.edges": (v10/*: any*/),
        "featuredViewingRooms.edges.node": (v12/*: any*/),
        "featuredViewingRooms.edges.node.distanceToClose": (v13/*: any*/),
        "featuredViewingRooms.edges.node.distanceToOpen": (v13/*: any*/),
        "featuredViewingRooms.edges.node.image": (v14/*: any*/),
        "featuredViewingRooms.edges.node.image.imageURLs": (v15/*: any*/),
        "featuredViewingRooms.edges.node.image.imageURLs.normalized": (v13/*: any*/),
        "featuredViewingRooms.edges.node.partner": (v16/*: any*/),
        "featuredViewingRooms.edges.node.partner.id": (v17/*: any*/),
        "featuredViewingRooms.edges.node.partner.name": (v13/*: any*/),
        "featuredViewingRooms.edges.node.slug": (v11/*: any*/),
        "featuredViewingRooms.edges.node.status": (v11/*: any*/),
        "featuredViewingRooms.edges.node.title": (v11/*: any*/)
      }
    },
    "name": "ViewingRoomsAppTestQuery",
    "operationKind": "query",
    "text": "query ViewingRoomsAppTestQuery {\n  allViewingRooms: viewer {\n    ...ViewingRoomsApp_allViewingRooms\n  }\n  featuredViewingRooms: viewingRoomsConnection(featured: true) {\n    ...ViewingRoomsApp_featuredViewingRooms\n  }\n}\n\nfragment ViewingRoomsApp_allViewingRooms on Viewer {\n  ...ViewingRoomsLatestGrid_viewingRooms_9Znkm\n}\n\nfragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomsConnection {\n  ...ViewingRoomsFeaturedRail_featuredViewingRooms\n}\n\nfragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomsConnection {\n  edges {\n    node {\n      status\n      slug\n      title\n      image {\n        imageURLs {\n          normalized\n        }\n      }\n      distanceToOpen(short: true)\n      distanceToClose(short: true)\n      partner {\n        name\n        id\n      }\n    }\n  }\n}\n\nfragment ViewingRoomsLatestGrid_viewingRooms_9Znkm on Viewer {\n  viewingRoomsConnection {\n    edges {\n      node {\n        slug\n        status\n        title\n        image {\n          imageURLs {\n            normalized\n          }\n        }\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        partner {\n          name\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9b31874a23b0251e20d0975c4d9fc6f7";

export default node;
