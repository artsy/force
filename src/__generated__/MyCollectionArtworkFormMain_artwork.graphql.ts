/**
 * @generated SignedSource<<0a718348fa79089a9bdefbb9382fcff3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkFormMain_artwork$data = {
  readonly internalID: string;
  readonly slug: string;
  readonly " $fragmentType": "MyCollectionArtworkFormMain_artwork";
};
export type MyCollectionArtworkFormMain_artwork$key = {
  readonly " $data"?: MyCollectionArtworkFormMain_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkFormMain_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkFormMain_artwork",
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "9333d0a235e8e8fdca02457f3e4456c8";

export default node;
