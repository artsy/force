/**
 * @generated SignedSource<<f067b62f30cb3618851a9f64a0a1ac93>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type NotificationTypesEnum = "ARTICLE_FEATURED_ARTIST" | "ARTWORK_ALERT" | "ARTWORK_PUBLISHED" | "PARTNER_OFFER_CREATED" | "PARTNER_SHOW_OPENED" | "VIEWING_ROOM_PUBLISHED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NotificationsList_viewer$data = {
  readonly notifications: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artworks: {
          readonly totalCount: number | null | undefined;
        } | null | undefined;
        readonly internalID: string;
        readonly item: {
          readonly article?: {
            readonly internalID: string;
          } | null | undefined;
          readonly viewingRoomsConnection?: {
            readonly totalCount: number | null | undefined;
          } | null | undefined;
        } | null | undefined;
        readonly notificationType: NotificationTypesEnum;
        readonly " $fragmentSpreads": FragmentRefs<"NotificationItem_item">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "NotificationsList_viewer";
};
export type NotificationsList_viewer$key = {
  readonly " $data"?: NotificationsList_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationsList_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "notifications"
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
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "types"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "viewer"
      ],
      "operation": require('./NotificationsListPaginationQuery.graphql')
    }
  },
  "name": "NotificationsList_viewer",
  "selections": [
    {
      "alias": "notifications",
      "args": null,
      "concreteType": "NotificationConnection",
      "kind": "LinkedField",
      "name": "__NotificationsList_notifications_connection",
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
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "NotificationItem_item"
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
                            (v1/*: any*/)
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
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
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
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "3e622d99dbfc9cabb654d6a2e33a12eb";

export default node;
