/**
 * @generated SignedSource<<ec5a51e2b2d0e5046b824429547d9309>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationsList_test_Query$variables = Record<PropertyKey, never>;
export type NotificationsList_test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"NotificationsList_viewer">;
  } | null | undefined;
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
  "name": "totalCount",
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMMM D"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
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
                        "selections": (v3/*: any*/),
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "headline",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "message",
                        "storageKey": null
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
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "item",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "available",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "expiresAt",
                                "storageKey": null
                              }
                            ],
                            "type": "PartnerOfferCreatedNotificationItem",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ShowConnection",
                                "kind": "LinkedField",
                                "name": "showsConnection",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ShowEdge",
                                    "kind": "LinkedField",
                                    "name": "edges",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Show",
                                        "kind": "LinkedField",
                                        "name": "node",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": (v6/*: any*/),
                                            "kind": "ScalarField",
                                            "name": "startAt",
                                            "storageKey": "startAt(format:\"MMMM D\")"
                                          },
                                          {
                                            "alias": null,
                                            "args": (v6/*: any*/),
                                            "kind": "ScalarField",
                                            "name": "endAt",
                                            "storageKey": "endAt(format:\"MMMM D\")"
                                          },
                                          (v4/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "ShowOpenedNotificationItem",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "first",
                                    "value": 1
                                  }
                                ],
                                "concreteType": "ViewingRoomsConnection",
                                "kind": "LinkedField",
                                "name": "viewingRoomsConnection",
                                "plural": false,
                                "selections": (v3/*: any*/),
                                "storageKey": "viewingRoomsConnection(first:1)"
                              }
                            ],
                            "type": "ViewingRoomPublishedNotificationItem",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Article",
                                "kind": "LinkedField",
                                "name": "article",
                                "plural": false,
                                "selections": [
                                  (v1/*: any*/),
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "ArticleFeaturedArtistNotificationItem",
                            "abstractKey": null
                          }
                        ],
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
                          (v2/*: any*/),
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
                                  (v7/*: any*/),
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
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "artworksConnection(first:4)"
                      },
                      (v7/*: any*/),
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
                      (v5/*: any*/)
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
    "cacheID": "d025971523f2eb9667915e7210603a7a",
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
        "viewer.notifications.edges.cursor": (v8/*: any*/),
        "viewer.notifications.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Notification"
        },
        "viewer.notifications.edges.node.__typename": (v8/*: any*/),
        "viewer.notifications.edges.node.artworks": (v9/*: any*/),
        "viewer.notifications.edges.node.artworks.totalCount": (v10/*: any*/),
        "viewer.notifications.edges.node.artworksConnection": (v9/*: any*/),
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
        "viewer.notifications.edges.node.artworksConnection.edges.node.id": (v11/*: any*/),
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
        "viewer.notifications.edges.node.artworksConnection.edges.node.image.thumb.src": (v8/*: any*/),
        "viewer.notifications.edges.node.artworksConnection.edges.node.image.thumb.srcSet": (v8/*: any*/),
        "viewer.notifications.edges.node.artworksConnection.edges.node.internalID": (v11/*: any*/),
        "viewer.notifications.edges.node.artworksConnection.edges.node.title": (v12/*: any*/),
        "viewer.notifications.edges.node.artworksConnection.totalCount": (v10/*: any*/),
        "viewer.notifications.edges.node.headline": (v8/*: any*/),
        "viewer.notifications.edges.node.id": (v11/*: any*/),
        "viewer.notifications.edges.node.internalID": (v11/*: any*/),
        "viewer.notifications.edges.node.isUnread": (v13/*: any*/),
        "viewer.notifications.edges.node.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationItem"
        },
        "viewer.notifications.edges.node.item.__typename": (v8/*: any*/),
        "viewer.notifications.edges.node.item.article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "viewer.notifications.edges.node.item.article.id": (v11/*: any*/),
        "viewer.notifications.edges.node.item.article.internalID": (v11/*: any*/),
        "viewer.notifications.edges.node.item.available": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.notifications.edges.node.item.expiresAt": (v12/*: any*/),
        "viewer.notifications.edges.node.item.showsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowConnection"
        },
        "viewer.notifications.edges.node.item.showsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ShowEdge"
        },
        "viewer.notifications.edges.node.item.showsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "viewer.notifications.edges.node.item.showsConnection.edges.node.endAt": (v12/*: any*/),
        "viewer.notifications.edges.node.item.showsConnection.edges.node.id": (v11/*: any*/),
        "viewer.notifications.edges.node.item.showsConnection.edges.node.startAt": (v12/*: any*/),
        "viewer.notifications.edges.node.item.viewingRoomsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoomsConnection"
        },
        "viewer.notifications.edges.node.item.viewingRoomsConnection.totalCount": (v10/*: any*/),
        "viewer.notifications.edges.node.message": (v8/*: any*/),
        "viewer.notifications.edges.node.notificationType": {
          "enumValues": [
            "ARTICLE_FEATURED_ARTIST",
            "ARTWORK_ALERT",
            "ARTWORK_PUBLISHED",
            "PARTNER_OFFER_CREATED",
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
        "viewer.notifications.edges.node.publishedAt": (v8/*: any*/),
        "viewer.notifications.edges.node.targetHref": (v8/*: any*/),
        "viewer.notifications.edges.node.title": (v8/*: any*/),
        "viewer.notifications.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.notifications.pageInfo.endCursor": (v12/*: any*/),
        "viewer.notifications.pageInfo.hasNextPage": (v13/*: any*/)
      }
    },
    "name": "NotificationsList_test_Query",
    "operationKind": "query",
    "text": "query NotificationsList_test_Query {\n  viewer {\n    ...NotificationsList_viewer\n  }\n}\n\nfragment NotificationItem_item on Notification {\n  id\n  internalID\n  headline\n  message\n  targetHref\n  isUnread\n  notificationType\n  objectsCount\n  item {\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      available\n      expiresAt\n    }\n  }\n  artworksConnection(first: 4) {\n    totalCount\n    edges {\n      node {\n        internalID\n        title\n        image {\n          thumb: cropped(width: 58, height: 58) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n  }\n  title\n  ...NotificationTypeLabel_notification\n}\n\nfragment NotificationTypeLabel_notification on Notification {\n  notificationType\n  publishedAt(format: \"RELATIVE\")\n  item {\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      available\n      expiresAt\n    }\n    ... on ShowOpenedNotificationItem {\n      showsConnection {\n        edges {\n          node {\n            startAt(format: \"MMMM D\")\n            endAt(format: \"MMMM D\")\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment NotificationsList_viewer on Viewer {\n  notifications: notificationsConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        notificationType\n        artworks: artworksConnection {\n          totalCount\n        }\n        ...NotificationItem_item\n        item {\n          __typename\n          ... on ViewingRoomPublishedNotificationItem {\n            viewingRoomsConnection(first: 1) {\n              totalCount\n            }\n          }\n          ... on ArticleFeaturedArtistNotificationItem {\n            article {\n              internalID\n              id\n            }\n          }\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a502783f36b263d10c37dfce56cd8b9a";

export default node;
