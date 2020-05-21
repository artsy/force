/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OtherAuctions_salesConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly " $fragmentRefs": FragmentRefs<"AuctionCard_sale">;
        } | null;
    } | null> | null;
    readonly " $refType": "OtherAuctions_salesConnection";
};
export type OtherAuctions_salesConnection$data = OtherAuctions_salesConnection;
export type OtherAuctions_salesConnection$key = {
    readonly " $data"?: OtherAuctions_salesConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"OtherAuctions_salesConnection">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "OtherAuctions_salesConnection",
  "type": "SaleConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Sale",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "AuctionCard_sale",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'c2907770ffe0232df7c5a03b3a42b7d9';
export default node;
