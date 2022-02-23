/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsIndex_featuredArtists = ReadonlyArray<{
    readonly name: string | null;
    readonly artists: ReadonlyArray<{
        readonly internalID?: string;
        readonly " $fragmentRefs": FragmentRefs<"ArtistsCarouselCell_featuredLink">;
    } | null> | null;
    readonly " $refType": "ArtistsIndex_featuredArtists";
}>;
export type ArtistsIndex_featuredArtists$data = ArtistsIndex_featuredArtists;
export type ArtistsIndex_featuredArtists$key = ReadonlyArray<{
    readonly " $data"?: ArtistsIndex_featuredArtists$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistsIndex_featuredArtists">;
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
(node as any).hash = 'ba28d063a2c65078e8213f2391fc2cd2';
export default node;
