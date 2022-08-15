/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSidebar_artwork = {
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebarMetadata_artwork">;
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
      "name": "MyCollectionArtworkSidebarMetadata_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '79af56d0e4f5662d0753ac3bc53d9380';
export default node;
