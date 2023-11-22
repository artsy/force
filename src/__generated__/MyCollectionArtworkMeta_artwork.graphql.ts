/**
 * @generated SignedSource<<bca9df8ca5e494bc59114731e80e7ed3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkMeta_artwork$data = {
  readonly artistNames: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "MyCollectionArtworkMeta_artwork";
};
export type MyCollectionArtworkMeta_artwork$key = {
  readonly " $data"?: MyCollectionArtworkMeta_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkMeta_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkMeta_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "300c9a3093b0d34db5c35b91dc4a569c";

export default node;
