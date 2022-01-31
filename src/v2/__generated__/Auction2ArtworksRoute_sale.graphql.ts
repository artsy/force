/**
 * @generated SignedSource<<2f57fb8ffceef1b84083d124bc062278>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Auction2ArtworksRoute_sale$data = {
  readonly slug: string;
  readonly " $fragmentType": "Auction2ArtworksRoute_sale";
};
export type Auction2ArtworksRoute_sale$key = {
  readonly " $data"?: Auction2ArtworksRoute_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"Auction2ArtworksRoute_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2ArtworksRoute_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "191329cffe6fc18643c4d3b8cb1f6285";

export default node;
