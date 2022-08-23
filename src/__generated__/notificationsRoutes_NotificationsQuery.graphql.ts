/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type notificationsRoutes_NotificationsQueryVariables = {};
export type notificationsRoutes_NotificationsQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"NotificationsApp_me">;
    } | null;
};
export type notificationsRoutes_NotificationsQuery = {
    readonly response: notificationsRoutes_NotificationsQueryResponse;
    readonly variables: notificationsRoutes_NotificationsQueryVariables;
};



/*
query notificationsRoutes_NotificationsQuery {
  me {
    ...NotificationsApp_me
    id
  }
}

fragment NotificationItem_item on FollowedArtistsArtworksGroup {
  href
  image {
    thumb: cropped(height: 58, width: 58) {
      url
    }
  }
}

fragment NotificationsApp_me on Me {
  followsAndSaves {
    notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 10) {
      edges {
        node {
          id
          ...NotificationItem_item
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "notificationsRoutes_NotificationsQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "NotificationsApp_me"
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
    "name": "notificationsRoutes_NotificationsQuery",
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
            "args": null,
            "concreteType": "FollowsAndSaves",
            "kind": "LinkedField",
            "name": "followsAndSaves",
            "plural": false,
            "selections": [
              {
                "alias": "notifications",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10
                  },
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "PUBLISHED_AT_DESC"
                  }
                ],
                "concreteType": "FollowedArtistsArtworksGroupConnection",
                "kind": "LinkedField",
                "name": "bundledArtworksByArtistConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FollowedArtistsArtworksGroupEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FollowedArtistsArtworksGroup",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
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
                                    "name": "url",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "cropped(height:58,width:58)"
                              }
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
                "storageKey": "bundledArtworksByArtistConnection(first:10,sort:\"PUBLISHED_AT_DESC\")"
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f7100731efd6498624f2e90d6c082213",
    "id": null,
    "metadata": {},
    "name": "notificationsRoutes_NotificationsQuery",
    "operationKind": "query",
    "text": "query notificationsRoutes_NotificationsQuery {\n  me {\n    ...NotificationsApp_me\n    id\n  }\n}\n\nfragment NotificationItem_item on FollowedArtistsArtworksGroup {\n  href\n  image {\n    thumb: cropped(height: 58, width: 58) {\n      url\n    }\n  }\n}\n\nfragment NotificationsApp_me on Me {\n  followsAndSaves {\n    notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 10) {\n      edges {\n        node {\n          id\n          ...NotificationItem_item\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0fb4eed7cb54bfb9a7f244f5ee360bce';
export default node;
