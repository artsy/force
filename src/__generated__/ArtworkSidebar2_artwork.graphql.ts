/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2_artwork = {
    readonly slug: string;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2Artists_artwork">;
    readonly " $refType": "ArtworkSidebar2_artwork";
};
export type ArtworkSidebar2_artwork$data = ArtworkSidebar2_artwork;
export type ArtworkSidebar2_artwork$key = {
    readonly " $data"?: ArtworkSidebar2_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2Artists_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '62bbdcd86b3fd0bc8e215ea20ce3ca1f';
export default node;
