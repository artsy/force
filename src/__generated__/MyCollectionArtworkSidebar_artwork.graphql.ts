/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSidebar_artwork = {
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebarTitleInfo_artwork" | "MyCollectionArtworkSidebarMetadata_artwork">;
    readonly " $refType": "MyCollectionArtworkSidebar_artwork";
};
export type MyCollectionArtworkSidebar_artwork$data = MyCollectionArtworkSidebar_artwork;
export type MyCollectionArtworkSidebar_artwork$key = {
    readonly " $data"?: MyCollectionArtworkSidebar_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebar_artwork">;
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
(node as any).hash = 'fbeab7f02817f99bd9a7721eff5218b3';
export default node;
