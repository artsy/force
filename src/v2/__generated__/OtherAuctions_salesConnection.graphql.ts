/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OtherAuctions_salesConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly internalID: string;
            readonly " $fragmentRefs": FragmentRefs<"AuctionCard_sale">;
        } | null;
    } | null> | null;
    readonly " $refType": "OtherAuctions_salesConnection";
};
export type OtherAuctions_salesConnection$data = OtherAuctions_salesConnection;
export type OtherAuctions_salesConnection$key = {
    readonly " $data"?: OtherAuctions_salesConnection$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OtherAuctions_salesConnection">;
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
(node as any).hash = 'f24649f2860a50e660f21de351eb7040';
export default node;
