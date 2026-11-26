/**
 * @generated SignedSource<<42dcdb7904451679be860b2edfba8ac0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStorySplitHeader_artist$data = {
  readonly counts: {
    readonly follows: any | null | undefined;
  } | null | undefined;
  readonly formattedNationalityAndBirthday: string | null | undefined;
  readonly instagramHandle: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly vanguardYear: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryBiography_artist" | "ArtistStoryHeaderImage_artist" | "ArtistStoryPullQuote_artist" | "ArtistStoryRepresentation_artist" | "ArtistStoryVanguardBadge_artist" | "ArtistStylesAndTechniques_artist">;
  readonly " $fragmentType": "ArtistStorySplitHeader_artist";
};
export type ArtistStorySplitHeader_artist$key = {
  readonly " $data"?: ArtistStorySplitHeader_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStorySplitHeader_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStorySplitHeader_artist",
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
      "name": "slug",
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
      "name": "ArtistStoryHeaderImage_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryVanguardBadge_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryPullQuote_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryBiography_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStylesAndTechniques_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryRepresentation_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "cf2902f0c7589fb45de9c91431d1ebf9";

export default node;
