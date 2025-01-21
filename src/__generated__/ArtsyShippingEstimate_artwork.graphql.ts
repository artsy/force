/**
 * @generated SignedSource<<308cade2c642e9ce416a222b790af56b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtsyShippingEstimate_artwork$data = {
  readonly heightCm: number | null | undefined;
  readonly location: {
    readonly country: string | null | undefined;
    readonly postalCode: string | null | undefined;
  } | null | undefined;
  readonly priceCurrency: string | null | undefined;
  readonly priceListed: {
    readonly major: number;
  } | null | undefined;
  readonly widthCm: number | null | undefined;
  readonly " $fragmentType": "ArtsyShippingEstimate_artwork";
};
export type ArtsyShippingEstimate_artwork$key = {
  readonly " $data"?: ArtsyShippingEstimate_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtsyShippingEstimate_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtsyShippingEstimate_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "country",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "postalCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceCurrency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "priceListed",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "major",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "heightCm",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "widthCm",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "5cbb2aac16fbabd0ecd5f3afda08232a";

export default node;
