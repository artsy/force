/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_artwork = {
    readonly is_in_auction: boolean | null;
    readonly sale: {
        readonly cascadingEndTimeInterval: number | null;
        readonly is_closed: boolean | null;
        readonly " $fragmentRefs": FragmentRefs<"AuctionTimer_sale">;
    } | null;
    readonly saleArtwork: {
        readonly endedAt: string | null;
        readonly " $fragmentRefs": FragmentRefs<"LotTimer_saleArtwork">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarArtists_artwork" | "ArtworkSidebarMetadata_artwork" | "ArtworkSidebarAuctionPartnerInfo_artwork" | "ArtworkSidebarAuctionInfoPolling_artwork" | "ArtworkSidebarCommercial_artwork" | "ArtworkSidebarPartnerInfo_artwork" | "ArtworkSidebarExtraLinks_artwork" | "SecurePayment_artwork" | "VerifiedSeller_artwork" | "AuthenticityCertificate_artwork" | "BuyerGuarantee_artwork" | "CreateArtworkAlertSection_artwork">;
    readonly " $refType": "ArtworkSidebar_artwork";
};
export type ArtworkSidebar_artwork$data = ArtworkSidebar_artwork;
export type ArtworkSidebar_artwork$key = {
    readonly " $data"?: ArtworkSidebar_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar_artwork",
  "selections": [
    {
      "alias": "is_in_auction",
      "args": null,
      "kind": "ScalarField",
      "name": "isInAuction",
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
          "alias": "is_closed",
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
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
          "name": "endedAt",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LotTimer_saleArtwork"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarArtists_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarMetadata_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuctionPartnerInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuctionInfoPolling_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCommercial_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarPartnerInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarExtraLinks_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SecurePayment_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "VerifiedSeller_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuthenticityCertificate_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BuyerGuarantee_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreateArtworkAlertSection_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '8e5eb358f471911963e5782c6ec3f81e';
export default node;
