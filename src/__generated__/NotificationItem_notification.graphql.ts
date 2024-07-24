/**
 * @generated SignedSource<<48f4c31e932bc341c3cc3395ea1c798a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NotificationTypesEnum = "ARTICLE_FEATURED_ARTIST" | "ARTWORK_ALERT" | "ARTWORK_PUBLISHED" | "COLLECTOR_PROFILE_UPDATE_PROMPT" | "PARTNER_OFFER_CREATED" | "PARTNER_SHOW_OPENED" | "VIEWING_ROOM_PUBLISHED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NotificationItem_notification$data = {
  readonly headline: string;
  readonly id: string;
  readonly internalID: string;
  readonly isUnread: boolean;
  readonly item: {
    readonly __typename: string;
    readonly available?: boolean | null | undefined;
    readonly expiresAt?: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"NotificationItemCollectorProfileUpdatePrompt_notificationItem">;
  } | null | undefined;
  readonly message: string;
  readonly notificationType: NotificationTypesEnum;
  readonly objectsCount: number;
  readonly previewImages: ReadonlyArray<{
    readonly blurhashDataURL: string | null | undefined;
    readonly url: string | null | undefined;
  }>;
  readonly targetHref: string;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationTypeLabel_notification">;
  readonly " $fragmentType": "NotificationItem_notification";
};
export type NotificationItem_notification$key = {
  readonly " $data"?: NotificationItem_notification$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationItem_notification">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationItem_notification",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "NotificationItemCollectorProfileUpdatePrompt_notificationItem"
        },
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 4
        }
      ],
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "previewImages",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "blurhashDataURL",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "thumbnail"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"thumbnail\")"
        }
      ],
      "storageKey": "previewImages(size:4)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
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

(node as any).hash = "d4b93239ed89af7d688f3d87d95c4e96";

export default node;
