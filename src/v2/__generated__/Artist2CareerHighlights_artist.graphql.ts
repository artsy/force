/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2CareerHighlights_artist = {
    readonly biographyBlurb: {
        readonly credit: string | null;
        readonly partnerID: string | null;
        readonly text: string | null;
    } | null;
    readonly name: string | null;
    readonly slug: string;
    readonly " $fragmentRefs": FragmentRefs<"SelectedCareerAchievements_artist" | "Artist2ConsignButton_artist" | "Artist2Genes_artist">;
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
      "name": "Artist2ConsignButton_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2Genes_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'eaa37fbcdf4aa4ba8732bae6d16539c8';
export default node;
