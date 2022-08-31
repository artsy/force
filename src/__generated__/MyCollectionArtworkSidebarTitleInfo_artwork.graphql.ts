/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSidebarTitleInfo_artwork = {
    readonly artistNames: string | null;
    readonly title: string | null;
    readonly date: string | null;
    readonly " $refType": "MyCollectionArtworkSidebarTitleInfo_artwork";
};
export type MyCollectionArtworkSidebarTitleInfo_artwork$data = MyCollectionArtworkSidebarTitleInfo_artwork;
export type MyCollectionArtworkSidebarTitleInfo_artwork$key = {
    readonly " $data"?: MyCollectionArtworkSidebarTitleInfo_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebarTitleInfo_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkSidebarTitleInfo_artwork",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '60120603938afed466e07220e7b757d3';
export default node;
