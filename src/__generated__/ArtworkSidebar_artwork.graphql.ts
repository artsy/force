/**
 * @generated SignedSource<<4691eec76aac1080e0714ef879efede2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly internalID: string;
  } | null | undefined> | null | undefined;
  readonly artsyShippingDomestic: boolean | null | undefined;
  readonly artsyShippingInternational: boolean | null | undefined;
  readonly isAcquireable: boolean | null | undefined;
  readonly isBiddable: boolean | null | undefined;
  readonly isEligibleForArtsyGuarantee: boolean;
  readonly isEligibleToCreateAlert: boolean;
  readonly isInAuction: boolean | null | undefined;
  readonly isOfferable: boolean | null | undefined;
  readonly isSold: boolean | null | undefined;
  readonly isUnlisted: boolean;
  readonly partner: {
    readonly internalID: string;
  } | null | undefined;
  readonly sale: {
    readonly endAt: string | null | undefined;
    readonly isAuction: boolean | null | undefined;
    readonly isClosed: boolean | null | undefined;
    readonly startAt: string | null | undefined;
  } | null | undefined;
  readonly saleArtwork: {
    readonly endAt: string | null | undefined;
    readonly endedAt: string | null | undefined;
    readonly extendedBiddingEndAt: string | null | undefined;
    readonly lotID: string | null | undefined;
    readonly lotLabel: string | null | undefined;
  } | null | undefined;
  readonly saleMessage: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtsyShippingEstimate_artwork" | "ArtworkSidebarArtists_artwork" | "ArtworkSidebarArtsyGuarantee_artwork" | "ArtworkSidebarArtworkTitle_artwork" | "ArtworkSidebarAuctionInfoPolling_artwork" | "ArtworkSidebarAuctionTimer_artwork" | "ArtworkSidebarBiddingClosedMessage_artwork" | "ArtworkSidebarCommercialButtons_artwork" | "ArtworkSidebarCreateAlert_artwork" | "ArtworkSidebarDetails_artwork" | "ArtworkSidebarEstimatedValue_artwork" | "ArtworkSidebarLinks_artwork" | "ArtworkSidebarPartnerInfo_artwork" | "ArtworkSidebarPrivateArtwork_artwork" | "ArtworkSidebarShippingInformation_artwork" | "PrivateArtworkAdditionalInfo_artwork">;
  readonly " $fragmentType": "ArtworkSidebar_artwork";
};
export type ArtworkSidebar_artwork$key = {
  readonly " $data"?: ArtworkSidebar_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarArtworkTitle_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarArtists_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarDetails_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCommercialButtons_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarShippingInformation_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarPartnerInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCreateAlert_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarLinks_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarEstimatedValue_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarBiddingClosedMessage_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuctionTimer_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuctionInfoPolling_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarPrivateArtwork_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarArtsyGuarantee_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrivateArtworkAdditionalInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtsyShippingEstimate_artwork"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artsyShippingDomestic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artsyShippingInternational",
      "storageKey": null
    },
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEligibleToCreateAlert",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": (v0/*: any*/),
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
        (v1/*: any*/),
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isAuction",
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
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endedAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": "artists(shallow:true)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUnlisted",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "da42b26ac95a863b7bddd3e383078798";

export default node;
