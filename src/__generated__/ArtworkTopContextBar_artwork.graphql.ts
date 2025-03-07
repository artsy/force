/**
 * @generated SignedSource<<e6e0fcf8e1346b4f19656c88463731c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBar_artwork$data = {
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBarBreadcrumb_artwork">;
  readonly " $fragmentType": "ArtworkTopContextBar_artwork";
};
export type ArtworkTopContextBar_artwork$key = {
  readonly " $data"?: ArtworkTopContextBar_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBar_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkTopContextBar_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkTopContextBarBreadcrumb_artwork"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "4b5b2901ecdea18f946e265f20bd1860";

export default node;
