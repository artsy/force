/**
 * @generated SignedSource<<db04beddac757668b1a351e0c6b4101f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkGrid_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly href: string | null;
      readonly id: string;
      readonly image: {
        readonly aspectRatio: number;
      } | null;
      readonly internalID: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"FlatGridItem_artwork" | "GridItem_artwork">;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "MyCollectionArtworkGrid_artworks";
};
export type MyCollectionArtworkGrid_artworks$key = {
  readonly " $data"?: MyCollectionArtworkGrid_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkGrid_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkGrid_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyCollectionEdge",
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
                  "alias": null,
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
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "FlatGridItem_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MyCollectionConnection",
  "abstractKey": null
};

(node as any).hash = "3071b72bdb273e22ec969d871a43ceff";

export default node;
