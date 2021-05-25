/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2CareerHighlights_artist = {
    readonly " $fragmentRefs": FragmentRefs<"SelectedCareerAchievements_artist" | "Artist2Genes_artist">;
    readonly " $refType": "Artist2CareerHighlights_artist";
};
export type Artist2CareerHighlights_artist$data = Artist2CareerHighlights_artist;
export type Artist2CareerHighlights_artist$key = {
    readonly " $data"?: Artist2CareerHighlights_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2CareerHighlights_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2CareerHighlights_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectedCareerAchievements_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2Genes_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'de750d6794f4e7e00c262ece71536420';
export default node;
