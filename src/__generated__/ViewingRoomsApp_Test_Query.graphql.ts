/**
 * @generated SignedSource<<51c22fe59e25a718a13c1edb7fbb5547>>
 * @relayHash f24b33c4be8d74288f4ce64e8c71e5d2
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f24b33c4be8d74288f4ce64e8c71e5d2

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
  "type": "ARImage"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ImageURLs"
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
    "id": "f24b33c4be8d74288f4ce64e8c71e5d2",
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
    "name": "ViewingRoomsApp_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "262ea939bd31cffe6000cc74d768694d";

export default node;
