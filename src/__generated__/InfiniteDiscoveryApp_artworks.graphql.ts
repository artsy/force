/**
 * @generated SignedSource<<cec43b32d7b875c6d83eb02e07201777>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InfiniteDiscoveryApp_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly id: string;
      readonly internalID: string;
      readonly isDisliked: boolean;
      readonly isSaved: boolean | null | undefined;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"InfiniteDiscoveryApp_artwork">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "InfiniteDiscoveryApp_artworks";
};
export type InfiniteDiscoveryApp_artworks$key = {
  readonly " $data"?: InfiniteDiscoveryApp_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"InfiniteDiscoveryApp_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InfiniteDiscoveryApp_artworks",
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
              "name": "id",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "InfiniteDiscoveryApp_artwork"
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
              "name": "slug",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isDisliked",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isSaved",
              "storageKey": null
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

(node as any).hash = "c8e1ff456acb39b66761fb3e2d28f42f";

export default node;
