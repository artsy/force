/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlights_artist = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistInsightBadges_artist" | "ArtistInsightAchievements_artist">;
    readonly " $refType": "ArtistCareerHighlights_artist";
};
export type ArtistCareerHighlights_artist$data = ArtistCareerHighlights_artist;
export type ArtistCareerHighlights_artist$key = {
    readonly " $data"?: ArtistCareerHighlights_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCareerHighlights_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCareerHighlights_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistInsightBadges_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistInsightAchievements_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '10063707d02c6ca8a76d1ad1e577a84d';
export default node;
