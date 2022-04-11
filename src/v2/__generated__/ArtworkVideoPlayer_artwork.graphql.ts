/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkVideoPlayer_artwork = {
    readonly video: {
        readonly src: string | null;
        readonly height: number | null;
        readonly width: number | null;
    } | null;
    readonly " $refType": "ArtworkVideoPlayer_artwork";
};
export type ArtworkVideoPlayer_artwork$data = ArtworkVideoPlayer_artwork;
export type ArtworkVideoPlayer_artwork$key = {
    readonly " $data"?: ArtworkVideoPlayer_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkVideoPlayer_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkVideoPlayer_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Video",
      "kind": "LinkedField",
      "name": "video",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "src",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '52baf4e265c8ddb30e50461ccf1af810';
export default node;
