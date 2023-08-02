/**
 * @generated SignedSource<<61bd6c1605954a199712424780bb6a3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionTimer_artwork$data = {
  readonly internalID: string;
  readonly sale: {
    readonly cascadingEndTimeIntervalMinutes: number | null;
    readonly isClosed: boolean | null;
    readonly startAt: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"AuctionTimer_sale">;
  } | null;
  readonly saleArtwork: {
    readonly endAt: string | null;
    readonly endedAt: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"LotTimer_saleArtwork">;
  } | null;
  readonly " $fragmentType": "ArtworkSidebarAuctionTimer_artwork";
};
export type ArtworkSidebarAuctionTimer_artwork$key = {
  readonly " $data"?: ArtworkSidebarAuctionTimer_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarAuctionTimer_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarAuctionTimer_artwork",
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
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cascadingEndTimeIntervalMinutes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AuctionTimer_sale"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "startAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LotTimer_saleArtwork"
        },
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
          "name": "endedAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "d94eb66021b938b313fb4b8bbab2bde4";

export default node;
