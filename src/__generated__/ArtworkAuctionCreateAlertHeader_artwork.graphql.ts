/**
 * @generated SignedSource<<0e1f2c96668bf4abc63984a8f9190948>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAuctionCreateAlertHeader_artwork$data = {
  readonly artistNames: string | null | undefined;
  readonly artists: ReadonlyArray<{
    readonly internalID: string;
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined> | null | undefined;
  readonly attributionClass: {
    readonly internalID: string;
  } | null | undefined;
  readonly internalID: string;
  readonly isEligibleToCreateAlert: boolean;
  readonly isInAuction: boolean | null | undefined;
  readonly mediumType: {
    readonly filterGene: {
      readonly name: string | null | undefined;
      readonly slug: string;
    } | null | undefined;
  } | null | undefined;
  readonly myLotStandingManageAlerts: ReadonlyArray<{
    readonly isHighestBidder: boolean | null | undefined;
  }> | null | undefined;
  readonly sale: {
    readonly isClosed: boolean | null | undefined;
    readonly startAt: string | null | undefined;
  } | null | undefined;
  readonly saleArtwork: {
    readonly endAt: string | null | undefined;
    readonly endedAt: string | null | undefined;
    readonly extendedBiddingEndAt: string | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArtworkAuctionCreateAlertHeader_artwork";
};
export type ArtworkAuctionCreateAlertHeader_artwork$key = {
  readonly " $data"?: ArtworkAuctionCreateAlertHeader_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionCreateAlertHeader_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkAuctionCreateAlertHeader_artwork",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
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
      "kind": "ScalarField",
      "name": "isInAuction",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
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
      "selections": [
        (v1/*: any*/),
        (v2/*: any*/),
        (v0/*: any*/)
      ],
      "storageKey": "artists(shallow:true)"
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
          "name": "extendedBiddingEndAt",
          "storageKey": null
        },
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
      "alias": null,
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMedium",
      "kind": "LinkedField",
      "name": "mediumType",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Gene",
          "kind": "LinkedField",
          "name": "filterGene",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "myLotStandingManageAlerts",
      "args": null,
      "concreteType": "LotStanding",
      "kind": "LinkedField",
      "name": "myLotStanding",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isHighestBidder",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "1a89cdf0b2c8d7990b0cd67cf7b181ab";

export default node;
