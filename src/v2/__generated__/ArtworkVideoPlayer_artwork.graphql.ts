/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkVideoPlayer_artwork = {
    readonly figures: ReadonlyArray<{
        readonly type: "Video";
        readonly url: string;
        readonly height: number;
        readonly width: number;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly type: "%other";
    }>;
    readonly " $refType": "ArtworkVideoPlayer_artwork";
};
export type ArtworkVideoPlayer_artwork$data = ArtworkVideoPlayer_artwork;
export type ArtworkVideoPlayer_artwork$key = {
    readonly " $data"?: ArtworkVideoPlayer_artwork$data | undefined;
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "figures",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": "type",
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
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
          "type": "Video",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '974a30d74f842d7276a8cb99153735a5';
export default node;
