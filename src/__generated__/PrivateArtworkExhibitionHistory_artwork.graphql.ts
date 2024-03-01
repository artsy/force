/**
 * @generated SignedSource<<124b75d8239b889dd753426fc1a16bea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkExhibitionHistory_artwork$data = {
  readonly title: string | null | undefined;
  readonly " $fragmentType": "PrivateArtworkExhibitionHistory_artwork";
};
export type PrivateArtworkExhibitionHistory_artwork$key = {
  readonly " $data"?: PrivateArtworkExhibitionHistory_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkExhibitionHistory_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkExhibitionHistory_artwork",
  "selections": [
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

(node as any).hash = "b4dba76960f95f9162260ed448fe6745";

export default node;
