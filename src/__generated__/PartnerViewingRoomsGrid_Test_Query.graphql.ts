/**
 * @generated SignedSource<<26efc6af1586c8be2fd7d64f44ca8854>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerViewingRoomsGrid_Test_Query$variables = Record<PropertyKey, never>;
export type PartnerViewingRoomsGrid_Test_Query$data = {
  readonly viewingRoomsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRoomsGrid_viewingRoomsConnection">;
  } | null | undefined;
};
export type PartnerViewingRoomsGrid_Test_Query = {
  response: PartnerViewingRoomsGrid_Test_Query$data;
  variables: PartnerViewingRoomsGrid_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "white-cube"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v4 = {
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
    "name": "PartnerViewingRoomsGrid_Test_Query",
    "selections": [
      {
        "alias": "viewingRoomsConnection",
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnerViewingRoomsGrid_viewingRoomsConnection"
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnerViewingRoomsGrid_Test_Query",
    "selections": [
      {
        "alias": "viewingRoomsConnection",
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
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
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      },
                      {
                        "alias": "coverImage",
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
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "width",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "height",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
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
            "filters": [
              "statuses"
            ],
            "handle": "connection",
            "key": "PartnerViewingRoomsGrid_viewingRoomsConnection",
            "kind": "LinkedHandle",
            "name": "viewingRoomsConnection"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "cacheID": "3f2312f93f0fd80495dd19645d51b547",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewingRoomsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewingRoomsConnection.id": (v1/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoomsConnection"
        },
        "viewingRoomsConnection.viewingRoomsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ViewingRoomsEdge"
        },
        "viewingRoomsConnection.viewingRoomsConnection.edges.cursor": (v2/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoom"
        },
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.__typename": (v2/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ARImage"
        },
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.coverImage.height": (v3/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.coverImage.imageURLs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ImageURLs"
        },
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.coverImage.imageURLs.normalized": (v4/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.coverImage.width": (v3/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.exhibitionPeriod": (v4/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.href": (v4/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.internalID": (v1/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.edges.node.title": (v2/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewingRoomsConnection.viewingRoomsConnection.pageInfo.endCursor": (v4/*: any*/),
        "viewingRoomsConnection.viewingRoomsConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        }
      }
    },
    "name": "PartnerViewingRoomsGrid_Test_Query",
    "operationKind": "query",
    "text": "query PartnerViewingRoomsGrid_Test_Query {\n  viewingRoomsConnection: partner(id: \"white-cube\") {\n    ...PartnerViewingRoomsGrid_viewingRoomsConnection\n    id\n  }\n}\n\nfragment PartnerViewingRoomsGrid_viewingRoomsConnection on Partner {\n  viewingRoomsConnection {\n    edges {\n      node {\n        internalID\n        ...ViewingRoomCard_viewingRoom\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ViewingRoomCard_viewingRoom on ViewingRoom {\n  href\n  title\n  exhibitionPeriod\n  coverImage: image {\n    imageURLs {\n      normalized\n    }\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "48ee8826f8ffd6c3bfa3ef48ae223cf4";

export default node;
