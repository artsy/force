/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistBio_bio = {
    readonly biographyBlurb: {
        readonly text: string | null;
    } | null;
    readonly " $refType": "ArtistBio_bio";
};
export type ArtistBio_bio$data = ArtistBio_bio;
export type ArtistBio_bio$key = {
    readonly " $data"?: ArtistBio_bio$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistBio_bio">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistBio_bio",
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
          "name": "text",
          "storageKey": null
        }
      ],
      "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '8d3d6cad9783dad9b00e24bb96e77b1a';
export default node;
