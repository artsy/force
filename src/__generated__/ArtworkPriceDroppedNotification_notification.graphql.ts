/**
 * @generated SignedSource<<1dae54b1f4a543fd2b4fb135108e0244>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type NotificationTypesEnum = "ARTICLE_FEATURED_ARTIST" | "ARTWORK_ALERT" | "ARTWORK_PRICE_DROPPED" | "ARTWORK_PUBLISHED" | "COLLECTOR_PROFILE_UPDATE_PROMPT" | "PARTNER_OFFER_CREATED" | "PARTNER_SHOW_OPENED" | "VIEWING_ROOM_PUBLISHED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtworkPriceDroppedNotification_notification$data = {
  readonly headline: string;
  readonly item: {
    readonly alert?: {
      readonly artists: ReadonlyArray<{
        readonly name: string | null | undefined;
        readonly slug: string;
      }>;
      readonly internalID: string;
      readonly labels: ReadonlyArray<{
        readonly displayValue: string;
      }>;
    } | null | undefined;
    readonly priceDropsConnection?: {
      readonly " $fragmentSpreads": FragmentRefs<"PriceDropsList_priceDropsConnection">;
    } | null | undefined;
  } | null | undefined;
  readonly notificationType: NotificationTypesEnum;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationTypeLabel_notification">;
  readonly " $fragmentType": "ArtworkPriceDroppedNotification_notification";
};
export type ArtworkPriceDroppedNotification_notification$key = {
  readonly " $data"?: ArtworkPriceDroppedNotification_notification$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkPriceDroppedNotification_notification">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkPriceDroppedNotification_notification",
  "selections": [
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
              "concreteType": "Alert",
              "kind": "LinkedField",
              "name": "alert",
              "plural": false,
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
                  "concreteType": "Artist",
                  "kind": "LinkedField",
                  "name": "artists",
                  "plural": true,
                  "selections": [
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
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "SearchCriteriaLabel",
                  "kind": "LinkedField",
                  "name": "labels",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "displayValue",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 100
                }
              ],
              "concreteType": "PriceDropConnection",
              "kind": "LinkedField",
              "name": "priceDropsConnection",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PriceDropsList_priceDropsConnection"
                }
              ],
              "storageKey": "priceDropsConnection(first:100)"
            }
          ],
          "type": "ArtworkPriceDroppedNotificationItem",
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

(node as any).hash = "21b646d3769b1b50bf02712745e879ac";

export default node;
