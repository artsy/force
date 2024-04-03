/**
 * @generated SignedSource<<ac84eb0410ec852b23ec1f3958bf5571>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomPublishedNotification_test_Query$variables = Record<PropertyKey, never>;
export type ViewingRoomPublishedNotification_test_Query$data = {
  readonly notificationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomPublishedNotification_notification">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type ViewingRoomPublishedNotification_test_Query = {
  response: ViewingRoomPublishedNotification_test_Query$data;
  variables: ViewingRoomPublishedNotification_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMMM D"
  }
],
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewingRoomPublishedNotification_test_Query",
    "selections": [
      {
        "alias": null,
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
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ViewingRoomPublishedNotification_notification"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "notificationsConnection(first:1)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewingRoomPublishedNotification_test_Query",
    "selections": [
      {
        "alias": null,
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "item",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
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
                              (v1/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Profile",
                                "kind": "LinkedField",
                                "name": "profile",
                                "plural": false,
                                "selections": [
                                  (v2/*: any*/),
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "first",
                                "value": 10
                              }
                            ],
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
                                        "name": "title",
                                        "storageKey": null
                                      },
                                      (v1/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "introStatement",
                                        "storageKey": null
                                      },
                                      {
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
                                      (v2/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": "viewingRoomsConnection(first:10)"
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
                                        "args": (v4/*: any*/),
                                        "kind": "ScalarField",
                                        "name": "startAt",
                                        "storageKey": "startAt(format:\"MMMM D\")"
                                      },
                                      {
                                        "alias": null,
                                        "args": (v4/*: any*/),
                                        "kind": "ScalarField",
                                        "name": "endAt",
                                        "storageKey": "endAt(format:\"MMMM D\")"
                                      },
                                      (v3/*: any*/)
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
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "notificationType",
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
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "notificationsConnection(first:1)"
      }
    ]
  },
  "params": {
    "cacheID": "52b4758f8b8d799d033d711266fdae04",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "notificationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationConnection"
        },
        "notificationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "NotificationEdge"
        },
        "notificationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Notification"
        },
        "notificationsConnection.edges.node.headline": (v5/*: any*/),
        "notificationsConnection.edges.node.id": (v6/*: any*/),
        "notificationsConnection.edges.node.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationItem"
        },
        "notificationsConnection.edges.node.item.__typename": (v5/*: any*/),
        "notificationsConnection.edges.node.item.available": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "notificationsConnection.edges.node.item.expiresAt": (v7/*: any*/),
        "notificationsConnection.edges.node.item.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "notificationsConnection.edges.node.item.partner.href": (v7/*: any*/),
        "notificationsConnection.edges.node.item.partner.id": (v6/*: any*/),
        "notificationsConnection.edges.node.item.partner.name": (v7/*: any*/),
        "notificationsConnection.edges.node.item.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "notificationsConnection.edges.node.item.partner.profile.id": (v6/*: any*/),
        "notificationsConnection.edges.node.item.partner.profile.internalID": (v6/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowConnection"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ShowEdge"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.endAt": (v7/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.id": (v6/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.startAt": (v7/*: any*/),
        "notificationsConnection.edges.node.item.viewingRoomsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoomsConnection"
        },
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ViewingRoomsEdge"
        },
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoom"
        },
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node.href": (v7/*: any*/),
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ARImage"
        },
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node.image.height": (v8/*: any*/),
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node.image.imageURLs": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ImageURLs"
        },
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node.image.imageURLs.normalized": (v7/*: any*/),
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node.image.width": (v8/*: any*/),
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node.internalID": (v6/*: any*/),
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node.introStatement": (v7/*: any*/),
        "notificationsConnection.edges.node.item.viewingRoomsConnection.edges.node.title": (v5/*: any*/),
        "notificationsConnection.edges.node.notificationType": {
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
        "notificationsConnection.edges.node.publishedAt": (v5/*: any*/)
      }
    },
    "name": "ViewingRoomPublishedNotification_test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomPublishedNotification_test_Query {\n  notificationsConnection(first: 1) {\n    edges {\n      node {\n        ...ViewingRoomPublishedNotification_notification\n        id\n      }\n    }\n  }\n}\n\nfragment NotificationTypeLabel_notification on Notification {\n  notificationType\n  publishedAt(format: \"RELATIVE\")\n  item {\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      available\n      expiresAt\n    }\n    ... on ShowOpenedNotificationItem {\n      showsConnection {\n        edges {\n          node {\n            startAt(format: \"MMMM D\")\n            endAt(format: \"MMMM D\")\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment NotificationViewingRoom_viewingRoom on ViewingRoom {\n  title\n  href\n  introStatement\n  image {\n    imageURLs {\n      normalized\n    }\n    width\n    height\n  }\n}\n\nfragment NotificationViewingRoomsList_viewingRoomsConnection on ViewingRoomsConnection {\n  edges {\n    node {\n      ...NotificationViewingRoom_viewingRoom\n      internalID\n    }\n  }\n}\n\nfragment ViewingRoomPublishedNotification_notification on Notification {\n  headline\n  item {\n    __typename\n    ... on ViewingRoomPublishedNotificationItem {\n      partner {\n        name\n        href\n        profile {\n          internalID\n          id\n        }\n        id\n      }\n      viewingRoomsConnection(first: 10) {\n        ...NotificationViewingRoomsList_viewingRoomsConnection\n      }\n    }\n  }\n  notificationType\n  ...NotificationTypeLabel_notification\n}\n"
  }
};
})();

(node as any).hash = "094b1974d901dc4574293eea319fae06";

export default node;
