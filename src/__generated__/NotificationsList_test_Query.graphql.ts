/**
 * @generated SignedSource<<154625b0ee6d03de3daeb001f2887890>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationsList_test_Query$variables = {};
export type NotificationsList_test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"NotificationsList_viewer">;
  } | null;
};
export type NotificationsList_test_Query = {
  response: NotificationsList_test_Query$data;
  variables: NotificationsList_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
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
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NotificationsList_test_Query",
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
            "name": "NotificationsList_viewer"
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
    "name": "NotificationsList_test_Query",
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
            "alias": "notifications",
            "args": (v0/*: any*/),
            "concreteType": "NotificationConnection",
            "kind": "LinkedField",
            "name": "notificationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "NotificationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Notification",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "notificationType",
                        "storageKey": null
                      },
                      {
                        "alias": "artworks",
                        "args": null,
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
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "message",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "RELATIVE"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"RELATIVE\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "targetHref",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isUnread",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "objectsCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 4
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
                                  (v1/*: any*/),
                                  (v2/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": "thumb",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "height",
                                            "value": 58
                                          },
                                          {
                                            "kind": "Literal",
                                            "name": "width",
                                            "value": 58
                                          }
                                        ],
                                        "concreteType": "CroppedImageUrl",
                                        "kind": "LinkedField",
                                        "name": "cropped",
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
                                        "storageKey": "cropped(height:58,width:58)"
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "artworksConnection(first:4)"
                      },
                      (v3/*: any*/),
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
            "storageKey": "notificationsConnection(first:10)"
          },
          {
            "alias": "notifications",
            "args": (v0/*: any*/),
            "filters": [],
            "handle": "connection",
            "key": "NotificationsList_notifications",
            "kind": "LinkedHandle",
            "name": "notificationsConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "73a09bae02d633b7f50838bd7e73b047",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.notifications": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationConnection"
        },
        "viewer.notifications.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "NotificationEdge"
        },
        "viewer.notifications.edges.cursor": (v4/*: any*/),
        "viewer.notifications.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Notification"
        },
        "viewer.notifications.edges.node.__typename": (v4/*: any*/),
        "viewer.notifications.edges.node.artworks": (v5/*: any*/),
        "viewer.notifications.edges.node.artworks.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "viewer.notifications.edges.node.artworksConnection": (v5/*: any*/),
        "viewer.notifications.edges.node.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "viewer.notifications.edges.node.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewer.notifications.edges.node.artworksConnection.edges.node.id": (v6/*: any*/),
        "viewer.notifications.edges.node.artworksConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewer.notifications.edges.node.artworksConnection.edges.node.image.thumb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "viewer.notifications.edges.node.artworksConnection.edges.node.image.thumb.src": (v4/*: any*/),
        "viewer.notifications.edges.node.artworksConnection.edges.node.image.thumb.srcSet": (v4/*: any*/),
        "viewer.notifications.edges.node.artworksConnection.edges.node.internalID": (v6/*: any*/),
        "viewer.notifications.edges.node.artworksConnection.edges.node.title": (v7/*: any*/),
        "viewer.notifications.edges.node.id": (v6/*: any*/),
        "viewer.notifications.edges.node.internalID": (v6/*: any*/),
        "viewer.notifications.edges.node.isUnread": (v8/*: any*/),
        "viewer.notifications.edges.node.message": (v4/*: any*/),
        "viewer.notifications.edges.node.notificationType": {
          "enumValues": [
            "ARTWORK_ALERT",
            "ARTWORK_PUBLISHED",
            "PARTNER_SHOW_OPENED",
            "VIEWING_ROOM_PUBLISHED"
          ],
          "nullable": false,
          "plural": false,
          "type": "NotificationTypesEnum"
        },
        "viewer.notifications.edges.node.objectsCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "viewer.notifications.edges.node.publishedAt": (v4/*: any*/),
        "viewer.notifications.edges.node.targetHref": (v4/*: any*/),
        "viewer.notifications.edges.node.title": (v4/*: any*/),
        "viewer.notifications.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.notifications.pageInfo.endCursor": (v7/*: any*/),
        "viewer.notifications.pageInfo.hasNextPage": (v8/*: any*/)
      }
    },
    "name": "NotificationsList_test_Query",
    "operationKind": "query",
    "text": "query NotificationsList_test_Query {\n  viewer {\n    ...NotificationsList_viewer\n  }\n}\n\nfragment NotificationItem_item on Notification {\n  title\n  message\n  publishedAt(format: \"RELATIVE\")\n  targetHref\n  isUnread\n  notificationType\n  objectsCount\n  artworksConnection(first: 4) {\n    edges {\n      node {\n        internalID\n        title\n        image {\n          thumb: cropped(width: 58, height: 58) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment NotificationsList_viewer on Viewer {\n  notifications: notificationsConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        notificationType\n        artworks: artworksConnection {\n          totalCount\n        }\n        ...NotificationItem_item\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a502783f36b263d10c37dfce56cd8b9a";

export default node;
