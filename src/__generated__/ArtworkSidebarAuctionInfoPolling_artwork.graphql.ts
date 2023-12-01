/**
 * @generated SignedSource<<09b1cb3df10c103f37c6e923e928a8e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionInfoPolling_artwork$data = {
  readonly internalID: string;
  readonly sale: {
    readonly isClosed: boolean | null | undefined;
  } | null | undefined;
  readonly saleArtwork: {
    readonly currentBid: {
      readonly display: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarBidAction_artwork" | "ArtworkSidebarCurrentBidInfo_artwork">;
  readonly " $fragmentType": "ArtworkSidebarAuctionInfoPolling_artwork";
};
export type ArtworkSidebarAuctionInfoPolling_artwork$key = {
  readonly " $data"?: ArtworkSidebarAuctionInfoPolling_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarAuctionInfoPolling_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarAuctionInfoPolling_artwork",
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
          "name": "isClosed",
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
          "alias": null,
          "args": null,
          "concreteType": "SaleArtworkCurrentBid",
          "kind": "LinkedField",
          "name": "currentBid",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "display",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCurrentBidInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarBidAction_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "b0a2b446ed7619564d9f80ff278a2878";

export default node;
