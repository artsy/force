/**
 * @generated SignedSource<<dcefe7ccedcc25dced948ae3800e9591>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerOfferCreatedNotification_notification$data = {
  readonly headline: string;
  readonly item: {
    readonly partnerOffer?: {
      readonly endAt: string | null | undefined;
      readonly isAvailable: boolean | null | undefined;
      readonly priceListedMessage: string | null | undefined;
      readonly priceWithDiscountMessage: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly offerArtworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PartnerOfferArtwork_artwork">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly targetHref: string;
  readonly " $fragmentType": "PartnerOfferCreatedNotification_notification";
};
export type PartnerOfferCreatedNotification_notification$key = {
  readonly " $data"?: PartnerOfferCreatedNotification_notification$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerOfferCreatedNotification_notification">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerOfferCreatedNotification_notification",
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
      "kind": "ScalarField",
      "name": "targetHref",
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
              "concreteType": "PartnerOffer",
              "kind": "LinkedField",
              "name": "partnerOffer",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isAvailable",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "priceListedMessage",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "priceWithDiscountMessage",
                  "storageKey": null
                }
              ],
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
      "alias": "offerArtworksConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PartnerOfferArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:1)"
    }
  ],
  "type": "Notification",
  "abstractKey": null
};

(node as any).hash = "27ee8f41ebeddc7b6d8289f322d7cd37";

export default node;
