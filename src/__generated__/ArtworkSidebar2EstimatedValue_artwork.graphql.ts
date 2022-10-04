/**
 * @generated SignedSource<<3cf4993fca62b2c9ce036966027c36c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2EstimatedValue_artwork$data = {
  readonly sale: {
    readonly isClosed: boolean | null;
  } | null;
  readonly saleArtwork: {
    readonly estimate: string | null;
  } | null;
  readonly " $fragmentType": "ArtworkSidebar2EstimatedValue_artwork";
};
export type ArtworkSidebar2EstimatedValue_artwork$key = {
  readonly " $data"?: ArtworkSidebar2EstimatedValue_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2EstimatedValue_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2EstimatedValue_artwork",
  "selections": [
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
          "name": "estimate",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "005f8cc8a5f6ac9edceaf296257609e7";

export default node;
