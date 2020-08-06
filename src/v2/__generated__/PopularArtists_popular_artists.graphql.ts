/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PopularArtists_popular_artists = ReadonlyArray<{
    readonly slug: string;
    readonly internalID: string;
    readonly id: string;
    readonly name: string | null;
    readonly image: {
        readonly cropped: {
            readonly url: string | null;
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
  "kind": "Fragment",
  "name": "PopularArtists_popular_artists",
  "type": "Artist",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:100,width:100)",
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
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '3d46c81e197d7d6f1f6a27595f5291b6';
export default node;
