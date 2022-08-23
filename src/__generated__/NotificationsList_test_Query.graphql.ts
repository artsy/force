/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NotificationsList_test_QueryVariables = {};
export type NotificationsList_test_QueryResponse = {
    readonly notifications: {
        readonly " $fragmentRefs": FragmentRefs<"NotificationsList_notifications">;
    } | null;
};
export type NotificationsList_test_Query = {
    readonly response: NotificationsList_test_QueryResponse;
    readonly variables: NotificationsList_test_QueryVariables;
};



/*
query NotificationsList_test_Query {
  notifications: notificationsConnection(first: 3) {
    ...NotificationsList_notifications
  }
}

fragment NotificationItem_item on Notification {
  title
  message
  createdAt
  targetHref
  artworksConnection(first: 4) {
    totalCount
    edges {
      node {
        internalID
        title
        image {
          thumb: cropped(width: 58, height: 58) {
            src
            srcSet
          }
        }
        id
      }
    }
  }
}

fragment NotificationsList_notifications on NotificationConnection {
  edges {
    node {
      internalID
      ...NotificationItem_item
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
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
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
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
        "alias": "notifications",
        "args": (v0/*: any*/),
        "concreteType": "NotificationConnection",
        "kind": "LinkedField",
        "name": "notificationsConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NotificationsList_notifications"
          }
        ],
        "storageKey": "notificationsConnection(first:3)"
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
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
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
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "notificationsConnection(first:3)"
      }
    ]
  },
  "params": {
    "cacheID": "9658f9df08436c6e58ce07aa1198ebd6",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "notifications": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationConnection"
        },
        "notifications.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "NotificationEdge"
        },
        "notifications.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Notification"
        },
        "notifications.edges.node.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "notifications.edges.node.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "notifications.edges.node.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "notifications.edges.node.artworksConnection.edges.node.id": (v4/*: any*/),
        "notifications.edges.node.artworksConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "notifications.edges.node.artworksConnection.edges.node.image.thumb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "notifications.edges.node.artworksConnection.edges.node.image.thumb.src": (v5/*: any*/),
        "notifications.edges.node.artworksConnection.edges.node.image.thumb.srcSet": (v5/*: any*/),
        "notifications.edges.node.artworksConnection.edges.node.internalID": (v4/*: any*/),
        "notifications.edges.node.artworksConnection.edges.node.title": (v6/*: any*/),
        "notifications.edges.node.artworksConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "notifications.edges.node.createdAt": (v6/*: any*/),
        "notifications.edges.node.id": (v4/*: any*/),
        "notifications.edges.node.internalID": (v4/*: any*/),
        "notifications.edges.node.message": (v5/*: any*/),
        "notifications.edges.node.targetHref": (v5/*: any*/),
        "notifications.edges.node.title": (v5/*: any*/)
      }
    },
    "name": "NotificationsList_test_Query",
    "operationKind": "query",
    "text": "query NotificationsList_test_Query {\n  notifications: notificationsConnection(first: 3) {\n    ...NotificationsList_notifications\n  }\n}\n\nfragment NotificationItem_item on Notification {\n  title\n  message\n  createdAt\n  targetHref\n  artworksConnection(first: 4) {\n    totalCount\n    edges {\n      node {\n        internalID\n        title\n        image {\n          thumb: cropped(width: 58, height: 58) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment NotificationsList_notifications on NotificationConnection {\n  edges {\n    node {\n      internalID\n      ...NotificationItem_item\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd13715603bae1a1f120be1043b59692b';
export default node;
