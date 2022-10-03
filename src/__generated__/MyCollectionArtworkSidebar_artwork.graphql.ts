/**
 * @generated SignedSource<<091f3a901734a770166e15948af9c193>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSidebar_artwork$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSidebarMetadata_artwork" | "MyCollectionArtworkSidebarTitleInfo_artwork">;
  readonly " $fragmentType": "MyCollectionArtworkSidebar_artwork";
};
export type MyCollectionArtworkSidebar_artwork$key = {
  readonly " $data"?: MyCollectionArtworkSidebar_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSidebar_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkSidebar_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkSidebarTitleInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkSidebarMetadata_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "fbeab7f02817f99bd9a7721eff5218b3";

export default node;
