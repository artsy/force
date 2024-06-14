/**
 * @generated SignedSource<<8d03243b9e1a1e3dda3e8682c961b9af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerShowOpenedNotification_test_Query$variables = Record<PropertyKey, never>;
export type PartnerShowOpenedNotification_test_Query$data = {
  readonly notificationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PartnerShowOpenedNotification_notification">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type PartnerShowOpenedNotification_test_Query = {
  response: PartnerShowOpenedNotification_test_Query$data;
  variables: PartnerShowOpenedNotification_test_Query$variables;
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
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnerShowOpenedNotification_test_Query",
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
                    "name": "PartnerShowOpenedNotification_notification"
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
    "name": "PartnerShowOpenedNotification_test_Query",
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
                              (v1/*: any*/),
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Profile",
                                "kind": "LinkedField",
                                "name": "profile",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
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
                                      (v3/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Location",
                                        "kind": "LinkedField",
                                        "name": "location",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "city",
                                            "storageKey": null
                                          },
                                          (v4/*: any*/)
                                        ],
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
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "startAt",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "endAt",
                                        "storageKey": null
                                      },
                                      (v2/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "description",
                                        "storageKey": null
                                      },
                                      (v1/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "coverImage",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "height",
                                                "value": 450
                                              },
                                              {
                                                "kind": "Literal",
                                                "name": "version",
                                                "value": [
                                                  "larger",
                                                  "large"
                                                ]
                                              },
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 600
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
                                            "storageKey": "cropped(height:450,version:[\"larger\",\"large\"],width:600)"
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "slug",
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
                  (v4/*: any*/)
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
    "cacheID": "251a78bb85ec4257dbf59a2680a7cd0f",
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
        "notificationsConnection.edges.node.item.showsConnection.edges.node.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.coverImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.coverImage.cropped.src": (v5/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.coverImage.cropped.srcSet": (v5/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.description": (v7/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.endAt": (v7/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.exhibitionPeriod": (v7/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.href": (v7/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.id": (v6/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.internalID": (v6/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.location.city": (v7/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.location.id": (v6/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.name": (v7/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.slug": (v6/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.startAt": (v7/*: any*/),
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
        "notificationsConnection.edges.node.publishedAt": (v5/*: any*/)
      }
    },
    "name": "PartnerShowOpenedNotification_test_Query",
    "operationKind": "query",
    "text": "query PartnerShowOpenedNotification_test_Query {\n  notificationsConnection(first: 1) {\n    edges {\n      node {\n        ...PartnerShowOpenedNotification_notification\n        id\n      }\n    }\n  }\n}\n\nfragment NotificationPartnerShow_show on Show {\n  location {\n    city\n    id\n  }\n  exhibitionPeriod\n  startAt\n  endAt\n  name\n  description\n  href\n  coverImage {\n    cropped(width: 600, height: 450, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n  slug\n}\n\nfragment NotificationTypeLabel_notification on Notification {\n  notificationType\n  publishedAt(format: \"RELATIVE\")\n}\n\nfragment PartnerShowOpenedNotification_notification on Notification {\n  headline\n  item {\n    __typename\n    ... on ShowOpenedNotificationItem {\n      partner {\n        href\n        name\n        profile {\n          internalID\n          id\n        }\n        id\n      }\n      showsConnection {\n        edges {\n          node {\n            internalID\n            ...NotificationPartnerShow_show\n            id\n          }\n        }\n      }\n    }\n  }\n  ...NotificationTypeLabel_notification\n}\n"
  }
};
})();

(node as any).hash = "8d8700044d4860bc59239aad6b0e5d95";

export default node;
