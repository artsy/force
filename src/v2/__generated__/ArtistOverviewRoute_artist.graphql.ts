/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_artist = {
    readonly name: string | null;
    readonly counts: {
        readonly artworks: number | null;
    } | null;
    readonly internalID: string;
    readonly " $fragmentRefs": FragmentRefs<"Artist2NotableWorksRail_artist" | "Artist2CareerHighlights_artist" | "Artist2WorksForSaleRail_artist" | "Artist2CurrentShowsRail_artist" | "Artist2CurrentArticlesRail_artist" | "Artist2RelatedArtistsRail_artist">;
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
      "name": "Artist2NotableWorksRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2CareerHighlights_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2WorksForSaleRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2CurrentShowsRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2CurrentArticlesRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2RelatedArtistsRail_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'acb69b0db9802b3f3455a462feee7046';
export default node;
