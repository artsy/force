/**
 * @generated SignedSource<<900e607c85a870671382b28b6493d592>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntityTooltipGene_gene$data = {
  readonly description: string | null | undefined;
  readonly href: string | null | undefined;
  readonly image: {
    readonly cropped: {
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderGene_gene">;
  readonly " $fragmentType": "EntityTooltipGene_gene";
};
export type EntityTooltipGene_gene$key = {
  readonly " $data"?: EntityTooltipGene_gene$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntityTooltipGene_gene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntityTooltipGene_gene",
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
      "name": "description",
      "storageKey": "description(format:\"PLAIN\")"
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
              "value": 146
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "big_and_tall",
                "tall"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 260
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
          "storageKey": "cropped(height:146,version:[\"big_and_tall\",\"tall\"],width:260)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "599deba5f6a9cd75d515f99fe51e0151";

export default node;
