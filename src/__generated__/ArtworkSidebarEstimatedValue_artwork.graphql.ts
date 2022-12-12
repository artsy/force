/**
 * @generated SignedSource<<ce9b22bfde35364507735d0bbbbe4205>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarEstimatedValue_artwork$data = {
  readonly sale: {
    readonly isClosed: boolean | null;
  } | null;
  readonly saleArtwork: {
    readonly estimate: string | null;
  } | null;
  readonly " $fragmentType": "ArtworkSidebarEstimatedValue_artwork";
};
export type ArtworkSidebarEstimatedValue_artwork$key = {
  readonly " $data"?: ArtworkSidebarEstimatedValue_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarEstimatedValue_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarEstimatedValue_artwork",
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

(node as any).hash = "0d3441ced08e51c4b3a377ea8c4e6300";

export default node;
