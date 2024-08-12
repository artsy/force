/**
 * @generated SignedSource<<162855ace85bbdd4f7047623593a2242>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleApp_sale$data = {
  readonly coverImage: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly description: string | null | undefined;
  readonly eligibleSaleArtworksCount: number | null | undefined;
  readonly featuredKeywords: ReadonlyArray<string>;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"SaleMeta_sale">;
  readonly " $fragmentType": "SaleApp_sale";
};
export type SaleApp_sale$key = {
  readonly " $data"?: SaleApp_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleApp_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleApp_sale",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaleMeta_sale"
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
              "name": "version",
              "value": [
                "wide",
                "source",
                "large_rectangle"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"wide\",\"source\",\"large_rectangle\"])"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eligibleSaleArtworksCount",
      "storageKey": null
    },
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "featuredKeywords",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "ae19b218d2aa362257af152707de59d7";

export default node;
