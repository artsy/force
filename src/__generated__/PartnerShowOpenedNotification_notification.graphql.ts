/**
 * @generated SignedSource<<8821ab4e12c553cfcad409c23c0d9a3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NotificationTypesEnum = "ARTICLE_FEATURED_ARTIST" | "ARTWORK_ALERT" | "ARTWORK_PUBLISHED" | "PARTNER_OFFER_CREATED" | "PARTNER_SHOW_OPENED" | "VIEWING_ROOM_PUBLISHED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PartnerShowOpenedNotification_notification$data = {
  readonly headline: string;
  readonly item: {
    readonly partner?: {
      readonly href: string | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly showsConnection?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artworksConnection: {
            readonly totalCount: number | null | undefined;
            readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
          } | null | undefined;
          readonly href: string | null | undefined;
          readonly internalID: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly notificationType: NotificationTypesEnum;
  readonly publishedAt: string;
  readonly " $fragmentType": "PartnerShowOpenedNotification_notification";
};
export type PartnerShowOpenedNotification_notification$key = {
  readonly " $data"?: PartnerShowOpenedNotification_notification$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerShowOpenedNotification_notification">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerShowOpenedNotification_notification",
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
              "concreteType": "Partner",
              "kind": "LinkedField",
              "name": "partner",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
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
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "first",
                              "value": 2
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
                              "name": "ArtworkGrid_artworks"
                            },
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "totalCount",
                              "storageKey": null
                            }
                          ],
                          "storageKey": "artworksConnection(first:2)"
                        },
                        (v0/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "internalID",
                          "storageKey": null
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
    }
  ],
  "type": "Notification",
  "abstractKey": null
};
})();

(node as any).hash = "701747e9f8a44554347b6a217c8e6969";

export default node;
