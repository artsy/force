/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_artist = {
    readonly internalID: string;
    readonly " $fragmentRefs": FragmentRefs<"Artist2Genes_artist" | "Artist2NotableWorksRail_artist" | "Artist2WorksForSaleRail_artist" | "SelectedCareerAchievements_artist">;
    readonly " $refType": "ArtistOverviewRoute_artist";
};
export type ArtistOverviewRoute_artist$data = ArtistOverviewRoute_artist;
export type ArtistOverviewRoute_artist$key = {
    readonly " $data"?: ArtistOverviewRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistOverviewRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistOverviewRoute_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2Genes_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2NotableWorksRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2WorksForSaleRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectedCareerAchievements_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'b6d6057f770912a232bb92caa4111669';
export default node;
