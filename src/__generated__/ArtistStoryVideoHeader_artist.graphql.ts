/**
 * @generated SignedSource<<725f3cd9a8423b172f9eb4ecb47e3293>>
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
  readonly slug: string;
  readonly vanguardYear: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryHeaderMedia_artist">;
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
      "name": "ArtistStoryHeaderMedia_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "e9c4b713e8d14f5630c66f76272ec844";

export default node;
