/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_pastSales = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly name: string | null;
            readonly formattedStartDateTime: string | null;
            readonly href: string | null;
        } | null;
    } | null> | null;
    readonly " $refType": "AuctionsApp_pastSales";
};
export type AuctionsApp_pastSales$data = AuctionsApp_pastSales;
export type AuctionsApp_pastSales$key = {
    readonly " $data"?: AuctionsApp_pastSales$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_pastSales">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionsApp_pastSales",
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
(node as any).hash = '2ec338ea19f9780f534f5668601a02dd';
export default node;
