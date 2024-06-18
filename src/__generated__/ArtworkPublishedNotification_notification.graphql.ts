/**
 * @generated SignedSource<<4b7f8efc283ff687483e447ea2e8a7d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NotificationTypesEnum = "ARTICLE_FEATURED_ARTIST" | "ARTWORK_ALERT" | "ARTWORK_PUBLISHED" | "COLLECTOR_PROFILE_UPDATE_PROMPT" | "PARTNER_OFFER_CREATED" | "PARTNER_SHOW_OPENED" | "VIEWING_ROOM_PUBLISHED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtworkPublishedNotification_notification$data = {
  readonly artworksConnection: {
    readonly totalCount: number | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"NotificationArtworkList_artworksConnection">;
  } | null | undefined;
  readonly headline: string;
  readonly item: {
    readonly artists?: ReadonlyArray<{
      readonly internalID: string;
      readonly isFollowed: boolean | null | undefined;
      readonly name: string | null | undefined;
      readonly slug: string;
    }>;
  } | null | undefined;
  readonly notificationType: NotificationTypesEnum;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationTypeLabel_notification">;
  readonly " $fragmentType": "ArtworkPublishedNotification_notification";
};
export type ArtworkPublishedNotification_notification$key = {
  readonly " $data"?: ArtworkPublishedNotification_notification$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkPublishedNotification_notification">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkPublishedNotification_notification",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NotificationArtworkList_artworksConnection"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:10)"
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
              "args": null,
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "artists",
              "plural": true,
              "selections": [
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
                  "name": "isFollowed",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "ArtworkPublishedNotificationItem",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "NotificationTypeLabel_notification"
    }
  ],
  "type": "Notification",
  "abstractKey": null
};

(node as any).hash = "9f2f8af45c14080e6d4d2dc0339dd08f";

export default node;
