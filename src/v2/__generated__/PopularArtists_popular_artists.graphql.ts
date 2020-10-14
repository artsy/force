/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PopularArtists_popular_artists = ReadonlyArray<{
    readonly slug: string;
    readonly internalID: string;
    readonly id: string;
    readonly name: string | null;
    readonly image: {
        readonly cropped: {
            readonly url: string;
        } | null;
    } | null;
    readonly " $refType": "PopularArtists_popular_artists";
}>;
export type PopularArtists_popular_artists$data = PopularArtists_popular_artists;
export type PopularArtists_popular_artists$key = ReadonlyArray<{
    readonly " $data"?: PopularArtists_popular_artists$data;
    readonly " $fragmentRefs": FragmentRefs<"PopularArtists_popular_artists">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PopularArtists_popular_artists",
  "selections": [
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
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 100
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 100
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:100,width:100)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '3d46c81e197d7d6f1f6a27595f5291b6';
export default node;
