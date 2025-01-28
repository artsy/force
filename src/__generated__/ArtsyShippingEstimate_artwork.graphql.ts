/**
 * @generated SignedSource<<0688b0fc9b18c41aee5e334c8f6c212e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtsyShippingEstimate_artwork$data = {
  readonly category: string | null | undefined;
  readonly heightCm: number | null | undefined;
  readonly isFramed: boolean | null | undefined;
  readonly location: {
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly postalCode: string | null | undefined;
  } | null | undefined;
  readonly priceCurrency: string | null | undefined;
  readonly priceListed: {
    readonly major: number;
  } | null | undefined;
  readonly shippingCountry: string | null | undefined;
  readonly shippingOrigin: string | null | undefined;
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
      "kind": "ScalarField",
      "name": "isFramed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingOrigin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingCountry",
      "storageKey": null
    },
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
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

(node as any).hash = "e334bac45ddae9ac876f8e846105b439";

export default node;
