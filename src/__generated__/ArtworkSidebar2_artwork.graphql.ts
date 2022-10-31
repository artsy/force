/**
 * @generated SignedSource<<5d6694bfb001f62b867102bafdde8e4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly internalID: string;
  } | null> | null;
  readonly isAcquireable: boolean | null;
  readonly isBiddable: boolean | null;
  readonly isEligibleForArtsyGuarantee: boolean;
  readonly isInAuction: boolean | null;
  readonly isOfferable: boolean | null;
  readonly isSold: boolean | null;
  readonly sale: {
    readonly isClosed: boolean | null;
    readonly startAt: string | null;
  } | null;
  readonly saleArtwork: {
    readonly endAt: string | null;
    readonly extendedBiddingEndAt: string | null;
    readonly lotID: string | null;
    readonly lotLabel: string | null;
  } | null;
  readonly saleMessage: string | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2Artists_artwork" | "ArtworkSidebar2ArtworkTitle_artwork" | "ArtworkSidebar2AuctionTimer_artwork" | "ArtworkSidebar2BiddingClosedMessage_artwork" | "ArtworkSidebar2CommercialButtons_artwork" | "ArtworkSidebar2CreateArtworkAlert_artwork" | "ArtworkSidebar2Details_artwork" | "ArtworkSidebar2EstimatedValue_artwork" | "ArtworkSidebar2Links_artwork" | "ArtworkSidebar2PartnerInfo_artwork" | "ArtworkSidebar2ShippingInformation_artwork" | "ArtworkSidebarAuctionInfoPolling_artwork">;
  readonly " $fragmentType": "ArtworkSidebar2_artwork";
};
export type ArtworkSidebar2_artwork$key = {
  readonly " $data"?: ArtworkSidebar2_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSold",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAcquireable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOfferable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInAuction",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleMessage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isBiddable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEligibleForArtsyGuarantee",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2ArtworkTitle_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2Artists_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2Details_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2CommercialButtons_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2ShippingInformation_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2PartnerInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2CreateArtworkAlert_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2Links_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2EstimatedValue_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2BiddingClosedMessage_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2AuctionTimer_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuctionInfoPolling_artwork"
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
          "name": "startAt",
          "storageKey": null
        },
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
          "kind": "ScalarField",
          "name": "lotID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lotLabel",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extendedBiddingEndAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "a897ed4da307d91b4eaea154eaea54ae";

export default node;
