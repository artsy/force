/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork = {
    readonly description: string | null;
    readonly " $refType": "ArtworkDetailsAboutTheWorkFromArtsy_artwork";
};
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork$data = ArtworkDetailsAboutTheWorkFromArtsy_artwork;
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork$key = {
    readonly " $data"?: ArtworkDetailsAboutTheWorkFromArtsy_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkDetailsAboutTheWorkFromArtsy_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '621e4eaa61c267369ccc26d7d14d9ef3';
export default node;
