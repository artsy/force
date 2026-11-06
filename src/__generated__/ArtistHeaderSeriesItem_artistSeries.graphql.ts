/**
 * @generated SignedSource<<c6d7974111ae3e31384824a5df04219d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeaderSeriesItem_artistSeries$data = {
  readonly forSaleArtworksCount: number;
  readonly image: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "ArtistHeaderSeriesItem_artistSeries";
};
export type ArtistHeaderSeriesItem_artistSeries$key = {
  readonly " $data"?: ArtistHeaderSeriesItem_artistSeries$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderSeriesItem_artistSeries">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistHeaderSeriesItem_artistSeries",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "forSaleArtworksCount",
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
              "value": 210
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "larger",
                "large"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 280
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
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:210,version:[\"larger\",\"large\"],width:280)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistSeries",
  "abstractKey": null
};

(node as any).hash = "3ce85bae1063a3550b534b3b000c76c4";

export default node;
