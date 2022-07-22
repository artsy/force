/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistBio_bio = {
    readonly biographyBlurb: {
        readonly credit: string | null;
        readonly partnerID: string | null;
        readonly text: string | null;
    } | null;
    readonly " $refType": "ArtistBio_bio";
};
export type ArtistBio_bio$data = ArtistBio_bio;
export type ArtistBio_bio$key = {
    readonly " $data"?: ArtistBio_bio$data | undefined;
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
          "value": false
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
      "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = 'ed3e96658bfe75ed22574c19e19d0634';
export default node;
