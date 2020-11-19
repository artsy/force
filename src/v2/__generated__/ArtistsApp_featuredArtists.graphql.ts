/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsApp_featuredArtists = ReadonlyArray<{
    readonly name: string | null;
    readonly artists: ReadonlyArray<{
        readonly internalID?: string | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtistsCarouselCell_featuredLink">;
    } | null> | null;
    readonly " $refType": "ArtistsApp_featuredArtists";
}>;
export type ArtistsApp_featuredArtists$data = ArtistsApp_featuredArtists;
export type ArtistsApp_featuredArtists$key = ReadonlyArray<{
    readonly " $data"?: ArtistsApp_featuredArtists$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistsApp_featuredArtists">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ArtistsApp_featuredArtists",
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
          "type": "FeaturedLink"
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
  "type": "OrderedSet"
};
(node as any).hash = 'e9f18f91c88f0430dc7b35ad706014fe';
export default node;
