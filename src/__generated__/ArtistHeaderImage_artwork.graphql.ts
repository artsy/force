/**
 * @generated SignedSource<<4cd08194017112200d50804dcd43e126>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeaderImage_artwork$data = {
  readonly fallbackArtist: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly image: {
    readonly height: number | null | undefined;
    readonly src: string | null | undefined;
    readonly width: number | null | undefined;
  } | null | undefined;
  readonly imageTitle: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Details_artwork">;
  readonly " $fragmentType": "ArtistHeaderImage_artwork";
};
export type ArtistHeaderImage_artwork$key = {
  readonly " $data"?: ArtistHeaderImage_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderImage_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistHeaderImage_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageTitle",
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
          "alias": "src",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "larger",
                "larger"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"larger\",\"larger\"])"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "fallbackArtist",
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Details_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "218b6a1df3bb87d68b4ab1b44b28e14b";

export default node;
