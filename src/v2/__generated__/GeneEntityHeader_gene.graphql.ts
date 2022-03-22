/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneEntityHeader_gene = {
    readonly internalID: string;
    readonly href: string | null;
    readonly name: string | null;
    readonly avatar: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly filterArtworksConnection: {
        readonly counts: {
            readonly total: number | null;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FollowGeneButton_gene">;
    readonly " $refType": "GeneEntityHeader_gene";
};
export type GeneEntityHeader_gene$data = GeneEntityHeader_gene;
export type GeneEntityHeader_gene$key = {
    readonly " $data"?: GeneEntityHeader_gene$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneEntityHeader_gene">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneEntityHeader_gene",
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "avatar",
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
              "value": 45
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
              "value": 45
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
          "storageKey": "cropped(height:45,version:[\"big_and_tall\",\"tall\"],width:45)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
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
          "concreteType": "FilterArtworksCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "total",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "filterArtworksConnection(first:1)"
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
(node as any).hash = 'e10f921af2dd40990e1a797ad257732a';
export default node;
