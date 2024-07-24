/**
 * @generated SignedSource<<1ba2914d859614e3205d3b05d08873d6>>
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
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v10 = {
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
                        "selections": (v2/*: any*/),
                        "storageKey": null
                      },
                      (v3/*: any*/),
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
                          {
                            "kind": "TypeDiscriminator",
                            "abstractKey": "__isNotificationItem"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Me",
                                "kind": "LinkedField",
                                "name": "me",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": [
                                      (v4/*: any*/),
                                      {
                                        "kind": "Literal",
                                        "name": "interestType",
                                        "value": "ARTIST"
                                      }
                                    ],
                                    "concreteType": "UserInterestConnection",
                                    "kind": "LinkedField",
                                    "name": "userInterestsConnection",
                                    "plural": false,
                                    "selections": (v2/*: any*/),
                                    "storageKey": "userInterestsConnection(first:1,interestType:\"ARTIST\")"
                                  },
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "CollectorProfileUpdatePromptNotificationItem",
                            "abstractKey": null
                          },
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
                                "args": [
                                  (v4/*: any*/)
                                ],
                                "concreteType": "ViewingRoomsConnection",
                                "kind": "LinkedField",
                                "name": "viewingRoomsConnection",
                                "plural": false,
                                "selections": (v2/*: any*/),
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
                                  (v3/*: any*/)
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
                            "name": "size",
                            "value": 4
                          }
                        ],
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "previewImages",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "blurhashDataURL",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "thumbnail"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"thumbnail\")"
                          }
                        ],
                        "storageKey": "previewImages(size:4)"
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
    "cacheID": "fb6d4796872e3187d1f08bdd5c424c49",
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
        "viewer.notifications.edges.cursor": (v6/*: any*/),
        "viewer.notifications.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Notification"
        },
        "viewer.notifications.edges.node.__typename": (v6/*: any*/),
        "viewer.notifications.edges.node.artworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "viewer.notifications.edges.node.artworks.totalCount": (v7/*: any*/),
        "viewer.notifications.edges.node.headline": (v6/*: any*/),
        "viewer.notifications.edges.node.id": (v8/*: any*/),
        "viewer.notifications.edges.node.internalID": (v8/*: any*/),
        "viewer.notifications.edges.node.isUnread": (v9/*: any*/),
        "viewer.notifications.edges.node.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationItem"
        },
        "viewer.notifications.edges.node.item.__isNotificationItem": (v6/*: any*/),
        "viewer.notifications.edges.node.item.__typename": (v6/*: any*/),
        "viewer.notifications.edges.node.item.article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "viewer.notifications.edges.node.item.article.id": (v8/*: any*/),
        "viewer.notifications.edges.node.item.article.internalID": (v8/*: any*/),
        "viewer.notifications.edges.node.item.available": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.notifications.edges.node.item.expiresAt": (v10/*: any*/),
        "viewer.notifications.edges.node.item.me": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Me"
        },
        "viewer.notifications.edges.node.item.me.id": (v8/*: any*/),
        "viewer.notifications.edges.node.item.me.userInterestsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserInterestConnection"
        },
        "viewer.notifications.edges.node.item.me.userInterestsConnection.totalCount": (v7/*: any*/),
        "viewer.notifications.edges.node.item.viewingRoomsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoomsConnection"
        },
        "viewer.notifications.edges.node.item.viewingRoomsConnection.totalCount": (v7/*: any*/),
        "viewer.notifications.edges.node.message": (v6/*: any*/),
        "viewer.notifications.edges.node.notificationType": {
          "enumValues": [
            "ARTICLE_FEATURED_ARTIST",
            "ARTWORK_ALERT",
            "ARTWORK_PUBLISHED",
            "COLLECTOR_PROFILE_UPDATE_PROMPT",
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
        "viewer.notifications.edges.node.previewImages": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Image"
        },
        "viewer.notifications.edges.node.previewImages.blurhashDataURL": (v10/*: any*/),
        "viewer.notifications.edges.node.previewImages.url": (v10/*: any*/),
        "viewer.notifications.edges.node.publishedAt": (v6/*: any*/),
        "viewer.notifications.edges.node.targetHref": (v6/*: any*/),
        "viewer.notifications.edges.node.title": (v6/*: any*/),
        "viewer.notifications.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.notifications.pageInfo.endCursor": (v10/*: any*/),
        "viewer.notifications.pageInfo.hasNextPage": (v9/*: any*/)
      }
    },
    "name": "NotificationsList_test_Query",
    "operationKind": "query",
    "text": "query NotificationsList_test_Query {\n  viewer {\n    ...NotificationsList_viewer\n  }\n}\n\nfragment NotificationItemCollectorProfileUpdatePrompt_notificationItem on NotificationItem {\n  __isNotificationItem: __typename\n  ... on CollectorProfileUpdatePromptNotificationItem {\n    me {\n      userInterestsConnection(interestType: ARTIST, first: 1) {\n        totalCount\n      }\n      id\n    }\n  }\n}\n\nfragment NotificationItem_notification on Notification {\n  id\n  internalID\n  headline\n  message\n  targetHref\n  isUnread\n  notificationType\n  objectsCount\n  item {\n    ...NotificationItemCollectorProfileUpdatePrompt_notificationItem\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      available\n      expiresAt\n    }\n  }\n  previewImages(size: 4) {\n    blurhashDataURL\n    url(version: \"thumbnail\")\n  }\n  title\n  ...NotificationTypeLabel_notification\n}\n\nfragment NotificationTypeLabel_notification on Notification {\n  notificationType\n  publishedAt(format: \"RELATIVE\")\n}\n\nfragment NotificationsList_viewer on Viewer {\n  notifications: notificationsConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        notificationType\n        artworks: artworksConnection {\n          totalCount\n        }\n        ...NotificationItem_notification\n        item {\n          __typename\n          ... on ViewingRoomPublishedNotificationItem {\n            viewingRoomsConnection(first: 1) {\n              totalCount\n            }\n          }\n          ... on ArticleFeaturedArtistNotificationItem {\n            article {\n              internalID\n              id\n            }\n          }\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a502783f36b263d10c37dfce56cd8b9a";

export default node;
