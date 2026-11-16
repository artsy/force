/**
 * @generated SignedSource<<daf30ae8ec4ca5136cf9f05bdfff03c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryProcessVideo_video$data = {
  readonly playerUrl: string;
  readonly title: string;
  readonly " $fragmentType": "ArtistStoryProcessVideo_video";
};
export type ArtistStoryProcessVideo_video$key = {
  readonly " $data"?: ArtistStoryProcessVideo_video$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryProcessVideo_video">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryProcessVideo_video",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "playerUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Video",
  "abstractKey": null
};

(node as any).hash = "f3616cdfa836bcfc894c57a81acaee83";

export default node;
