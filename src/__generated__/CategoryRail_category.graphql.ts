/**
 * @generated SignedSource<<bcc7f15004f6cd15eaa24d3d2b669b65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryRail_category$data = {
  readonly filterArtworks: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderGene_gene">;
  readonly " $fragmentType": "CategoryRail_category";
};
export type CategoryRail_category$key = {
  readonly " $data"?: CategoryRail_category$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryRail_category">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryRail_category",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EntityHeaderGene_gene"
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
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": "filterArtworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
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
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "filterArtworksConnection(first:10)"
    }
  ],
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "db825c6989cbbbd43370acf8c760f4c7";

export default node;
