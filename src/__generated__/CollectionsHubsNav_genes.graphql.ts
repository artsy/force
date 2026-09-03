/**
 * @generated SignedSource<<4f14b861d4f48891a9da8e385f05352a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsNav_genes$data = ReadonlyArray<{
  readonly image: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "CollectionsHubsNav_genes";
}>;
export type CollectionsHubsNav_genes$key = ReadonlyArray<{
  readonly " $data"?: CollectionsHubsNav_genes$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubsNav_genes">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CollectionsHubsNav_genes",
  "selections": [
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
      "name": "name",
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
              "value": 218
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "big_and_tall",
                "square500",
                "tall"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 387
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
          "storageKey": "cropped(height:218,version:[\"big_and_tall\",\"square500\",\"tall\"],width:387)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "e715b3087d917747728bdc6189ab6dad";

export default node;
