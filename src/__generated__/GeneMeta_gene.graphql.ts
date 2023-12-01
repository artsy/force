/**
 * @generated SignedSource<<478ba688af0b77e35225d041f4cc65d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneMeta_gene$data = {
  readonly displayName: string | null | undefined;
  readonly href: string | null | undefined;
  readonly image: {
    readonly cropped: {
      readonly src: string;
    } | null | undefined;
  } | null | undefined;
  readonly meta: {
    readonly description: string;
  };
  readonly name: string | null | undefined;
  readonly " $fragmentType": "GeneMeta_gene";
};
export type GeneMeta_gene$key = {
  readonly " $data"?: GeneMeta_gene$data;
  readonly " $fragmentSpreads": FragmentRefs<"GeneMeta_gene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneMeta_gene",
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
      "name": "displayName",
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
      "concreteType": "GeneMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        }
      ],
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
              "value": 630
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 1200
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
            }
          ],
          "storageKey": "cropped(height:630,width:1200)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "2e27d5537beb9dd961399d8fc7cdfcc5";

export default node;
