/**
 * @generated SignedSource<<e27842198e1614ff2ed522f3f69ee2d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2Links_artwork$data = {
  readonly isInAuction: boolean | null;
  readonly sale: {
    readonly isClosed: boolean | null;
  } | null;
  readonly " $fragmentType": "ArtworkSidebar2Links_artwork";
};
export type ArtworkSidebar2Links_artwork$key = {
  readonly " $data"?: ArtworkSidebar2Links_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2Links_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2Links_artwork",
  "selections": [
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

(node as any).hash = "11e6ccb268ff43e951912377d6877e66";

export default node;
