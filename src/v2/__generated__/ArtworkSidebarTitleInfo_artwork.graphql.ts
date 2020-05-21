/* tslint:disable */

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
    readonly " $data"?: ArtworkSidebarTitleInfo_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarTitleInfo_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarTitleInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "medium",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '3a3e32595a7e874f0bca9e3ce4033193';
export default node;
