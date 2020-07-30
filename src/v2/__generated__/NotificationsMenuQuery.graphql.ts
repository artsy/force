/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type NotificationsMenuQueryVariables = {};
export type NotificationsMenuQueryResponse = {
    readonly me: {
        readonly unreadNotificationsCount: number;
        readonly followsAndSaves: {
            readonly notifications: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly href: string | null;
                        readonly summary: string | null;
                        readonly artists: string | null;
                        readonly published_at: string | null;
                        readonly image: {
                            readonly thumb: {
                                readonly url: string | null;
                            } | null;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type NotificationsMenuQuery = {
    readonly response: NotificationsMenuQueryResponse;
    readonly variables: NotificationsMenuQueryVariables;
};



/*
query NotificationsMenuQuery {
  me {
    unreadNotificationsCount
    followsAndSaves {
      notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 10) {
        edges {
          node {
            href
            summary
            artists
            published_at: publishedAt(format: "MMM DD")
            image {
              thumb: cropped(height: 80, width: 80) {
                url
              }
            }
            id
            __typename
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unreadNotificationsCount",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "summary",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "artists",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": "published_at",
  "name": "publishedAt",
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "MMM DD"
    }
  ],
  "storageKey": "publishedAt(format:\"MMM DD\")"
},
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "image",
  "storageKey": null,
  "args": null,
  "concreteType": "Image",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "thumb",
      "name": "cropped",
      "storageKey": "cropped(height:80,width:80)",
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 80
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 80
        }
      ],
      "concreteType": "CroppedImageUrl",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "pageInfo",
  "storageKey": null,
  "args": null,
  "concreteType": "PageInfo",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "endCursor",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasNextPage",
      "args": null,
      "storageKey": null
    }
  ]
},
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  (v1/*: any*/)
],
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NotificationsMenuQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "followsAndSaves",
            "storageKey": null,
            "args": null,
            "concreteType": "FollowsAndSaves",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": "notifications",
                "name": "__WorksForYou_notifications_connection",
                "storageKey": "__WorksForYou_notifications_connection(sort:\"PUBLISHED_AT_DESC\")",
                "args": [
                  (v1/*: any*/)
                ],
                "concreteType": "FollowedArtistsArtworksGroupConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FollowedArtistsArtworksGroupEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "FollowedArtistsArtworksGroup",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/)
                        ]
                      },
                      (v8/*: any*/)
                    ]
                  },
                  (v9/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NotificationsMenuQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "followsAndSaves",
            "storageKey": null,
            "args": null,
            "concreteType": "FollowsAndSaves",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": "notifications",
                "name": "bundledArtworksByArtistConnection",
                "storageKey": "bundledArtworksByArtistConnection(first:10,sort:\"PUBLISHED_AT_DESC\")",
                "args": (v10/*: any*/),
                "concreteType": "FollowedArtistsArtworksGroupConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FollowedArtistsArtworksGroupEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "FollowedArtistsArtworksGroup",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v11/*: any*/),
                          (v7/*: any*/)
                        ]
                      },
                      (v8/*: any*/)
                    ]
                  },
                  (v9/*: any*/)
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": "notifications",
                "name": "bundledArtworksByArtistConnection",
                "args": (v10/*: any*/),
                "handle": "connection",
                "key": "WorksForYou_notifications",
                "filters": [
                  "sort"
                ]
              }
            ]
          },
          (v11/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "NotificationsMenuQuery",
    "id": null,
    "text": "query NotificationsMenuQuery {\n  me {\n    unreadNotificationsCount\n    followsAndSaves {\n      notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 10) {\n        edges {\n          node {\n            href\n            summary\n            artists\n            published_at: publishedAt(format: \"MMM DD\")\n            image {\n              thumb: cropped(height: 80, width: 80) {\n                url\n              }\n            }\n            id\n            __typename\n          }\n          cursor\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "me",
            "followsAndSaves",
            "notifications"
          ]
        }
      ]
    }
  }
};
})();
(node as any).hash = 'cc0fff7ed96dae66df18ccbf7314bc29';
export default node;
