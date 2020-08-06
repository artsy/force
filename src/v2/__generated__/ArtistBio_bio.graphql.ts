/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ArtistBio_bio",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "biographyBlurb",
      "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)",
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
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "text",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '8d3d6cad9783dad9b00e24bb96e77b1a';
export default node;
