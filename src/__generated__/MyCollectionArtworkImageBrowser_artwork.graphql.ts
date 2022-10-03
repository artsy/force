/**
 * @generated SignedSource<<bf7dfc04c45326b422bfd09c21ef7484>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkImageBrowser_artwork$data = {
  readonly images: ReadonlyArray<{
    readonly height: number | null;
    readonly width: number | null;
  } | null> | null;
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowser_artwork">;
  readonly " $fragmentType": "MyCollectionArtworkImageBrowser_artwork";
};
export type MyCollectionArtworkImageBrowser_artwork$key = {
  readonly " $data"?: MyCollectionArtworkImageBrowser_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkImageBrowser_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkImageBrowser_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork"
    },
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "613d09ea3408c3f56693ed749f86a719";

export default node;
