/**
 * @generated SignedSource<<b493ba81dec0a51bfe9932783dfcf53d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarArtworkTitle_artwork$data = {
  readonly date: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarArtworkTitle_artwork";
};
export type ArtworkSidebarArtworkTitle_artwork$key = {
  readonly " $data"?: ArtworkSidebarArtworkTitle_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarArtworkTitle_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarArtworkTitle_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
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

(node as any).hash = "07e221904e2ea84990261db41fbda070";

export default node;
