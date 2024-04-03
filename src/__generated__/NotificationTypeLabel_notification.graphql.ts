/**
 * @generated SignedSource<<0440d67afa6309c2fff90fd7b0636dae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NotificationTypesEnum = "ARTICLE_FEATURED_ARTIST" | "ARTWORK_ALERT" | "ARTWORK_PUBLISHED" | "PARTNER_OFFER_CREATED" | "PARTNER_SHOW_OPENED" | "VIEWING_ROOM_PUBLISHED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NotificationTypeLabel_notification$data = {
  readonly item: {
    readonly available?: boolean | null | undefined;
    readonly expiresAt?: string | null | undefined;
    readonly showsConnection?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly endAt: string | null | undefined;
          readonly startAt: string | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly notificationType: NotificationTypesEnum;
  readonly publishedAt: string;
  readonly " $fragmentType": "NotificationTypeLabel_notification";
};
export type NotificationTypeLabel_notification$key = {
  readonly " $data"?: NotificationTypeLabel_notification$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationTypeLabel_notification">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMMM D"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationTypeLabel_notification",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "notificationType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "RELATIVE"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"RELATIVE\")"
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
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ShowConnection",
              "kind": "LinkedField",
              "name": "showsConnection",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ShowEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Show",
                      "kind": "LinkedField",
                      "name": "node",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": (v0/*: any*/),
                          "kind": "ScalarField",
                          "name": "startAt",
                          "storageKey": "startAt(format:\"MMMM D\")"
                        },
                        {
                          "alias": null,
                          "args": (v0/*: any*/),
                          "kind": "ScalarField",
                          "name": "endAt",
                          "storageKey": "endAt(format:\"MMMM D\")"
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
          "type": "ShowOpenedNotificationItem",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Notification",
  "abstractKey": null
};
})();

(node as any).hash = "b96b91350c47ff0c3121d52f3458d43f";

export default node;
