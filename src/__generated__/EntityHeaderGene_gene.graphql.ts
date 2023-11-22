/**
 * @generated SignedSource<<a98cf0495bf3737a20416b4000c89126>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntityHeaderGene_gene$data = {
  readonly avatar: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null | undefined;
  } | null | undefined;
  readonly filterArtworksConnection: {
    readonly counts: {
      readonly total: any | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "EntityHeaderGene_gene";
};
export type EntityHeaderGene_gene$key = {
  readonly " $data"?: EntityHeaderGene_gene$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderGene_gene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntityHeaderGene_gene",
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
    }
  ],
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "90714ad51091e668d2a1eae00ca3d146";

export default node;
