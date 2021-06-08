/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlights_artist = {
    readonly biographyBlurb: {
        readonly credit: string | null;
        readonly partnerID: string | null;
        readonly text: string | null;
    } | null;
    readonly name: string | null;
    readonly slug: string;
    readonly " $fragmentRefs": FragmentRefs<"SelectedCareerAchievements_artist" | "ArtistConsignButton_artist" | "ArtistGenes_artist">;
    readonly " $refType": "ArtistCareerHighlights_artist";
};
export type ArtistCareerHighlights_artist$data = ArtistCareerHighlights_artist;
export type ArtistCareerHighlights_artist$key = {
    readonly " $data"?: ArtistCareerHighlights_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCareerHighlights_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCareerHighlights_artist",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        },
        {
          "kind": "Literal",
          "name": "partnerBio",
          "value": true
        }
      ],
      "concreteType": "ArtistBlurb",
      "kind": "LinkedField",
      "name": "biographyBlurb",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "credit",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "partnerID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        }
      ],
      "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)"
    },
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
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectedCareerAchievements_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignButton_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistGenes_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '93c49e66bdab53077715ee30d955a9a2';
export default node;
