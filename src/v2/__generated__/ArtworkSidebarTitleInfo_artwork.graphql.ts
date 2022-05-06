/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarTitleInfo_artwork = {
    readonly title: string | null;
    readonly date: string | null;
    readonly medium: string | null;
    readonly " $refType": "ArtworkSidebarTitleInfo_artwork";
};
export type ArtworkSidebarTitleInfo_artwork$data = ArtworkSidebarTitleInfo_artwork;
export type ArtworkSidebarTitleInfo_artwork$key = {
    readonly " $data"?: ArtworkSidebarTitleInfo_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarTitleInfo_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarTitleInfo_artwork",
  "selections": [
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '3a3e32595a7e874f0bca9e3ce4033193';
export default node;
