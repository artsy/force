/**
 * @generated SignedSource<<7d17f13c79a9100f10f6d6512e0f2b40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryMobileHeader_artist$data = {
  readonly counts: {
    readonly follows: any | null | undefined;
  } | null | undefined;
  readonly formattedNationalityAndBirthday: string | null | undefined;
  readonly instagramHandle: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly vanguardYear: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryHeaderImage_artist" | "ArtistStoryVanguardBadge_artist">;
  readonly " $fragmentType": "ArtistStoryMobileHeader_artist";
};
export type ArtistStoryMobileHeader_artist$key = {
  readonly " $data"?: ArtistStoryMobileHeader_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryMobileHeader_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryMobileHeader_artist",
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
      "name": "ArtistStoryHeaderImage_artist"
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

(node as any).hash = "e38abf133b29643e95294f419a16e0df";

export default node;
