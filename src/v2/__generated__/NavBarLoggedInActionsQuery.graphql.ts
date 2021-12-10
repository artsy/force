/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NavBarLoggedInActionsQueryVariables = {};
export type NavBarLoggedInActionsQueryResponse = {
    readonly me: {
        readonly unreadNotificationsCount: number;
        readonly unreadConversationCount: number;
        readonly followsAndSaves: {
            readonly notifications: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly href: string | null;
                        readonly summary: string | null;
                        readonly artists: string | null;
                        readonly published_at: string | null;
                        readonly image: {
                            readonly resized: {
                                readonly url: string;
                            } | null;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type NavBarLoggedInActionsQuery = {
    readonly response: NavBarLoggedInActionsQueryResponse;
    readonly variables: NavBarLoggedInActionsQueryVariables;
};



/*
query NavBarLoggedInActionsQuery {
  me {
    unreadNotificationsCount
    unreadConversationCount
    followsAndSaves {
      notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 10) {
        edges {
          node {
            href
            summary
            artists
            published_at: publishedAt(format: "MMM DD")
            image {
              resized(height: 40, width: 40) {
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadNotificationsCount",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadConversationCount",
  "storageKey": null
},
v2 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summary",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artists",
  "storageKey": null
},
v6 = {
  "alias": "published_at",
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "MMM DD"
    }
  ],
  "kind": "ScalarField",
  "name": "publishedAt",
  "storageKey": "publishedAt(format:\"MMM DD\")"
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 40
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 40
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
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
      "storageKey": "resized(height:40,width:40)"
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
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
},
v11 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  (v2/*: any*/)
],
v12 = {
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
    "name": "NavBarLoggedInActionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
                  (v2/*: any*/)
                ],
                "concreteType": "FollowedArtistsArtworksGroupConnection",
                "kind": "LinkedField",
                "name": "__WorksForYou_notifications_connection",
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
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": "__WorksForYou_notifications_connection(sort:\"PUBLISHED_AT_DESC\")"
              }
            ],
            "storageKey": null
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
    "name": "NavBarLoggedInActionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
                "args": (v11/*: any*/),
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
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v12/*: any*/),
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": "bundledArtworksByArtistConnection(first:10,sort:\"PUBLISHED_AT_DESC\")"
              },
              {
                "alias": "notifications",
                "args": (v11/*: any*/),
                "filters": [
                  "sort"
                ],
                "handle": "connection",
                "key": "WorksForYou_notifications",
                "kind": "LinkedHandle",
                "name": "bundledArtworksByArtistConnection"
              }
            ],
            "storageKey": null
          },
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e33df2ccda5da57dddd8577e0fca1fbe",
    "id": null,
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
    },
    "name": "NavBarLoggedInActionsQuery",
    "operationKind": "query",
    "text": "query NavBarLoggedInActionsQuery {\n  me {\n    unreadNotificationsCount\n    unreadConversationCount\n    followsAndSaves {\n      notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 10) {\n        edges {\n          node {\n            href\n            summary\n            artists\n            published_at: publishedAt(format: \"MMM DD\")\n            image {\n              resized(height: 40, width: 40) {\n                url\n              }\n            }\n            id\n            __typename\n          }\n          cursor\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'cfcc4ec76e30e889d67960d77123214d';
export default node;
