/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionPartnerInfo_artwork = {
    readonly partner: {
        readonly name: string | null;
    } | null;
    readonly sale_artwork: {
        readonly estimate: string | null;
    } | null;
    readonly sale: {
        readonly internalID: string;
        readonly is_closed: boolean | null;
    } | null;
    readonly " $refType": "ArtworkSidebarAuctionPartnerInfo_artwork";
};
export type ArtworkSidebarAuctionPartnerInfo_artwork$data = ArtworkSidebarAuctionPartnerInfo_artwork;
export type ArtworkSidebarAuctionPartnerInfo_artwork$key = {
    readonly " $data"?: ArtworkSidebarAuctionPartnerInfo_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarAuctionPartnerInfo_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarAuctionPartnerInfo_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
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
      "alias": "sale_artwork",
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
          "name": "estimate",
          "storageKey": null
        }
      ],
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
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": "is_closed",
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '9ae1e9a16b9b2924cf3ec43d91ed7ebf';
export default node;
