/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionTimer_artwork = {
    readonly internalID: string;
    readonly sale: {
        readonly cascadingEndTimeInterval: number | null;
        readonly isClosed: boolean | null;
        readonly startAt: string | null;
        readonly " $fragmentRefs": FragmentRefs<"AuctionTimer_sale">;
    } | null;
    readonly saleArtwork: {
        readonly endAt: string | null;
        readonly " $fragmentRefs": FragmentRefs<"LotTimer_saleArtwork">;
    } | null;
    readonly " $refType": "ArtworkSidebarAuctionTimer_artwork";
};
export type ArtworkSidebarAuctionTimer_artwork$data = ArtworkSidebarAuctionTimer_artwork;
export type ArtworkSidebarAuctionTimer_artwork$key = {
    readonly " $data"?: ArtworkSidebarAuctionTimer_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarAuctionTimer_artwork">;
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
          "name": "cascadingEndTimeInterval",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "startAt",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AuctionTimer_sale"
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
          "kind": "ScalarField",
          "name": "endAt",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LotTimer_saleArtwork"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'ea53465d946b8344557431358c7067f7';
export default node;
