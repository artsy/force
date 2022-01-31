/**
 * @generated SignedSource<<1453bceebef69d0cda7e715c6f6ebb73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowserSmall_artwork$data = {
  readonly images: ReadonlyArray<{
    readonly internalID: string | null;
    readonly isZoomable: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"DeepZoom_image">;
  } | null> | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkLightbox_artwork">;
  readonly " $fragmentType": "ArtworkImageBrowserSmall_artwork";
};
export type ArtworkImageBrowserSmall_artwork$key = {
  readonly " $data"?: ArtworkImageBrowserSmall_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowserSmall_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkImageBrowserSmall_artwork",
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

(node as any).hash = "0d48fdd3b4bc8ce8bb14b80807dcd103";

export default node;
