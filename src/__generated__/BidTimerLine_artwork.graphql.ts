/**
 * @generated SignedSource<<0afe4af05dc10861baf4313a4a0a9c41>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BidTimerLine_artwork$data = {
  readonly collectorSignals: {
    readonly auction: {
      readonly lotClosesAt: string | null | undefined;
      readonly onlineBiddingExtended: boolean;
      readonly registrationEndsAt: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly saleArtwork: {
    readonly lotID: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "BidTimerLine_artwork";
};
export type BidTimerLine_artwork$key = {
  readonly " $data"?: BidTimerLine_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"BidTimerLine_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BidTimerLine_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lotID",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CollectorSignals",
      "kind": "LinkedField",
      "name": "collectorSignals",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AuctionCollectorSignals",
          "kind": "LinkedField",
          "name": "auction",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lotClosesAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "registrationEndsAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "onlineBiddingExtended",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "1b2dc7ce1e791c0c954cfc7b95ea1133";

export default node;
