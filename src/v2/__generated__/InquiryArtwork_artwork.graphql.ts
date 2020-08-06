/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type InquiryArtwork_artwork = {
    readonly " $fragmentRefs": FragmentRefs<"Artwork_artwork">;
    readonly " $refType": "InquiryArtwork_artwork";
};
export type InquiryArtwork_artwork$data = InquiryArtwork_artwork;
export type InquiryArtwork_artwork$key = {
    readonly " $data"?: InquiryArtwork_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"InquiryArtwork_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InquiryArtwork_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artwork_artwork"
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '395ab37180661dd93a2a1ee189b363b5';
export default node;
