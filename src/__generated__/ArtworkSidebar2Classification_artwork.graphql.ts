/**
 * @generated SignedSource<<d41a65a84270b42e3dd6ab119f3e9a3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2Classification_artwork$data = {
  readonly attributionClass: {
    readonly shortArrayDescription: ReadonlyArray<string | null> | null;
  } | null;
  readonly " $fragmentType": "ArtworkSidebar2Classification_artwork";
};
export type ArtworkSidebar2Classification_artwork$key = {
  readonly " $data"?: ArtworkSidebar2Classification_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2Classification_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2Classification_artwork",
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
          "name": "shortArrayDescription",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "93d1b111cd682b8c2752bf26bcf16e9e";

export default node;
