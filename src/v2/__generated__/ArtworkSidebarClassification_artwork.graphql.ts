/**
 * @generated SignedSource<<481f28ef0c2c93c9109f435a177f257f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassification_artwork$data = {
  readonly attributionClass: {
    readonly shortDescription: string | null;
  } | null;
  readonly " $fragmentType": "ArtworkSidebarClassification_artwork";
};
export type ArtworkSidebarClassification_artwork$key = {
  readonly " $data"?: ArtworkSidebarClassification_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarClassification_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarClassification_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shortDescription",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "6a721c8be12ea96c63dfb430081f0a4a";

export default node;
