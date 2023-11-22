/**
 * @generated SignedSource<<e69a4bcadd2b77f4aac956e3a7f31579>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworksList_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ArtworksList_artworks";
};
export type ArtworksList_artworks$key = {
  readonly " $data"?: ArtworksList_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworksList_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworksList_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkEdge",
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
              "name": "internalID",
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
  "type": "ArtworkConnection",
  "abstractKey": null
};

(node as any).hash = "fb943d2a273848c41f500a7041b402cc";

export default node;
