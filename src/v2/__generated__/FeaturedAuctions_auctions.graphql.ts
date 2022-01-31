/**
 * @generated SignedSource<<f95b3cdcf7c0026eabea98103008e5ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeaturedAuctions_auctions$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly slug: string;
      readonly name: string | null;
      readonly href: string | null;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "FeaturedAuctions_auctions";
};
export type FeaturedAuctions_auctions$key = {
  readonly " $data"?: FeaturedAuctions_auctions$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeaturedAuctions_auctions">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeaturedAuctions_auctions",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Sale",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
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
              "kind": "ScalarField",
              "name": "href",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SaleConnection",
  "abstractKey": null
};

(node as any).hash = "58e37c254a000d5d3795ce932b2a08b9";

export default node;
