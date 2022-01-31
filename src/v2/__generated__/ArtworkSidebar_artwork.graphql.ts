/**
 * @generated SignedSource<<490107a153f9714e6f28b413f8ecd436>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_artwork$data = {
  readonly is_in_auction: boolean | null;
  readonly sale: {
    readonly is_closed: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"AuctionTimer_sale">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarArtists_artwork" | "ArtworkSidebarMetadata_artwork" | "ArtworkSidebarAuctionPartnerInfo_artwork" | "ArtworkSidebarAuctionInfoPolling_artwork" | "ArtworkSidebarCommercial_artwork" | "ArtworkSidebarPartnerInfo_artwork" | "ArtworkSidebarExtraLinks_artwork" | "SecurePayment_artwork" | "VerifiedSeller_artwork" | "AuthenticityCertificate_artwork" | "BuyerGuarantee_artwork">;
  readonly " $fragmentType": "ArtworkSidebar_artwork";
};
export type ArtworkSidebar_artwork$key = {
  readonly " $data"?: ArtworkSidebar_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar_artwork">;
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
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "0fb9758fb87fb4a7b953ad1df8374dec";

export default node;
