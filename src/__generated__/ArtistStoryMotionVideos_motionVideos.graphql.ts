/**
 * @generated SignedSource<<daf02d61fd5537b57fdb66ec8197b20f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryMotionVideos_motionVideos$data = ReadonlyArray<{
  readonly caption: string | null | undefined;
  readonly internalID: string;
  readonly quote: {
    readonly attribution: string | null | undefined;
    readonly text: string;
  } | null | undefined;
  readonly video: {
    readonly aspectRatio: number | null | undefined;
    readonly playerUrl: string;
    readonly title: string;
  };
  readonly " $fragmentType": "ArtistStoryMotionVideos_motionVideos";
}>;
export type ArtistStoryMotionVideos_motionVideos$key = ReadonlyArray<{
  readonly " $data"?: ArtistStoryMotionVideos_motionVideos$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryMotionVideos_motionVideos">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ArtistStoryMotionVideos_motionVideos",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "caption",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistStoryQuote",
      "kind": "LinkedField",
      "name": "quote",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "attribution",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
          "name": "playerUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
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
      "storageKey": null
    }
  ],
  "type": "ArtistStoryVideo",
  "abstractKey": null
};

(node as any).hash = "702fae03e6f374b46cac404fc6601519";

export default node;
