/**
 * @generated SignedSource<<4e806c9d294e2297823173be56a96d5d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryHeader_artist$data = {
  readonly featuredStory: {
    readonly headerVideo: {
      readonly internalID: string;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderEditorial_artist" | "ArtistStoryIntro_artist" | "ArtistStoryMobileHeader_artist" | "ArtistStorySplitHeader_artist" | "ArtistStoryVideoHeader_artist">;
  readonly " $fragmentType": "ArtistStoryHeader_artist";
};
export type ArtistStoryHeader_artist$key = {
  readonly " $data"?: ArtistStoryHeader_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryHeader_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryHeader_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistStory",
      "kind": "LinkedField",
      "name": "featuredStory",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistStoryVideo",
          "kind": "LinkedField",
          "name": "headerVideo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryMobileHeader_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStorySplitHeader_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryVideoHeader_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryIntro_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistHeaderEditorial_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "80ebab931782b9aade657ab3352f75ae";

export default node;
