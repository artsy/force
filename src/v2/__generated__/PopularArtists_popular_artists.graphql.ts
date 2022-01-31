/**
 * @generated SignedSource<<57ae6ad13d520c201b476fd85c24d5d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PopularArtists_popular_artists$data = ReadonlyArray<{
  readonly slug: string;
  readonly internalID: string;
  readonly id: string;
  readonly name: string | null;
  readonly image: {
    readonly cropped: {
      readonly url: string;
    } | null;
  } | null;
  readonly " $fragmentType": "PopularArtists_popular_artists";
}>;
export type PopularArtists_popular_artists$key = ReadonlyArray<{
  readonly " $data"?: PopularArtists_popular_artists$data;
  readonly " $fragmentSpreads": FragmentRefs<"PopularArtists_popular_artists">;
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
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "3d46c81e197d7d6f1f6a27595f5291b6";

export default node;
