/**
 * @generated SignedSource<<9febd56cc64f26ab62e03827db904988>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationItem_test_Query$variables = Record<PropertyKey, never>;
export type NotificationItem_test_Query$data = {
  readonly notificationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"NotificationItem_notification">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type NotificationItem_test_Query = {
  response: NotificationItem_test_Query$data;
  variables: NotificationItem_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v1 = [
  (v0/*: any*/)
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
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
    "name": "NotificationItem_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                    "name": "NotificationItem_notification"
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
    "name": "NotificationItem_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
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
                    "name": "notificationType",
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
                                  (v0/*: any*/),
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
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "totalCount",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "userInterestsConnection(first:1,interestType:\"ARTIST\")"
                              },
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "CollectorProfileUpdatePromptNotificationItem",
                        "abstractKey": null
                      },
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
    ]
  },
  "params": {
    "cacheID": "8f0c14ab1845dedbc2b5394b011e0375",
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
        "notificationsConnection.edges.node.headline": (v3/*: any*/),
        "notificationsConnection.edges.node.id": (v4/*: any*/),
        "notificationsConnection.edges.node.internalID": (v4/*: any*/),
        "notificationsConnection.edges.node.isUnread": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "notificationsConnection.edges.node.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationItem"
        },
        "notificationsConnection.edges.node.item.__isNotificationItem": (v3/*: any*/),
        "notificationsConnection.edges.node.item.__typename": (v3/*: any*/),
        "notificationsConnection.edges.node.item.available": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "notificationsConnection.edges.node.item.expiresAt": (v5/*: any*/),
        "notificationsConnection.edges.node.item.me": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Me"
        },
        "notificationsConnection.edges.node.item.me.id": (v4/*: any*/),
        "notificationsConnection.edges.node.item.me.userInterestsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserInterestConnection"
        },
        "notificationsConnection.edges.node.item.me.userInterestsConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "notificationsConnection.edges.node.message": (v3/*: any*/),
        "notificationsConnection.edges.node.notificationType": {
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
        "notificationsConnection.edges.node.objectsCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "notificationsConnection.edges.node.previewImages": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Image"
        },
        "notificationsConnection.edges.node.previewImages.blurhashDataURL": (v5/*: any*/),
        "notificationsConnection.edges.node.previewImages.url": (v5/*: any*/),
        "notificationsConnection.edges.node.publishedAt": (v3/*: any*/),
        "notificationsConnection.edges.node.targetHref": (v3/*: any*/),
        "notificationsConnection.edges.node.title": (v3/*: any*/)
      }
    },
    "name": "NotificationItem_test_Query",
    "operationKind": "query",
    "text": "query NotificationItem_test_Query {\n  notificationsConnection(first: 1) {\n    edges {\n      node {\n        ...NotificationItem_notification\n        id\n      }\n    }\n  }\n}\n\nfragment NotificationItemCollectorProfileUpdatePrompt_notificationItem on NotificationItem {\n  __isNotificationItem: __typename\n  ... on CollectorProfileUpdatePromptNotificationItem {\n    me {\n      userInterestsConnection(interestType: ARTIST, first: 1) {\n        totalCount\n      }\n      id\n    }\n  }\n}\n\nfragment NotificationItem_notification on Notification {\n  id\n  internalID\n  headline\n  message\n  targetHref\n  isUnread\n  notificationType\n  objectsCount\n  item {\n    ...NotificationItemCollectorProfileUpdatePrompt_notificationItem\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      available\n      expiresAt\n    }\n  }\n  previewImages(size: 4) {\n    blurhashDataURL\n    url(version: \"thumbnail\")\n  }\n  title\n  ...NotificationTypeLabel_notification\n}\n\nfragment NotificationTypeLabel_notification on Notification {\n  notificationType\n  publishedAt(format: \"RELATIVE\")\n}\n"
  }
};
})();

(node as any).hash = "fe674d7c3f61fd84bbb1cfa593935d9e";

export default node;
