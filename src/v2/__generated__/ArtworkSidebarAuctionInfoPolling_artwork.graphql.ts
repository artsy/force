/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionInfoPolling_artwork = {
    readonly internalID: string;
    readonly sale: {
        readonly isClosed: boolean | null;
    } | null;
    readonly saleArtwork: {
        readonly currentBid: {
            readonly display: string | null;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarCurrentBidInfo_artwork" | "ArtworkSidebarBidAction_artwork">;
    readonly " $refType": "ArtworkSidebarAuctionInfoPolling_artwork";
};
export type ArtworkSidebarAuctionInfoPolling_artwork$data = ArtworkSidebarAuctionInfoPolling_artwork;
export type ArtworkSidebarAuctionInfoPolling_artwork$key = {
    readonly " $data"?: ArtworkSidebarAuctionInfoPolling_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarAuctionInfoPolling_artwork">;
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
(node as any).hash = 'b0a2b446ed7619564d9f80ff278a2878';
export default node;
