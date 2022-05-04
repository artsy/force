/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CellSale_sale = {
    readonly name: string | null;
    readonly formattedStartDateTime: string | null;
    readonly href: string | null;
    readonly coverImage: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "CellSale_sale";
};
export type CellSale_sale$data = CellSale_sale;
export type CellSale_sale$key = {
    readonly " $data"?: CellSale_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"CellSale_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CellSale_sale",
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
      "name": "formattedStartDateTime",
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 334
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "normalized",
                "larger",
                "large"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 445
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
          "storageKey": "cropped(height:334,version:[\"normalized\",\"larger\",\"large\"],width:445)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
(node as any).hash = '6548a4992af1b2cbc5fdb190e87502b1';
export default node;
