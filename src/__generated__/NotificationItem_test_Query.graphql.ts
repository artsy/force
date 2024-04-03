/**
 * @generated SignedSource<<5f8f574141366319965d9b5930d941ff>>
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
        readonly " $fragmentSpreads": FragmentRefs<"NotificationItem_item">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type NotificationItem_test_Query = {
  response: NotificationItem_test_Query$data;
  variables: NotificationItem_test_Query$variables;
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMMM D"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
                    "name": "NotificationItem_item"
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
                  (v2/*: any*/),
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
                                        "args": (v3/*: any*/),
                                        "kind": "ScalarField",
                                        "name": "startAt",
                                        "storageKey": "startAt(format:\"MMMM D\")"
                                      },
                                      {
                                        "alias": null,
                                        "args": (v3/*: any*/),
                                        "kind": "ScalarField",
                                        "name": "endAt",
                                        "storageKey": "endAt(format:\"MMMM D\")"
                                      },
                                      (v1/*: any*/)
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
                        "kind": "ScalarField",
                        "name": "totalCount",
                        "storageKey": null
                      },
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
                              (v2/*: any*/),
                              (v4/*: any*/),
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
                              (v1/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artworksConnection(first:4)"
                  },
                  (v4/*: any*/),
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
    "cacheID": "198c291ff400ee144c4d3ea0279f1d54",
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
        "notificationsConnection.edges.node.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "notificationsConnection.edges.node.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "notificationsConnection.edges.node.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "notificationsConnection.edges.node.artworksConnection.edges.node.id": (v5/*: any*/),
        "notificationsConnection.edges.node.artworksConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "notificationsConnection.edges.node.artworksConnection.edges.node.image.thumb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "notificationsConnection.edges.node.artworksConnection.edges.node.image.thumb.src": (v6/*: any*/),
        "notificationsConnection.edges.node.artworksConnection.edges.node.image.thumb.srcSet": (v6/*: any*/),
        "notificationsConnection.edges.node.artworksConnection.edges.node.internalID": (v5/*: any*/),
        "notificationsConnection.edges.node.artworksConnection.edges.node.title": (v7/*: any*/),
        "notificationsConnection.edges.node.artworksConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "notificationsConnection.edges.node.headline": (v6/*: any*/),
        "notificationsConnection.edges.node.id": (v5/*: any*/),
        "notificationsConnection.edges.node.internalID": (v5/*: any*/),
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
        "notificationsConnection.edges.node.item.__typename": (v6/*: any*/),
        "notificationsConnection.edges.node.item.available": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "notificationsConnection.edges.node.item.expiresAt": (v7/*: any*/),
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
        "notificationsConnection.edges.node.item.showsConnection.edges.node.id": (v5/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.startAt": (v7/*: any*/),
        "notificationsConnection.edges.node.message": (v6/*: any*/),
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
        "notificationsConnection.edges.node.objectsCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "notificationsConnection.edges.node.publishedAt": (v6/*: any*/),
        "notificationsConnection.edges.node.targetHref": (v6/*: any*/),
        "notificationsConnection.edges.node.title": (v6/*: any*/)
      }
    },
    "name": "NotificationItem_test_Query",
    "operationKind": "query",
    "text": "query NotificationItem_test_Query {\n  notificationsConnection(first: 1) {\n    edges {\n      node {\n        ...NotificationItem_item\n        id\n      }\n    }\n  }\n}\n\nfragment NotificationItem_item on Notification {\n  id\n  internalID\n  headline\n  message\n  targetHref\n  isUnread\n  notificationType\n  objectsCount\n  item {\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      available\n      expiresAt\n    }\n  }\n  artworksConnection(first: 4) {\n    totalCount\n    edges {\n      node {\n        internalID\n        title\n        image {\n          thumb: cropped(width: 58, height: 58) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n  }\n  title\n  ...NotificationTypeLabel_notification\n}\n\nfragment NotificationTypeLabel_notification on Notification {\n  notificationType\n  publishedAt(format: \"RELATIVE\")\n  item {\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      available\n      expiresAt\n    }\n    ... on ShowOpenedNotificationItem {\n      showsConnection {\n        edges {\n          node {\n            startAt(format: \"MMMM D\")\n            endAt(format: \"MMMM D\")\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9df25eb5d679d0c09b3213492b714738";

export default node;
