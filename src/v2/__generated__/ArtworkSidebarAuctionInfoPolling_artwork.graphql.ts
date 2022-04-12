/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionInfoPolling_artwork = {
    readonly internalID: string;
    readonly sale: {
        readonly isClosed: boolean | null;
        readonly internalID: string;
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
    readonly " $data"?: ArtworkSidebarAuctionInfoPolling_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarAuctionInfoPolling_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarAuctionInfoPolling_artwork",
  "selections": [
    (v0/*: any*/),
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
        },
        (v0/*: any*/)
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
})();
(node as any).hash = '8d89addab26979c8880a17f0186bc691';
export default node;
