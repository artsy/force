/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_artwork = {
    readonly is_in_auction: boolean | null;
    readonly is_sold: boolean | null;
    readonly hasCertificateOfAuthenticity: boolean | null;
    readonly isBiddable: boolean | null;
    readonly isAcquireable: boolean | null;
    readonly isOfferable: boolean | null;
    readonly partner: {
        readonly isVerifiedSeller: boolean | null;
    } | null;
    readonly sale: {
        readonly is_closed: boolean | null;
        readonly startAt: string | null;
    } | null;
    readonly saleArtwork: {
        readonly endAt: string | null;
        readonly endedAt: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarArtists_artwork" | "ArtworkSidebarMetadata_artwork" | "ArtworkSidebarAuctionPartnerInfo_artwork" | "ArtworkSidebarAuctionInfoPolling_artwork" | "ArtworkSidebarAuctionTimer_artwork" | "ArtworkSidebarCommercial_artwork" | "ArtworkSidebarPartnerInfo_artwork" | "ArtworkSidebarExtraLinks_artwork" | "SecurePayment_artwork" | "VerifiedSeller_artwork" | "AuthenticityCertificate_artwork" | "BuyerGuarantee_artwork" | "CreateArtworkAlertSection_artwork" | "ArtworkSidebarBiddingClosedMessage_artwork">;
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
      "alias": "is_sold",
      "args": null,
      "kind": "ScalarField",
      "name": "isSold",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasCertificateOfAuthenticity",
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
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isVerifiedSeller",
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
          "alias": "is_closed",
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
      "name": "ArtworkSidebarAuctionTimer_artwork"
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarBiddingClosedMessage_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '763ac65160338f59e068792dbd19ccb4';
export default node;
