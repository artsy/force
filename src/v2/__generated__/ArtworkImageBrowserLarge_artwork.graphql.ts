/**
 * @generated SignedSource<<01e4138fc637644b11f7d7da8e681fd3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowserLarge_artwork$data = {
  readonly images: ReadonlyArray<{
    readonly internalID: string | null;
    readonly isZoomable: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"DeepZoom_image">;
  } | null> | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkLightbox_artwork">;
  readonly " $fragmentType": "ArtworkImageBrowserLarge_artwork";
};
export type ArtworkImageBrowserLarge_artwork$key = {
  readonly " $data"?: ArtworkImageBrowserLarge_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowserLarge_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkImageBrowserLarge_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkLightbox_artwork"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
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
          "kind": "ScalarField",
          "name": "isZoomable",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DeepZoom_image"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "76181998a2ea6347028e36a0267ae23c";

export default node;
