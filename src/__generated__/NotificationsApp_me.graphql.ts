/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NotificationsApp_me = {
    readonly followsAndSaves: {
        readonly notifications: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"NotificationItem_item">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "NotificationsApp_me";
};
export type NotificationsApp_me$data = NotificationsApp_me;
export type NotificationsApp_me$key = {
    readonly " $data"?: NotificationsApp_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NotificationsApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationsApp_me",
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
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
          "storageKey": "bundledArtworksByArtistConnection(first:10,sort:\"PUBLISHED_AT_DESC\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '61801f4c3aa247e89ade1bda3c39c037';
export default node;
