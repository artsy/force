/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkInquiry_artwork = {
    readonly " $fragmentRefs": FragmentRefs<"ArtworkInquiryForm_artwork">;
    readonly " $refType": "ArtworkInquiry_artwork";
};
export type ArtworkInquiry_artwork$data = ArtworkInquiry_artwork;
export type ArtworkInquiry_artwork$key = {
    readonly " $data"?: ArtworkInquiry_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkInquiry_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkInquiry_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkInquiryForm_artwork"
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '08adaab82188575cc1aa97436c0e3c4b';
export default node;
