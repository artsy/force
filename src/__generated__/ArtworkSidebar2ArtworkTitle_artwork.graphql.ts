/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2ArtworkTitle_artwork = {
    readonly date: string | null;
    readonly title: string | null;
    readonly " $refType": "ArtworkSidebar2ArtworkTitle_artwork";
};
export type ArtworkSidebar2ArtworkTitle_artwork$data = ArtworkSidebar2ArtworkTitle_artwork;
export type ArtworkSidebar2ArtworkTitle_artwork$key = {
    readonly " $data"?: ArtworkSidebar2ArtworkTitle_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2ArtworkTitle_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2ArtworkTitle_artwork",
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
(node as any).hash = '8521ac0b18b267e83b6cec088b757887';
export default node;
