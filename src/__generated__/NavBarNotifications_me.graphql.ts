/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavBarNotifications_me = {
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
                            readonly url: string;
                        } | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "NavBarNotifications_me";
};
export type NavBarNotifications_me$data = NavBarNotifications_me;
export type NavBarNotifications_me$key = {
    readonly " $data"?: NavBarNotifications_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NavBarNotifications_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "followsAndSaves",
          "notifications"
        ]
      }
    ]
  },
  "name": "NavBarNotifications_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unreadNotificationsCount",
      "storageKey": null
    },
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
              "name": "sort",
              "value": "PUBLISHED_AT_DESC"
            }
          ],
          "concreteType": "FollowedArtistsArtworksGroupConnection",
          "kind": "LinkedField",
          "name": "__NavBarNotifications_notifications_connection",
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
                      "kind": "ScalarField",
                      "name": "summary",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "artists",
                      "storageKey": null
                    },
                    {
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
                              "value": 80
                            },
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 80
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
                          "storageKey": "cropped(height:80,width:80)"
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
          "storageKey": "__NavBarNotifications_notifications_connection(sort:\"PUBLISHED_AT_DESC\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '1c9b020704c4fa8f2c729b01a46a7113';
export default node;
