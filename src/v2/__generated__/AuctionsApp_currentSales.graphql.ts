/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_currentSales = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
        } | null;
    } | null> | null;
    readonly " $refType": "AuctionsApp_currentSales";
};
export type AuctionsApp_currentSales$data = AuctionsApp_currentSales;
export type AuctionsApp_currentSales$key = {
    readonly " $data"?: AuctionsApp_currentSales$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_currentSales">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionsApp_currentSales",
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
              "name": "id",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SaleConnection"
};
(node as any).hash = 'd7aa66ea5d9d041686fc1498df806a3e';
export default node;
