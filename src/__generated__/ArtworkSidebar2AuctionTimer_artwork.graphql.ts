/**
 * @generated SignedSource<<3801d8b3d887b82fa948bc5dea01dcb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2AuctionTimer_artwork$data = {
  readonly internalID: string;
  readonly sale: {
    readonly cascadingEndTimeIntervalMinutes: number | null;
    readonly isClosed: boolean | null;
    readonly startAt: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"AuctionTimer_sale">;
  } | null;
  readonly saleArtwork: {
    readonly endAt: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"LotTimer_saleArtwork">;
  } | null;
  readonly " $fragmentType": "ArtworkSidebar2AuctionTimer_artwork";
};
export type ArtworkSidebar2AuctionTimer_artwork$key = {
  readonly " $data"?: ArtworkSidebar2AuctionTimer_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2AuctionTimer_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2AuctionTimer_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
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
          "name": "cascadingEndTimeIntervalMinutes",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "AuctionTimer_sale"
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "LotTimer_saleArtwork"
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "4f90674feef43eb5bc8a395a19245d97";

export default node;
