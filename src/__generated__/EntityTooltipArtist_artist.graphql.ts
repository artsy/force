/**
 * @generated SignedSource<<4a76b211d4dd6e24aec96041cc0a1a4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntityTooltipArtist_artist$data = {
  readonly blurb: string | null | undefined;
  readonly carousel: {
    readonly images: ReadonlyArray<{
      readonly resized: {
        readonly height: number | null | undefined;
        readonly src: string;
        readonly srcSet: string;
        readonly width: number | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  readonly " $fragmentType": "EntityTooltipArtist_artist";
};
export type EntityTooltipArtist_artist$key = {
  readonly " $data"?: EntityTooltipArtist_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntityTooltipArtist_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntityTooltipArtist_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EntityHeaderArtist_artist"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "PLAIN"
        }
      ],
      "kind": "ScalarField",
      "name": "blurb",
      "storageKey": "blurb(format:\"PLAIN\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCarousel",
      "kind": "LinkedField",
      "name": "carousel",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "images",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 100
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "height",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "width",
                  "storageKey": null
                }
              ],
              "storageKey": "resized(height:100)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "04adc27765f3888ecb9699bed4bd430d";

export default node;
