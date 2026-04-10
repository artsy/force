/**
 * @generated SignedSource<<9cf499d3f3e692c4f00260ca3b5a40af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistNotableWorksArtworks_artist$data = {
  readonly notableArtworks: ReadonlyArray<{
    readonly date: string | null | undefined;
    readonly href: string | null | undefined;
    readonly image: {
      readonly resized: {
        readonly height: number | null | undefined;
        readonly src: string;
        readonly srcSet: string;
        readonly width: number | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly slug: string;
    readonly title: string | null | undefined;
  }>;
  readonly " $fragmentType": "ArtistNotableWorksArtworks_artist";
};
export type ArtistNotableWorksArtworks_artist$key = {
  readonly " $data"?: ArtistNotableWorksArtworks_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistNotableWorksArtworks_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistNotableWorksArtworks_artist",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 3
        }
      ],
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "notableArtworks",
      "plural": true,
      "selections": [
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
          "name": "slug",
          "storageKey": null
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
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "date",
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
                  "value": 420
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 420
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
                  "name": "width",
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
              "storageKey": "resized(height:420,width:420)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "notableArtworks(size:3)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "e3b1f19fe1448558c03d4460213ae8e3";

export default node;
