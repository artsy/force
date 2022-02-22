/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntityTooltipGene_gene = {
    readonly name: string | null;
    readonly href: string | null;
    readonly description: string | null;
    readonly image: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
            readonly height: number;
            readonly width: number;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FollowGeneButton_gene">;
    readonly " $refType": "EntityTooltipGene_gene";
};
export type EntityTooltipGene_gene$data = EntityTooltipGene_gene;
export type EntityTooltipGene_gene$key = {
    readonly " $data"?: EntityTooltipGene_gene$data;
    readonly " $fragmentRefs": FragmentRefs<"EntityTooltipGene_gene">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntityTooltipGene_gene",
  "selections": [
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowGeneButton_gene"
    }
  ],
  "type": "Gene",
  "abstractKey": null
};
(node as any).hash = 'efd29bee70b8d6162fa75b28267c69e2';
export default node;
