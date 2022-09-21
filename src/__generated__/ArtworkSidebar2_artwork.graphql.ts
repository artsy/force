/**
 * @generated SignedSource<<37ce2b2a14b7f032ffad2dfb9edabc87>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2_artwork$data = {
  readonly slug: string;
  readonly isSold: boolean | null;
  readonly isAcquireable: boolean | null;
  readonly isOfferable: boolean | null;
  readonly isInAuction: boolean | null;
  readonly saleMessage: string | null;
  readonly sale: {
    readonly startAt: string | null;
  } | null;
  readonly saleArtwork: {
    readonly lotID: string | null;
    readonly extendedBiddingEndAt: string | null;
    readonly endAt: string | null;
  } | null;
  readonly artists: ReadonlyArray<{
    readonly internalID: string;
  } | null> | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2ArtworkTitle_artwork" | "ArtworkSidebar2Artists_artwork" | "ArtworkSidebar2Details_artwork" | "ArtworkSidebar2EditionSets_artwork" | "ArtworkSidebar2ShippingInformation_artwork" | "ArtworkSidebar2PartnerInfo_artwork" | "ArtworkSidebar2CreateArtworkAlert_artwork" | "ArtworkSidebar2Links_artwork">;
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
      "name": "ArtworkSidebar2EditionSets_artwork"
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

(node as any).hash = "c81aeeda5cbc57eaa9872cc69041f66c";

export default node;
