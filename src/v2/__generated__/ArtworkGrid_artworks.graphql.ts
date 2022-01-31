/**
 * @generated SignedSource<<a91d06e6ca44f2a5e0e1ed37d7c80667>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkGrid_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly id: string;
      readonly slug: string;
      readonly href: string | null;
      readonly internalID: string;
      readonly image: {
        readonly aspect_ratio: number;
      } | null;
      readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "ArtworkGrid_artworks";
};
export type ArtworkGrid_artworks$key = {
  readonly " $data"?: ArtworkGrid_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkGrid_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
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
              "name": "internalID",
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
                  "alias": "aspect_ratio",
                  "args": null,
                  "kind": "ScalarField",
                  "name": "aspectRatio",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "GridItem_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtworkConnectionInterface",
  "abstractKey": "__isArtworkConnectionInterface"
};

(node as any).hash = "59d6b9d5570ebc1f6f93d1989f91ac2f";

export default node;
