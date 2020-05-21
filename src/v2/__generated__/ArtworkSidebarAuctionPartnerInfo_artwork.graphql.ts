/* tslint:disable */

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
    readonly " $data"?: ArtworkSidebarAuctionPartnerInfo_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarAuctionPartnerInfo_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarAuctionPartnerInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "sale_artwork",
      "name": "saleArtwork",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtwork",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "estimate",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "is_closed",
          "name": "isClosed",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '9ae1e9a16b9b2924cf3ec43d91ed7ebf';
export default node;
