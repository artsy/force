/**
 * @generated SignedSource<<87ae678b143c0ec73754c55b857dabb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistsIndex_featuredArtists$data = ReadonlyArray<{
  readonly name: string | null;
  readonly artists: ReadonlyArray<{
    readonly internalID?: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistsCarouselCell_featuredLink">;
  } | null> | null;
  readonly " $fragmentType": "ArtistsIndex_featuredArtists";
}>;
export type ArtistsIndex_featuredArtists$key = ReadonlyArray<{
  readonly " $data"?: ArtistsIndex_featuredArtists$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistsIndex_featuredArtists">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ArtistsIndex_featuredArtists",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "artists",
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            }
          ],
          "type": "FeaturedLink",
          "abstractKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistsCarouselCell_featuredLink"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};

(node as any).hash = "ba28d063a2c65078e8213f2391fc2cd2";

export default node;
