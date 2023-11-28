/**
 * @generated SignedSource<<5e0aa8f3c9060bd58f8885bc64c9661c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OtherAuctions_salesConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"AuctionCard_sale">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "OtherAuctions_salesConnection";
};
export type OtherAuctions_salesConnection$key = {
  readonly " $data"?: OtherAuctions_salesConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"OtherAuctions_salesConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OtherAuctions_salesConnection",
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
              "name": "internalID",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AuctionCard_sale"
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

(node as any).hash = "f24649f2860a50e660f21de351eb7040";

export default node;
