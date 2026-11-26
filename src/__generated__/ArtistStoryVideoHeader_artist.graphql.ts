/**
 * @generated SignedSource<<a5e2b55c525e3fd8d194287a275e3946>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryVideoHeader_artist$data = {
  readonly counts: {
    readonly follows: any | null | undefined;
  } | null | undefined;
  readonly formattedNationalityAndBirthday: string | null | undefined;
  readonly instagramHandle: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly vanguardYear: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryHeaderMedia_artist" | "ArtistStoryVanguardBadge_artist">;
  readonly " $fragmentType": "ArtistStoryVideoHeader_artist";
};
export type ArtistStoryVideoHeader_artist$key = {
  readonly " $data"?: ArtistStoryVideoHeader_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryVideoHeader_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryVideoHeader_artist",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedNationalityAndBirthday",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "vanguardYear",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "instagramHandle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "follows",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryHeaderMedia_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryVanguardBadge_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "1cefeb17c9b34f6fb034f177851fd474";

export default node;
