/**
 * @generated SignedSource<<32241b4a0c075cb79106e7c5fd64515c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CellArtistSeries_artistSeries$data = {
  readonly artworksCountMessage: string | null | undefined;
  readonly image: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "CellArtistSeries_artistSeries";
};
export type CellArtistSeries_artistSeries$key = {
  readonly " $data"?: CellArtistSeries_artistSeries$data;
  readonly " $fragmentSpreads": FragmentRefs<"CellArtistSeries_artistSeries">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CellArtistSeries_artistSeries",
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
      "name": "artworksCountMessage",
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
              "value": 334
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
              "value": 445
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
          "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistSeries",
  "abstractKey": null
};

(node as any).hash = "f042ffe5ef878a46c2a859ef8b820be9";

export default node;
