/**
 * @generated SignedSource<<ad2bcc9f43537b2a8a9b1c694cc28648>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type NotificationTypesEnum = "ARTICLE_FEATURED_ARTIST" | "ARTWORK_ALERT" | "ARTWORK_PUBLISHED" | "COLLECTOR_PROFILE_UPDATE_PROMPT" | "MARKETING_COLLECTION_HIT" | "PARTNER_OFFER_CREATED" | "PARTNER_SHOW_OPENED" | "SAVED_ARTWORK_CHANGES" | "VIEWING_ROOM_PUBLISHED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SavedArtworkChangesNotification_notification$data = {
  readonly artworksConnection: {
    readonly totalCount: number | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"NotificationArtworkList_artworksConnection">;
  } | null | undefined;
  readonly headline: string;
  readonly notificationType: NotificationTypesEnum;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationTypeLabel_notification">;
  readonly " $fragmentType": "SavedArtworkChangesNotification_notification";
};
export type SavedArtworkChangesNotification_notification$key = {
  readonly " $data"?: SavedArtworkChangesNotification_notification$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedArtworkChangesNotification_notification">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedArtworkChangesNotification_notification",
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

(node as any).hash = "1230b1ae0da063e647b9e4b214756da7";

export default node;
